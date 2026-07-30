"use client";

import Link from "next/link";
import { useLanguage } from "@/components/i18n/LanguageProvider";

const links = [
  ["footer.about", "/about"], ["footer.privacy", "/privacy"],
  ["footer.terms", "/terms"], ["footer.contact", "/contact"],
] as const;

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="mt-20 border-t border-slate-200 bg-white">
      <div className="container-page py-10">
        <div className="flex flex-col justify-between gap-7 sm:flex-row">
          <div>
            <p className="font-black text-ink">미미테스트</p>
            <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">{t("footer.tagline")}</p>
          </div>
          <nav className="flex flex-wrap gap-x-5 gap-y-3 text-sm text-slate-600" aria-label={t("footer.menu")}>
            {links.map(([label, href]) => <Link key={href} href={href} className="hover:text-primary">{t(label)}</Link>)}
          </nav>
        </div>
        <div className="mt-8 border-t border-slate-100 pt-6 text-xs leading-5 text-slate-400">
          <p>© {new Date().getFullYear()} 미미테스트. All rights reserved.</p>
          <p className="mt-1">{t("footer.notice")}</p>
        </div>
      </div>
    </footer>
  );
}
