"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FanQuizProgress } from "@/components/fan-quiz/FanQuizProgress";
import { FanQuizQuestionCard } from "@/components/fan-quiz/FanQuizQuestionCard";
import { getTestFanQuizTheme } from "@/config/fanQuizThemes";
import { JUNGKOOK_QUIZ_SIZE, jungkookFanTest } from "@/data/jungkook-fan";
import {
  calculateJungkookResult,
  createJungkookSession,
  encodeJungkookAnswers,
} from "@/lib/jungkook-fan-engine";
import type { JungkookPresentedQuestion } from "@/lib/jungkook-fan-engine";

const SESSION_KEY = "mimi-bts-jungkook-true-fan-session";
const RECENT_KEY = "mimi-bts-jungkook-true-fan-recent";
const choiceBadges = ["A", "B", "C", "D"];

const track = (event: string, params?: Record<string, string | number>) =>
  typeof window !== "undefined" &&
  (window as Window & { gtag?: (command: string, event: string, params?: Record<string, unknown>) => void })
    .gtag?.("event", event, params);

const newSeed = () => `${Date.now()}-${Math.random().toString(36).slice(2)}`;

export function JungkookFanQuizTestPage() {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const theme = getTestFanQuizTheme(jungkookFanTest);
  const [questions, setQuestions] = useState<JungkookPresentedQuestion[]>([]);
  const [answers, setAnswers] = useState<number[]>([]);
  const [index, setIndex] = useState(0);
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    let recent: number[] = [];
    try {
      recent = JSON.parse(localStorage.getItem(RECENT_KEY) ?? "[]");
    } catch {}

    const seed = newSeed();
    setQuestions(createJungkookSession(seed, Array.isArray(recent) ? recent : []));
    setAnswers([]);
    setIndex(0);
    sessionStorage.setItem(SESSION_KEY, JSON.stringify({ seed, answers: [], index: 0 }));
    track("test_start", { test_id: jungkookFanTest.slug, category: "fan_quiz" });
  }, []);

  const current = questions[index];
  const selected = answers[index];
  const progress = Math.round(((index + 1) / JUNGKOOK_QUIZ_SIZE) * 100);

  const choose = (shownIndex: number) => {
    if (!current || locked) return;
    const originalChoice = current.optionOrder[shownIndex];
    const next = [...answers];
    next[index] = originalChoice;
    setAnswers(next);
    setLocked(true);
    track("test_answer", { test_id: jungkookFanTest.slug, question_number: index + 1 });

    const nextIndex = Math.min(index + 1, JUNGKOOK_QUIZ_SIZE - 1);
    const stored = JSON.parse(sessionStorage.getItem(SESSION_KEY) ?? "{}");
    sessionStorage.setItem(SESSION_KEY, JSON.stringify({ ...stored, answers: next, index: nextIndex }));

    window.setTimeout(() => {
      setLocked(false);
      if (index < JUNGKOOK_QUIZ_SIZE - 1) {
        setIndex(index + 1);
        return;
      }

      const payload = questions.map((question, questionIndex) => ({
        questionId: question.originalId,
        choice: next[questionIndex],
      }));
      const result = calculateJungkookResult(payload);
      localStorage.setItem(RECENT_KEY, JSON.stringify(questions.map((question) => question.originalId)));
      sessionStorage.removeItem(SESSION_KEY);
      track("test_complete", { test_id: jungkookFanTest.slug, result_level: result.grade.slug, score: result.score });
      router.push(`/bts-jungkook-true-fan-test/result/${result.grade.slug}?r=${encodeJungkookAnswers(payload)}`);
    }, reduceMotion ? 0 : 220);
  };

  return (
    <main className="fan-quiz-theme fan-quiz-exam-page min-h-[calc(100vh-5rem)] py-6 sm:py-12">
      <div className="container-page mx-auto max-w-2xl">
        <header className="mb-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-black tracking-[.16em]" style={{ color: theme.primary }}>BTS JUNG KOOK TRUE FAN QUIZ</p>
              <h1 className="mt-2 text-xl font-black sm:text-2xl" style={{ color: theme.text }}>BTS 정국 팬 퀴즈</h1>
            </div>
            <strong className="shrink-0 rounded-full bg-white px-3 py-1.5 text-sm shadow-sm" style={{ color: theme.mutedText }}>
              {index + 1} / {JUNGKOOK_QUIZ_SIZE}
            </strong>
          </div>
          <FanQuizProgress progress={progress} theme={theme} reduceMotion={reduceMotion} />
        </header>

        {!current ? (
          <section className="grid min-h-72 place-items-center rounded-[2rem] border bg-white/90 p-10 shadow-2xl" style={{ borderColor: theme.border, boxShadow: `0 24px 50px ${theme.shadow}` }} aria-busy="true">
            <p className="font-bold text-slate-500">검증된 정국 퀴즈를 구성하는 중...</p>
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
          <p className="text-right text-[11px] leading-5 text-slate-400">정답은 결과에서 공개됩니다.</p>
        </div>
      </div>
    </main>
  );
}
