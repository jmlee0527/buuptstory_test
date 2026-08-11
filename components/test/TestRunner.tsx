"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { TestDefinition } from "@/lib/types";
import { calculateResults, serializeAnswers } from "@/lib/test-engine";
import { calculateOfficeAnimalResults } from "@/lib/office-animal-engine";
import { calculateMarriageResult } from "@/lib/marriage-engine";
import { calculateKkondaeResult, serializeKkondaeAnswers } from "@/lib/kkondae-engine";
import { calculateJoseonDestinyResult, serializeJoseonAnswers } from "@/lib/joseon-destiny-engine";
import { calculatePersonalityCountryResult, serializeCountryAnswers } from "@/lib/personality-country-engine";
import { calculateColorPersonalityResult, serializeColorPersonalityAnswers } from "@/lib/color-personality-engine";
import { calculateEnneagramResult, serializeEnneagramAnswers } from "@/lib/enneagram-engine";
import { calculateLoverResult, serializeLoverAnswers } from "@/lib/lover-score-engine";
import { calculateEqScores, serializeEqAnswers } from "@/lib/eq-engine";
import { calculateBigFiveScores, serializeBigFiveAnswers } from "@/lib/big-five-engine";
import { calculateWizardCharacterResult, serializeWizardCharacterAnswers } from "@/lib/wizard-character-engine";
import { calculateCoffeeBrandResult, serializeCoffeeBrandAnswers } from "@/lib/coffee-brand-engine";
import { calculateSelfEsteemResult, serializeSelfEsteemAnswers } from "@/lib/self-esteem-engine";
import { calculateAdhdResult, serializeAdhdAnswers } from "@/lib/adhd-screening-engine";
import { calculateDementiaResult, serializeDementiaAnswers } from "@/lib/dementia-risk-engine";
import { calculateLoverFruitResult, serializeLoverFruitAnswers } from "@/lib/lover-fruit-engine";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { localizeTest } from "@/lib/test-i18n";

