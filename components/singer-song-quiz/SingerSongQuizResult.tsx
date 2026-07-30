"use client";

import Link from "next/link";
import {
  CommonFanQuizResult,
  type CommonFanQuizWrongReview,
} from "@/components/fan-quiz/CommonFanQuizResult";
import {
  calculateSingerSongQuizResult,
  encodeSingerSongQuizAnswers,
} from "@/lib/singer-song-quiz-engine";
import type {
  SingerSongQuizAnswer,
  SingerSongQuizQuestion,
} from "@/lib/singer-song-quiz-engine";
import type { TestDefinition } from "@/lib/types";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { localizeTest } from "@/lib/test-i18n";

type Props = {
  answers: SingerSongQuizAnswer[] | null;
  test: TestDefinition;
  questions: SingerSongQuizQuestion[];
  quizSize: number;
  resultBasePath: string;
  imageSrc?: string;
  imageAlt: string;
  imageObjectPosition?: string;
  disclaimer: string;
};

export function SingerSongQuizResult({
  answers,
  test,
  questions,
  quizSize,
  resultBasePath,
  imageSrc,
  imageAlt,
  imageObjectPosition,
  disclaimer,
}: Props) {
  const { locale, t } = useLanguage();
  const localizedTest = localizeTest(test, locale);
  if (!answers) {
    return (
      <main className="container-page py-16 text-center">
        <h1 className="text-3xl font-black">{t("error.noResult")}</h1>
        <Link
          href={`/tests/${test.slug}?start=1`}
          className="mt-6 inline-flex rounded-md bg-primary px-6 py-3 font-bold text-white"
        >
          {t("runner.startTest")}
        </Link>
      </main>
    );
  }

  const result = calculateSingerSongQuizResult(questions, answers, quizSize);
  const encoded = encodeSingerSongQuizAnswers(answers);
  const resultPath = `${resultBasePath}/level-${result.level}?r=${encoded}`;
  const wrongReviews: CommonFanQuizWrongReview[] = result.reviews
    .filter((review) => !review.correct)
    .map((review) => ({
      id: review.question.id,
      question: review.question.question,
      choiceText: review.question.options[review.choice] ?? t("runner.noSelection"),
      correctText: review.question.correctAnswer,
      explanation: review.question.explanation,
      point: 1,
    }));

  return (
    <CommonFanQuizResult
      test={test}
      gradeTitle={localizedTest.shortTitle}
      gradeSummary={t("fan.answered", { total: quizSize, correct: result.correctCount })}
      gradeDescription={t("fan.convertedScore")}
      hasResult
      correctCount={result.correctCount}
      totalCount={quizSize}
      pointScore={result.score}
      pointMaxScore={100}
      levelScore={result.score}
      levelMaxScore={100}
      wrongReviews={wrongReviews}
      resultPath={resultPath}
      imageSrc={imageSrc}
      imageAlt={imageAlt}
      imageObjectPosition={imageObjectPosition}
      shareDescription={`${localizedTest.shortTitle} ${t("fan.result")} LEVEL ${result.level}, ${result.score}/100`}
      disclaimer={disclaimer}
    />
  );
}
