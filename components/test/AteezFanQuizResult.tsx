"use client";

import Link from "next/link";
import { CommonFanQuizResult, type CommonFanQuizWrongReview } from "@/components/fan-quiz/CommonFanQuizResult";
import { ATEEZ_QUIZ_SIZE, ateezBank, ateezFanTest } from "@/data/ateez-fan";
import type { AteezAnswer } from "@/lib/ateez-fan-engine";
import { calculateAteezResult, encodeAteezAnswers } from "@/lib/ateez-fan-engine";

export function AteezFanQuizResult({ answers }: { answers: AteezAnswer[] | null }) {
  if (!answers) return <main className="container-page py-16 text-center"><h1 className="text-3xl font-black">결과 정보가 없습니다</h1><Link href="/tests/ateez-true-fan-test?start=1" className="mt-6 inline-flex rounded-xl bg-primary px-6 py-3 font-bold text-white">테스트 시작하기</Link></main>;

  const result = calculateAteezResult(answers);
  const encoded = encodeAteezAnswers(answers);
  const resultPath = `/ateez-true-fan-test/result/${result.grade.slug}?r=${encoded}`;
  const wrongReviews: CommonFanQuizWrongReview[] = result.reviews.filter((review) => !review.correct).map((review) => ({
    id: review.question.id,
    question: review.question.question,
    choiceText: review.question.options[review.choice] ?? "선택 없음",
    correctText: review.question.answerText,
    explanation: review.question.explanation,
    point: 1,
    note: `검증 기준: ${ateezBank.test.verificationCutoff}`,
  }));

  return (
    <CommonFanQuizResult
      test={ateezFanTest}
      gradeTitle={result.grade.title}
      gradeSummary={result.grade.summary}
      gradeDescription={result.grade.summary}
      hasResult
      correctCount={result.score}
      totalCount={ATEEZ_QUIZ_SIZE}
      pointScore={result.score}
      pointMaxScore={ATEEZ_QUIZ_SIZE}
      wrongReviews={wrongReviews}
      resultPath={resultPath}
      imageSrc={ateezFanTest.thumbnail}
      imageAlt="ATEEZ 팬 퀴즈 썸네일"
      shareDescription="당신의 에이티니 덕력도 확인해 보세요."
    />
  );
}
