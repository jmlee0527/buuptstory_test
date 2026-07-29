import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { ArsenalFanQuizResult } from "@/components/test/ArsenalFanQuizResult";
import { JsonLd } from "@/components/seo/JsonLd";
import { arsenalFanGradeProfiles, getArsenalFanGradeProfile } from "@/data/arsenal-fan";
import { absoluteUrl, createMetadata } from "@/lib/site";
import { arsenalFanResultPath, calculateArsenalFanIndex, parseArsenalAnswers } from "@/lib/arsenal-fan-engine";

type Props = { params: Promise<{ slug: string }>; searchParams: Promise<{ r?: string }> };

export function generateStaticParams() {
  return arsenalFanGradeProfiles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const grade = getArsenalFanGradeProfile(slug);
  if (!grade) return {};
  return createMetadata({
    title: `${grade.title} | 아스날 팬 퀴즈 결과 | 미미테스트`,
    description: `아스날 팬 퀴즈 결과 ${grade.title}. 15개의 아스날 퀴즈로 역사, 선수, 감독, 우승 기록을 얼마나 알고 있는지 확인해보세요.`,
    path: arsenalFanResultPath(grade.slug),
    keywords: ["아스날 팬 테스트", "아스날 퀴즈", "아스날 팬 지수", "구너 테스트", grade.title],
    ogImage: false,
  });
}

export default async function ArsenalFanQuizResultPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { r } = await searchParams;
  const grade = getArsenalFanGradeProfile(slug);
  if (!grade) notFound();

  const answers = parseArsenalAnswers(r);
  const result = answers ? calculateArsenalFanIndex(answers) : null;
  if (result && result.grade.slug !== slug) redirect(`${arsenalFanResultPath(result.grade.slug)}?r=${r}`);

  return (
    <>
      <ArsenalFanQuizResult
        grade={result?.grade ?? grade}
        fanIndex={result?.fanIndex ?? null}
        totalCorrect={result?.totalCorrect ?? null}
        total={result?.total ?? 15}
        weightedScore={result?.weightedScore ?? null}
        maxScore={result?.maxScore ?? 29}
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
        name: `아스날 팬 퀴즈 결과: ${grade.title}`,
        description: grade.subtitle,
        url: absoluteUrl(arsenalFanResultPath(grade.slug)),
        inLanguage: "ko-KR",
        isAccessibleForFree: true,
        about: { "@type": "Quiz", "@id": absoluteUrl("/tests/arsenal-fan-test#quiz") },
      }} />
    </>
  );
}
