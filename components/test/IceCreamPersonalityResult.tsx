"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { ShareButtons } from "@/components/share/ShareButtons";
import { ShareImageCard } from "@/components/share/ShareImageCard";
import { MobileShareDock } from "@/components/share/MobileShareDock";
import { getIceCreamProfile, iceCreamTraits, type IceCreamProfile, type IceCreamScores } from "@/data/icecream-personality";

function ProfileImage({ profile }: { profile: IceCreamProfile }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="relative mx-auto grid aspect-square w-full max-w-[17rem] place-items-center overflow-hidden rounded-[2rem] border border-white/80 bg-white/75 p-4 shadow-xl sm:max-w-[20rem]">
      {failed ? (
        <div className="text-center" role="img" aria-label={`${profile.name} 이미지 대체 표시`}><span className="text-8xl" aria-hidden="true">🍦</span><strong className="mt-3 block text-lg text-rose-700">{profile.name}</strong></div>
      ) : (
        <Image src={profile.image} alt={`${profile.name} 타입 오리지널 일러스트`} fill sizes="(max-width: 640px) 272px, 320px" priority className="object-contain p-4" onError={() => setFailed(true)} />
      )}
    </div>
  );
}

export function IceCreamPersonalityResult({ profile, secondary, scores, fitScore }: { profile: IceCreamProfile; secondary?: IceCreamProfile; scores: IceCreamScores; fitScore: number }) {
  const goodMatch = getIceCreamProfile(profile.goodMatch);
  const oppositeMatch = getIceCreamProfile(profile.oppositeMatch);
  const sharePath = `/icecream-personality-test/result/${profile.slug}`;

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#ffe4e6_0,#fff7ed_38%,#fffdf6_100%)] pb-24 pt-8 sm:py-14">
      <div className="container-page">
        <Breadcrumbs items={[{ name: "테스트", href: "/tests" }, { name: "아이스크림 테스트 결과" }]} />
        <div className="mx-auto max-w-4xl">
          <SectionReveal>
            <section className="relative overflow-hidden rounded-[2.25rem] border border-rose-100 bg-gradient-to-br from-rose-100 via-orange-50 to-sky-100 px-6 py-9 text-center shadow-2xl sm:px-10 sm:py-12">
              <span className="absolute -left-10 -top-10 size-40 rounded-full bg-white/40" />
              <span className="absolute -bottom-14 -right-10 size-48 rounded-full bg-white/40" />
              <div className="relative">
                <p className="text-xs font-black tracking-[.18em] text-rose-600">나와 닮은 아이스크림</p>
                <div className="mt-5"><ProfileImage profile={profile} /></div>
                <h1 className="mt-7 text-3xl font-black tracking-[-0.05em] text-stone-950 sm:text-5xl">당신은 {profile.name} 타입!</h1>
                <p className="mx-auto mt-4 max-w-2xl text-base font-bold leading-7 text-stone-700 sm:text-lg">{profile.tagline}</p>
                <div className="mx-auto mt-6 inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/70 px-4 py-2 text-sm font-black text-rose-700 shadow-sm">성향 매칭도 {fitScore}%</div>
                {secondary && <p className="mt-4 text-xs font-semibold text-stone-500">두 번째로 가까운 타입은 <strong className="text-stone-800">{secondary.name}</strong>예요.</p>}
              </div>
            </section>
          </SectionReveal>

          <SectionReveal className="mt-7 rounded-[2rem] border border-rose-100 bg-white p-6 shadow-card sm:p-9">
            <p className="text-xs font-black tracking-[.16em] text-rose-500">PERSONALITY</p>
            <h2 className="mt-2 text-2xl font-black text-stone-950">당신의 성격</h2>
            <p className="mt-5 leading-8 text-stone-700">{profile.personality}</p>
          </SectionReveal>

          <section className="mt-7 grid gap-5 md:grid-cols-3">
            {[
              ["인간관계", profile.relationships, "🤝"],
              ["연애할 때", profile.romance, "💗"],
              ["숨은 모습", profile.hidden, "✨"],
            ].map(([title, copy, emoji]) => <SectionReveal key={title} className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-card"><span className="text-3xl" aria-hidden="true">{emoji}</span><h2 className="mt-4 text-xl font-black text-stone-950">{title}</h2><p className="mt-3 text-sm leading-7 text-stone-600">{copy}</p></SectionReveal>)}
          </section>

          <SectionReveal className="mt-7 rounded-[2rem] border border-stone-200 bg-white p-6 shadow-card sm:p-9">
            <h2 className="text-2xl font-black text-stone-950">6가지 성향</h2>
            <div className="mt-7 grid gap-x-8 gap-y-5 md:grid-cols-2">
              {iceCreamTraits.map(({ key, label, color }) => <div key={key}><div className="flex justify-between gap-4 text-sm"><strong className="text-stone-700">{label}</strong><strong className="text-rose-700">{scores[key]}%</strong></div><div className="mt-2 h-3 overflow-hidden rounded-full bg-stone-100"><div className={`h-full rounded-full bg-gradient-to-r ${color}`} style={{ width: `${scores[key]}%` }} /></div></div>)}
            </div>
          </SectionReveal>

          <section className="mt-7 grid gap-5 md:grid-cols-2">
            <SectionReveal className="rounded-[2rem] border border-emerald-100 bg-emerald-50/70 p-6 sm:p-8"><h2 className="text-xl font-black text-emerald-950">이 타입의 장점</h2><ul className="mt-5 space-y-3">{profile.advantages.map((item) => <li key={item} className="flex gap-3 text-sm font-semibold leading-6 text-emerald-900"><span aria-hidden="true">✓</span>{item}</li>)}</ul></SectionReveal>
            <SectionReveal className="rounded-[2rem] border border-amber-100 bg-amber-50/70 p-6 sm:p-8"><h2 className="text-xl font-black text-amber-950">조금 주의할 점</h2><ul className="mt-5 space-y-3">{profile.cautions.map((item) => <li key={item} className="flex gap-3 text-sm font-semibold leading-6 text-amber-900"><span aria-hidden="true">•</span>{item}</li>)}</ul></SectionReveal>
          </section>

          <SectionReveal className="mt-7 rounded-[2rem] border border-stone-200 bg-white p-6 shadow-card sm:p-9">
            <h2 className="text-2xl font-black text-stone-950">아이스크림 케미</h2>
            <p className="mt-2 text-sm leading-6 text-stone-500">좋고 나쁨이 아니라 성향의 리듬이 잘 맞거나 크게 다른 조합이에요.</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {goodMatch && <div className="rounded-2xl bg-rose-50 p-5"><p className="text-xs font-black text-rose-500">잘 맞는 아이스크림</p><strong className="mt-2 block text-lg text-stone-950">{goodMatch.name}</strong><p className="mt-2 text-sm leading-6 text-stone-600">서로의 장점을 편하게 끌어내는 조합이에요.</p></div>}
              {oppositeMatch && <div className="rounded-2xl bg-sky-50 p-5"><p className="text-xs font-black text-sky-600">상극 아이스크림</p><strong className="mt-2 block text-lg text-stone-950">{oppositeMatch.name}</strong><p className="mt-2 text-sm leading-6 text-stone-600">속도와 표현 방식이 달라 충분한 설명이 필요한 조합이에요.</p></div>}
            </div>
          </SectionReveal>

          <section id="share-card" className="mt-8 grid scroll-mt-24 gap-6 rounded-[2rem] bg-stone-950 p-6 text-white sm:p-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
            <ShareImageCard emoji="🍦" eyebrow="나와 닮은 아이스크림" title={profile.name} subtitle={profile.tagline} badge={`성향 매칭도 ${fitScore}%`} accent="pink" />
            <div><h2 className="text-xl font-black">친구는 어떤 아이스크림일까?</h2><p className="mt-2 text-sm leading-6 text-stone-300">결과를 공유하고 서로 닮은 아이스크림 타입을 비교해 보세요.</p><div className="mt-5"><ShareButtons title={`나는 ${profile.name} 타입! - 아이스크림 테스트`} description={profile.tagline} path={sharePath} /></div></div>
          </section>

          <p className="mx-auto mt-6 max-w-2xl text-center text-xs leading-5 text-stone-400">이 콘텐츠는 재미를 위한 비공식 성향 테스트입니다. 각 제품 제조사와 제휴되지 않았으며 공식 로고·패키지·상품 사진을 사용하지 않았습니다.</p>
          <div className="mt-8 flex flex-col gap-3 text-center sm:flex-row sm:justify-center"><Link href="/tests/icecream-personality-test?start=1" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-stone-300 bg-white px-5 text-sm font-bold text-stone-700 hover:bg-stone-50">다시 테스트하기</Link><Link href="/tests" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-rose-600 px-5 text-sm font-bold text-white hover:bg-rose-700">다른 테스트 보기</Link></div>
        </div>
      </div>
      <MobileShareDock />
    </div>
  );
}
