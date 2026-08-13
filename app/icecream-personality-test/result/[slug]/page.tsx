import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { IceCreamPersonalityResult } from "@/components/test/IceCreamPersonalityResult";
import { getIceCreamProfile, iceCreamProfiles } from "@/data/icecream-personality";
import { calculateIceCreamResult, parseIceCreamAnswers } from "@/lib/icecream-personality-engine";
import { absoluteUrl, createMetadata, siteConfig } from "@/lib/site";

type Props = { params: Promise<{ slug: string }>; searchParams: Promise<{ answers?: string }> };

export function generateStaticParams() {
  return iceCreamProfiles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const profile = getIceCreamProfile(slug);
  if (!profile) return {};
  return createMetadata({
    title: `아이스크림 테스트 결과: 나는 ${profile.name} 타입!`,
    description: `나와 닮은 아이스크림은 ${profile.name}! ${profile.tagline}. 아이스크림 성격 테스트에서 나의 6가지 성향을 확인해 보세요.`,
    path: `/icecream-personality-test/result/${profile.slug}`,
    keywords: ["아이스크림 테스트", "아이스크림 성격 테스트", "나와 닮은 아이스크림", profile.name],
    ogImagePath: "/tests/icecream-personality.png",
  });
}

export default async function IceCreamResultPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { answers: rawAnswers } = await searchParams;
  const profile = getIceCreamProfile(slug);
  if (!profile) notFound();

  const answers = parseIceCreamAnswers(rawAnswers);
  const calculated = answers ? calculateIceCreamResult(answers) : null;
  if (calculated && calculated.profile.slug !== slug) {
    redirect(`/icecream-personality-test/result/${calculated.profile.slug}?answers=${rawAnswers}`);
  }
  const resultProfile = calculated?.profile ?? profile;

  return (
    <>
      <IceCreamPersonalityResult profile={resultProfile} secondary={calculated?.secondary} scores={calculated?.scores ?? profile.targetScores} fitScore={calculated?.fitScore ?? 88} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: `아이스크림 테스트 결과: ${profile.name}`,
        description: profile.tagline,
        url: absoluteUrl(`/icecream-personality-test/result/${profile.slug}`),
        inLanguage: "ko-KR",
        isPartOf: { "@type": "WebSite", "@id": absoluteUrl("/#website"), name: siteConfig.name },
        isAccessibleForFree: true,
      }} />
    </>
  );
}
