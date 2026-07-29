import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { LimYoungWoongFanQuizResult } from "@/components/test/LimYoungWoongFanQuizResult";
import { getLimYoungWoongFanGradeProfile, limYoungWoongFanGradeProfiles } from "@/data/limyoungwoong-fan";
import { absoluteUrl, createMetadata } from "@/lib/site";
import { calculateLimYoungWoongFanIndex, parseLimYoungWoongAnswers, limYoungWoongFanResultPath } from "@/lib/limyoungwoong-fan-engine";

type Props = { params: Promise<{ slug: string }>; searchParams: Promise<{ r?: string }> };

export function generateStaticParams() {
  return limYoungWoongFanGradeProfiles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const grade = getLimYoungWoongFanGradeProfile(slug);
  if (!grade) return {};
  return createMetadata({
    title: `${grade.title} | 임영웅 팬 퀴즈 결과 | 미미테스트`,
    description: `임영웅 팬 퀴즈 결과 ${grade.title}. 노래, 앨범, 방송, 무대와 활동 기록을 얼마나 알고 있는지 15문제 퀴즈로 확인해보세요.`,
    path: limYoungWoongFanResultPath(grade.slug),
    keywords: ["임영웅 팬 퀴즈", "임영웅 팬 테스트", "임영웅 퀴즈", "임영웅 팬심 지수", grade.title],
    ogImage: false,
  });
}

export default async function LimYoungWoongFanQuizResultPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { r } = await searchParams;
  const grade = getLimYoungWoongFanGradeProfile(slug);
  if (!grade) notFound();

  const answers = parseLimYoungWoongAnswers(r);
  const result = answers ? calculateLimYoungWoongFanIndex(answers) : null;
  if (result && result.grade.slug !== slug) redirect(`${limYoungWoongFanResultPath(result.grade.slug)}?r=${r}`);

  return (
    <>
      <LimYoungWoongFanQuizResult
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
        name: `임영웅 팬 퀴즈 결과: ${grade.title}`,
        description: grade.summary,
        url: absoluteUrl(limYoungWoongFanResultPath(grade.slug)),
        inLanguage: "ko-KR",
        isAccessibleForFree: true,
        about: { "@type": "Quiz", "@id": absoluteUrl("/tests/limyoungwoong-fan-test#quiz") },
      }} />
    </>
  );
}
