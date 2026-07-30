"use client";
import { useEffect, useRef } from "react";
import { FeedbackReportForm } from "@/components/feedback/FeedbackReportForm";
import { useLanguage } from "@/components/i18n/LanguageProvider";

export function FeedbackReportModal({ onClose, returnFocusRef }: { onClose: () => void; returnFocusRef: React.RefObject<HTMLButtonElement | null> }) {
  const { t } = useLanguage();
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const modal = modalRef.current;
    const focusables = () => Array.from(modal?.querySelectorAll<HTMLElement>('button:not([disabled]),select:not([disabled]),textarea:not([disabled]),input:not([disabled]):not([tabindex="-1"]),a[href]') ?? []);
    (modal?.querySelector<HTMLElement>("[data-feedback-initial]") ?? focusables()[0])?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); onClose(); return; }
      if (event.key !== "Tab") return;
      const items = focusables(); if (!items.length) return;
      const first = items[0], last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => { document.body.style.overflow = previousOverflow; document.removeEventListener("keydown", onKeyDown); returnFocusRef.current?.focus(); };
  }, [onClose, returnFocusRef]);

  return <div data-testid="feedback-backdrop" className="fixed inset-0 z-[90] flex items-end justify-center bg-slate-950/50 p-0 backdrop-blur-sm sm:items-center sm:p-5" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <div ref={modalRef} role="dialog" aria-modal="true" aria-labelledby="feedback-title" className="max-h-[min(92dvh,760px)] w-full max-w-xl overflow-y-auto overscroll-contain rounded-t-[2rem] bg-white shadow-2xl sm:rounded-[2rem]">
      <header className="sticky top-0 z-10 flex items-start justify-between border-b border-slate-100 bg-white/95 px-5 py-4 backdrop-blur sm:px-7"><div><p className="text-xs font-black text-blue-600">MIMI TEST FEEDBACK</p><h2 id="feedback-title" className="mt-1 text-xl font-black text-ink">{t("feedback.title")}</h2></div><button type="button" onClick={onClose} aria-label={t("feedback.close")} className="grid size-11 place-items-center rounded-full bg-slate-100 text-xl text-slate-600 hover:bg-slate-200">×</button></header>
      <FeedbackReportForm onSuccess={onClose} />
    </div>
  </div>;
}
