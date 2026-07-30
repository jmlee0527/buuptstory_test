"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FanQuizProgress } from "@/components/fan-quiz/FanQuizProgress";
import { FanQuizQuestionCard } from "@/components/fan-quiz/FanQuizQuestionCard";
import { NCT_DREAM_QUIZ_SIZE, nctDreamFanTest } from "@/data/nct-dream-fan";
import { getTestFanQuizTheme } from "@/config/fanQuizThemes";
import { calculateNctDreamResult, createNctDreamSession, encodeNctDreamAnswers } from "@/lib/nct-dream-fan-engine";
import type { NctDreamPresentedQuestion } from "@/lib/nct-dream-fan-engine";

const SESSION_KEY = "mimi-nct-dream-true-fan-session";
const RECENT_KEY = "mimi-nct-dream-true-fan-recent";
const choiceBadges = ["A", "B", "C", "D"];

const track = (event: string, params?: Record<string, string | number>) =>
  typeof window !== "undefined" && (window as Window & { gtag?: (command: string, event: string, params?: Record<string, unknown>) => void }).gtag?.("event", event, params);

const newSeed = () => `${Date.now()}-${Math.random().toString(36).slice(2)}`;

export function NctDreamFanQuizTestPage() {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const theme = getTestFanQuizTheme(nctDreamFanTest);
  const [questions, setQuestions] = useState<NctDreamPresentedQuestion[]>([]);
  const [answers, setAnswers] = useState<number[]>([]);
  const [index, setIndex] = useState(0);
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    let recent: string[] = [];
    try {
      recent = JSON.parse(localStorage.getItem(RECENT_KEY) ?? "[]");
    } catch {}

    const seed = newSeed();
    const initialAnswers: number[] = [];
    const initialIndex = 0;
    setQuestions(createNctDreamSession(seed, Array.isArray(recent) ? recent : []));
    setAnswers(initialAnswers);
    setIndex(initialIndex);
    sessionStorage.setItem(SESSION_KEY, JSON.stringify({ seed, answers: initialAnswers, index: initialIndex }));
    track("test_start", { test_id: "nct-dream-true-fan-test", category: "fan_quiz" });
  }, []);

  const current = questions[index];
  const selected = answers[index];
  const progress = Math.round(((index + 1) / NCT_DREAM_QUIZ_SIZE) * 100);

  const choose = (shownIndex: number) => {
    if (!current || locked) return;
    const originalChoice = current.optionOrder[shownIndex];
    const next = [...answers];
    next[index] = originalChoice;
    setAnswers(next);
    setLocked(true);
    track("test_answer", { test_id: "nct-dream-true-fan-test", question_number: index + 1 });

    const nextIndex = Math.min(index + 1, NCT_DREAM_QUIZ_SIZE - 1);
    const stored = JSON.parse(sessionStorage.getItem(SESSION_KEY) ?? "{}");
    sessionStorage.setItem(SESSION_KEY, JSON.stringify({ ...stored, answers: next, index: nextIndex }));

    window.setTimeout(() => {
      setLocked(false);
      if (index < NCT_DREAM_QUIZ_SIZE - 1) {
        setIndex(index + 1);
        return;
      }

      const payload = questions.map((question, questionIndex) => ({
        questionId: question.originalId,
        choice: next[questionIndex],
      }));
      const result = calculateNctDreamResult(payload);
      localStorage.setItem(RECENT_KEY, JSON.stringify(questions.map((question) => question.originalId)));
      track("test_complete", { test_id: "nct-dream-true-fan-test", result_level: result.grade.slug, score: result.score });
      router.push(`/nct-dream-true-fan-test/result/${result.grade.slug}?r=${encodeNctDreamAnswers(payload)}`);
    }, reduceMotion ? 0 : 220);
  };

  return (
    <main className="fan-quiz-theme fan-quiz-exam-page min-h-[calc(100vh-5rem)] py-6 sm:py-12">
      <div className="container-page mx-auto max-w-2xl">
        <header className="mb-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-black tracking-[.16em]" style={{ color: theme.primary }}>{theme.label}</p>
              <h1 className="mt-2 text-xl font-black sm:text-2xl" style={{ color: theme.text }}>NCT DREAM 팬 퀴즈</h1>
            </div>
            <strong className="shrink-0 rounded-full bg-white px-3 py-1.5 text-sm shadow-sm" style={{ color: theme.mutedText }}>{index + 1} / {NCT_DREAM_QUIZ_SIZE}</strong>
          </div>
          <FanQuizProgress progress={progress} theme={theme} reduceMotion={reduceMotion} />
        </header>

        {!current ? (
          <section className="grid min-h-72 place-items-center rounded-[2rem] border bg-white/90 p-10 shadow-2xl" style={{ borderColor: theme.border, boxShadow: `0 24px 50px ${theme.shadow}` }} aria-busy="true">
            <p className="font-bold text-slate-500">{nctDreamFanTest.icon} 검증된 문제를 구성하는 중...</p>
          </section>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div key={current.id} initial={reduceMotion ? false : { opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={reduceMotion ? undefined : { opacity: 0, x: -20 }}>
              <FanQuizQuestionCard
                theme={theme}
                questionNumber={index + 1}
                question={current.prompt}
                options={current.choices.map((choice, shownIndex) => ({
                  label: choiceBadges[shownIndex],
                  text: choice,
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
            onClick={() => {
              const next = Math.max(0, index - 1);
              setIndex(next);
              const stored = JSON.parse(sessionStorage.getItem(SESSION_KEY) ?? "{}");
              sessionStorage.setItem(SESSION_KEY, JSON.stringify({ ...stored, answers, index: next }));
            }}
            className="min-h-12 rounded-xl px-4 text-sm font-bold text-slate-500 transition hover:bg-white disabled:opacity-30"
          >
            ← 이전 문제
          </button>
          <p className="text-right text-[11px] leading-5 text-slate-400">정답은 제출 후 공개됩니다.</p>
        </div>
      </div>
    </main>
  );
}
