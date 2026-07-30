"use client";

import Link from "next/link";
import { TestCard } from "@/components/cards/TestCard";
import { HomeHeroBanner } from "@/components/home/HomeHeroBanner";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { homeBanners } from "@/data/home-banners";
import type { TestDefinition } from "@/lib/types";
import type { TranslationKey } from "@/lib/i18n";

type Props = {
  popularFanTests: TestDefinition[];
  newTests: TestDefinition[];
  personalityTests: TestDefinition[];
};

export function HomePageContent({ popularFanTests, newTests, personalityTests }: Props) {
  const { t } = useLanguage();
  return (
    <>
      <section className="border-b border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#eef4ff_100%)]">
        <div className="container-page grid gap-8 py-10 sm:py-14 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <SectionReveal>
            <p className="text-sm font-black text-primary">{t("home.brand")}</p>
            <h1 className="mt-3 max-w-xl text-4xl font-black leading-tight tracking-tight text-ink sm:text-5xl">
              {t("home.headline.line1")}
              <br />
              <span className="text-violet-700">{t("home.headline.line2")}</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-8 text-slate-600">
              {t("home.description.line1")}
              <br /> {t("home.description.line2")}
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="#popular-fan-quizzes" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-primary px-6 text-sm font-black text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700">
                {t("home.browse")}
              </Link>
              <Link href="/search" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-6 text-sm font-black text-slate-700 transition hover:border-blue-200 hover:text-primary">
                {t("home.search")}
              </Link>
            </div>
          </SectionReveal>
          <SectionReveal><HomeHeroBanner banners={homeBanners} /></SectionReveal>
        </div>
      </section>

      <section id="popular-fan-quizzes" className="container-page scroll-mt-20 py-12 sm:py-16">
        <SectionReveal>
          <SectionHeader eyebrow="FAN QUIZ RANKING" titleKey="home.popular.title" descriptionKey="home.popular.description" href={`/category/${encodeURIComponent("팬 퀴즈")}`} />
          <div className="test-card-grid mt-7">{popularFanTests.map((test, index) => <TestCard key={test.slug} test={test} rank={index + 1} />)}</div>
        </SectionReveal>
      </section>

      <section className="border-y border-slate-200 bg-slate-50">
        <div className="container-page py-12 sm:py-16">
          <SectionReveal>
            <SectionHeader eyebrow="NEW TESTS" titleKey="home.new.title" descriptionKey="home.new.description" href="/tests" />
            <div className="test-card-grid mt-7">{newTests.map((test) => <TestCard key={test.slug} test={test} />)}</div>
          </SectionReveal>
        </div>
      </section>

      <section className="container-page py-12 sm:py-16">
        <SectionReveal>
          <SectionHeader eyebrow="PERSONALITY & MIND" titleKey="home.personality.title" descriptionKey="home.personality.description" href={`/category/${encodeURIComponent("성격.심리")}`} />
          <div className="test-card-grid mt-7">{personalityTests.map((test) => <TestCard key={test.slug} test={test} />)}</div>
        </SectionReveal>
      </section>
    </>
  );
}

function SectionHeader({ eyebrow, titleKey, descriptionKey, href }: { eyebrow: string; titleKey: TranslationKey; descriptionKey: TranslationKey; href?: string }) {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-sm font-black text-primary">{eyebrow}</p>
        <h2 className="mt-2 text-2xl font-black tracking-tight text-ink sm:text-3xl">{t(titleKey)}</h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">{t(descriptionKey)}</p>
      </div>
      {href && <Link href={href} className="w-fit shrink-0 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-600 transition hover:border-blue-200 hover:text-primary">{t("common.more")}</Link>}
    </div>
  );
}
