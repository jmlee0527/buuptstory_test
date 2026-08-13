import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { FootballTacticsResult } from "@/components/test/FootballTacticsResult";
import { JsonLd } from "@/components/seo/JsonLd";
import { footballTacticsGradeProfiles, getFootballTacticsGradeProfile } from "@/data/football-tactics";
import { calculateFootballTacticsResult, parseFootballTacticsAnswers } from "@/lib/football-tactics-engine";
import { absoluteUrl, createMetadata } from "@/lib/site";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ r?: string }>;
};

export function generateStaticParams() {
  return footballTacticsGradeProfiles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { r } = await searchParams;
  const grade = getFootballTacticsGradeProfile(slug);
  if (!grade) return {};
  const answers = parseFootballTacticsAnswers(r);
  const result = answers ? calculateFootballTacticsResult(answers) : null;
  const effectiveGrade = result?.grade ?? grade;
  return createMetadata({
    title: result ? `축잘알 퀴즈(전술편) ${result.score}/12점, ${effectiveGrade.name}` : `${grade.name} | 축잘알 퀴즈(전술편) 결과`,
    description: `${effectiveGrade.summary} 포메이션, 빌드업, 압박과 공간 활용을 12문제로 확인한 축잘알 퀴즈(전술편) 결과입니다.`,
    path: `/football-tactics-test/result/${grade.slug}`,
    keywords: ["축구 전술 테스트", "축잘알 테스트", "축구 전술 퀴즈", "축구 지식 테스트", effectiveGrade.name],
  });
}

export default async function FootballTacticsResultPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { r } = await searchParams;
  const grade = getFootballTacticsGradeProfile(slug);
  if (!grade) notFound();
  const answers = parseFootballTacticsAnswers(r);
  const result = answers ? calculateFootballTacticsResult(answers) : null;
  if (result && result.grade.slug !== slug) redirect(`/football-tactics-test/result/${result.grade.slug}?r=${r}`);
  const effectiveGrade = result?.grade ?? grade;

  return (
    <>
      <FootballTacticsResult grade={effectiveGrade} score={result?.score ?? null} total={result?.total ?? 12} wrong={result?.wrong ?? []} encodedAnswers={result ? r ?? null : null} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: `축잘알 퀴즈(전술편) 결과: ${effectiveGrade.name}`,
        description: effectiveGrade.summary,
        url: absoluteUrl(`/football-tactics-test/result/${effectiveGrade.slug}`),
        inLanguage: "ko-KR",
        isAccessibleForFree: true,
        isPartOf: { "@type": "WebSite", url: absoluteUrl("/") },
        about: { "@type": "Quiz", "@id": absoluteUrl("/tests/football-tactics-test#quiz") },
      }} />
    </>
  );
}
