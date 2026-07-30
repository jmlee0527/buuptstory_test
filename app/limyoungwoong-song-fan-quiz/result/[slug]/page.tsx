import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { LimYoungWoongSongQuizResult } from "@/components/test/LimYoungWoongSongQuizResult";
import {
  LIMYOUNGWOONG_SONG_QUIZ_SIZE,
  limYoungWoongSongQuizQuestions,
  limYoungWoongSongQuizTest,
} from "@/data/limyoungwoong-song-quiz";
import {
  calculateSingerSongQuizResult,
  parseSingerSongQuizAnswers,
} from "@/lib/singer-song-quiz-engine";
import { absoluteUrl, createMetadata } from "@/lib/site";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ r?: string }>;
};

const levels = Array.from({ length: 10 }, (_, index) => index + 1);

export function generateStaticParams() {
  return levels.map((level) => ({ slug: `level-${level}` }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const level = Number(slug.replace("level-", ""));
  return levels.includes(level)
    ? {
      ...createMetadata({
        title: `LEVEL ${level} | 임영웅 팬 퀴즈(노래 버전) 결과`,
        description: `임영웅 팬 퀴즈(노래 버전) 결과 LEVEL ${level}. 12문제로 임영웅 노래와 앨범 지식을 확인해 보세요.`,
        path: `/limyoungwoong-song-fan-quiz/result/${slug}`,
        keywords: ["임영웅 팬 퀴즈 결과", "임영웅 노래 퀴즈 결과", `임영웅 퀴즈 LEVEL ${level}`],
        ogImage: false,
      }),
      robots: { index: false, follow: true },
    }
    : {};
}

export default async function Page({ params, searchParams }: Props) {
  const { slug } = await params;
  const { r } = await searchParams;
  const level = Number(slug.replace("level-", ""));
  if (!levels.includes(level)) notFound();

  const answers = parseSingerSongQuizAnswers(
    r,
    limYoungWoongSongQuizQuestions,
    LIMYOUNGWOONG_SONG_QUIZ_SIZE,
  );
  if (answers) {
    const result = calculateSingerSongQuizResult(
      limYoungWoongSongQuizQuestions,
      answers,
      LIMYOUNGWOONG_SONG_QUIZ_SIZE,
    );
    if (result.level !== level) {
      redirect(`/limyoungwoong-song-fan-quiz/result/level-${result.level}?r=${r}`);
    }
  }

  return (
    <>
      <LimYoungWoongSongQuizResult answers={answers} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: `임영웅 팬 퀴즈(노래 버전) 결과 LEVEL ${level}`,
          description: "임영웅의 노래와 앨범 정보를 확인하는 비공식 팬 퀴즈 결과입니다.",
          url: absoluteUrl(`/limyoungwoong-song-fan-quiz/result/${slug}`),
          inLanguage: "ko-KR",
          isAccessibleForFree: true,
          isPartOf: {
            "@type": "Quiz",
            name: limYoungWoongSongQuizTest.title,
            about: "임영웅의 노래와 음반",
          },
        }}
      />
    </>
  );
}
