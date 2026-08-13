import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { MenheraResult } from "@/components/test/MenheraResult";
import { JsonLd } from "@/components/seo/JsonLd";
import { getMenheraLevelBySlug, menheraLevels } from "@/data/menhera-test";
import { calculateMenheraResult, parseMenheraAnswers } from "@/lib/menhera-engine";
import { absoluteUrl, createMetadata } from "@/lib/site";

type Props = { params: Promise<{ slug: string }>; searchParams: Promise<{ a?: string }> };

export function generateStaticParams() { return menheraLevels.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { a } = await searchParams;
  const level = getMenheraLevelBySlug(slug);
  if (!level) return {};
  const answers = parseMenheraAnswers(a);
  const result = answers ? calculateMenheraResult(answers) : null;
  const effective = result?.level ?? level;
  return createMetadata({ title: result ? `멘헤라 지수 ${result.score}% · Lv.${effective.level} ${effective.intensity}` : `Lv.${effective.level} ${effective.intensity} | 멘헤라 테스트 결과`, description: `나는 멘헤라일까? 멘헤라 테스트 결과 ${effective.summary} 멘헤라 지수와 5개 관계 성향 영역을 확인해보세요.`, path: `/menhera-test/result/${effective.slug}`, keywords: ["멘헤라 테스트", "멘헤라 지수", "나는 멘헤라일까", `멘헤라 Lv.${effective.level}`] });
}

export default async function MenheraResultPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { a } = await searchParams;
  const level = getMenheraLevelBySlug(slug);
  if (!level) notFound();
  const answers = parseMenheraAnswers(a);
  const result = answers ? calculateMenheraResult(answers) : null;
  if (result && result.level.slug !== slug) redirect(`/menhera-test/result/${result.level.slug}?a=${a}`);
  const effective = result?.level ?? level;
  return <><JsonLd data={{ "@context": "https://schema.org", "@type": "WebPage", name: `멘헤라 테스트 결과: Lv.${effective.level} ${effective.intensity}`, description: effective.summary, url: absoluteUrl(`/menhera-test/result/${effective.slug}`), inLanguage: "ko-KR", isAccessibleForFree: true, about: { "@type": "Quiz", "@id": absoluteUrl("/tests/menhera-test#quiz") } }} /><MenheraResult level={effective} score={result?.score ?? null} domainScores={result?.domainScores ?? null} encodedAnswers={result ? a ?? null : null} /></>;
}
