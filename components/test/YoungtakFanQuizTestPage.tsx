"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  YOUNGTAK_FAN_QUIZ_SIZE,
  calculateYoungtakFanIndex,
  encodeYoungtakAnswers,
  loadRecentYoungtakQuestionIds,
  saveRecentYoungtakQuestionIds,
  selectYoungtakQuestions,
} from "@/lib/youngtak-fan-engine";
import type { YoungtakPresentedQuestion } from "@/lib/types";

const choiceBadges = ["A", "B", "C", "D"];

export function YoungtakFanQuizTestPage() {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const [questions, setQuestions] = useState<YoungtakPresentedQuestion[] | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [index, setIndex] = useState(0);
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    setQuestions(selectYoungtakQuestions(undefined, loadRecentYoungtakQuestionIds()));
  }, []);

  const current = questions?.[index];
  const selected = answers[index];
  const progress = Math.round(((index + 1) / YOUNGTAK_FAN_QUIZ_SIZE) * 100);

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
      const result = calculateYoungtakFanIndex(quizAnswers);
      saveRecentYoungtakQuestionIds(questions.map((question) => question.originalId));
      router.push(`/youngtak-fan-test/result/${result.grade.slug}?r=${encodeYoungtakAnswers(quizAnswers)}`);
    }, reduceMotion ? 0 : 240);
  };

  return (
    <main className="fan-quiz-theme fan-quiz-exam-page min-h-[calc(100vh-5rem)] py-6 sm:py-12">
      <div className="container-page mx-auto max-w-2xl">
        <header className="mb-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-black tracking-[.16em] text-pink-600">YOUNGTAK FAN INDEX QUIZ</p>
              <h1 className="mt-2 text-xl font-black text-ink sm:text-2xl">영탁 팬 퀴즈</h1>
            </div>
            <strong className="shrink-0 text-sm text-slate-500">{Math.min(index + 1, YOUNGTAK_FAN_QUIZ_SIZE)} / {YOUNGTAK_FAN_QUIZ_SIZE}</strong>
          </div>
          <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-white shadow-inner" role="progressbar" aria-label="퀴즈 진행률" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}>
            <motion.div className="h-full rounded-full bg-gradient-to-r from-pink-500 via-fuchsia-500 to-amber-400" animate={{ width: `${Math.max(progress, 4)}%` }} transition={{ duration: reduceMotion ? 0 : 0.35 }} />
          </div>
        </header>

        {!current ? (
          <section className="grid min-h-72 place-items-center rounded-[2rem] border border-white/90 bg-white/90 p-10 shadow-2xl shadow-pink-100/60" aria-busy="true">
            <div className="text-center">
              <span className="text-5xl" aria-hidden="true">🎤</span>
              <p className="mt-4 text-sm font-bold text-slate-500">60문항 문제은행에서 오늘의 15문제를 뽑는 중...</p>
            </div>
          </section>
        ) : (
          <AnimatePresence mode="wait">
            <motion.section data-question-number={index + 1} key={current.id} initial={reduceMotion ? false : { opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }} exit={reduceMotion ? undefined : { opacity: 0, x: -24 }} transition={{ duration: 0.22 }} className="rounded-[2rem] border border-white/90 bg-white/95 p-6 shadow-2xl shadow-pink-100/60 backdrop-blur sm:p-10">
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full bg-pink-50 px-3 py-1.5 text-xs font-black text-pink-700">문제 {index + 1}</span>
              </div>
              <p className="mt-7 text-sm font-black tracking-[.16em] text-pink-600">YOUNGTAK QUIZ</p>
              <h2 className="mt-3 text-balance text-2xl font-black leading-[1.35] tracking-tight text-ink sm:text-3xl">{current.question}</h2>
              <div className="mt-8 grid gap-2.5" role="radiogroup" aria-label="정답 선택">
                {current.options.map((option, choiceIndex) => {
                  const isSelected = selected === current.optionOrder[choiceIndex];
                  return (
                    <motion.button
                      key={option}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      aria-label={`${choiceBadges[choiceIndex]}번 보기: ${option}`}
                      onClick={() => select(choiceIndex)}
                      disabled={locked}
                      whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                      animate={isSelected && !reduceMotion ? { scale: [1, 1.02, 1] } : undefined}
                      transition={{ duration: 0.2 }}
                      className={`flex min-h-16 items-center gap-4 rounded-2xl border px-4 text-left text-base font-black transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-500 disabled:cursor-wait sm:px-5 ${isSelected ? "border-pink-500 bg-pink-50 text-pink-800 shadow-md" : "border-slate-200 bg-white text-slate-700 hover:border-pink-300 hover:bg-pink-50/50"}`}
                    >
                      <span className={`grid size-9 shrink-0 place-items-center rounded-full text-xs font-black ${isSelected ? "bg-pink-600 text-white" : "bg-slate-100 text-slate-500"}`}>{choiceBadges[choiceIndex]}</span>
                      {option}
                    </motion.button>
                  );
                })}
              </div>
            </motion.section>
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
