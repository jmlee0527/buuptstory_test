"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AdRectangle } from "@/components/ads/AdRectangle";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { MobileShareDock } from "@/components/share/MobileShareDock";
import { ShareButtons } from "@/components/share/ShareButtons";
import { ShareImageCard } from "@/components/share/ShareImageCard";
import { formatFanQuizLevel, getFanQuizLevel } from "@/config/fanQuizThemes";
import type { TestDefinition } from "@/lib/types";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { localizeTest, localizeTestText } from "@/lib/test-i18n";

type ShareAccent = "blue" | "orange" | "pink" | "purple" | "indigo" | "green";

export type CommonFanQuizWrongReview = {
  id: string;
  question: string;
  choiceText: string;
  correctText: string;
  explanation: string;
  point: number;
  note?: string;
};

type Props = {
  test: TestDefinition;
  gradeTitle: string;
  gradeSummary: string;
  gradeDescription: string;
  hasResult: boolean;
  correctCount: number | null;
  totalCount: number;
  pointScore: number | null;
  pointMaxScore: number;
  levelScore?: number;
  levelMaxScore?: number;
  wrongReviews: CommonFanQuizWrongReview[];
  resultPath: string;
  imageSrc?: string;
  imageAlt?: string;
  imageObjectPosition?: string;
  breadcrumbResultName?: string;
  shareDescription?: string;
  disclaimer?: string;
};

function useCountUp(target: number, duration = 900) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(target);
      return;
    }
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const ratio = Math.min((now - start) / duration, 1);
      setValue(Math.round(target * (1 - (1 - ratio) ** 3)));
      if (ratio < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);
  return value;
}

function toShareAccent(accent: TestDefinition["accent"]): ShareAccent {
  if (accent === "orange" || accent === "pink" || accent === "purple" || accent === "indigo" || accent === "green") return accent;
  if (accent === "teal") return "green";
  return "blue";
}

function scoreLabel(score: number | null, maxScore: number) {
  return score === null ? `0/${maxScore}점` : `${score}/${maxScore}점`;
}

