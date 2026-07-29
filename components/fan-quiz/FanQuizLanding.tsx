import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { TestSeoContent } from "@/components/seo/TestSeoContent";
import { FanQuizArtwork } from "@/components/fan-quiz/FanQuizArtwork";
import { FanQuizMetaBadges } from "@/components/fan-quiz/FanQuizMetaBadges";
import { getTestFanQuizTheme } from "@/config/fanQuizThemes";
import { getFanQuizEntityName } from "@/lib/test-seo";
import type { TestDefinition } from "@/lib/types";

type Props = {
  test: TestDefinition;
  insight: string;
  answerType?: string;
};

export function FanQuizLanding({ test, insight, answerType = "4지선다" }: Props) {
  const itemCount = test.itemCount ?? test.questions.length;
  const theme = getTestFanQuizTheme(test);
  const entityName = getFanQuizEntityName(test);
  const style = {
    "--fan-primary": theme.primary,
    "--fan-primary-strong": theme.primaryStrong,
    "--fan-secondary": theme.secondary,
    "--fan-accent": theme.accent,
    "--fan-background": theme.background,
    "--fan-surface": theme.surface,
    "--fan-text": theme.text,
    "--fan-muted": theme.mutedText,
    "--fan-border": theme.border,
    "--fan-shadow": theme.shadow,
  } as CSSProperties;
  const posterStyle = { boxShadow: `0 28px 70px ${theme.shadow}` };

  return (
    <div style={style} className="bg-[var(--fan-background)]">
      <div className="container-page py-10 sm:py-14">
        <Breadcrumbs items={[{ name: "테스트", href: "/tests" }, { name: test.shortTitle }]} />
        <section style={posterStyle} className="container-wide-readable relative overflow-hidden rounded-[2rem] border border-[var(--fan-border)] bg-[var(--fan-surface)]">
          <div className="absolute inset-0 opacity-50 [background-image:radial-gradient(circle_at_1px_1px,var(--fan-border)_1px,transparent_0)] [background-size:22px_22px]" aria-hidden="true" />
          <div className="absolute left-5 top-5 h-8 w-24 rotate-[-5deg] rounded-md bg-white/75 shadow-sm" aria-hidden="true" />
          <div className="absolute bottom-8 right-5 h-8 w-24 rotate-6 rounded-md bg-white/70 shadow-sm" aria-hidden="true" />
          <div className="relative grid gap-8 px-5 pb-7 pt-9 sm:px-9 sm:pb-10 lg:grid-cols-[1.08fr_.92fr] lg:items-center lg:px-12 lg:py-12">
            <div className="min-w-0">
              <Link href={`/category/${encodeURIComponent(test.category)}`} className="inline-flex rounded-full border border-[var(--fan-border)] bg-white px-3 py-1.5 text-xs font-black tracking-[.16em] text-[var(--fan-primary)] shadow-sm">
                {theme.label}
              </Link>
              <h1 className="mt-5 text-balance text-[clamp(2rem,5vw,4.6rem)] font-black leading-[1.04] tracking-tight text-[var(--fan-text)]">
                {test.title}
              </h1>
              <p className="mt-5 max-w-2xl text-base font-semibold leading-7 text-[var(--fan-muted)] sm:text-lg">{test.description}</p>
              <div className="mt-6">
                <FanQuizMetaBadges
                  theme={theme}
                  badges={[
                    { label: "문항 수", value: `총 ${itemCount}문항` },
                    { label: "예상 시간", value: test.duration },
                    { label: "문제 유형", value: answerType },
                    { label: "특징", value: "팬 지식 테스트" },
                  ]}
                />
              </div>
              <Link
                href={`/tests/${test.slug}?start=1`}
                className="mt-8 inline-flex min-h-14 w-full items-center justify-center rounded-2xl bg-[var(--fan-primary)] px-6 text-base font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[var(--fan-primary-strong)] focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-[var(--fan-primary)] sm:w-auto"
                style={{ boxShadow: `0 16px 32px ${theme.shadow}` }}
              >
                {theme.ctaLabel}
              </Link>
              <p className="mt-3 text-center text-xs text-[var(--fan-muted)] sm:text-left">응답은 서버에 저장되지 않습니다.</p>
            </div>
            <div className="relative">
              {test.thumbnail ? (
                <div className="relative mx-auto aspect-[4/3] w-full max-w-sm overflow-hidden rounded-[1.75rem] border-4 border-white bg-white shadow-xl">
                  <Image src={test.thumbnail} alt={test.title} fill sizes="(max-width:1024px) 90vw, 420px" className="object-cover object-center" priority />
                  <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-black tracking-[.14em] text-[var(--fan-primary)] shadow-sm">FAN QUIZ</div>
                  <div className="absolute bottom-4 right-4 rounded-full bg-[var(--fan-primary)] px-3 py-1 text-xs font-black text-white shadow-sm">{test.icon} START</div>
                </div>
              ) : (
                <FanQuizArtwork theme={theme} label={test.icon} />
              )}
            </div>
          </div>
        </section>

        <section className="container-wide-readable mt-10 rounded-[1.75rem] border border-[var(--fan-border)] bg-white/85 p-6 shadow-card sm:p-8">
          <span className="inline-flex rounded-full bg-[var(--fan-background)] px-3 py-1 text-xs font-black text-[var(--fan-primary)]">FAN KIT NOTE</span>
          <h2 className="mt-4 text-xl font-black text-[var(--fan-text)]">이 팬 퀴즈로 확인할 수 있어요</h2>
          <p className="mt-3 max-w-3xl leading-7 text-[var(--fan-muted)]">{insight}</p>
        </section>

        <section className="container-wide-readable mt-6 rounded-[1.5rem] border border-[var(--fan-border)] bg-white/70 p-5 shadow-sm sm:p-6">
          <h2 className="text-base font-black text-[var(--fan-text)]">{entityName} 팬퀴즈를 찾고 있다면</h2>
          <p className="mt-2 text-sm leading-7 text-[var(--fan-muted)]">
            {test.shortTitle}는 {entityName}에 관한 문제를 풀며 팬심을 확인할 수 있는 무료 팬 퀴즈입니다. 짧은 문제를 풀고 내 팬심 레벨을 바로 확인해 보세요.
          </p>
        </section>

        <TestSeoContent test={test} itemCount={itemCount} answerType={answerType} />
        <div className="container-wide-readable mt-8 text-center">
          <Link href={`/category/${encodeURIComponent(test.category)}`} className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[var(--fan-border)] bg-white px-5 text-sm font-bold text-[var(--fan-primary)] hover:bg-[var(--fan-background)]">
            다른 팬 퀴즈 둘러보기
          </Link>
        </div>
      </div>
    </div>
  );
}
