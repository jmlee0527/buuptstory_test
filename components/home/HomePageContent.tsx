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
  relationshipTests: TestDefinition[];
  workTests: TestDefinition[];
};

export function HomePageContent({ popularFanTests, newTests, personalityTests, relationshipTests, workTests }: Props) {
  const { t } = useLanguage();
  return (
    <>
      <section className="notebook-hero border-b">
        <div className="container-page grid gap-8 py-10 sm:py-14 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <SectionReveal>
            <p className="text-sm font-black text-primary">{t("home.brand")}</p>
            <h1 className="mt-3 max-w-xl text-4xl font-black leading-tight tracking-tight text-ink sm:text-5xl">
              {t("home.headline.line1")}
              <br />
              <span className="highlighter-title text-ink">{t("home.headline.line2")}</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-8 text-slate-600">
              {t("home.description.line1")}
              <br /> {t("home.description.line2")}
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="#popular-fan-quizzes" className="paper-button inline-flex min-h-12 items-center justify-center bg-primary px-6 text-sm font-black text-white hover:bg-[#36588f]">
                {t("home.browse")}
              </Link>
              <Link href="/search" className="paper-button inline-flex min-h-12 items-center justify-center bg-[#fffdf6] px-6 text-sm font-black text-slate-700 hover:text-primary">
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

      <section className="notebook-section-soft border-y">
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

      <section className="notebook-section-soft border-y">
        <div className="container-page py-12 sm:py-16">
          <SectionReveal>
            <SectionHeader eyebrow="LOVE & RELATIONSHIPS" title="연애·관계 테스트" description="애착, 연애 성향과 소통 방식처럼 가까운 관계에서 반복되는 패턴을 가볍게 살펴보세요." href={`/category/${encodeURIComponent("연애.관계")}`} />
            <div className="test-card-grid mt-7">{relationshipTests.map((test) => <TestCard key={test.slug} test={test} />)}</div>
          </SectionReveal>
        </div>
      </section>

      <section className="container-page py-12 sm:py-16">
        <SectionReveal>
          <SectionHeader eyebrow="WORK & DAILY LIFE" title="직장·일상 테스트" description="업무 스타일, 직무 스트레스와 생활 속 선택 경향을 확인할 수 있는 테스트를 모았습니다." href={`/category/${encodeURIComponent("직업.일상")}`} />
          <div className="test-card-grid mt-7">{workTests.map((test) => <TestCard key={test.slug} test={test} />)}</div>
        </SectionReveal>
      </section>
    </>
  );
}

function SectionHeader({ eyebrow, titleKey, descriptionKey, title, description, href }: { eyebrow: string; titleKey?: TranslationKey; descriptionKey?: TranslationKey; title?: string; description?: string; href?: string }) {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-sm font-black text-primary">{eyebrow}</p>
        <h2 className="mt-2 text-2xl font-black tracking-tight text-ink sm:text-3xl">{titleKey ? t(titleKey) : title}</h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">{descriptionKey ? t(descriptionKey) : description}</p>
      </div>
      {href && <Link href={href} className="paper-button w-fit shrink-0 bg-[#fffdf6] px-4 py-2 text-sm font-bold text-slate-600 hover:text-primary">{t("common.more")}</Link>}
    </div>
  );
}
