import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { YoungtakSongQuizResult } from "@/components/test/YoungtakSongQuizResult";
import {
  YOUNGTAK_SONG_QUIZ_SIZE,
  youngtakSongQuizQuestions,
  youngtakSongQuizTest,
} from "@/data/youngtak-song-quiz";
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
        title: `LEVEL ${level} | 영탁 팬 퀴즈(노래 버전) 결과`,
        description: `영탁 팬 퀴즈(노래 버전) 결과 LEVEL ${level}. 12문제로 영탁 노래와 앨범 지식을 확인해 보세요.`,
        path: `/youngtak-song-fan-quiz/result/${slug}`,
        keywords: ["영탁 팬 퀴즈 결과", "영탁 노래 퀴즈 결과", `영탁 퀴즈 LEVEL ${level}`],
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
    youngtakSongQuizQuestions,
    YOUNGTAK_SONG_QUIZ_SIZE,
  );
  if (answers) {
    const result = calculateSingerSongQuizResult(
      youngtakSongQuizQuestions,
      answers,
      YOUNGTAK_SONG_QUIZ_SIZE,
    );
    if (result.level !== level) {
      redirect(`/youngtak-song-fan-quiz/result/level-${result.level}?r=${r}`);
    }
  }

  return (
    <>
      <YoungtakSongQuizResult answers={answers} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: `영탁 팬 퀴즈(노래 버전) 결과 LEVEL ${level}`,
          description: "영탁의 노래와 앨범 정보를 확인하는 비공식 팬 퀴즈 결과입니다.",
          url: absoluteUrl(`/youngtak-song-fan-quiz/result/${slug}`),
          inLanguage: "ko-KR",
          isAccessibleForFree: true,
          isPartOf: {
            "@type": "Quiz",
            name: youngtakSongQuizTest.title,
            about: "영탁의 노래와 음반",
          },
        }}
      />
    </>
  );
}
