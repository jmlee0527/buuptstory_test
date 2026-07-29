"use client";

import Link from "next/link";
import { CommonFanQuizResult, type CommonFanQuizWrongReview } from "@/components/fan-quiz/CommonFanQuizResult";
import { SEVENTEEN_QUIZ_SIZE, seventeenFanTest } from "@/data/seventeen-fan";
import type { SeventeenAnswer } from "@/lib/seventeen-fan-engine";
import { calculateSeventeenResult, encodeSeventeenAnswers } from "@/lib/seventeen-fan-engine";

export function SeventeenFanQuizResult({ answers }: { answers: SeventeenAnswer[] | null }) {
  if (!answers) return <main className="container-page py-16 text-center"><h1 className="text-3xl font-black">결과 정보가 없습니다</h1><Link href="/tests/seventeen-true-fan?start=1" className="mt-6 inline-flex rounded-xl bg-primary px-6 py-3 font-bold text-white">테스트 시작하기</Link></main>;

  const result = calculateSeventeenResult(answers);
  const encoded = encodeSeventeenAnswers(answers);
  const resultPath = `/seventeen-true-fan/result/${result.grade.slug}?r=${encoded}`;
  const wrongReviews: CommonFanQuizWrongReview[] = result.reviews.filter((review) => !review.correct).map((review) => ({
    id: review.question.id,
    question: review.question.prompt,
    choiceText: review.question.choices[review.choice] ?? "선택 없음",
    correctText: review.question.answerText,
    explanation: review.question.explanation,
    point: 1,
    note: `검증 기준: ${review.question.verifiedAt.replaceAll("-", ".")}`,
  }));

  return (
    <CommonFanQuizResult
      test={seventeenFanTest}
      gradeTitle={result.grade.name}
      gradeSummary={result.grade.description}
      gradeDescription={result.grade.description}
      hasResult
      correctCount={result.score}
      totalCount={SEVENTEEN_QUIZ_SIZE}
      pointScore={result.score}
      pointMaxScore={SEVENTEEN_QUIZ_SIZE}
      wrongReviews={wrongReviews}
      resultPath={resultPath}
      imageSrc={seventeenFanTest.thumbnail}
      imageAlt="세븐틴 팬 퀴즈 썸네일"
      shareDescription="당신의 캐럿력도 확인해 보세요."
    />
  );
}
