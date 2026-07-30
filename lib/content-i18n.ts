import type { Locale } from "@/lib/i18n";

export type ContentDictionary = Record<string, string>;

const contentDictionaryLoaders: Record<Exclude<Locale, "ko">, () => Promise<ContentDictionary>> = {
  en: () => import("@/locales/content-en.json").then((module) => module.default),
  ja: () => import("@/locales/content-ja.json").then((module) => module.default),
  zh: () => import("@/locales/content-zh.json").then((module) => module.default),
};

export function loadContentDictionary(locale: Exclude<Locale, "ko">) {
  return contentDictionaryLoaders[locale]();
}
