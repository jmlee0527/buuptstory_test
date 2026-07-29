import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { Fromis9FanQuizResult } from "@/components/test/Fromis9FanQuizResult";
import { JsonLd } from "@/components/seo/JsonLd";
import { fromis9FanGradeProfiles, getFromis9FanGradeProfile } from "@/data/fromis9-fan";
import { absoluteUrl, createMetadata } from "@/lib/site";
import { calculateFromis9FanResult, fromis9FanResultPath, parseFromis9Answers } from "@/lib/fromis9-fan-engine";

type Props = { params: Promise<{ slug: string }>; searchParams: Promise<{ r?: string }> };

export function generateStaticParams() {
  return fromis9FanGradeProfiles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { r } = await searchParams;
  const grade = getFromis9FanGradeProfile(slug);
  if (!grade) return {};
  const answers = parseFromis9Answers(r);
  const result = answers ? calculateFromis9FanResult(answers) : null;
  const effectiveGrade = result?.grade ?? grade;
  return createMetadata({
    title: result ? `${result.score}/15점, ${effectiveGrade.name} | 프로미스나인 팬 퀴즈 결과` : `${grade.name} | 프로미스나인 팬 퀴즈 결과`,
    description: `프로미스나인 팬 퀴즈 결과 ${effectiveGrade.name}. ${effectiveGrade.subtitle} 멤버, 데뷔, 앨범, 공연, 음악방송 기록까지 15문제로 팬심을 확인해보세요.`,
    path: fromis9FanResultPath(grade.slug),
    keywords: ["프로미스나인 팬 퀴즈", "프로미스나인 테스트", "프로미스나인 퀴즈", "fromis_9 테스트", "플로버 테스트", effectiveGrade.name],
    ogImage: false,
  });
}

export default async function Fromis9FanQuizResultPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { r } = await searchParams;
  const grade = getFromis9FanGradeProfile(slug);
  if (!grade) notFound();

  const answers = parseFromis9Answers(r);
  const result = answers ? calculateFromis9FanResult(answers) : null;
  if (result && result.grade.slug !== slug) redirect(`${fromis9FanResultPath(result.grade.slug)}?r=${r}`);

  return (
    <>
      <Fromis9FanQuizResult
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
        name: `프로미스나인 팬 퀴즈 결과: ${grade.name}`,
        description: grade.subtitle,
        url: absoluteUrl(fromis9FanResultPath(grade.slug)),
        inLanguage: "ko-KR",
        isAccessibleForFree: true,
        isPartOf: { "@type": "WebSite", url: absoluteUrl("/") },
        about: { "@type": "Quiz", "@id": absoluteUrl("/tests/fromis9-fan-test#quiz") },
      }} />
    </>
  );
}
