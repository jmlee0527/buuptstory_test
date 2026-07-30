"use client";

import Link from "next/link";
import { TestCard } from "@/components/cards/TestCard";
import { SearchForm } from "@/components/search/SearchForm";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { categoryKey } from "@/lib/i18n";
import type { TestDefinition } from "@/lib/types";

type Props = {
  initialQuery: string;
  query: string;
  results: TestDefinition[];
  suggestions: TestDefinition[];
};

const suggestedCategories = ["성격.심리", "연애.관계", "직업.일상", "팬 퀴즈"] as const;

export function SearchPageContent({ initialQuery, query, results, suggestions }: Props) {
  const { t } = useLanguage();
  return (
    <main className="container-page py-10 sm:py-14">
      <Breadcrumbs items={[{ name: t("nav.search") }]} />
      <section className="container-readable">
        <p className="text-sm font-extrabold text-primary">FIND YOUR TEST</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight text-ink sm:text-4xl">{t("search.title")}</h1>
        <p className="mt-4 leading-7 text-slate-600">{t("search.description")}</p>
        <SearchForm initialQuery={initialQuery} />
      </section>

      {query ? (
        <section className="mt-10" aria-live="polite">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold text-slate-500">{t("search.resultLabel", { query })}</p>
              <h2 className="mt-1 text-2xl font-black text-ink">{t("search.resultCount", { count: results.length })}</h2>
            </div>
            <Link href="/categories" className="w-fit text-sm font-bold text-primary hover:underline">{t("search.allCategories")}</Link>
          </div>
          {results.length ? (
            <div className="test-card-grid mt-7">{results.map((test) => <TestCard key={test.slug} test={test} />)}</div>
          ) : (
            <div className="mt-7 rounded-3xl border border-slate-200 bg-white px-6 py-14 text-center shadow-card">
              <span className="text-5xl">🔍</span>
              <h2 className="mt-5 text-xl font-black text-ink">{t("search.empty")}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">{t("search.emptyDescription")}</p>
              <Link href="/categories" className="mt-6 inline-flex min-h-12 items-center rounded-xl bg-slate-950 px-5 text-sm font-black text-white">{t("search.browseCategories")}</Link>
            </div>
          )}
        </section>
      ) : (
        <section className="mt-10">
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white/70 px-6 py-10 text-center">
            <span className="text-5xl">✨</span>
            <h2 className="mt-4 text-xl font-black text-ink">{t("search.prompt")}</h2>
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              {suggestedCategories.map((category) => {
                const key = categoryKey(category);
                return (
                  <Link key={category} href={`/search?q=${encodeURIComponent(category)}`} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-600 hover:border-primary hover:text-primary">
                    {key ? t(key) : category}
                  </Link>
                );
              })}
            </div>
          </div>
          <h2 className="mt-10 text-2xl font-black text-ink">{t("search.recent")}</h2>
          <div className="test-card-grid mt-6">{suggestions.map((test) => <TestCard key={test.slug} test={test} />)}</div>
        </section>
      )}
    </main>
  );
}
