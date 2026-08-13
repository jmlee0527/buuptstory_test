"use client";

import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ShareButtons } from "@/components/share/ShareButtons";
import { ShareImageCard } from "@/components/share/ShareImageCard";
import { MobileShareDock } from "@/components/share/MobileShareDock";
import { AdRectangle } from "@/components/ads/AdRectangle";
import { footballTacticsGradeProfiles, type FootballTacticsGradeProfile, type FootballTacticsQuestion } from "@/data/football-tactics";

type Props = {
  grade: FootballTacticsGradeProfile;
  score: number | null;
  total: number;
  wrong: { question: FootballTacticsQuestion; choice: number }[];
  encodedAnswers: string | null;
};

export function FootballTacticsResult({ grade, score, total, wrong, encodedAnswers }: Props) {
  const hasResult = score !== null;
  const shareScore = score ?? grade.maxScore;
  const shareTitle = grade.shareTemplate.replace("{score}", String(shareScore));
  const sharePath = `/football-tactics-test/result/${grade.slug}${encodedAnswers ? `?r=${encodedAnswers}` : ""}`;
  const scorePercent = Math.round((shareScore / 10) * 100);

  return (
    <div className="min-h-screen pb-24 pt-8 sm:py-14">
      <div className="container-page">
        <Breadcrumbs items={[{ name: "테스트", href: "/tests" }, { name: "축잘알 퀴즈(전술편)", href: "/tests/football-tactics-test" }, { name: `${grade.name} 결과` }]} />
        <div className="mx-auto max-w-4xl">
          <section className="paper-card overflow-hidden text-center">
            <div className="bg-[#f4f1df] px-6 pb-7 pt-10 sm:pt-14">
              <p className="text-sm font-extrabold text-[#4267A8]">{hasResult ? "나의 축구 전술 레벨은" : "축구 전술 테스트 결과 등급"}</p>
              <div className="mt-5 text-7xl" aria-hidden="true">{grade.icon}</div>
              <h1 className="mt-4 text-4xl font-black tracking-tight text-ink sm:text-5xl">{grade.name}</h1>
              <p className="mt-3 text-base font-medium text-slate-600">{grade.summary}</p>
              <div className="mx-auto mt-7 grid size-36 place-items-center rounded-full p-2 shadow-card" style={{ background: `conic-gradient(#4267A8 ${hasResult ? scorePercent : 100}%, #DDE7F0 0)` }}>
                <div className="grid size-full place-items-center rounded-full bg-[#FFFDF6]">
                  <span><strong className="block text-4xl font-black text-[#4267A8]">{hasResult ? shareScore : `${grade.minScore}~${grade.maxScore}`}</strong><span className="mt-1 block text-[11px] font-bold text-slate-400">{hasResult ? "/ 10점" : "점 구간"}</span></span>
                </div>
              </div>
              {hasResult && <p className="mt-5 text-sm font-bold text-slate-500">{total}문제 중 <strong className="text-[#4267A8]">{shareScore}문제</strong> 정답</p>}
            </div>
            <div className="px-6 pb-8 pt-6 sm:px-10"><p className="mx-auto max-w-2xl leading-7 text-slate-700">{grade.description}</p></div>
          </section>

          <AdRectangle />

          {hasResult && wrong.length > 0 && (
            <section className="paper-card mt-8 p-6 sm:p-8">
              <h2 className="text-xl font-extrabold text-ink">틀린 문제 다시 보기 <span className="text-sm font-bold text-slate-400">({wrong.length}문제)</span></h2>
              <ol className="mt-6 space-y-5">
                {wrong.map(({ question, choice }) => (
                  <li key={question.id} className="rounded-sm border border-[#353535]/20 bg-[#f4f1df]/55 p-5">
                    <div className="flex items-start justify-between gap-3"><p className="font-extrabold leading-6 text-ink">{question.question}</p><span className="shrink-0 rounded-sm border border-[#353535]/20 bg-[#fffdf6] px-2.5 py-1 text-[11px] font-black text-[#4267A8]">LV.{question.difficulty}</span></div>
                    <dl className="mt-3 space-y-1.5 text-sm">
                      <div className="flex gap-2"><dt className="shrink-0 font-black text-rose-600">내 답</dt><dd className="text-slate-600 line-through decoration-rose-300">{question.choices[choice]}</dd></div>
                      <div className="flex gap-2"><dt className="shrink-0 font-black text-emerald-700">정답</dt><dd className="font-extrabold text-ink">{question.choices[question.correctAnswer]}</dd></div>
                    </dl>
                    <p className="mt-3 border-t border-[#353535]/15 pt-3 text-sm leading-6 text-slate-700">💡 {question.explanation}</p>
                    <p className="mt-2 text-[11px] leading-5 text-slate-400">검토 기준: {question.sourceNote}</p>
                  </li>
                ))}
              </ol>
            </section>
          )}

          {hasResult && wrong.length === 0 && (
            <section className="paper-card mt-8 bg-[#CDEFE1]/35 p-6 text-center sm:p-8"><h2 className="text-xl font-extrabold text-emerald-900">🎉 전 문제 정답!</h2><p className="mt-2 text-sm leading-6 text-emerald-900">10문제를 모두 맞혔습니다. 선수 움직임과 공간, 압박 구조까지 완벽하게 읽어냈습니다.</p></section>
          )}

          {!hasResult && (
            <section className="paper-card mt-8 p-6 sm:p-8">
              <h2 className="text-xl font-extrabold text-ink">축구 전술 이해도 등급표</h2>
              <p className="mt-2 text-sm text-slate-500">정답 개수에 따라 0점부터 10점까지 계산하고 6개 등급으로 나뉩니다.</p>
              <ul className="mt-5 grid gap-2.5">{footballTacticsGradeProfiles.map((profile) => <li key={profile.slug}><Link href={`/football-tactics-test/result/${profile.slug}`} className={`flex min-h-14 items-center gap-4 rounded-sm border px-4 py-3.5 transition hover:-translate-y-0.5 ${profile.slug === grade.slug ? "border-[#4267A8] bg-[#FFE98A]/35" : "border-[#353535]/20 bg-[#fffdf6] hover:border-[#4267A8]"}`}><span className="text-2xl" aria-hidden="true">{profile.icon}</span><span className="font-extrabold text-ink">{profile.name}</span><span className="ml-auto text-xs font-black text-slate-400">{profile.minScore === profile.maxScore ? profile.minScore : `${profile.minScore}~${profile.maxScore}`}점</span></Link></li>)}</ul>
            </section>
          )}

          <section id="share-card" className="mt-10 grid scroll-mt-24 gap-6 rounded-md bg-ink p-6 text-white sm:p-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
            <ShareImageCard emoji={grade.icon} eyebrow="나의 축구 전술 레벨은" title={grade.name} subtitle={grade.summary} badge={`전술 이해도 ${shareScore}/10점`} accent="green" />
            <div><h2 className="text-xl font-extrabold">친구와 진짜 전술 축잘알을 가려보세요</h2><p className="mt-2 text-sm leading-6 text-slate-300">같은 10문제라도 다시 도전하면 새로운 조합이 출제됩니다.</p><div className="mt-5"><ShareButtons title={shareTitle} description={grade.summary} path={sharePath} /></div></div>
          </section>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/tests/football-tactics-test?start=1" className="paper-button inline-flex bg-primary px-6 py-3.5 text-sm font-black text-white hover:bg-[#36588f]">새로운 문제로 다시 도전하기</Link>
            <Link href="/tests/football-tactics-test" className="paper-button inline-flex bg-[#fffdf6] px-5 py-3.5 text-sm font-bold text-slate-600">테스트 소개 보기</Link>
          </div>
          <p className="mt-8 text-center text-xs leading-5 text-slate-400">문제는 120문제 은행에서 난이도별로 랜덤 출제되며, 응답은 서버에 저장되지 않습니다.</p>
        </div>
      </div>
      <MobileShareDock />
    </div>
  );
}
