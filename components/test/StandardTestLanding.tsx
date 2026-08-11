"use client";

import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { TestSeoContent } from "@/components/seo/TestSeoContent";
import type { TestDefinition } from "@/lib/types";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { categoryKey } from "@/lib/i18n";
import { localizeAnswerType, localizeDuration, localizeTest } from "@/lib/test-i18n";
import { RelatedArticlesForTest } from "@/components/articles/RelatedArticlesForTest";

export function StandardTestLanding({ test, insight, answerType = "4지선다" }: { test: TestDefinition; insight: string; answerType?: string }) {
  const { locale, t } = useLanguage();
  const localizedTest = localizeTest(test, locale);
  const translatedCategoryKey = categoryKey(test.category);
  const translatedAnswerType = localizeAnswerType(answerType, locale);
  const itemCount = test.itemCount ?? test.questions.length;
  return (
    <div className="container-page py-10 sm:py-14">
      <Breadcrumbs items={[{ name: "테스트", href: "/tests" }, { name: test.shortTitle }]} />
      <section className="paper-card container-readable overflow-hidden">
        {test.thumbnail ? (
          <div className="notebook-photo relative aspect-[4/3] w-full bg-slate-100 sm:aspect-[16/10]">
            <Image src={test.thumbnail} alt={localizedTest.title} fill sizes="(max-width:768px) 100vw, 768px" className="object-cover object-[center_20%]" priority />
          </div>
        ) : (
          <div className="notebook-photo grid min-h-60 place-items-center bg-[#f4f1df]"><span className="text-7xl" aria-hidden="true">{test.icon}</span></div>
        )}
        <div className="p-6 sm:p-10">
          <div className="flex gap-2 text-xs font-bold"><Link href={`/category/${encodeURIComponent(test.category)}`} className="rounded-sm bg-[#CDEFE1] px-3 py-1 text-emerald-800">{translatedCategoryKey ? t(translatedCategoryKey) : test.category}</Link><span className="rounded-sm bg-[#f4f1df] px-3 py-1 text-slate-500">{localizeDuration(test.duration, locale)}</span></div>
          <h1 className="mt-5 text-3xl font-black tracking-tight text-ink sm:text-4xl">{localizedTest.title}</h1>
          <p className="mt-4 text-base leading-7 text-slate-600">{localizedTest.description}</p>
          <ul className="mt-6 grid gap-2 text-sm text-slate-600 sm:grid-cols-3"><li>✓ {t("common.questions", { count: itemCount })}</li><li>✓ {t("test.easyResponse", { type: translatedAnswerType })}</li><li>✓ {t("common.noRegistration")}</li></ul>
          <Link href={`/tests/${test.slug}?start=1`} className="paper-button mt-8 block w-full bg-primary px-6 py-4 text-center text-base font-extrabold text-white hover:bg-[#36588f]">{t("test.start")}</Link>
          <p className="mt-3 text-center text-xs text-slate-400">{t("common.notStored")}</p>
        </div>
      </section>
      <section className="paper-card container-readable mt-12 p-6 sm:p-8">
        <h2 className="text-xl font-extrabold text-ink">{t("test.discover")}</h2>
        <p className="mt-3 leading-7 text-slate-600">{insight}</p>
      </section>
      <TestSeoContent test={test} itemCount={itemCount} answerType={answerType} />
      <RelatedArticlesForTest testSlug={test.slug} />
      <div className="container-readable mt-8 text-center"><Link href="/tests" className="paper-button inline-flex min-h-12 items-center justify-center bg-[#fffdf6] px-5 text-sm font-bold text-slate-700 hover:bg-[#f4f1df]">{t("common.otherTests")}</Link></div>
    </div>
  );
}
