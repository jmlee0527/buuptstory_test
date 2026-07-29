"use client";

import Link from "next/link";
import { CommonFanQuizResult, type CommonFanQuizWrongReview } from "@/components/fan-quiz/CommonFanQuizResult";
import { GIRLS_GENERATION_QUIZ_SIZE, girlsGenerationBank, girlsGenerationFanTest } from "@/data/girls-generation-fan";
import type { GirlsGenerationAnswer } from "@/lib/girls-generation-fan-engine";
import { calculateGirlsGenerationResult, encodeGirlsGenerationAnswers } from "@/lib/girls-generation-fan-engine";

export function GirlsGenerationFanQuizResult({ answers }: { answers: GirlsGenerationAnswer[] | null }) {
  if (!answers) return <main className="container-page py-16 text-center"><h1 className="text-3xl font-black">결과 정보가 없습니다</h1><Link href="/tests/girls-generation-true-fan-test?start=1" className="mt-6 inline-flex rounded-xl bg-primary px-6 py-3 font-bold text-white">테스트 시작하기</Link></main>;

  const result = calculateGirlsGenerationResult(answers);
  const encoded = encodeGirlsGenerationAnswers(answers);
  const resultPath = `/girls-generation-true-fan-test/result/${result.grade.slug}?r=${encoded}`;
  const wrongReviews: CommonFanQuizWrongReview[] = result.reviews.filter((review) => !review.correct).map((review) => ({
    id: review.question.id,
    question: review.question.question,
    choiceText: review.question.options[review.choice] ?? "선택 없음",
    correctText: review.question.answerText,
    explanation: review.question.explanation,
    point: 1,
    note: `검증 기준: ${girlsGenerationBank.test.verificationCutoff ?? girlsGenerationBank.verificationCutoff ?? "2026.07.11"}`,
  }));

  return (
    <CommonFanQuizResult
      test={girlsGenerationFanTest}
      gradeTitle={result.grade.title}
      gradeSummary={result.grade.summary}
      gradeDescription={result.grade.summary}
      hasResult
      correctCount={result.score}
      totalCount={GIRLS_GENERATION_QUIZ_SIZE}
      pointScore={result.score}
      pointMaxScore={GIRLS_GENERATION_QUIZ_SIZE}
      wrongReviews={wrongReviews}
      resultPath={resultPath}
      imageSrc={girlsGenerationFanTest.thumbnail}
      imageAlt="소녀시대 팬 퀴즈 썸네일"
      shareDescription="당신의 SONE 덕력도 확인해 보세요."
    />
  );
}