export function CommonFanQuizResult({
  test,
  gradeTitle,
  gradeSummary,
  gradeDescription,
  hasResult,
  correctCount,
  totalCount,
  pointScore,
  pointMaxScore,
  levelScore,
  levelMaxScore,
  wrongReviews,
  resultPath,
  imageSrc,
  imageAlt,
  imageObjectPosition = "center",
  breadcrumbResultName,
  shareDescription,
  disclaimer = "본 테스트는 공개된 자료를 바탕으로 미미테스트가 자체 제작한 비공식 팬 퀴즈입니다. 응답은 서버에 저장되지 않습니다.",
}: Props) {
  const { locale, t } = useLanguage();
  const localizedTest = localizeTest(test, locale);
  const localizedGradeTitle = localizeTestText(test.slug, gradeTitle, locale);
  const localizedGradeSummary = localizeTestText(test.slug, gradeSummary, locale);
  const localizedGradeDescription = localizeTestText(test.slug, gradeDescription, locale);
  const effectiveImageSrc = imageSrc ?? test.thumbnail;
  const scoreForLevel = levelScore ?? pointScore ?? correctCount ?? 0;
  const maxForLevel = levelMaxScore ?? pointMaxScore;
  const level = getFanQuizLevel(scoreForLevel, maxForLevel);
  const displayPointScore = useCountUp(hasResult ? pointScore ?? 0 : 0);
  const displayCorrectCount = useCountUp(hasResult ? correctCount ?? 0 : 0);
  const pointText = scoreLabel(pointScore, pointMaxScore);
  const shareText = `${localizedTest.shortTitle ?? localizedTest.title} ${t("fan.result")} ${formatFanQuizLevel(level)}, ${pointText}`;

  return (
    <main className="fan-quiz-theme min-h-screen pb-24 pt-8 sm:py-14">
      <div className="container-page">
        <Breadcrumbs items={[{ name: t("common.tests"), href: "/tests" }, { name: localizedTest.shortTitle ?? localizedTest.title, href: `/tests/${test.slug}` }, { name: breadcrumbResultName ?? `${localizedGradeTitle} ${t("fan.result")}` }]} />
        <div className="mx-auto max-w-3xl">
          <section className="relative overflow-hidden rounded-lg border border-[var(--fan-border)] bg-[var(--fan-surface)] shadow-[0_6px_20px_var(--fan-paper-shadow)]">
            <div className="pointer-events-none absolute left-6 top-0 h-7 w-12 border-x border-b border-[var(--fan-border)] bg-[var(--fan-surface-soft)]" aria-hidden="true" />
            <div className="border-b border-[var(--fan-border)] px-5 pb-5 pt-10 text-center sm:px-9">
              <p className="text-[11px] font-extrabold tracking-[.18em] text-[var(--fan-primary)]">MIMI FAN QUIZ · SCORE REPORT</p>
              <h1 className="mt-2 text-xl font-extrabold text-[var(--fan-text-primary)] sm:text-2xl">{localizedTest.shortTitle ?? localizedTest.title} {t("fan.scoreReport")}</h1>
            </div>

            <div className="grid gap-7 px-5 py-7 sm:px-9 sm:py-9 md:grid-cols-[15rem_1fr] md:items-center">
              <div className="mx-auto w-full max-w-[15rem]">
                <div className="relative aspect-[4/5] overflow-hidden rounded-md border border-[var(--fan-border)] bg-[var(--fan-surface-soft)] p-1.5 shadow-[0_2px_8px_var(--fan-paper-shadow)]">
                    {effectiveImageSrc ? (
                      <Image
                        src={effectiveImageSrc}
                        alt={imageAlt ?? localizedTest.shortTitle ?? localizedTest.title}
                        fill
                        sizes="(max-width:768px) 240px, 240px"
                        className="object-cover"
                        style={{ objectPosition: imageObjectPosition }}
                        priority
                      />
                    ) : (
                      <div className="grid size-full place-items-center text-6xl">{test.icon}</div>
                    )}
                  </div>
              </div>
                <div className="relative text-center md:text-left">
                  <p className="text-sm font-bold text-[var(--fan-text-secondary)]">{hasResult ? t("fan.myScore") : t("fan.result")}</p>
                  <div className="mt-1 tabular-nums">
                    <strong className="text-7xl font-extrabold leading-none text-[var(--fan-accent)] sm:text-8xl">{displayPointScore}</strong>
                    <span className="ml-2 text-sm font-bold text-[var(--fan-text-secondary)]">/ {pointMaxScore}점</span>
                  </div>
                  <p className="mt-3 text-xl font-extrabold text-[var(--fan-primary)]">{formatFanQuizLevel(level)}</p>
                  <h2 className="mt-5 text-2xl font-extrabold text-[var(--fan-text-primary)]">{localizedGradeTitle}</h2>
                  <p className="mt-2 text-sm font-medium leading-6 text-[var(--fan-text-secondary)]">{localizedGradeSummary}</p>
                  <div className="pointer-events-none mx-auto mt-5 inline-grid rotate-[-5deg] place-items-center rounded-full border-2 border-[var(--fan-accent)] px-4 py-3 text-center text-[10px] font-black leading-4 tracking-[.12em] text-[var(--fan-accent)] md:mx-0" aria-hidden="true">
                    MIMI FAN QUIZ<br />팬력 인증
                  </div>
                </div>
              </div>

              {hasResult && (
                <dl className="mx-5 grid grid-cols-2 border-y border-[var(--fan-border)] sm:mx-9">
                  <div className="border-r border-[var(--fan-border)] px-4 py-4 text-center">
                    <dt className="text-xs font-bold text-[var(--fan-text-secondary)]">{t("fan.correctCount")}</dt>
                    <dd className="mt-1 text-xl font-extrabold text-[var(--fan-text-primary)]">{displayCorrectCount}/{totalCount}</dd>
                  </div>
                  <div className="px-4 py-4 text-center">
                    <dt className="text-xs font-bold text-[var(--fan-text-secondary)]">{t("fan.score")}</dt>
                    <dd className="mt-1 text-xl font-extrabold text-[var(--fan-accent)]">{displayPointScore}/{pointMaxScore}</dd>
                  </div>
                </dl>
              )}

              <div className="px-5 py-7 sm:px-9">
                <p className="mx-auto max-w-2xl text-sm leading-7 text-[var(--fan-text-secondary)]">{localizedGradeDescription}</p>
              </div>
          </section>

          <AdRectangle />

          {hasResult && wrongReviews.length > 0 && (
            <section className="mt-8 rounded-lg border border-[var(--fan-border)] bg-[var(--fan-surface)] p-5 shadow-[0_2px_8px_var(--fan-paper-shadow)] sm:p-8">
              <h2 className="text-xl font-extrabold text-[var(--fan-text-primary)]"><span className="fan-highlight">{t("fan.wrongNotes")}</span> <span className="text-sm font-bold text-[var(--fan-text-secondary)]">{t("fan.problems", { count: wrongReviews.length })}</span></h2>
              <div className="mt-5 space-y-3">
                {wrongReviews.map((review, index) => (
                  <details key={review.id} className="group rounded-md border border-[var(--fan-border)] bg-[var(--fan-surface)] p-4 open:bg-[var(--fan-highlight-soft)]/30">
                    <summary className="cursor-pointer list-none font-bold leading-6 text-[var(--fan-text-primary)]">
                      <span className="mr-2 text-[var(--fan-accent)]">Q.{String(index + 1).padStart(2, "0")}</span>
                      {localizeTestText(test.slug, review.question, locale)}
                      <span className="float-right text-xs text-[var(--fan-text-secondary)] group-open:hidden">{t("fan.expand")}</span>
                    </summary>
                    <dl className="mt-4 space-y-2 text-sm">
                      <div className="flex gap-2"><dt className="shrink-0 font-extrabold text-[var(--fan-accent)]">{t("fan.myAnswer")}</dt><dd className="text-[var(--fan-text-secondary)] line-through decoration-[var(--fan-accent)]">{localizeTestText(test.slug, review.choiceText, locale)}</dd></div>
                      <div className="flex gap-2"><dt className="shrink-0 font-extrabold text-[var(--fan-primary)]">{t("fan.correctAnswer")}</dt><dd className="font-bold text-[var(--fan-text-primary)]">{localizeTestText(test.slug, review.correctText, locale)}</dd></div>
                    </dl>
                    <p className="mt-4 border-t border-[var(--fan-border)] pt-4 text-sm leading-6 text-[var(--fan-text-secondary)]">{localizeTestText(test.slug, review.explanation, locale)}</p>
                  </details>
                ))}
              </div>
            </section>
          )}

          {hasResult && wrongReviews.length === 0 && (
            <section className="mt-8 rounded-lg border border-[var(--fan-border)] bg-[var(--fan-highlight-soft)] p-6 text-center shadow-[0_2px_8px_var(--fan-paper-shadow)] sm:p-8">
              <h2 className="text-xl font-extrabold text-[var(--fan-primary)]">{t("fan.allCorrect")}</h2>
              <p className="mt-2 text-sm leading-6 text-[var(--fan-text-secondary)]">{t("fan.allCorrectDescription")}</p>
            </section>
          )}

          <section id="share-card" className="mt-10 grid scroll-mt-24 gap-6 rounded-lg border border-[var(--fan-border)] bg-[var(--fan-surface)] p-6 shadow-[0_6px_20px_var(--fan-paper-shadow)] sm:p-8 md:grid-cols-[.8fr_1.2fr] md:items-center">
            <ShareImageCard
              emoji={test.icon}
              eyebrow={localizedTest.shortTitle ?? localizedTest.title}
              title={formatFanQuizLevel(level)}
              subtitle={pointText}
              accent={toShareAccent(test.accent)}
              imageSrc={effectiveImageSrc}
              imageAlt={imageAlt ?? localizedTest.shortTitle ?? localizedTest.title}
            />
            <div>
              <h2 className="text-xl font-extrabold text-[var(--fan-text-primary)]">{t("share.title")}</h2>
              <p className="mt-2 text-sm leading-6 text-[var(--fan-text-secondary)]">{t("share.description")}</p>
              <div className="mt-5"><ShareButtons title={shareText} description={shareDescription ?? localizedGradeSummary} path={resultPath} /></div>
            </div>
          </section>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href={`/tests/${test.slug}?start=1`} className="inline-flex rounded-md border border-[var(--fan-primary)] bg-[var(--fan-surface)] px-6 py-3.5 text-sm font-extrabold text-[var(--fan-primary)] transition hover:bg-[var(--fan-primary-soft)]">{t("fan.retry")}</Link>
            <Link href={`/tests/${test.slug}`} className="inline-flex rounded-md border border-[var(--fan-border)] bg-[var(--fan-surface)] px-5 py-3.5 text-sm font-bold text-[var(--fan-text-secondary)] hover:bg-[#f8f5ee]">{t("fan.about")}</Link>
          </div>
          <p className="mx-auto mt-8 max-w-2xl text-center text-xs leading-5 text-[var(--fan-text-disabled)]">{localizeTestText(test.slug, disclaimer, locale)}</p>
        </div>
      </div>
      <MobileShareDock />
    </main>
  );
}
