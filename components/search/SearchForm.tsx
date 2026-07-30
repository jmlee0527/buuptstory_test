"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/i18n/LanguageProvider";

const track = (event: string, params?: Record<string, string>) =>
  (window as Window & { gtag?: (command: string, event: string, params?: Record<string, unknown>) => void }).gtag?.("event", event, params);

export function SearchForm({ initialQuery }: { initialQuery: string }) {
  const router = useRouter();
  const { t } = useLanguage();
  const [value, setValue] = useState(initialQuery);
  const first = useRef(true);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    input.current?.focus();
    track("search_open");
  }, []);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const timer = window.setTimeout(() => {
      const normalized = value.trim().replace(/\s+/g, " ");
      router.replace(normalized ? `/search?q=${encodeURIComponent(normalized)}` : "/search", { scroll: false });
    }, 300);
    return () => clearTimeout(timer);
  }, [router, value]);

  return (
    <form action="/search" method="get" role="search" onSubmit={() => track("search_submit", { query: value.trim() })} className="mt-7 rounded-2xl border border-slate-200 bg-white p-2 shadow-card">
      <div className="flex flex-col gap-2 min-[520px]:flex-row">
        <label htmlFor="test-search" className="sr-only">{t("search.inputLabel")}</label>
        <input
          ref={input}
          id="test-search"
          name="q"
          type="search"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={(event) => {
            if (event.key==="Escape") {
              setValue("");
              event.currentTarget.blur();
            }
          }}
          placeholder={t("search.placeholder")}
          autoComplete="off"
          className="min-h-12 min-w-0 flex-1 rounded-xl border-0 bg-slate-50 px-4 text-base text-ink outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-primary"
        />
        <div className="flex gap-2">
          {value && (
            <button type="button" onClick={() => { setValue(""); input.current?.focus(); }} aria-label={t("search.clearLabel")} className="min-h-12 flex-1 rounded-xl px-3 text-sm font-bold text-slate-500 hover:bg-slate-100 min-[520px]:flex-none">
              {t("search.clear")}
            </button>
          )}
          <button type="submit" className="min-h-12 flex-1 rounded-xl bg-primary px-4 text-sm font-black text-white transition hover:bg-blue-700 min-[520px]:flex-none sm:px-5">
            {t("search.submit")}
          </button>
        </div>
      </div>
    </form>
  );
}
