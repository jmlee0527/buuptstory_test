"use client";

import { useLanguage } from "@/components/i18n/LanguageProvider";

export function SkipLink() {
  const { t } = useLanguage();
  return <a href="#main-content" className="skip-link">{t("nav.skip")}</a>;
}
