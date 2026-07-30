"use client";

import { useLanguage } from "@/components/i18n/LanguageProvider";

export function MobileShareDock() {
  const { t } = useLanguage();
  return <a href="#share-card" className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-1/2 z-30 flex min-h-12 w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 items-center justify-center rounded-2xl bg-ink px-6 text-sm font-black text-white shadow-2xl shadow-slate-500/40 transition active:scale-[.98] lg:hidden">{t("share.title")} <span className="ml-2" aria-hidden="true">↗</span></a>;
}
