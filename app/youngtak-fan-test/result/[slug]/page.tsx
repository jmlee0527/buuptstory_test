import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { YoungtakFanQuizResult } from "@/components/test/YoungtakFanQuizResult";
import { getYoungtakFanGradeProfile, youngtakFanGradeProfiles } from "@/data/youngtak-fan";
import { absoluteUrl, createMetadata } from "@/lib/site";
import { calculateYoungtakFanIndex, parseYoungtakAnswers, youngtakFanResultPath } from "@/lib/youngtak-fan-engine";

type Props = { params: Promise<{ slug: string }>; searchParams: Promise<{ r?: string }> };

export function generateStaticParams() {
  return youngtakFanGradeProfiles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const grade = getYoungtakFanGradeProfile(slug);
  if (!grade) return {};
  return createMetadata({
    title: `${grade.title} | 영탁 팬 퀴즈 결과 | 미미테스트`,
    description: `영탁 팬 퀴즈 결과 ${grade.title}. 노래, 앨범, 방송, 무대와 활동 기록을 얼마나 알고 있는지 15문제 퀴즈로 확인해보세요.`,
    path: youngtakFanResultPath(grade.slug),
    keywords: ["영탁 팬 퀴즈", "영탁 팬 테스트", "영탁 퀴즈", "영탁 팬심 지수", grade.title],
    ogImage: false,
  });
}

export default async function YoungtakFanQuizResultPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { r } = await searchParams;
  const grade = getYoungtakFanGradeProfile(slug);
  if (!grade) notFound();

  const answers = parseYoungtakAnswers(r);
  const result = answers ? calculateYoungtakFanIndex(answers) : null;
  if (result && result.grade.slug !== slug) redirect(`${youngtakFanResultPath(result.grade.slug)}?r=${r}`);

  return (
    <>
      <YoungtakFanQuizResult
        grade={result?.grade ?? grade}
        fanIndex={result?.fanIndex ?? null}
        totalCorrect={result?.totalCorrect ?? null}
        total={result?.total ?? 15}
        weightedScore={result?.weightedScore ?? null}
        maxScore={result?.maxScore ?? 100}
        easyCorrect={result?.easyCorrect ?? null}
        mediumCorrect={result?.mediumCorrect ?? null}
        hardCorrect={result?.hardCorrect ?? null}
        expertCorrect={result?.expertCorrect ?? null}
        wrong={result?.wrong ?? []}
        categoryRates={result?.categoryRates ?? []}
        encodedAnswers={answers ? r ?? null : null}
      />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: `영탁 팬 퀴즈 결과: ${grade.title}`,
        description: grade.summary,
        url: absoluteUrl(youngtakFanResultPath(grade.slug)),
        inLanguage: "ko-KR",
        isAccessibleForFree: true,
        about: { "@type": "Quiz", "@id": absoluteUrl("/tests/youngtak-fan-test#quiz") },
      }} />
    </>
  );
}
