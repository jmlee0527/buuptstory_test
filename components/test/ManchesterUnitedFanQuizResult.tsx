"use client";

import Link from "next/link";
import { CommonFanQuizResult, type CommonFanQuizWrongReview } from "@/components/fan-quiz/CommonFanQuizResult";
import { MANCHESTER_UNITED_MAX_SCORE, MANCHESTER_UNITED_QUIZ_SIZE, manchesterUnitedFanTest, manchesterUnitedWeights } from "@/data/manchester-united-fan";
import type { ManchesterUnitedAnswer } from "@/lib/manchester-united-fan-engine";
import { calculateManchesterUnitedResult, encodeManchesterUnitedAnswers } from "@/lib/manchester-united-fan-engine";

export function ManchesterUnitedFanQuizResult({ answers }: { answers: ManchesterUnitedAnswer[] | null }) {
  if (!answers) return <main className="container-page py-16 text-center"><h1 className="text-3xl font-black">결과 정보가 없습니다</h1><Link href="/tests/manchester-united-true-fan-test?start=1" className="mt-6 inline-flex rounded-xl bg-primary px-6 py-3 font-bold text-white">테스트 시작하기</Link></main>;

  const result = calculateManchesterUnitedResult(answers);
  const encoded = encodeManchesterUnitedAnswers(answers);
  const resultPath = `/manchester-united-true-fan-test/result/${result.grade.key}?r=${encoded}`;
  const wrongReviews: CommonFanQuizWrongReview[] = result.reviews.filter((review) => !review.correct).map((review) => ({
    id: review.question.id,
    question: review.question.question,
    choiceText: review.question.options[review.choice] ?? "선택 없음",
    correctText: review.question.answer,
    explanation: review.question.explanation,
    point: manchesterUnitedWeights[review.question.difficulty],
    note: "검증 기준: 2026.07.11",
  }));

  return (
    <CommonFanQuizResult
      test={manchesterUnitedFanTest}
      gradeTitle={result.grade.title}
      gradeSummary={result.grade.headline}
      gradeDescription={result.grade.description}
      hasResult
      correctCount={result.score}
      totalCount={MANCHESTER_UNITED_QUIZ_SIZE}
      pointScore={result.weightedScore}
      pointMaxScore={MANCHESTER_UNITED_MAX_SCORE}
      wrongReviews={wrongReviews}
      resultPath={resultPath}
      imageSrc={manchesterUnitedFanTest.thumbnail}
      imageAlt="맨유 팬 퀴즈 썸네일"
      shareDescription="당신의 맨유 팬심도 확인해 보세요."
    />
  );
}
