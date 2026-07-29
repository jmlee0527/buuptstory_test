import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { LionelMessiFanQuizResult } from "@/components/test/LionelMessiFanQuizResult";
import { getMessiGradeBySlug, lionelMessiFanTest, messiGrades } from "@/data/lionel-messi-fan";
import { calculateMessiResult, parseMessiAnswers } from "@/lib/lionel-messi-fan-engine";
import { absoluteUrl, createMetadata } from "@/lib/site";

type Props = { params: Promise<{ slug: string }>; searchParams: Promise<{ r?: string }> };

export function generateStaticParams() {
  return messiGrades.map((grade) => ({ slug: grade.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const grade = getMessiGradeBySlug(slug);
  return grade
    ? {
      ...createMetadata({
        title: `${grade.name} | 리오넬 메시 팬 퀴즈 결과`,
        description: `${grade.summary} 메시 퀴즈로 나의 리오넬 메시 찐팬력을 확인해 보세요.`,
        path: `/lionel-messi-true-fan-test/result/${slug}`,
        keywords: ["리오넬 메시 팬 퀴즈 결과", "메시 퀴즈 결과", grade.name],
        ogImage: false,
      }),
      robots: { index: false, follow: true },
    }
    : {};
}

export default async function Page({ params, searchParams }: Props) {
  const { slug } = await params;
  const { r } = await searchParams;
  const grade = getMessiGradeBySlug(slug);
  if (!grade) notFound();
  const answers = parseMessiAnswers(r);
  if (answers) {
    const actual = calculateMessiResult(answers);
    if (actual.grade.slug !== slug) redirect(`/lionel-messi-true-fan-test/result/${actual.grade.slug}?r=${r}`);
  }

  return (
    <>
      <LionelMessiFanQuizResult answers={answers} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: `리오넬 메시 팬 퀴즈 결과: ${grade.name}`,
        description: grade.summary,
        url: absoluteUrl(`/lionel-messi-true-fan-test/result/${slug}`),
        inLanguage: "ko-KR",
        isAccessibleForFree: true,
        isPartOf: {
          "@type": "Quiz",
          name: lionelMessiFanTest.title,
          about: "Lionel Messi",
        },
      }} />
    </>
  );
}
