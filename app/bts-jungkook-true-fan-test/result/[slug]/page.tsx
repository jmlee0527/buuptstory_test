import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { JungkookFanQuizResult } from "@/components/test/JungkookFanQuizResult";
import {
  getJungkookGradeBySlug,
  jungkookFanTest,
  jungkookGrades,
} from "@/data/jungkook-fan";
import { calculateJungkookResult, parseJungkookAnswers } from "@/lib/jungkook-fan-engine";
import { absoluteUrl, createMetadata } from "@/lib/site";

type Props = { params: Promise<{ slug: string }>; searchParams: Promise<{ r?: string }> };

export function generateStaticParams() {
  return jungkookGrades.map((grade) => ({ slug: grade.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const grade = getJungkookGradeBySlug(slug);
  return grade
    ? {
      ...createMetadata({
        title: `${grade.name} | BTS 정국 팬 퀴즈 결과`,
        description: `${grade.summary} 정국 퀴즈 12문제로 나의 BTS 정국 팬력을 확인해 보세요.`,
        path: `/bts-jungkook-true-fan-test/result/${slug}`,
        keywords: ["BTS 정국 팬 퀴즈 결과", "BTS 정국 진성팬 테스트 결과", "정국 퀴즈 결과", "Jungkook quiz", grade.name],
        ogImage: false,
      }),
      robots: { index: false, follow: true },
    }
    : {};
}

export default async function Page({ params, searchParams }: Props) {
  const { slug } = await params;
  const { r } = await searchParams;
  const grade = getJungkookGradeBySlug(slug);
  if (!grade) notFound();
  const answers = parseJungkookAnswers(r);
  if (answers) {
    const actual = calculateJungkookResult(answers);
    if (actual.grade.slug !== slug) {
      redirect(`/bts-jungkook-true-fan-test/result/${actual.grade.slug}?r=${r}`);
    }
  }

  return (
    <>
      <JungkookFanQuizResult answers={answers} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: `BTS 정국 팬 퀴즈 결과: ${grade.name}`,
        description: grade.summary,
        url: absoluteUrl(`/bts-jungkook-true-fan-test/result/${slug}`),
        inLanguage: "ko-KR",
        isAccessibleForFree: true,
        isPartOf: {
          "@type": "Quiz",
          name: jungkookFanTest.title,
          about: "BTS Jung Kook",
        },
      }} />
    </>
  );
}
