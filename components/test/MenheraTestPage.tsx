"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { MenheraQuestion } from "@/data/menhera-test";
import {
  MENHERA_QUESTION_COUNT,
  calculateMenheraResult,
  encodeMenheraAnswers,
  loadRecentMenheraIds,
  pickMenheraQuestions,
  saveRecentMenheraIds,
  shuffleMenheraOptions,
  type MenheraAnswer,
} from "@/lib/menhera-engine";

const badges = ["A", "B", "C", "D"];

export function MenheraTestPage() {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const lockRef = useRef(false);
  const [questions, setQuestions] = useState<MenheraQuestion[]>([]);
  const [answers, setAnswers] = useState<MenheraAnswer[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setQuestions(pickMenheraQuestions(loadRecentMenheraIds()).map(shuffleMenheraOptions));
  }, []);

  const current = questions[index];
  const selected = answers[index]?.value;
  const progress = Math.round(((index + 1) / MENHERA_QUESTION_COUNT) * 100);

  const select = (value: number) => {
    if (!current || lockRef.current) return;
    lockRef.current = true;
    const nextAnswers = answers.slice(0, index);
    nextAnswers[index] = { questionId: current.id, value };
    setAnswers(nextAnswers);
    window.setTimeout(() => {
      lockRef.current = false;
      if (nextAnswers.length === MENHERA_QUESTION_COUNT) {
        const result = calculateMenheraResult(nextAnswers);
        saveRecentMenheraIds(questions.map((question) => question.id));
        router.push(`/menhera-test/result/${result.level.slug}?a=${encodeMenheraAnswers(nextAnswers)}`);
      } else {
        setIndex(nextAnswers.length);
      }
    }, reduceMotion ? 0 : 240);
  };

  return (
    <main className="min-h-[calc(100vh-5rem)] bg-[radial-gradient(circle_at_top,#fce7f3_0,#fdf2f8_30%,#fffdf6_100%)] py-6 sm:py-12">
      <div className="container-page mx-auto max-w-2xl">
        <header className="mb-6">
          <div className="flex items-end justify-between gap-4">
            <div><p className="text-xs font-black tracking-[.16em] text-pink-600">MENHERA TENDENCY TEST</p><h1 className="mt-2 text-xl font-black text-ink sm:text-2xl">나는 멘헤라일까?</h1></div>
            <strong className="shrink-0 text-sm text-slate-500">{Math.min(index + 1, MENHERA_QUESTION_COUNT)} / {MENHERA_QUESTION_COUNT}</strong>
          </div>
          <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-white shadow-inner" role="progressbar" aria-label="테스트 진행률" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}>
            <motion.div className="h-full rounded-full bg-gradient-to-r from-fuchsia-500 via-pink-500 to-rose-400" animate={{ width: `${Math.max(progress, 4)}%` }} transition={{ duration: reduceMotion ? 0 : 0.3 }} />
          </div>
          <p className="mt-3 rounded-xl border border-pink-100 bg-white/80 px-4 py-2.5 text-xs font-bold leading-5 text-pink-800">정답은 없습니다. 연애·썸·친구 등 가까운 관계에서 실제 내 모습과 가장 비슷한 선택지를 골라주세요.</p>
        </header>

        <AnimatePresence mode="wait">
          <motion.section key={current?.id ?? "loading"} initial={reduceMotion ? false : { opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }} exit={reduceMotion ? undefined : { opacity: 0, x: -24 }} transition={{ duration: 0.2 }} className="rounded-[2rem] border border-white/90 bg-white/95 p-6 shadow-2xl shadow-pink-100/60 backdrop-blur sm:p-10">
            {!current ? (
              <div className="py-20 text-center"><span className="text-5xl" aria-hidden="true">💗🫧</span><p className="mt-4 text-sm font-bold text-slate-500">5개 영역에서 오늘의 10문제를 고르는 중...</p></div>
            ) : (
              <>
                <span className="rounded-full bg-pink-50 px-3 py-1.5 text-xs font-black text-pink-700">상황 {index + 1}</span>
                <h2 className="mt-6 min-h-24 text-balance text-xl font-black leading-[1.5] tracking-tight text-ink sm:text-2xl">{current.text}</h2>
                <p className="mt-1 text-sm font-semibold text-slate-500">이때 나와 가장 가까운 반응은?</p>
                <div className="mt-7 grid gap-2.5" role="radiogroup" aria-label="답변 선택">
                  {current.options.map((option, optionIndex) => (
                    <motion.button key={`${option.value}-${option.label}`} type="button" role="radio" aria-checked={selected === option.value} onClick={() => select(option.value)} whileTap={reduceMotion ? undefined : { scale: 0.98 }} className={`flex min-h-16 items-center gap-4 rounded-2xl border px-4 py-3 text-left text-sm font-bold leading-6 transition sm:px-5 ${selected === option.value ? "border-pink-500 bg-pink-50 text-pink-900 shadow-md" : "border-slate-200 bg-white text-slate-700 hover:border-pink-300 hover:bg-pink-50/50"}`}>
                      <span className={`grid size-8 shrink-0 place-items-center rounded-full text-xs font-black ${selected === option.value ? "bg-pink-600 text-white" : "bg-slate-100 text-slate-500"}`}>{badges[optionIndex]}</span>
                      {option.label}
                    </motion.button>
                  ))}
                </div>
              </>
            )}
          </motion.section>
        </AnimatePresence>

        <div className="mt-5 flex items-center justify-between gap-4">
          <button type="button" onClick={() => setIndex((value) => Math.max(0, value - 1))} disabled={index === 0 || !current} className="min-h-12 rounded-xl px-4 text-sm font-bold text-slate-500 transition hover:bg-white disabled:opacity-30">← 이전 질문</button>
          <p className="text-right text-[11px] leading-5 text-slate-400">문항 의도와 점수 순서는 표시되지 않습니다.<br />응답은 서버에 저장되지 않습니다.</p>
        </div>
      </div>
    </main>
  );
}
