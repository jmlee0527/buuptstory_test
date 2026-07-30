import type { ReactNode } from "react";
import type { FanQuizTheme } from "@/config/fanQuizThemes";
import { useLanguage } from "@/components/i18n/LanguageProvider";

type Option = {
  label: string;
  text: string;
  selected: boolean;
  onClick: () => void;
  disabled?: boolean;
};

type Props = {
  theme: FanQuizTheme;
  questionNumber: number;
  difficulty?: string;
  question: ReactNode;
  options: Option[];
  focusLabel?: string;
};

export function FanQuizQuestionCard({ theme: _theme, questionNumber, question, options, focusLabel }: Props) {
  const { t } = useLanguage();
  return (
    <section className="relative overflow-hidden rounded-lg border border-[var(--fan-border)] bg-[var(--fan-surface)] p-5 shadow-[0_6px_20px_var(--fan-paper-shadow)] sm:p-9">
      <div className="absolute right-6 top-5 hidden rotate-[-3deg] border-b-2 border-[var(--fan-accent)] px-1 pb-0.5 text-[10px] font-extrabold tracking-[.12em] text-[var(--fan-accent)] sm:block" aria-hidden="true">
        MIMI FAN EXAM
      </div>
      <div className="relative flex flex-wrap items-center justify-between gap-3">
        <span className="text-sm font-black text-[var(--fan-primary)]">Q.{String(questionNumber).padStart(2, "0")}</span>
      </div>
      <h2 className="relative mt-5 border-t border-[var(--fan-border)] pt-5 break-words text-balance text-xl font-bold leading-[1.55] text-[var(--fan-text-primary)] sm:text-2xl">{question}</h2>
      <div className="relative mt-7 grid gap-3" role="radiogroup" aria-label={focusLabel ?? t("fan.correctAnswer")}>
        {options.map((option) => (
          <button
            key={option.label}
            type="button"
            role="radio"
            aria-checked={option.selected}
            aria-label={`${option.label}번 보기: ${option.text}`}
            disabled={option.disabled}
            onClick={option.onClick}
            className={`flex min-h-16 items-center gap-4 rounded-lg border px-4 text-left text-[15px] font-medium leading-6 transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--fan-primary)] disabled:cursor-wait sm:px-5 ${
              option.selected
                ? "border-[var(--fan-selected)] bg-[var(--fan-selected-soft)] text-[var(--fan-primary)]"
                : "border-[var(--fan-border)] bg-[var(--fan-surface)] text-[var(--fan-text-primary)] hover:border-[var(--fan-selected)] hover:bg-[#f8f5ee]"
            }`}
          >
            <span className={`grid size-8 shrink-0 place-items-center rounded-full border text-sm font-bold ${option.selected ? "border-[var(--fan-primary)] bg-[var(--fan-primary)] text-white" : "border-[var(--fan-border)] bg-[var(--fan-primary-soft)] text-[var(--fan-primary)]"}`}>
              {option.selected ? "✓" : option.label}
            </span>
            <span className="min-w-0 break-words">{option.text}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
