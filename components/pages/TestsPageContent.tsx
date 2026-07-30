"use client";

import { TestCard } from "@/components/cards/TestCard";
import { CategoryTiles } from "@/components/category/CategoryTiles";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import type { TestDefinition } from "@/lib/types";

export function TestsPageContent({ tests }: { tests: TestDefinition[] }) {
  const { t } = useLanguage();
  return (
    <div className="container-page py-10 sm:py-14">
      <Breadcrumbs items={[{ name: t("common.tests") }]} />
      <div className="max-w-2xl">
        <p className="text-sm font-extrabold text-primary">DISCOVER YOURSELF</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight text-ink sm:text-4xl">{t("list.title")}</h1>
        <p className="mt-4 leading-7 text-slate-600">{t("list.description")}</p>
      </div>
      <div className="mt-8"><CategoryTiles /></div>
      <div id="all-tests" className="test-card-grid mt-8 scroll-mt-24">{tests.map((test) => <TestCard key={test.slug} test={test} />)}</div>
    </div>
  );
}
