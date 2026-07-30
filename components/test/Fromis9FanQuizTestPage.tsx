"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FanQuizProgress } from "@/components/fan-quiz/FanQuizProgress";
import { FanQuizQuestionCard } from "@/components/fan-quiz/FanQuizQuestionCard";
import { fromis9FanTest } from "@/data/fromis9-fan";
import { getTestFanQuizTheme } from "@/config/fanQuizThemes";
import {
  FROMIS9_FAN_QUIZ_SIZE,
  calculateFromis9FanResult,
  encodeFromis9Answers,
  loadRecentFromis9QuestionIds,
  saveRecentFromis9QuestionIds,
  selectFromis9Questions,
} from "@/lib/fromis9-fan-engine";
import type { Fromis9PresentedQuestion } from "@/lib/types";

const choiceBadges = ["A", "B", "C", "D"];

export function Fromis9FanQuizTestPage() {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const [questions, setQuestions] = useState<Fromis9PresentedQuestion[] | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [index, setIndex] = useState(0);
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    setQuestions(selectFromis9Questions(loadRecentFromis9QuestionIds()));
  }, []);

  const current = questions?.[index];
  const selected = answers[index];
  const progress = Math.round(((index + 1) / FROMIS9_FAN_QUIZ_SIZE) * 100);
  const theme = getTestFanQuizTheme(fromis9FanTest);

  const select = (choiceIndex: number) => {
    if (!questions || !current || locked) return;
    const originalChoiceIndex = current.optionOrder[choiceIndex];
    const nextAnswers = answers.slice(0, index);
    nextAnswers[index] = originalChoiceIndex;
    setAnswers(nextAnswers);
    setLocked(true);
    window.setTimeout(() => {
      setLocked(false);
      if (index < questions.length - 1) {
        setIndex(index + 1);
        return;
      }
      const quizAnswers = questions.map((question, questionIndex) => ({
        questionId: question.originalId,
        choice: nextAnswers[questionIndex],
      }));
      const result = calculateFromis9FanResult(quizAnswers);
      saveRecentFromis9QuestionIds(questions.map((question) => question.originalId));
      router.push(`/fromis9-fan-test/result/${result.grade.slug}?r=${encodeFromis9Answers(quizAnswers)}`);
    }, reduceMotion ? 0 : 260);
  };

  return (
    <main
      className="fan-quiz-theme fan-quiz-exam-page min-h-[calc(100vh-5rem)] py-6 sm:py-12"
    >
      <div className="container-page mx-auto max-w-2xl">
        <header className="mb-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-black tracking-[.16em]" style={{ color: theme.primary }}>{theme.label}</p>
              <h1 className="mt-2 text-xl font-black sm:text-2xl" style={{ color: theme.text }}>나는 진짜 플로버일까?</h1>
            </div>
            <strong className="shrink-0 rounded-full bg-white px-3 py-1.5 text-sm shadow-sm" style={{ color: theme.mutedText }}>{Math.min(index + 1, FROMIS9_FAN_QUIZ_SIZE)} / {FROMIS9_FAN_QUIZ_SIZE}</strong>
          </div>
          <FanQuizProgress progress={progress} theme={theme} reduceMotion={reduceMotion} />
        </header>

        {!current ? (
          <section className="grid min-h-72 place-items-center rounded-[2rem] border bg-white/90 p-10 shadow-2xl" style={{ borderColor: theme.border, boxShadow: `0 24px 50px ${theme.shadow}` }} aria-busy="true">
            <div className="text-center">
              <span className="text-5xl" aria-hidden="true">{fromis9FanTest.icon}</span>
              <p className="mt-4 text-sm font-bold text-slate-500">60개 문제은행에서 오늘의 15문제를 뽑는 중...</p>
            </div>
          </section>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div key={current.id} initial={reduceMotion ? false : { opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }} exit={reduceMotion ? undefined : { opacity: 0, x: -24 }} transition={{ duration: 0.22 }}>
              <FanQuizQuestionCard
                theme={theme}
                questionNumber={index + 1}
                question={current.question}
                options={current.choices.map((option, choiceIndex) => ({
                  label: choiceBadges[choiceIndex],
                  text: option,
                  selected: selected === current.optionOrder[choiceIndex],
                  disabled: locked,
                  onClick: () => select(choiceIndex),
                }))}
              />
            </motion.div>
          </AnimatePresence>
        )}

        <div className="mt-5 flex items-center justify-between gap-4">
          <button type="button" onClick={() => setIndex((currentIndex) => Math.max(currentIndex - 1, 0))} disabled={index === 0 || !current || locked} className="min-h-12 rounded-xl px-4 text-sm font-bold text-slate-500 transition hover:bg-white disabled:opacity-30">← 이전 문제</button>
          <p className="text-right text-[11px] leading-5 text-slate-400">본 퀴즈는 비공식 팬 콘텐츠입니다.</p>
        </div>
      </div>
    </main>
  );
}
