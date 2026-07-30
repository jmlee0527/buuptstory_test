"use client";

import Link from "next/link";
import { useLanguage } from "@/components/i18n/LanguageProvider";
export default function NotFound() {
  const { t } = useLanguage();
  return <div className="container-page py-24 text-center"><p className="text-sm font-black text-primary">404</p><h1 className="mt-3 text-3xl font-black text-ink">{t("error.notFound")}</h1><p className="mt-4 text-slate-600">{t("error.notFoundDescription")}</p><Link href="/" className="mt-8 inline-flex rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white">{t("error.home")}</Link></div>;
}
