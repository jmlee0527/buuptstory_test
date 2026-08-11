"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import type { TestDefinition } from "@/lib/types";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { categoryKey, localeNumber } from "@/lib/i18n";
import { localizeDuration, localizeTest } from "@/lib/test-i18n";

const accentClasses = {
  blue: "from-blue-100 via-sky-50 to-indigo-100 text-blue-700",
  orange: "from-orange-100 via-amber-50 to-rose-100 text-orange-700",
  pink: "from-pink-100 via-rose-50 to-fuchsia-100 text-pink-700",
  purple: "from-violet-100 via-purple-50 to-indigo-100 text-violet-700",
  green: "from-emerald-100 via-green-50 to-teal-100 text-emerald-700",
  indigo: "from-indigo-100 via-blue-50 to-violet-100 text-indigo-700",
  teal: "from-teal-100 via-cyan-50 to-emerald-100 text-teal-700",
} as const;

export function TestCard({ test, rank }: { test: TestDefinition; rank?: number }) {
  const reduceMotion = useReducedMotion();
  const pathname = usePathname();
  const { locale, t } = useLanguage();
  const localizedTest = localizeTest(test, locale);

  const href = test.href ?? `/tests/${test.slug}`;
  const count = test.itemCount ?? test.questions.length;
  const countLabel = test.type === "worldcup"
    ? t("common.round", { count: test.itemCount ?? 0 })
    : test.type === "fortune"
      ? t("common.cards", { count: test.itemCount ?? 5 })
      : test.type === "calculator"
        ? t("common.names")
        : t("common.questions", { count });
  const translatedCategoryKey = categoryKey(test.category);
  return (
    <motion.article whileHover={reduceMotion ? undefined : { y: -4 }} transition={{ duration: 0.18 }} className="notebook-card group relative overflow-hidden border bg-white shadow-card">
      {rank && <span className="absolute left-3 top-3 z-10 grid size-8 place-items-center rounded-xl border border-white/80 bg-white/90 text-sm font-black shadow-sm backdrop-blur sm:size-9" aria-label={`인기 ${rank}위`}>{["🥇","🥈","🥉"][rank-1] ?? rank}</span>}
      <Link href={href} onClick={() => { if (pathname === "/search") (window as Window & { gtag?: (command:string,event:string,params?:Record<string,string>)=>void }).gtag?.("event","search_result_click",{test_id:test.slug}); }} className="block focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-[-4px] focus-visible:outline-primary">
        <div className={`notebook-photo relative grid aspect-[4/3] place-items-center overflow-hidden ${accentClasses[test.accent]}`}>
          {test.thumbnail ? (
            <Image src={test.thumbnail} alt={localizedTest.title} fill sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw" className="object-cover object-[center_18%] transition duration-500 group-hover:scale-105" priority={Boolean(rank && rank <= 3)} />
          ) : (
            <>
              <div className="absolute inset-0 bg-[#f4f1df]" />
              <span className="relative text-5xl drop-shadow-lg transition duration-500 group-hover:scale-105 group-hover:-rotate-2 sm:text-6xl" aria-hidden="true">{test.icon}</span>
            </>
          )}
          {test.isNew && <span className="absolute right-3 top-3 z-10 rotate-2 rounded-sm border border-[#353535] bg-[#FFE98A] px-2.5 py-1 text-[9px] font-black tracking-wider text-ink">NEW</span>}
        </div>
        <div className="p-3.5 sm:p-4">
          <div className="flex items-center justify-between gap-2 text-[11px] font-bold sm:text-xs">
            <span className={`max-w-[58%] truncate rounded-sm bg-[#f4f1df] px-2.5 py-1 ${accentClasses[test.accent].split(" ").at(-1)}`}>{translatedCategoryKey ? t(translatedCategoryKey) : test.category}</span>
            <span className="shrink-0 text-slate-400">{localizeDuration(test.duration, locale)}</span>
          </div>
          <h3 className="mt-3 min-h-[2.75rem] line-clamp-2 text-sm font-black leading-5 tracking-tight text-ink transition group-hover:text-primary sm:text-base sm:leading-6">{localizedTest.cardTitle ?? localizedTest.title}</h3>
          <p className="mt-1.5 min-h-10 line-clamp-2 text-xs leading-5 text-slate-600 sm:text-sm">{localizedTest.description}</p>
          <div className="mt-3 flex items-center justify-between gap-2 border-t border-slate-100 pt-3 text-[10px] font-bold text-slate-400 sm:text-[11px]"><span className="shrink-0">{countLabel}</span><span className="truncate text-right">{t("common.participants", { count: localeNumber(locale, test.participants) })}</span></div>
        </div>
      </Link>
    </motion.article>
  );
}
