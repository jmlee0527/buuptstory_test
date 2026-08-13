"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { iceCreamQuestions } from "@/data/icecream-personality";
import { calculateIceCreamResult, encodeIceCreamAnswers } from "@/lib/icecream-personality-engine";

const badges = ["A", "B", "C", "D"];

export function IceCreamPersonalityTestPage() {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const [answers, setAnswers] = useState<number[]>([]);
  const [index, setIndex] = useState(0);
  const [locked, setLocked] = useState(false);
  const question = iceCreamQuestions[index];
  const selected = answers[index];
  const progress = Math.round(((index + 1) / iceCreamQuestions.length) * 100);

  const select = (optionIndex: number) => {
    if (locked) return;
    const nextAnswers = answers.slice(0, index);
    nextAnswers[index] = optionIndex;
    setAnswers(nextAnswers);
    setLocked(true);
    window.setTimeout(() => {
      setLocked(false);
      if (index < iceCreamQuestions.length - 1) {
        setIndex(index + 1);
        return;
      }
      const result = calculateIceCreamResult(nextAnswers);
      router.push(`/icecream-personality-test/result/${result.profile.slug}?answers=${encodeIceCreamAnswers(nextAnswers)}`);
    }, reduceMotion ? 0 : 280);
  };

  return (
    <main className="min-h-[calc(100vh-5rem)] bg-[radial-gradient(circle_at_top,#fff1f2_0,#fffdf6_42%,#fffdf6_100%)] py-6 sm:py-12">
      <div className="container-page mx-auto max-w-2xl">
        <header className="mb-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-black tracking-[.16em] text-rose-500">ICE CREAM PERSONALITY</p>
              <h1 className="mt-2 text-xl font-black text-ink sm:text-2xl">나는 어떤 아이스크림일까?</h1>
            </div>
            <strong className="shrink-0 text-sm text-slate-500">{index + 1} / {iceCreamQuestions.length}</strong>
          </div>
          <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-rose-100" role="progressbar" aria-label="테스트 진행률" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}>
            <motion.div className="h-full rounded-full bg-gradient-to-r from-rose-400 via-pink-500 to-orange-400" animate={{ width: `${progress}%` }} transition={{ duration: reduceMotion ? 0 : 0.25 }} />
          </div>
        </header>

        <AnimatePresence mode="wait">
          <motion.section key={question.id} initial={reduceMotion ? false : { opacity: 0, x: 22 }} animate={{ opacity: 1, x: 0 }} exit={reduceMotion ? undefined : { opacity: 0, x: -18 }} transition={{ duration: 0.18 }} className="paper-card p-6 sm:p-10">
            <span className="rounded-sm bg-rose-50 px-3 py-1.5 text-xs font-black text-rose-600">QUESTION {index + 1}</span>
            <h2 className="mt-7 min-h-24 text-balance text-xl font-black leading-[1.55] tracking-tight text-ink sm:text-2xl">{question.text}</h2>
            <div className="mt-8 grid gap-2.5" role="radiogroup" aria-label="보기 선택">
              {question.options.map((option, optionIndex) => {
                const isSelected = selected === optionIndex;
                return (
                  <motion.button key={option.text} type="button" role="radio" aria-checked={isSelected} disabled={locked} onClick={() => select(optionIndex)} whileTap={reduceMotion ? undefined : { scale: 0.98 }} className={`flex min-h-16 items-center gap-4 rounded-xl border px-4 text-left text-sm font-bold leading-6 transition disabled:cursor-wait sm:px-5 sm:text-base ${isSelected ? "border-rose-400 bg-rose-50 text-rose-950 shadow-sm" : "border-slate-200 bg-white text-slate-700 hover:border-rose-200 hover:bg-rose-50/50"}`}>
                    <span className={`grid size-8 shrink-0 place-items-center rounded-full border text-xs font-black ${isSelected ? "border-rose-500 bg-rose-500 text-white" : "border-slate-200 bg-[#fffdf6] text-rose-500"}`}>{isSelected ? "✓" : badges[optionIndex]}</span>
                    <span>{option.text}</span>
                  </motion.button>
                );
              })}
            </div>
          </motion.section>
        </AnimatePresence>

        <div className="mt-5 flex items-center justify-between gap-4">
          <button type="button" onClick={() => setIndex((value) => Math.max(0, value - 1))} disabled={index === 0 || locked} className="paper-button min-h-12 bg-[#fffdf6] px-4 text-sm font-bold text-slate-600 disabled:cursor-not-allowed disabled:opacity-30">← 이전 문제</button>
          <p className="text-right text-[11px] leading-5 text-slate-400">12개 답변으로 6가지 성향을 비교해요.<br />응답은 서버에 저장되지 않습니다.</p>
        </div>
      </div>
    </main>
  );
}
