"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { FootballTacticsQuestion } from "@/data/football-tactics";
import {
  FOOTBALL_TACTICS_QUIZ_SIZE,
  calculateFootballTacticsResult,
  encodeFootballTacticsAnswers,
  loadRecentFootballTacticsIds,
  pickFootballTacticsQuestions,
  saveRecentFootballTacticsIds,
  shuffleFootballTactics,
} from "@/lib/football-tactics-engine";

type PresentedQuestion = { question: FootballTacticsQuestion; choiceOrder: number[] };
const choiceBadges = ["A", "B", "C", "D"];
const difficultyStyles = {
  2: "border-emerald-200 bg-emerald-50 text-emerald-800",
  3: "border-amber-200 bg-amber-50 text-amber-800",
  4: "border-rose-200 bg-rose-50 text-rose-800",
  5: "border-violet-300 bg-violet-50 text-violet-900",
} as const;

export function FootballTacticsTestPage() {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const [presented, setPresented] = useState<PresentedQuestion[] | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [index, setIndex] = useState(0);
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    const questions = pickFootballTacticsQuestions(loadRecentFootballTacticsIds());
    setPresented(questions.map((question) => ({
      question,
      choiceOrder: shuffleFootballTactics(question.choices.map((_, choiceIndex) => choiceIndex)),
    })));
  }, []);

  const current = presented?.[index];
  const selected = answers[index];
  const progress = Math.round(((index + 1) / FOOTBALL_TACTICS_QUIZ_SIZE) * 100);

  const select = (originalIndex: number) => {
    if (!presented || locked) return;
    const nextAnswers = answers.slice(0, index);
    nextAnswers[index] = originalIndex;
    setAnswers(nextAnswers);
    setLocked(true);
    window.setTimeout(() => {
      setLocked(false);
      if (index < presented.length - 1) {
        setIndex(index + 1);
        return;
      }
      const quizAnswers = presented.map(({ question }, questionIndex) => ({ questionId: question.id, choice: nextAnswers[questionIndex] }));
      const result = calculateFootballTacticsResult(quizAnswers);
      saveRecentFootballTacticsIds(presented.map(({ question }) => question.id));
      router.push(`/football-tactics-test/result/${result.grade.slug}?r=${encodeFootballTacticsAnswers(quizAnswers)}`);
    }, reduceMotion ? 0 : 320);
  };

  return (
    <main className="min-h-[calc(100vh-5rem)] py-6 sm:py-12">
      <div className="container-page mx-auto max-w-2xl">
        <header className="mb-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-black tracking-[.16em] text-[#4267A8]">FOOTBALL TACTICS QUIZ</p>
              <h1 className="mt-2 text-xl font-black text-ink sm:text-2xl">축잘알 퀴즈(전술편)</h1>
            </div>
            <strong className="shrink-0 text-sm text-slate-500">{Math.min(index + 1, FOOTBALL_TACTICS_QUIZ_SIZE)} / {FOOTBALL_TACTICS_QUIZ_SIZE}</strong>
          </div>
          <div className="notebook-progress mt-4 overflow-hidden" role="progressbar" aria-label="퀴즈 진행률" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}>
            <motion.div className="h-full" animate={{ width: `${Math.max(progress, 4)}%` }} transition={{ duration: reduceMotion ? 0 : 0.3 }} />
          </div>
        </header>

        {!current ? (
          <section className="paper-card grid min-h-72 place-items-center p-10" aria-busy="true">
            <div className="text-center"><span className="text-5xl" aria-hidden="true">🧠⚽</span><p className="mt-4 text-sm font-bold text-slate-500">문제은행에서 오늘의 10문제를 뽑는 중...</p></div>
          </section>
        ) : (
          <AnimatePresence mode="wait">
            <motion.section key={current.question.id} initial={reduceMotion ? false : { opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={reduceMotion ? undefined : { opacity: 0, x: -20 }} transition={{ duration: 0.2 }} className="paper-card p-6 sm:p-10">
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-sm bg-[#f4f1df] px-3 py-1.5 text-xs font-black text-[#4267A8]">문제 {index + 1}</span>
                <span className={`shrink-0 rounded-sm border px-3 py-1.5 text-xs font-black ${difficultyStyles[current.question.difficulty]}`}>LV.{current.question.difficulty}</span>
              </div>
              {current.question.image && (
                <div className="relative mt-6 aspect-[16/10] overflow-hidden rounded-sm border border-[#353535]/25 bg-[#f4f1df]">
                  <Image src={current.question.image} alt="문제 상황 전술판" fill sizes="(max-width: 768px) 100vw, 640px" className="object-contain" />
                </div>
              )}
              <h2 className="mt-7 min-h-24 text-balance text-xl font-black leading-[1.55] tracking-tight text-ink sm:text-2xl">{current.question.question}</h2>
              <div className="mt-8 grid gap-2.5" role="radiogroup" aria-label="보기 선택">
                {current.choiceOrder.map((originalIndex, position) => {
                  const isSelected = selected === originalIndex;
                  return (
                    <motion.button key={originalIndex} type="button" role="radio" aria-checked={isSelected} disabled={locked} onClick={() => select(originalIndex)} whileTap={reduceMotion ? undefined : { scale: 0.98 }} className="notebook-option flex min-h-16 items-center gap-4 border px-4 text-left text-sm font-bold leading-6 transition disabled:cursor-wait sm:px-5 sm:text-base">
                      <span className={`grid size-8 shrink-0 place-items-center rounded-sm border text-xs font-black ${isSelected ? "border-[#4267A8] bg-[#4267A8] text-white" : "border-[#353535]/20 bg-[#f4f1df] text-[#4267A8]"}`}>{isSelected ? "✓" : choiceBadges[position]}</span>
                      <span>{current.question.choices[originalIndex]}</span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.section>
          </AnimatePresence>
        )}

        <div className="mt-5 flex items-center justify-between gap-4">
          <button type="button" onClick={() => setIndex((currentIndex) => Math.max(currentIndex - 1, 0))} disabled={index === 0 || !current || locked} className="paper-button min-h-12 bg-[#fffdf6] px-4 text-sm font-bold text-slate-500 disabled:cursor-not-allowed disabled:opacity-30">← 이전 문제</button>
          <p className="text-right text-[11px] leading-5 text-slate-400">LV.5 복합 상황형 최상위 문제만 출제됩니다.<br />응답은 서버에 저장되지 않습니다.</p>
        </div>
      </div>
    </main>
  );
}
