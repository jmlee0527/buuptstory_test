"use client";

import Link from "next/link";
import { CategoryTiles, TEST_CATEGORY_TILES } from "@/components/category/CategoryTiles";
import { TestCard } from "@/components/cards/TestCard";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { categoryKey, type TranslationKey } from "@/lib/i18n";
import type { TestDefinition } from "@/lib/types";

const descriptionKeys: Record<string, TranslationKey> = {
  "성격.심리": "categories.personalityDescription",
  "연애.관계": "categories.relationshipDescription",
  "직업.일상": "categories.workDescription",
  "팬 퀴즈": "categories.fanDescription",
  "건강.운세": "categories.healthDescription",
};

export function CategoriesPageContent({ tests }: { tests: TestDefinition[] }) {
  const { t } = useLanguage();
  return (
    <main className="container-page py-10 sm:py-14">
      <Breadcrumbs items={[{ name: t("nav.categories") }]} />
      <div className="max-w-2xl">
        <p className="text-sm font-extrabold text-primary">EXPLORE BY CATEGORY</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight text-ink sm:text-4xl">{t("categories.title")}</h1>
        <p className="mt-4 leading-7 text-slate-600">{t("categories.description")}</p>
      </div>
      <div className="mt-8"><CategoryTiles /></div>
      <div className="mt-12 space-y-14">
        {TEST_CATEGORY_TILES.map(([icon, category]) => {
          const all = tests.filter((test) => test.category === category);
          const items = all.slice(0, 4);
          const translatedCategoryKey = categoryKey(category);
          return (
            <section key={category}>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm font-black text-primary">{icon} CATEGORY</p>
                  <h2 className="mt-2 text-2xl font-black text-ink">
                    {translatedCategoryKey ? t(translatedCategoryKey) : category} <span className="align-middle text-sm font-bold text-slate-400">{t("categories.count", { count: all.length })}</span>
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-slate-500">{t(descriptionKeys[category])}</p>
                </div>
                <Link href={`/category/${encodeURIComponent(category)}`} className="w-fit shrink-0 text-sm font-bold text-primary hover:underline">
                  {t("common.all")}
                </Link>
              </div>
              <div className="test-card-grid mt-6">{items.map((test) => <TestCard key={test.slug} test={test} />)}</div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
