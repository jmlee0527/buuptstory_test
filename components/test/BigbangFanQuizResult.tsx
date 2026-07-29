"use client";

import Link from "next/link";
import { CommonFanQuizResult, type CommonFanQuizWrongReview } from "@/components/fan-quiz/CommonFanQuizResult";
import { BIGBANG_QUIZ_SIZE, bigbangBank, bigbangFanTest } from "@/data/bigbang-fan";
import type { BigbangAnswer } from "@/lib/bigbang-fan-engine";
import { calculateBigbangResult, encodeBigbangAnswers } from "@/lib/bigbang-fan-engine";

export function BigbangFanQuizResult({ answers }: { answers: BigbangAnswer[] | null }) {
  if (!answers) return <main className="container-page py-16 text-center"><h1 className="text-3xl font-black">결과 정보가 없습니다</h1><Link href="/tests/bigbang-true-fan-test?start=1" className="mt-6 inline-flex rounded-xl bg-primary px-6 py-3 font-bold text-white">테스트 시작하기</Link></main>;

  const result = calculateBigbangResult(answers);
  const encoded = encodeBigbangAnswers(answers);
  const resultPath = `/bigbang-true-fan-test/result/${result.grade.slug}?r=${encoded}`;
  const wrongReviews: CommonFanQuizWrongReview[] = result.reviews.filter((review) => !review.correct).map((review) => ({
    id: review.question.id,
    question: review.question.question,
    choiceText: review.question.options[review.choice] ?? "선택 없음",
    correctText: review.question.answer,
    explanation: review.question.explanation,
    point: 1,
    note: `검증 기준: ${bigbangBank.verification.verifiedAt}`,
  }));

  return (
    <CommonFanQuizResult
      test={bigbangFanTest}
      gradeTitle={result.grade.name}
      gradeSummary={result.grade.summary}
      gradeDescription={result.grade.summary}
      hasResult
      correctCount={result.score}
      totalCount={BIGBANG_QUIZ_SIZE}
      pointScore={result.score}
      pointMaxScore={BIGBANG_QUIZ_SIZE}
      wrongReviews={wrongReviews}
      resultPath={resultPath}
      imageSrc={bigbangFanTest.thumbnail}
      imageAlt="빅뱅 팬 퀴즈 썸네일"
      shareDescription="당신의 VIP 덕력도 확인해 보세요."
    />
  );
}
