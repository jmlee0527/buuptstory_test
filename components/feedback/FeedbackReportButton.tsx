"use client";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { FeedbackReportModal } from "@/components/feedback/FeedbackReportModal";
import { shouldHideFeedback } from "@/components/feedback/feedback-visibility";
import { useLanguage } from "@/components/i18n/LanguageProvider";

export function FeedbackReportButton() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  if (shouldHideFeedback(pathname)) return null;
  return <>
    <button ref={buttonRef} type="button" onClick={() => setOpen(true)} aria-label={t("feedback.open")} className="paper-button fixed bottom-[max(5.5rem,calc(env(safe-area-inset-bottom)+4.5rem))] right-4 z-40 grid size-12 place-items-center bg-[#4267A8] text-xl text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4267A8] lg:bottom-8 lg:right-6 lg:flex lg:h-12 lg:w-auto lg:gap-2 lg:px-5 lg:text-sm lg:font-black">
      <span aria-hidden="true">💬</span><span className="hidden lg:inline">{t("feedback.button")}</span>
    </button>
    {open && <FeedbackReportModal onClose={() => setOpen(false)} returnFocusRef={buttonRef} />}
  </>;
}
