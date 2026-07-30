"use client";

import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { CategoryTiles } from "@/components/category/CategoryTiles";
import { TestCard } from "@/components/cards/TestCard";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { categoryKey, type TranslationKey } from "@/lib/i18n";
import type { TestDefinition } from "@/lib/types";

export function CategoryPageContent({ category, description, tests }: { category: string; description: string; tests: TestDefinition[] }) {
  const { t } = useLanguage();
  const translatedCategoryKey = categoryKey(category);
  const categoryName = translatedCategoryKey ? t(translatedCategoryKey) : category;
  const descriptionKeys: Record<string, TranslationKey> = {
    "성격.심리": "categories.personalityDescription",
    "연애.관계": "categories.relationshipDescription",
    "직업.일상": "categories.workDescription",
    "팬 퀴즈": "categories.fanDescription",
    "건강.운세": "categories.healthDescription",
  };
  return (
    <div className="container-page py-10 sm:py-14">
      <Breadcrumbs items={[{ name: t("common.tests"), href: "/tests" }, { name: categoryName }]} />
      <h1 className="text-3xl font-black tracking-tight text-ink sm:text-4xl">{categoryName}</h1>
      <p className="mt-3 text-slate-600">{descriptionKeys[category] ? t(descriptionKeys[category]) : description}</p>
      <div className="mt-8"><CategoryTiles activeCategory={category} /></div>
      {tests.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-black text-ink">{t("common.tests")}</h2>
          <div className="test-card-grid mt-5">{tests.map((test) => <TestCard key={test.slug} test={test} />)}</div>
        </section>
      )}
    </div>
  );
}