export function TestRunner({ test, currentAge }: { test: TestDefinition; currentAge?: number }) {
  const router = useRouter();
  const { locale, t } = useLanguage();
  const localizedTest = localizeTest(test, locale);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<(boolean | number | null)[]>(Array(test.questions.length).fill(null));
  const [loading, setLoading] = useState(false);
  const selected = answers[index];
  const progress = ((index + 1) / test.questions.length) * 100;
  const question = localizedTest.questions[index];
  const isMultipleChoice = Boolean(question.options?.length);
  const shouldAutoAdvance = isMultipleChoice && !["joseon-destiny-test", "personality-country-test", "color-personality-test", "harry-potter-character-test", "coffee-brand-test", "self-esteem-test", "lover-fruit-test"].includes(test.slug);

  const select = (answer: boolean | number) => {
    const next = [...answers];
    next[index] = answer;
    setAnswers(next);
    if (shouldAutoAdvance && index < test.questions.length - 1) {
      window.setTimeout(() => setIndex((current) => current === index ? current + 1 : current), 240);
    }
  };

  const moveNext = () => {
    if (selected === null) return;
    if (index < test.questions.length - 1) {
      setIndex((current) => current + 1);
      return;
    }
    if (test.slug === "kkondae-power-test") {
      const completeAnswers = answers as number[];
      const result = calculateKkondaeResult(completeAnswers);
      setLoading(true);
      router.push(`/result/${result.profile.slug}?answers=${serializeKkondaeAnswers(completeAnswers)}`);
      return;
    }
    if (test.slug === "joseon-destiny-test") {
      const completeAnswers = answers as number[];
      const result = calculateJoseonDestinyResult(completeAnswers);
      setLoading(true);
      router.push(`/joseon-destiny-test/result/${result.profile.slug}?answers=${serializeJoseonAnswers(completeAnswers)}`);
      return;
    }
    if (test.slug === "personality-country-test") {
      const completeAnswers = answers as number[];
      const result = calculatePersonalityCountryResult(completeAnswers);
      setLoading(true);
      router.push(`/personality-country-test/result/${result.profile.slug}?answers=${serializeCountryAnswers(completeAnswers)}`);
      return;
    }
    if (test.slug === "color-personality-test") {
      const completeAnswers = answers as number[];
      const result = calculateColorPersonalityResult(completeAnswers);
      setLoading(true);
      router.push(`/color-personality-test/${result.primary.slug}?answers=${serializeColorPersonalityAnswers(completeAnswers)}`);
      return;
    }
    if (test.slug === "enneagram") {
      const completeAnswers = answers as number[];
      const result = calculateEnneagramResult(completeAnswers);
      setLoading(true);
      router.push(`/enneagram/${result.profile.slug}?answers=${serializeEnneagramAnswers(completeAnswers)}`);
      return;
    }
    if (test.slug === "lover-score-test") {
      const completeAnswers = answers as number[];
      const { profile, overallScore } = calculateLoverResult(completeAnswers);
      setLoading(true);
      router.push(
        `/lover-score-test/result/${profile.slug}?answers=${serializeLoverAnswers(
          completeAnswers,
        )}&score=${overallScore}`,
      );
      return;
    }
    if (test.slug === "eq-test") {
      const completeAnswers = answers as number[];
      const result = calculateEqScores(completeAnswers);
      setLoading(true);
      router.push(`/eq-test/result/${result.profile.slug}?answers=${serializeEqAnswers(completeAnswers)}`);
      return;
    }
    if (test.slug === "big-five") {
      const completeAnswers = answers as number[];
      const result = calculateBigFiveScores(completeAnswers);
      setLoading(true);
      router.push(`/big-five/result/${result.profile.slug}?answers=${serializeBigFiveAnswers(completeAnswers)}`);
      return;
    }
    if (test.slug === "harry-potter-character-test") {
      const completeAnswers = answers as number[];
      const result = calculateWizardCharacterResult(completeAnswers);
      setLoading(true);
      router.push(`/harry-potter-character-test/result/${result.profile.slug}?answers=${serializeWizardCharacterAnswers(completeAnswers)}`);
      return;
    }
    if (test.slug === "coffee-brand-test") {
      const completeAnswers = answers as number[];
      const result = calculateCoffeeBrandResult(completeAnswers);
      setLoading(true);
      router.push(`/coffee-brand-test/result/${result.profile.slug}?answers=${serializeCoffeeBrandAnswers(completeAnswers)}`);
      return;
    }
    if (test.slug === "self-esteem-test") {
      const completeAnswers = answers as number[];
      const result = calculateSelfEsteemResult(completeAnswers);
      setLoading(true);
      router.push(`/self-esteem-test/result/${result.profile.slug}?answers=${serializeSelfEsteemAnswers(completeAnswers)}`);
      return;
    }
    if (test.slug === "adhd-self-check") {
      const completeAnswers = answers as number[];
      const result = calculateAdhdResult(completeAnswers);
      setLoading(true);
      router.push(`/adhd-self-check/result/${result.profile.slug}?answers=${serializeAdhdAnswers(completeAnswers)}`);
      return;
    }
    if (test.slug === "dementia-risk-test") {
      const completeAnswers = answers as number[];
      const result = calculateDementiaResult(completeAnswers);
      setLoading(true);
      router.push(`/dementia-risk-test/result/${result.profile.slug}?answers=${serializeDementiaAnswers(completeAnswers)}`);
      return;
    }
    if (test.slug === "lover-fruit-test") {
      const completeAnswers = answers as number[];
      const result = calculateLoverFruitResult(completeAnswers);
      setLoading(true);
      router.push(`/lover-fruit-test/result/${result.profile.slug}?answers=${serializeLoverFruitAnswers(completeAnswers)}`);
      return;
    }
    const completeAnswers = answers as boolean[];
    const top = test.slug === "marriage-timing-test"
      ? calculateMarriageResult(completeAnswers).profile
      : test.slug === "office-animal-test"
        ? calculateOfficeAnimalResults(completeAnswers)[0]
        : calculateResults(completeAnswers)[0];
    if (!top) return;
    setLoading(true);
    const ageParam = test.slug === "marriage-timing-test" && currentAge ? `&age=${currentAge}` : "";
    router.push(`/result/${top.slug}?answers=${serializeAnswers(completeAnswers)}${ageParam}`);
  };

  return (
    <section className="container-readable max-w-2xl" aria-labelledby="question-title">
      <div className="mb-8">
        <div className="mb-3 flex items-center justify-between text-sm font-bold">
          <span className="text-primary">{t("runner.question", { current: index + 1 })}</span>
          <span className="text-slate-400">{t("runner.progress", { total: test.questions.length, current: index + 1 })}</span>
        </div>
        <div className="notebook-progress overflow-hidden" role="progressbar" aria-valuemin={1} aria-valuemax={test.questions.length} aria-valuenow={index + 1} aria-label={t("runner.progressLabel")}>
          <div className="h-full transition-[width] duration-500 ease-out" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div key={index} className="paper-card animate-fade-up p-6 sm:p-10">
        <p className="text-sm font-bold text-slate-400">Q{index + 1}</p>
        <h1 id="question-title" className={`${isMultipleChoice ? "min-h-16" : "min-h-24"} mt-3 text-lg font-extrabold leading-relaxed tracking-tight text-ink sm:text-2xl`}>{question.text}</h1>
        {question.options ? <div className="mt-7 space-y-3">{question.options.map((option) => {
          const active = selected === option.value;
          return <button key={option.label} type="button" aria-pressed={active} onClick={() => select(option.value)} className={`notebook-option flex min-h-16 w-full items-center gap-3 border-2 p-3 text-left transition duration-200 sm:p-4 ${active ? "text-ink" : "text-slate-700"}`}><span className={`grid size-10 shrink-0 place-items-center rounded-sm border text-sm font-black ${active ? "border-[#4267A8] bg-[#4267A8] text-white" : "border-[#353535]/20 bg-[#f4f1df] text-slate-500"}`}>{option.label}</span><span className="min-w-0 text-sm font-semibold leading-6 sm:text-base">{option.text}</span></button>;
        })}</div> : <div className="mt-8 grid grid-cols-2 gap-3">
          {([true, false] as const).map((answer) => {
            const active = selected === answer;
            return (
              <button key={String(answer)} type="button" aria-pressed={active} onClick={() => select(answer)} className={`notebook-option min-h-24 border-2 text-2xl font-black transition duration-200 ${active ? "text-primary" : "text-slate-500"}`}>
                {answer ? "O" : "X"}<span className="mt-1 block text-xs font-semibold">{answer ? t("runner.yes") : t("runner.no")}</span>
              </button>
            );
          })}
        </div>}
      </div>

      <div className="mt-6 flex items-center justify-between gap-3">
        <button type="button" onClick={() => setIndex((current) => Math.max(0, current - 1))} disabled={index === 0 || loading} className="paper-button bg-[#fffdf6] px-5 py-3 text-sm font-bold text-slate-600 disabled:cursor-not-allowed disabled:opacity-40">{t("runner.previous")}</button>
        {(!shouldAutoAdvance || index === test.questions.length - 1) ? <button type="button" onClick={moveNext} disabled={selected === null || loading} className="paper-button min-w-32 bg-primary px-6 py-3 text-sm font-bold text-white hover:bg-[#36588f] disabled:cursor-not-allowed disabled:border-slate-300 disabled:bg-slate-300 disabled:shadow-none">
          {loading ? t("runner.analyzing") : index === test.questions.length - 1 ? t("runner.result") : t("runner.next")}
        </button> : <span className="text-xs font-bold text-slate-400">{t("runner.autoAdvance")}</span>}
      </div>
    </section>
  );
}
