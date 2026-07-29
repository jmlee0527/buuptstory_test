"use client";

import Link from "next/link";
import { CommonFanQuizResult, type CommonFanQuizWrongReview } from "@/components/fan-quiz/CommonFanQuizResult";
import { RESCENE_QUIZ_SIZE, resceneBank, resceneFanTest } from "@/data/rescene-fan";
import type { ResceneAnswer } from "@/lib/rescene-fan-engine";
import { calculateResceneResult, encodeResceneAnswers } from "@/lib/rescene-fan-engine";

export function ResceneFanQuizResult({ answers }: { answers: ResceneAnswer[] | null }) {
  if (!answers) return <main className="container-page py-16 text-center"><h1 className="text-3xl font-black">결과 정보가 없습니다</h1><Link href="/tests/rescene-true-fan-test?start=1" className="mt-6 inline-flex rounded-xl bg-primary px-6 py-3 font-bold text-white">테스트 시작하기</Link></main>;

  const result = calculateResceneResult(answers);
  const encoded = encodeResceneAnswers(answers);
  const resultPath = `/rescene-true-fan-test/result/${result.grade.slug}?r=${encoded}`;
  const wrongReviews: CommonFanQuizWrongReview[] = result.reviews.filter((review) => !review.correct).map((review) => ({
    id: review.question.id,
    question: review.question.question,
    choiceText: review.question.options[review.choice] ?? "선택 없음",
    correctText: review.question.answerText,
    explanation: review.question.explanation,
    point: 1,
    note: `검증 기준: ${resceneBank.test.verificationCutoff ?? "2026.07.11"}`,
  }));

  return (
    <CommonFanQuizResult
      test={resceneFanTest}
      gradeTitle={result.grade.title}
      gradeSummary={result.grade.summary}
      gradeDescription={result.grade.summary}
      hasResult
      correctCount={result.score}
      totalCount={RESCENE_QUIZ_SIZE}
      pointScore={result.score}
      pointMaxScore={RESCENE_QUIZ_SIZE}
      wrongReviews={wrongReviews}
      resultPath={resultPath}
      imageSrc={resceneFanTest.thumbnail}
      imageAlt="리센트 팬 퀴즈 썸네일"
      shareDescription="당신의 REMINE 덕력도 확인해 보세요."
    />
  );
}
