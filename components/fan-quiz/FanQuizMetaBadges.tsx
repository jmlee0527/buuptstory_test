import type { FanQuizTheme } from "@/config/fanQuizThemes";

type Badge = {
  label: string;
  value: string;
};

export function FanQuizMetaBadges({ badges, theme: _theme }: { badges: Badge[]; theme: FanQuizTheme }) {
  return (
    <dl className="border-y border-[var(--fan-border)]">
      {badges.map((badge) => (
        <div key={`${badge.label}-${badge.value}`} className="grid grid-cols-[6.5rem_1fr] border-b border-[var(--fan-border)] py-3 text-sm last:border-b-0">
          <dt className="font-bold text-[var(--fan-text-secondary)]">{badge.label}</dt>
          <dd className="font-semibold text-[var(--fan-text-primary)]">{badge.value}</dd>
        </div>
      ))}
    </dl>
  );
}
