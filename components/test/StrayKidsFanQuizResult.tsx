"use client";

import Link from "next/link";
import { CommonFanQuizResult, type CommonFanQuizWrongReview } from "@/components/fan-quiz/CommonFanQuizResult";
import { STRAY_KIDS_MAX_SCORE, STRAY_KIDS_QUIZ_SIZE, strayKidsFanTest, strayKidsWeights } from "@/data/stray-kids-fan";
import type { StrayKidsAnswer } from "@/lib/stray-kids-fan-engine";
import { calculateStrayKidsResult, encodeStrayKidsAnswers } from "@/lib/stray-kids-fan-engine";

export function StrayKidsFanQuizResult({ answers }: { answers: StrayKidsAnswer[] | null }) {
  if (!answers) return <main className="container-page py-16 text-center"><h1 className="text-3xl font-black">결과 정보가 없습니다</h1><Link href="/tests/stray-kids-true-fan-test?start=1" className="mt-6 inline-flex rounded-xl bg-primary px-6 py-3 font-bold text-white">테스트 시작하기</Link></main>;

  const result = calculateStrayKidsResult(answers);
  const encoded = encodeStrayKidsAnswers(answers);
  const resultPath = `/stray-kids-true-fan-test/result/${result.grade.slug}?r=${encoded}`;
  const wrongReviews: CommonFanQuizWrongReview[] = result.reviews.filter((review) => !review.correct).map((review) => ({
    id: review.question.id,
    question: review.question.question,
    choiceText: review.question.options[review.choice] ?? "선택 없음",
    correctText: review.question.answer,
    explanation: review.question.explanation,
    point: strayKidsWeights[review.question.difficulty],
    note: `검증 기준: ${review.question.source.verifiedAt.replaceAll("-", ".")} · 출처: ${review.question.source.publisher}`,
  }));

  return (
    <CommonFanQuizResult
      test={strayKidsFanTest}
      gradeTitle={result.grade.name}
      gradeSummary={result.grade.headline}
      gradeDescription={result.grade.description}
      hasResult
      correctCount={result.score}
      totalCount={STRAY_KIDS_QUIZ_SIZE}
      pointScore={result.weightedScore}
      pointMaxScore={STRAY_KIDS_MAX_SCORE}
      wrongReviews={wrongReviews}
      resultPath={resultPath}
      imageSrc={strayKidsFanTest.thumbnail}
      imageAlt="스트레이 키즈 팬 퀴즈 썸네일"
      shareDescription="당신의 STAY 팬심도 확인해 보세요."
    />
  );
}
