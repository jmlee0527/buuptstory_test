import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ShareButtons } from "@/components/share/ShareButtons";
import { ShareImageCard } from "@/components/share/ShareImageCard";
import { MobileShareDock } from "@/components/share/MobileShareDock";
import { AdRectangle } from "@/components/ads/AdRectangle";
import { menheraDomainDescriptions, menheraDomainLabels, menheraDomainOrder, menheraLevels, type MenheraLevel } from "@/data/menhera-test";
import type { MenheraDomainScores } from "@/lib/menhera-engine";

type Props = { level: MenheraLevel; score: number | null; domainScores: MenheraDomainScores | null; encodedAnswers: string | null };

export function MenheraResult({ level, score, domainScores, encodedAnswers }: Props) {
  const shownScore = score ?? Math.round((level.min + level.max) / 2);
  const scores = domainScores ?? Object.fromEntries(menheraDomainOrder.map((domain, index) => [domain, Math.max(0, Math.min(100, shownScore + (index - 2) * 4))])) as MenheraDomainScores;
  const sharePath = `/menhera-test/result/${level.slug}${encodedAnswers ? `?a=${encodedAnswers}` : ""}`;
  const shareTitle = `나의 멘헤라 지수는 ${shownScore}% · Lv.${level.level} ${level.intensity} ${level.icon}`;

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#fce7f3_0,#fdf2f8_28%,#fffdf6_100%)] pb-24 pt-8 sm:py-14">
      <div className="container-page">
        <Breadcrumbs items={[{ name: "테스트", href: "/tests" }, { name: "멘헤라 테스트", href: "/tests/menhera-test" }, { name: `Lv.${level.level} 결과` }]} />
        <div className="mx-auto max-w-4xl">
          <section className="overflow-hidden rounded-3xl border border-pink-100 bg-white text-center shadow-card">
            <div className="bg-gradient-to-b from-pink-50 to-white px-6 pb-7 pt-10 sm:pt-14">
              <p className="text-sm font-extrabold text-pink-600">나의 멘헤라 지수</p>
              <div className="mt-5 text-7xl" aria-hidden="true">{level.icon}</div>
              <h1 className="mt-4 text-4xl font-black tracking-tight text-ink sm:text-5xl">{shownScore}<span className="text-2xl text-pink-500">%</span></h1>
              <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-pink-100 px-4 py-2 text-sm font-black text-pink-800">Lv.{level.level} · {level.intensity}</div>
              <p className="mx-auto mt-4 max-w-xl text-base font-bold leading-7 text-slate-600">{level.summary}</p>
              <div className="mx-auto mt-7 grid size-36 place-items-center rounded-full p-2 shadow-lg" style={{ background: `conic-gradient(#DB2777 ${shownScore}%, #FCE7F3 0)` }}>
                <div className="grid size-full place-items-center rounded-full bg-white"><span><strong className="block text-3xl font-black text-pink-600">Lv.{level.level}</strong><span className="mt-1 block text-[11px] font-bold text-slate-400">강도 {level.intensity}</span></span></div>
              </div>
            </div>
            <div className="px-6 pb-8 sm:px-10"><p className="mx-auto max-w-2xl text-left leading-7 text-slate-700">{level.description}</p><p className="mx-auto mt-5 max-w-2xl rounded-2xl bg-slate-50 px-5 py-4 text-left text-xs font-bold leading-6 text-slate-500">레벨이 높다고 더 좋거나 능숙하다는 뜻이 아닙니다. 현재 응답에서 관계 관련 생각과 감정 반응이 나타난 강도만 보여줍니다.</p></div>
          </section>

          <AdRectangle />

          <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">
            <h2 className="text-xl font-extrabold text-ink">5개 영역별 성향</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">각 영역에서 2문항씩 출제한 결과입니다. 문항 수가 적으므로 현재 반응을 가볍게 비교하는 용도로 봐주세요.</p>
            <div className="mt-6 grid gap-4">
              {menheraDomainOrder.map((domain) => {
                const value = scores[domain];
                return <div key={domain} className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4"><div className="flex items-center justify-between gap-3 text-sm font-black text-slate-700"><span>{menheraDomainLabels[domain]}</span><span className="text-pink-600">{value}%</span></div><div className="mt-2 h-3 overflow-hidden rounded-full bg-white"><div className="h-full rounded-full bg-gradient-to-r from-fuchsia-500 via-pink-500 to-rose-400" style={{ width: `${value}%` }} /></div><p className="mt-2 text-xs font-semibold leading-5 text-slate-500">{menheraDomainDescriptions[domain]}</p></div>;
              })}
            </div>
          </section>

          <section className="mt-8 rounded-3xl border border-pink-100 bg-pink-50/70 p-6 sm:p-8">
            <h2 className="text-lg font-extrabold text-pink-950">결과를 볼 때 기억해주세요</h2>
            <p className="mt-3 text-sm leading-7 text-pink-950">‘멘헤라’는 온라인에서 관계와 감정 반응을 가볍게 표현할 때 쓰이는 말이지만 의학적 진단명이 아닙니다. 이 테스트 역시 재미와 자기이해를 위한 성향 콘텐츠이며 정신건강 상태나 질환을 진단하지 않습니다. 반복적인 불안이나 관계 갈등으로 일상생활이 어렵다면 전문가와 상담해보세요.</p>
          </section>

          <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">
            <h2 className="text-xl font-extrabold text-ink">멘헤라 지수 Lv.1~Lv.10</h2>
            <ul className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">{menheraLevels.map((item) => <li key={item.slug}><Link href={`/menhera-test/result/${item.slug}`} className={`block rounded-2xl border px-3 py-4 text-center transition hover:-translate-y-0.5 ${item.slug === level.slug ? "border-pink-400 bg-pink-50" : "border-slate-200 bg-white hover:border-pink-200"}`}><span className="text-2xl" aria-hidden="true">{item.icon}</span><p className="mt-2 text-xs font-extrabold text-ink">Lv.{item.level} · {item.intensity}</p><p className="mt-1 text-[11px] font-black text-slate-400">{item.min}~{item.max}%</p></Link></li>)}</ul>
          </section>

          <section id="share-card" className="mt-10 grid scroll-mt-24 gap-6 rounded-3xl bg-ink p-6 text-white sm:p-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
            <ShareImageCard emoji={level.icon} eyebrow="나의 멘헤라 지수" title={`${shownScore}% · Lv.${level.level}`} subtitle={level.intensity} badge="나는 멘헤라일까?" accent="purple" />
            <div><h2 className="text-xl font-extrabold">친구의 멘헤라 지수는?</h2><p className="mt-2 text-sm leading-6 text-slate-300">결과를 공유하고 서로의 관계 반응 패턴을 가볍게 비교해보세요.</p><div className="mt-5"><ShareButtons title={shareTitle} description={level.summary} path={sharePath} /></div></div>
          </section>

          <div className="mt-8 flex flex-wrap justify-center gap-3"><Link href="/tests/menhera-test?start=1" className="inline-flex rounded-xl bg-primary px-6 py-3.5 text-sm font-black text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700">새로운 문제로 다시 하기</Link><Link href="/tests" className="inline-flex rounded-xl border border-slate-300 bg-white px-5 py-3.5 text-sm font-bold text-slate-600 hover:bg-slate-50">다른 테스트 하기</Link></div>
        </div>
      </div>
      <MobileShareDock />
    </div>
  );
}
