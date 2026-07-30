import en from "@/locales/en.json";
import ja from "@/locales/ja.json";
import ko from "@/locales/ko.json";
import zh from "@/locales/zh.json";

export const locales = ["ko", "en", "ja", "zh"] as const;
export type Locale = (typeof locales)[number];
export type TranslationKey = keyof typeof ko;
export type TranslationValues = Record<string, string | number>;

export const defaultLocale: Locale = "ko";
export const localeStorageKey = "mimi-locale";
export const localeCookieName = "mimi_locale";

export const localeOptions: ReadonlyArray<{ value: Locale; label: string; htmlLang: string }> = [
  { value: "ko", label: "한국어", htmlLang: "ko" },
  { value: "en", label: "English", htmlLang: "en" },
  { value: "ja", label: "日本語", htmlLang: "ja" },
  { value: "zh", label: "中文", htmlLang: "zh-CN" },
];

const dictionaries: Record<Locale, Record<TranslationKey, string>> = {
  ko,
  en,
  ja,
  zh,
};

export function isLocale(value: string | null | undefined): value is Locale {
  return locales.includes(value as Locale);
}

export function translate(locale: Locale, key: TranslationKey, values: TranslationValues = {}) {
  const template = dictionaries[locale][key] ?? dictionaries.ko[key] ?? key;
  return Object.entries(values).reduce(
    (text, [name, value]) => text.replaceAll(`{${name}}`, String(value)),
    template,
  );
}

export function localeNumber(locale: Locale, value: number) {
  const numberLocale = locale === "ko" ? "ko-KR" : locale === "zh" ? "zh-CN" : locale;
  return value.toLocaleString(numberLocale);
}

export function categoryKey(category: string): TranslationKey | null {
  if (category === "성격.심리") return "category.personality";
  if (category === "연애.관계") return "category.relationship";
  if (category === "직업.일상") return "category.work";
  if (category === "팬 퀴즈") return "category.fan";
  if (category === "건강.운세") return "category.health";
  return null;
}
