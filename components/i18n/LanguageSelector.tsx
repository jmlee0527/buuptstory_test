"use client";

import { localeOptions, type Locale } from "@/lib/i18n";
import { useLanguage } from "@/components/i18n/LanguageProvider";

export function LanguageSelector() {
  const { locale, setLocale, t } = useLanguage();
  return (
    <label className="relative flex shrink-0 items-center text-slate-500">
      <span className="pointer-events-none absolute left-2 text-xs font-black" aria-hidden="true">文</span>
      <span className="sr-only">{t("language.label")}</span>
      <select
        value={locale}
        onChange={(event) => setLocale(event.target.value as Locale)}
        aria-label={t("language.label")}
        className="h-9 max-w-[6.4rem] appearance-none rounded-md border border-slate-200 bg-white py-1 pl-7 pr-6 text-[11px] font-semibold text-slate-600 outline-none transition hover:border-slate-300 focus:border-primary sm:max-w-none sm:text-xs"
      >
        {localeOptions.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-2 text-[9px]" aria-hidden="true">▼</span>
    </label>
  );
}
