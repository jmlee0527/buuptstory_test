import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { BtsFanQuizResult } from "@/components/test/BtsFanQuizResult";
import { JsonLd } from "@/components/seo/JsonLd";
import { btsFanGradeProfiles, getBtsFanGradeProfile } from "@/data/bts-fan";
import { absoluteUrl, createMetadata } from "@/lib/site";
import { btsFanResultPath, calculateBtsFanResult, parseBtsAnswers } from "@/lib/bts-fan-engine";

type Props = { params: Promise<{ slug: string }>; searchParams: Promise<{ r?: string }> };

export function generateStaticParams() {
  return btsFanGradeProfiles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { r } = await searchParams;
  const grade = getBtsFanGradeProfile(slug);
  if (!grade) return {};
  const answers = parseBtsAnswers(r);
  const result = answers ? calculateBtsFanResult(answers) : null;
  const effectiveGrade = result?.grade ?? grade;
  return createMetadata({
    title: result ? `${result.score}/15점, ${effectiveGrade.name} | BTS 팬 퀴즈 결과` : `${grade.name} | BTS 팬 퀴즈 결과`,
    description: `BTS 팬 퀴즈 결과 ${effectiveGrade.name}. ${effectiveGrade.subtitle} 멤버, 데뷔, 노래, 공연, 빌보드 기록까지 15문제로 BTS 팬심을 확인해보세요.`,
    path: btsFanResultPath(grade.slug),
    keywords: ["BTS 팬 퀴즈", "BTS 테스트", "BTS 퀴즈", "방탄소년단 테스트", "ARMY 테스트", effectiveGrade.name],
    ogImage: false,
  });
}

export default async function BtsFanQuizResultPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { r } = await searchParams;
  const grade = getBtsFanGradeProfile(slug);
  if (!grade) notFound();

  const answers = parseBtsAnswers(r);
  const result = answers ? calculateBtsFanResult(answers) : null;
  if (result && result.grade.slug !== slug) redirect(`${btsFanResultPath(result.grade.slug)}?r=${r}`);

  return (
    <>
      <BtsFanQuizResult
        grade={result?.grade ?? grade}
        score={result?.score ?? null}
        easyCorrect={result?.easyCorrect ?? null}
        mediumCorrect={result?.mediumCorrect ?? null}
        hardCorrect={result?.hardCorrect ?? null}
        wrong={result?.wrong ?? []}
        categoryRates={result?.categoryRates ?? []}
        encodedAnswers={answers ? r ?? null : null}
      />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: `BTS 팬 퀴즈 결과: ${grade.name}`,
        description: grade.subtitle,
        url: absoluteUrl(btsFanResultPath(grade.slug)),
        inLanguage: "ko-KR",
        isAccessibleForFree: true,
        isPartOf: { "@type": "WebSite", url: absoluteUrl("/") },
        about: { "@type": "Quiz", "@id": absoluteUrl("/tests/bts-fan-test#quiz") },
      }} />
    </>
  );
}
