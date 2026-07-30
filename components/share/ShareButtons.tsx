"use client";

import { useState } from "react";
import { absoluteUrl } from "@/lib/site";
import { useLanguage } from "@/components/i18n/LanguageProvider";

declare global {
  interface Window {
    Kakao?: {
      isInitialized: () => boolean;
      init: (key: string) => void;
      Share: { sendDefault: (options: Record<string, unknown>) => void };
    };
  }
}

type Props = { title: string; description: string; path: string };

export function ShareButtons({ title, description, path }: Props) {
  const [copied, setCopied] = useState(false);
  const { t } = useLanguage();
  const url = absoluteUrl(path);

  const copy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  const nativeShare = async () => {
    if (navigator.share) await navigator.share({ title, text: description, url });
    else await copy();
  };

  const shareKakao = async () => {
    const key = process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY;
    if (!key) {
      if (navigator.share) await navigator.share({ title, text: description, url });
      else await copy();
      return;
    }
    if (!window.Kakao) {
      await new Promise<void>((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js";
        script.crossOrigin = "anonymous";
        script.onload = () => resolve();
        script.onerror = () => reject(new Error("Kakao SDK load failed"));
        document.head.appendChild(script);
      }).catch(() => undefined);
    }
    if (!window.Kakao) return copy();
    if (!window.Kakao.isInitialized()) window.Kakao.init(key);
    window.Kakao.Share.sendDefault({
      objectType: "feed",
      content: { title, description, imageUrl: `${window.location.origin}/opengraph-image`, link: { mobileWebUrl: url, webUrl: url } },
      buttons: [{ title: t("runner.result"), link: { mobileWebUrl: url, webUrl: url } }],
    });
  };

  const items = [
    { label: t("share.kakao"), className: "bg-[#FEE500] text-[#191919]", onClick: shareKakao },
    { label: copied ? t("share.copied") : t("share.copy"), className: "bg-slate-100 text-slate-700", onClick: copy },
    { label: t("share.native"), className: "bg-white text-slate-700", onClick: nativeShare },
    { label: "X", className: "bg-black text-white", href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}` },
    { label: t("share.facebook"), className: "bg-[#1877F2] text-white", href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}` },
  ];

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-5" aria-label={t("share.aria")}>
      {items.map((item) => item.href ? (
        <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" className={`rounded-xl px-3 py-3 text-center text-sm font-bold transition hover:opacity-90 ${item.className}`}>{item.label}</a>
      ) : (
        <button key={item.label} type="button" onClick={item.onClick} className={`rounded-xl px-3 py-3 text-sm font-bold transition hover:opacity-90 ${item.className}`}>{item.label}</button>
      ))}
    </div>
  );
}
