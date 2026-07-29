import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { SeventeenFanQuizResult } from "@/components/test/SeventeenFanQuizResult";
import { JsonLd } from "@/components/seo/JsonLd";
import { getSeventeenGradeBySlug, seventeenGrades } from "@/data/seventeen-fan";
import { calculateSeventeenResult, parseSeventeenAnswers } from "@/lib/seventeen-fan-engine";
import { absoluteUrl, createMetadata } from "@/lib/site";

type Props = { params: Promise<{ slug: string }>; searchParams: Promise<{ r?: string }> };

export function generateStaticParams() {
  return seventeenGrades.map((grade) => ({ slug: grade.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const grade = getSeventeenGradeBySlug(slug);
  return grade ? { ...createMetadata({
    title: `${grade.name} | 세븐틴 팬 퀴즈 결과`,
    description: `세븐틴 팬 퀴즈 결과는 ${grade.name}입니다. 멤버·유닛·노래·앨범 퀴즈로 나의 캐럿력을 확인해 보세요.`,
    path: `/seventeen-true-fan/result/${slug}`,
    ogImage: false,
  }), robots: { index: false, follow: true } } : {};
}

export default async function Page({ params, searchParams }: Props) {
  const { slug } = await params;
  const { r } = await searchParams;
  const grade = getSeventeenGradeBySlug(slug);
  if (!grade) notFound();
  const answers = parseSeventeenAnswers(r);
  if (answers) {
    const actual = calculateSeventeenResult(answers);
    if (actual.grade.slug !== slug) redirect(`/seventeen-true-fan/result/${actual.grade.slug}?r=${r}`);
  }
  return <><SeventeenFanQuizResult answers={answers} /><JsonLd data={{ "@context": "https://schema.org", "@type": "WebPage", name: `세븐틴 팬 퀴즈 결과: ${grade.name}`, url: absoluteUrl(`/seventeen-true-fan/result/${slug}`), inLanguage: "ko-KR", isAccessibleForFree: true }} /></>;
}
