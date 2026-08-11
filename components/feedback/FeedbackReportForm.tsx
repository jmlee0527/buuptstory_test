"use client";
import { FormEvent, useEffect, useRef, useState } from "react";
import { FEEDBACK_LIMITS, REPORT_TYPES } from "@/lib/feedback";
import type { ReportType } from "@/lib/feedback";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import type { TranslationKey } from "@/lib/i18n";

type Notice = { kind: "idle" | "error" | "success"; message: string };
const IDLE: Notice = { kind: "idle", message: "" };
function collectPageContext() {
  const text = document.querySelector("main")?.textContent ?? "";
  const progress = text.match(/(\d{1,3})\s*\/\s*(\d{1,3})/);
  const segments = location.pathname.split("/").filter(Boolean), testIndex = segments.indexOf("tests");
  const testId = testIndex >= 0 ? segments[testIndex + 1] : segments[0]?.includes("test") ? segments[0] : "";
  return { pageUrl: location.href, pageTitle: document.title, testName: document.querySelector("main h1")?.textContent?.trim() ?? "", testId, questionNumber: progress ? Number(progress[1]) : undefined, totalQuestions: progress ? Number(progress[2]) : undefined, userAgent: navigator.userAgent, screenSize: `${window.innerWidth}×${window.innerHeight}`, referrer: document.referrer, submittedAt: new Date().toISOString() };
}

export function FeedbackReportForm({ onSuccess }: { onSuccess: () => void }) {
  const { t } = useLanguage();
  const [type, setType] = useState<ReportType>(REPORT_TYPES[0]), [content, setContent] = useState(""), [contact, setContact] = useState(""), [website, setWebsite] = useState(""), [submitting, setSubmitting] = useState(false), [notice, setNotice] = useState<Notice>(IDLE);
  const closeTimer = useRef<number | null>(null);
  useEffect(() => () => {
    if (closeTimer.current !== null) window.clearTimeout(closeTimer.current);
  }, []);
  const submit = async (event: FormEvent) => {
    event.preventDefault(); const trimmed = content.trim();
    if (trimmed.length < FEEDBACK_LIMITS.minimumContent) return setNotice({ kind: "error", message: t("feedback.error.minimum", { count: FEEDBACK_LIMITS.minimumContent }) });
    if (trimmed.length > FEEDBACK_LIMITS.maximumContent) return setNotice({ kind: "error", message: t("feedback.error.maximum") });
    if (contact.trim().length > FEEDBACK_LIMITS.maximumContact) return setNotice({ kind: "error", message: t("feedback.error.contact") });
    const last = Number(localStorage.getItem("mimi-feedback-last-success") ?? 0);
    if (Date.now() - last < 30_000) return setNotice({ kind: "error", message: t("feedback.error.rate") });
    setSubmitting(true); setNotice(IDLE);
    try {
      const response = await fetch("/api/feedback", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ type, content: trimmed, contact: contact.trim(), website, ...collectPageContext() }) });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(typeof result.message === "string" ? result.message : t("feedback.error.send"));
      if (result.development === true) throw new Error("로컬 개발 환경에 Discord 웹훅이 설정되지 않았습니다. .env.local을 확인한 뒤 개발 서버를 다시 시작해 주세요.");
      localStorage.setItem("mimi-feedback-last-success", String(Date.now())); setContent(""); setContact(""); setWebsite("");
      setNotice({ kind: "success", message: t("feedback.success") });
      closeTimer.current = window.setTimeout(onSuccess, 1800);
    } catch (error) { setNotice({ kind: "error", message: error instanceof Error ? error.message : t("feedback.error.send") }); }
    finally { setSubmitting(false); }
  };
  return <form onSubmit={submit} className="space-y-5 p-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:p-7">
    <div><label htmlFor="feedback-type" className="text-sm font-black text-ink">{t("feedback.type")} <span className="text-rose-500">*</span></label><select data-feedback-initial id="feedback-type" value={type} onChange={(event) => setType(event.target.value as ReportType)} className="mt-2 min-h-12 w-full rounded-sm border border-[#353535]/30 bg-[#FFFDF6] px-4 font-semibold text-ink focus:outline-none focus:ring-2 focus:ring-[#4267A8]">{REPORT_TYPES.map((item) => { const typeKeys: Record<ReportType, TranslationKey> = { "개선 의견": "feedback.type.improvement", "문제 및 정답 오류": "feedback.type.answer", "기능 작동 오류": "feedback.type.function", "기타": "feedback.type.other" }; return <option key={item} value={item}>{t(typeKeys[item])}</option>; })}</select></div>
    <div><div className="flex items-center justify-between gap-3"><label htmlFor="feedback-content" className="text-sm font-black text-ink">{t("feedback.content")} <span className="text-rose-500">*</span></label><span className="text-xs font-bold text-slate-400">{content.length}/1,000</span></div><textarea id="feedback-content" aria-required="true" maxLength={FEEDBACK_LIMITS.maximumContent} value={content} onChange={(event) => setContent(event.target.value)} placeholder={t("feedback.contentPlaceholder")} rows={6} className="mt-2 min-h-36 w-full resize-y rounded-sm border border-[#353535]/30 bg-[#FFFDF6] px-4 py-3 leading-6 text-ink focus:outline-none focus:ring-2 focus:ring-[#4267A8]" /></div>
    <div><label htmlFor="feedback-contact" className="text-sm font-black text-ink">{t("feedback.contact")} <span className="font-medium text-slate-400">{t("feedback.optional")}</span></label><input id="feedback-contact" type="text" maxLength={FEEDBACK_LIMITS.maximumContact} value={contact} onChange={(event) => setContact(event.target.value)} placeholder="example@email.com" className="mt-2 min-h-12 w-full rounded-sm border border-[#353535]/30 bg-[#FFFDF6] px-4 text-ink focus:outline-none focus:ring-2 focus:ring-[#4267A8]" /><p className="mt-2 text-xs leading-5 text-slate-500">{t("feedback.contactHelp")}</p></div>
    <div className="pointer-events-none absolute h-px w-px overflow-hidden opacity-0" aria-hidden="true"><label htmlFor="feedback-website">웹사이트</label><input id="feedback-website" tabIndex={-1} autoComplete="off" value={website} onChange={(event) => setWebsite(event.target.value)} /></div>
    <p className="rounded-sm border border-[#353535]/15 bg-[#FFE98A]/35 p-4 text-xs font-semibold leading-5 text-amber-900">{t("feedback.safety")}</p>
    {notice.message && <p role={notice.kind === "error" ? "alert" : "status"} aria-live="polite" className={`rounded-sm p-4 text-sm font-bold ${notice.kind === "success" ? "bg-emerald-50 text-emerald-800" : "bg-rose-50 text-rose-700"}`}>{notice.message}</p>}
    <button type="submit" disabled={submitting} className="paper-button min-h-12 w-full bg-[#4267A8] px-5 py-3.5 font-black text-white disabled:cursor-not-allowed disabled:opacity-60">{submitting ? t("feedback.submitting") : t("feedback.submit")}</button>
  </form>;
}
