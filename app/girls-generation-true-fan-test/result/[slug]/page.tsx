import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { GirlsGenerationFanQuizResult } from "@/components/test/GirlsGenerationFanQuizResult";
import { JsonLd } from "@/components/seo/JsonLd";
import { getGirlsGenerationGradeBySlug, girlsGenerationGrades } from "@/data/girls-generation-fan";
import { calculateGirlsGenerationResult, parseGirlsGenerationAnswers } from "@/lib/girls-generation-fan-engine";
import { absoluteUrl, createMetadata } from "@/lib/site";

type Props = { params: Promise<{ slug: string }>; searchParams: Promise<{ r?: string }> };

export function generateStaticParams() {
  return girlsGenerationGrades.map((grade) => ({ slug: grade.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const grade = getGirlsGenerationGradeBySlug(slug);
  return grade
    ? {
        ...createMetadata({
          title: `${grade.title} | 소녀시대 팬 퀴즈 결과`,
          description: `${grade.summary} 소녀시대 퀴즈로 나의 S♡NE 덕력을 확인해 보세요.`,
          path: `/girls-generation-true-fan-test/result/${slug}`,
          ogImage: false,
        }),
        robots: { index: false, follow: true },
      }
    : {};
}

export default async function Page({ params, searchParams }: Props) {
  const { slug } = await params;
  const { r } = await searchParams;
  const grade = getGirlsGenerationGradeBySlug(slug);
  if (!grade) notFound();
  const answers = parseGirlsGenerationAnswers(r);
  if (answers) {
    const actual = calculateGirlsGenerationResult(answers);
    if (actual.grade.slug !== slug) redirect(`/girls-generation-true-fan-test/result/${actual.grade.slug}?r=${r}`);
  }
  return (
    <>
      <GirlsGenerationFanQuizResult answers={answers} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: `소녀시대 팬 퀴즈 결과: ${grade.title}`,
          description: grade.summary,
          url: absoluteUrl(`/girls-generation-true-fan-test/result/${slug}`),
          inLanguage: "ko-KR",
          isAccessibleForFree: true,
        }}
      />
    </>
  );
}
