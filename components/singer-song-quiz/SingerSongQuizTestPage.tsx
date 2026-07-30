"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FanQuizProgress } from "@/components/fan-quiz/FanQuizProgress";
import { FanQuizQuestionCard } from "@/components/fan-quiz/FanQuizQuestionCard";
import { getTestFanQuizTheme } from "@/config/fanQuizThemes";
import {
  calculateSingerSongQuizResult,
  createSingerSongQuizSession,
  encodeSingerSongQuizAnswers,
} from "@/lib/singer-song-quiz-engine";
import type {
  SingerSongQuizDifficulty,
  SingerSongQuizPresentedQuestion,
  SingerSongQuizQuestion,
} from "@/lib/singer-song-quiz-engine";
import type { TestDefinition } from "@/lib/types";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { localizeTest, localizeTestText } from "@/lib/test-i18n";

type Props = {
  test: TestDefinition;
  questions: SingerSongQuizQuestion[];
  quota: Record<SingerSongQuizDifficulty, number>;
  quizSize: number;
  resultBasePath: string;
  sessionKey: string;
  recentKey: string;
  eyebrow: string;
  loadingText: string;
};

const choiceBadges = ["A", "B", "C", "D"];
const newSeed = () => `${Date.now()}-${Math.random().toString(36).slice(2)}`;

const track = (event: string, params?: Record<string, string | number>) =>
  typeof window !== "undefined" &&
  (window as Window & { gtag?: (command: string, event: string, params?: Record<string, unknown>) => void })
    .gtag?.("event", event, params);

export function SingerSongQuizTestPage({
  test,
  questions: questionBank,
  quota,
  quizSize,
  resultBasePath,
  sessionKey,
  recentKey,
  eyebrow,
  loadingText,
}: Props) {
  const router = useRouter();
  const { locale, t } = useLanguage();
  const localizedTest = localizeTest(test, locale);
  const reduceMotion = useReducedMotion();
  const theme = getTestFanQuizTheme(test);
  const [questions, setQuestions] = useState<SingerSongQuizPresentedQuestion[]>([]);
  const [answers, setAnswers] = useState<number[]>([]);
  const [index, setIndex] = useState(0);
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    let recent: string[] = [];
    try {
      recent = JSON.parse(localStorage.getItem(recentKey) ?? "[]");
    } catch {}

    const seed = newSeed();
    const session = createSingerSongQuizSession(
      questionBank,
      { quizSize, quota },
      seed,
      Array.isArray(recent) ? recent : [],
    );
    setQuestions(session);
    setAnswers([]);
    setIndex(0);
    sessionStorage.setItem(sessionKey, JSON.stringify({ seed, answers: [], index: 0 }));
    track("test_start", { test_id: test.slug, category: "fan_quiz" });
  }, [questionBank, quota, quizSize, recentKey, sessionKey, test.slug]);

  const current = questions[index];
  const selected = answers[index];
  const progress = Math.round(((index + 1) / quizSize) * 100);

  const choose = (shownIndex: number) => {
    if (!current || locked) return;
    const originalChoice = current.optionOrder[shownIndex];
    const next = [...answers];
    next[index] = originalChoice;
    setAnswers(next);
    setLocked(true);
    track("test_answer", { test_id: test.slug, question_number: index + 1 });

    const nextIndex = Math.min(index + 1, quizSize - 1);
    const stored = JSON.parse(sessionStorage.getItem(sessionKey) ?? "{}");
    sessionStorage.setItem(sessionKey, JSON.stringify({ ...stored, answers: next, index: nextIndex }));

    window.setTimeout(() => {
      setLocked(false);
      if (index < quizSize - 1) {
        setIndex(index + 1);
        return;
      }

      const payload = questions.map((question, questionIndex) => ({
        questionId: question.originalId,
        choice: next[questionIndex],
      }));
      const result = calculateSingerSongQuizResult(questionBank, payload, quizSize);
      localStorage.setItem(recentKey, JSON.stringify(questions.map((question) => question.originalId)));
      sessionStorage.removeItem(sessionKey);
      track("test_complete", {
        test_id: test.slug,
        result_level: result.level,
        score: result.score,
      });
      router.push(`${resultBasePath}/level-${result.level}?r=${encodeSingerSongQuizAnswers(payload)}`);
    }, reduceMotion ? 0 : 220);
  };

  return (
    <main className="fan-quiz-theme fan-quiz-exam-page min-h-[calc(100vh-5rem)] py-6 sm:py-12">
      <div className="container-page mx-auto max-w-2xl">
        <header className="mb-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-black tracking-[.16em]" style={{ color: theme.primary }}>
                {eyebrow}
              </p>
              <h1 className="mt-2 text-xl font-black sm:text-2xl" style={{ color: theme.text }}>
                {localizedTest.title}
              </h1>
            </div>
            <strong
              className="shrink-0 rounded-full bg-white px-3 py-1.5 text-sm shadow-sm"
              style={{ color: theme.mutedText }}
            >
              {index + 1} / {quizSize}
            </strong>
          </div>
          <FanQuizProgress progress={progress} theme={theme} reduceMotion={reduceMotion} />
        </header>

        {!current ? (
          <section
            className="grid min-h-72 place-items-center rounded-lg border bg-white/90 p-10 shadow-xl"
            style={{ borderColor: theme.border, boxShadow: `0 24px 50px ${theme.shadow}` }}
            aria-busy="true"
          >
            <p className="font-bold text-slate-500">{loadingText}</p>
          </section>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={reduceMotion ? false : { opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, x: -20 }}
            >
              <FanQuizQuestionCard
                theme={theme}
                questionNumber={index + 1}
                question={localizeTestText(test.slug, current.prompt, locale)}
                options={current.choices.map((choice, shownIndex) => ({
                  label: choiceBadges[shownIndex],
                  text: localizeTestText(test.slug, choice, locale),
                  selected: selected === current.optionOrder[shownIndex],
                  disabled: locked,
                  onClick: () => choose(shownIndex),
                }))}
              />
            </motion.div>
          </AnimatePresence>
        )}

        <div className="mt-5 flex items-center justify-between gap-4">
          <button
            type="button"
            disabled={index === 0 || locked}
            onClick={() => setIndex((currentIndex) => Math.max(0, currentIndex - 1))}
            className="min-h-12 rounded-md px-4 text-sm font-bold text-slate-500 transition hover:bg-white disabled:opacity-30"
          >
            {t("runner.previousQuestion")}
          </button>
          <p className="text-right text-[11px] leading-5 text-slate-400">{t("runner.answerAtResult")}</p>
        </div>
      </div>
    </main>
  );
}
