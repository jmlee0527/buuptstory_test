"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ATEEZ_QUIZ_SIZE } from "@/data/ateez-fan";
import { calculateAteezResult, createAteezSession, encodeAteezAnswers } from "@/lib/ateez-fan-engine";
import type { AteezPresentedQuestion } from "@/lib/ateez-fan-engine";

const SESSION_KEY = "mimi-ateez-true-fan-test-session";
const badges = ["A", "B", "C", "D"];

function newSeed() { return `${Date.now()}-${Math.random().toString(36).slice(2)}`; }

export function AteezFanQuizTestPage() {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const [questions, setQuestions] = useState<AteezPresentedQuestion[]>([]);
  const [answers, setAnswers] = useState<number[]>([]);
  const [index, setIndex] = useState(0);
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    const seed = newSeed();
    setQuestions(createAteezSession(seed));
    setAnswers([]);
    setIndex(0);
    window.sessionStorage.setItem(SESSION_KEY, JSON.stringify({ seed, answers: [], index: 0 }));
  }, []);

  const current = questions[index];
  const selected = answers[index];
  const progress = Math.round(((index + 1) / ATEEZ_QUIZ_SIZE) * 100);

  const choose = (shownIndex: number) => {
    if (!current || locked) return;
    const originalChoice = current.optionOrder[shownIndex];
    const nextAnswers = answers.slice();
    nextAnswers[index] = originalChoice;
    setAnswers(nextAnswers);
    setLocked(true);
    const nextIndex = Math.min(index + 1, ATEEZ_QUIZ_SIZE - 1);
    const stored = JSON.parse(window.sessionStorage.getItem(SESSION_KEY) ?? "{}");
    window.sessionStorage.setItem(SESSION_KEY, JSON.stringify({ ...stored, answers: nextAnswers, index: nextIndex }));
    window.setTimeout(() => {
      setLocked(false);
      if (index < ATEEZ_QUIZ_SIZE - 1) return setIndex(index + 1);
      const payload = questions.map((question, questionIndex) => ({ questionId: question.originalId, choice: nextAnswers[questionIndex] }));
      const result = calculateAteezResult(payload);
      router.push(`/ateez-true-fan-test/result/${result.grade.slug}?r=${encodeAteezAnswers(payload)}`);
    }, reduceMotion ? 0 : 220);
  };

  return <main className="fan-quiz-theme fan-quiz-exam-page min-h-[calc(100vh-5rem)] py-6 sm:py-12">
    <div className="container-page mx-auto max-w-2xl">
      <header className="mb-6">
        <div className="flex items-end justify-between gap-4"><div><p className="text-xs font-black tracking-[.16em] text-violet-600">ATEEZ TRUE FAN QUIZ</p><h1 className="mt-2 text-xl font-black text-ink sm:text-2xl">ATEEZ 팬 퀴즈</h1></div><strong className="text-sm text-slate-500">{index + 1} / 15</strong></div>
        <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-white shadow-inner" role="progressbar" aria-label="퀴즈 진행률" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}><motion.div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-rose-400" animate={{ width: `${progress}%` }} /></div>
      </header>
      {!current ? <section className="grid min-h-72 place-items-center rounded-[2rem] bg-white p-10 shadow-xl" aria-busy="true"><p className="font-bold text-slate-500">💎 검증된 문제를 구성하는 중...</p></section> :
      <AnimatePresence mode="wait"><motion.section data-question-number={index + 1} key={current.id} initial={reduceMotion ? false : { opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="rounded-[2rem] border border-white bg-white/95 p-6 shadow-2xl sm:p-10">
        <div className="flex justify-between gap-3"><span className="rounded-full bg-violet-50 px-3 py-1.5 text-xs font-black text-violet-700">{current.category}</span></div>
        <h2 className="mt-7 text-balance text-2xl font-black leading-[1.4] text-ink sm:text-3xl">{current.prompt}</h2>
        <div className="mt-8 grid gap-3" role="radiogroup" aria-label="정답 선택">{current.choices.map((choice, shownIndex) => { const active = selected === current.optionOrder[shownIndex]; return <motion.button key={`${current.id}-${shownIndex}`} type="button" role="radio" aria-checked={active} aria-label={`${badges[shownIndex]}번 보기: ${choice}`} disabled={locked} onClick={() => choose(shownIndex)} whileTap={reduceMotion ? undefined : { scale: .98 }} className={`flex min-h-16 items-center gap-4 rounded-2xl border px-4 text-left font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 ${active ? "border-violet-400 bg-violet-50 text-violet-950" : "border-slate-200 bg-white text-slate-700 hover:border-violet-300"}`}><span className={`grid size-9 shrink-0 place-items-center rounded-full text-xs font-black ${active ? "bg-violet-600 text-white" : "bg-slate-100 text-slate-500"}`}>{badges[shownIndex]}</span>{choice}</motion.button>; })}</div>
      </motion.section></AnimatePresence>}
      <div className="mt-5 flex items-center justify-between gap-4"><button type="button" disabled={index === 0 || locked} onClick={() => { const next = Math.max(0, index - 1); setIndex(next); const stored = JSON.parse(window.sessionStorage.getItem(SESSION_KEY) ?? "{}"); window.sessionStorage.setItem(SESSION_KEY, JSON.stringify({ ...stored, answers, index: next })); }} className="min-h-12 rounded-xl px-4 text-sm font-bold text-slate-500 disabled:opacity-30">← 이전 문제</button><p className="text-right text-[11px] leading-5 text-slate-400">정답은 제출 후 공개됩니다.</p></div>
    </div>
  </main>;
}
