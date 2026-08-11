"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SiteBrand } from "@/components/brand/SiteBrand";
import { siteConfig } from "@/lib/site";
import { LanguageSelector } from "@/components/i18n/LanguageSelector";
import { useLanguage } from "@/components/i18n/LanguageProvider";

export function Header() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const trackNav = (destination: string) => (window as Window & { gtag?: (command:string,event:string,params?:Record<string,string>)=>void }).gtag?.("event", "nav_click", { destination });
  const current = (key: "home" | "categories" | "articles" | "search") =>
    key === "home"
      ? pathname === "/"
      : key === "categories"
        ? pathname === "/categories" || pathname === "/tests" || pathname.startsWith("/category/") || pathname.startsWith("/tests/")
        : key === "articles" ? pathname.startsWith("/articles") : pathname === "/search";
  return (
    <header className="notebook-header sticky top-0 z-40 border-b">
      <div className="container-page flex min-h-[4.25rem] items-center justify-between gap-2 py-2">
        <Link
          href="/"
          className="min-w-0 rounded-md transition hover:opacity-90 focus-visible:outline-offset-4"
          aria-label={t("brand.home")}
        >
          <span className="sm:hidden">
            <SiteBrand showTagline={false} size="compact" className="[&>span:last-child]:hidden min-[390px]:[&>span:last-child]:flex" />
          </span>
          <span className="hidden sm:inline">
            <SiteBrand />
          </span>
        </Link>
        <div className="flex shrink-0 items-center gap-1">
        <nav className="flex items-center gap-0 text-[11px] font-semibold text-slate-600 sm:gap-1 sm:text-sm" aria-label={t("nav.main")}>
          <Link onClick={() => trackNav("home")} aria-current={current("home") ? "page" : undefined} className="rounded-sm px-1.5 py-2 transition hover:bg-[#fff1a8]/50 hover:text-ink aria-[current=page]:bg-[linear-gradient(transparent_58%,#FFE98A_58%)] aria-[current=page]:text-ink sm:px-3" href="/">
            {t("nav.home")}
          </Link>
          <Link onClick={() => trackNav("categories")} aria-current={current("categories") ? "page" : undefined} className="rounded-sm px-1.5 py-2 transition hover:bg-[#fff1a8]/50 hover:text-ink aria-[current=page]:bg-[linear-gradient(transparent_58%,#FFE98A_58%)] aria-[current=page]:text-ink sm:px-3" href="/categories">
            {t("nav.categories")}
          </Link>
          <Link onClick={() => trackNav("articles")} aria-current={current("articles") ? "page" : undefined} className="rounded-sm px-1.5 py-2 transition hover:bg-[#fff1a8]/50 hover:text-ink aria-[current=page]:bg-[linear-gradient(transparent_58%,#FFE98A_58%)] aria-[current=page]:text-ink sm:px-3" href="/articles">콘텐츠</Link>
          <Link onClick={() => trackNav("search")} aria-current={current("search") ? "page" : undefined} className="rounded-sm px-1.5 py-2 transition hover:bg-[#fff1a8]/50 hover:text-ink aria-[current=page]:bg-[linear-gradient(transparent_58%,#FFE98A_58%)] aria-[current=page]:text-ink sm:px-3" href="/search">
            {t("nav.search")}
          </Link>
        </nav>
        <LanguageSelector />
        </div>
      </div>
    </header>
  );
}
