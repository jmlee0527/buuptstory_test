"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
  defaultLocale,
  isLocale,
  localeCookieName,
  localeOptions,
  localeStorageKey,
  translate,
  type Locale,
  type TranslationKey,
  type TranslationValues,
} from "@/lib/i18n";
import { ContentTranslator } from "@/components/i18n/ContentTranslator";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey, values?: TranslationValues) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function applyDocumentLanguage(locale: Locale) {
  const option = localeOptions.find((item) => item.value === locale);
  document.documentElement.lang = option?.htmlLang ?? "ko";
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  useEffect(() => {
    const stored = localStorage.getItem(localeStorageKey);
    const nextLocale = isLocale(stored) ? stored : defaultLocale;
    setLocaleState(nextLocale);
    applyDocumentLanguage(nextLocale);
  }, []);

  const setLocale = useCallback((nextLocale: Locale) => {
    setLocaleState(nextLocale);
    localStorage.setItem(localeStorageKey, nextLocale);
    document.cookie = `${localeCookieName}=${nextLocale}; Path=/; Max-Age=31536000; SameSite=Lax`;
    applyDocumentLanguage(nextLocale);
  }, []);

  const value = useMemo<LanguageContextValue>(() => ({
    locale,
    setLocale,
    t: (key, values) => translate(locale, key, values),
  }), [locale, setLocale]);

  return (
    <LanguageContext.Provider value={value}>
      <ContentTranslator locale={locale} />
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}
