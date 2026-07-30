"use client";

import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { TestSeoContent } from "@/components/seo/TestSeoContent";
import { FanQuizArtwork } from "@/components/fan-quiz/FanQuizArtwork";
import { FanQuizMetaBadges } from "@/components/fan-quiz/FanQuizMetaBadges";
import { getTestFanQuizTheme } from "@/config/fanQuizThemes";
import { getFanQuizEntityName } from "@/lib/test-seo";
import type { TestDefinition } from "@/lib/types";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { localizeAnswerType, localizeDuration, localizeTest } from "@/lib/test-i18n";

type Props = {
  test: TestDefinition;
  insight: string;
  answerType?: string;
};

export function FanQuizLanding({ test, insight, answerType = "4지선다" }: Props) {
  const { locale, t } = useLanguage();
  const localizedTest = localizeTest(test, locale);
  const itemCount = test.itemCount ?? test.questions.length;
  const theme = getTestFanQuizTheme(test);
  const entityName = getFanQuizEntityName(test);
  return (
    <div className="fan-quiz-theme">
      <div className="container-page py-10 sm:py-14">
        <Breadcrumbs items={[{ name: "테스트", href: "/tests" }, { name: test.shortTitle }]} />
        <section className="container-wide-readable relative overflow-hidden rounded-lg border border-[var(--fan-border)] bg-[var(--fan-surface)] shadow-[0_6px_20px_var(--fan-paper-shadow)]">
          <div className="pointer-events-none absolute left-5 top-0 h-7 w-12 border-x border-b border-[var(--fan-border)] bg-[var(--fan-surface-soft)] sm:left-8" aria-hidden="true" />
          <div className="relative grid gap-8 px-5 pb-7 pt-11 sm:px-9 sm:pb-10 lg:grid-cols-[1.08fr_.92fr] lg:items-center lg:px-12 lg:py-12">
            <div className="min-w-0">
              <Link href={`/category/${encodeURIComponent(test.category)}`} className="inline-flex border-b-2 border-[var(--fan-accent)] pb-1 text-[11px] font-extrabold tracking-[.16em] text-[var(--fan-primary)]">
                {theme.label}
              </Link>
              <h1 className="mt-5 text-balance text-3xl font-extrabold leading-[1.25] text-[var(--fan-primary)] sm:text-4xl">
                {localizedTest.title}
              </h1>
              <p className="mt-4 max-w-2xl text-[15px] font-medium leading-7 text-[var(--fan-text-secondary)] sm:text-base">{localizedTest.description}</p>
              <div className="mt-7">
                <h2 className="mb-3 text-sm font-extrabold text-[var(--fan-text-primary)]">{t("test.info")}</h2>
                <FanQuizMetaBadges
                  theme={theme}
                  badges={[
                    { label: t("test.questionCount"), value: t("common.questions", { count: itemCount }) },
                    { label: t("test.estimatedTime"), value: localizeDuration(test.duration, locale) },
                    { label: t("test.questionType"), value: localizeAnswerType(answerType, locale) },
                    { label: t("test.assessment"), value: t("test.fanKnowledge", { name: entityName }) },
                  ]}
                />
              </div>
              <Link
                href={`/tests/${test.slug}?start=1`}
                className="mt-8 inline-flex min-h-14 w-full items-center justify-center rounded-md border border-[var(--fan-accent)] bg-[var(--fan-accent)] px-6 text-base font-extrabold text-white transition duration-200 hover:bg-[var(--fan-accent-hover)] focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-[var(--fan-accent)] sm:w-auto"
              >
                {t("test.fanStart")}
              </Link>
              <p className="mt-3 text-center text-xs text-[var(--fan-text-secondary)] sm:text-left">{t("common.notStored")}</p>
            </div>
            <div className="relative">
              {test.thumbnail ? (
                <div className="relative mx-auto aspect-[4/3] w-full max-w-sm overflow-hidden rounded-md border border-[var(--fan-border)] bg-[var(--fan-surface)] p-2 shadow-[0_2px_8px_var(--fan-paper-shadow)]">
                  <Image src={test.thumbnail} alt={localizedTest.title} fill sizes="(max-width:1024px) 90vw, 420px" className="object-cover object-center" priority />
                  <div className="absolute bottom-3 right-3 rotate-[-5deg] rounded-full border-2 border-[var(--fan-accent)] bg-[var(--fan-surface)]/90 px-3 py-2 text-[10px] font-black tracking-[.1em] text-[var(--fan-accent)]">FAN EXAM</div>
                </div>
              ) : (
                <FanQuizArtwork theme={theme} label={test.icon} />
              )}
            </div>
          </div>
        </section>

        <section className="container-wide-readable mt-8 rounded-lg border border-[var(--fan-border)] bg-[var(--fan-surface)] p-6 shadow-[0_2px_8px_var(--fan-paper-shadow)] sm:p-8">
          <h2 className="text-lg font-extrabold text-[var(--fan-text-primary)]"><span className="fan-highlight">{t("test.notes")}</span></h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--fan-text-secondary)]">{insight}</p>
        </section>

        <section className="container-wide-readable mt-6 border-t border-[var(--fan-border)] px-1 pt-6">
          <h2 className="text-base font-extrabold text-[var(--fan-text-primary)]">{entityName} 팬퀴즈를 찾고 있다면</h2>
          <p className="mt-2 text-sm leading-7 text-[var(--fan-text-secondary)]">
            {test.shortTitle}는 {entityName}에 관한 문제를 풀며 팬심을 확인할 수 있는 무료 팬 퀴즈입니다. 짧은 문제를 풀고 내 팬심 레벨을 바로 확인해 보세요.
          </p>
        </section>

        <TestSeoContent test={test} itemCount={itemCount} answerType={answerType} />
        <div className="container-wide-readable mt-8 text-center">
          <Link href={`/category/${encodeURIComponent(test.category)}`} className="inline-flex min-h-12 items-center justify-center rounded-md border border-[var(--fan-primary)] bg-[var(--fan-surface)] px-5 text-sm font-bold text-[var(--fan-primary)] hover:bg-[var(--fan-primary-soft)]">
            {t("fan.other")}
          </Link>
        </div>
      </div>
    </div>
  );
}
