"use client";

import { motion } from "framer-motion";
import type { FanQuizTheme } from "@/config/fanQuizThemes";
import { useLanguage } from "@/components/i18n/LanguageProvider";

export function FanQuizProgress({ progress, theme: _theme, reduceMotion }: { progress: number; theme: FanQuizTheme; reduceMotion?: boolean | null }) {
  const { t } = useLanguage();
  return (
    <div
      className="mt-4 h-2 overflow-hidden rounded-sm bg-[var(--fan-surface-soft)]"
      role="progressbar"
      aria-label={t("runner.quizProgress")}
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <motion.div
        className="h-full rounded-sm bg-[var(--fan-primary)]"
        animate={{ width: `${Math.max(progress, 4)}%` }}
        transition={{ duration: reduceMotion ? 0 : 0.2 }}
      />
    </div>
  );
}
