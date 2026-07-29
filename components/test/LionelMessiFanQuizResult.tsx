"use client";

import Link from "next/link";
import { CommonFanQuizResult, type CommonFanQuizWrongReview } from "@/components/fan-quiz/CommonFanQuizResult";
import { MESSI_MAX_SCORE, MESSI_QUIZ_SIZE, lionelMessiFanTest, messiBank } from "@/data/lionel-messi-fan";
import type { MessiAnswer } from "@/lib/lionel-messi-fan-engine";
import { calculateMessiResult, encodeMessiAnswers } from "@/lib/lionel-messi-fan-engine";

export function LionelMessiFanQuizResult({ answers }: { answers: MessiAnswer[] | null }) {
  if (!answers) {
    return (
      <main className="container-page py-16 text-center">
        <h1 className="text-3xl font-black">결과 정보가 없습니다</h1>
        <Link href="/tests/lionel-messi-true-fan-test?start=1" className="mt-6 inline-flex rounded-xl bg-primary px-6 py-3 font-bold text-white">테스트 시작하기</Link>
      </main>
    );
  }

  const result = calculateMessiResult(answers);
  const encoded = encodeMessiAnswers(answers);
  const resultPath = `/lionel-messi-true-fan-test/result/${result.grade.slug}?r=${encoded}`;
  const wrongReviews: CommonFanQuizWrongReview[] = result.reviews.filter((review) => !review.correct).map((review) => ({
    id: review.question.id,
    question: review.question.question,
    choiceText: review.question.options[review.choice] ?? "선택 없음",
    correctText: review.question.answer,
    explanation: review.question.explanation,
    point: 1,
    note: `검증 기준: ${messiBank.verification.verifiedAt}`,
  }));

  return (
    <CommonFanQuizResult
      test={lionelMessiFanTest}
      gradeTitle={result.grade.name}
      gradeSummary={result.grade.summary}
      gradeDescription={result.grade.summary}
      hasResult
      correctCount={result.score}
      totalCount={MESSI_QUIZ_SIZE}
      pointScore={result.score}
      pointMaxScore={MESSI_MAX_SCORE}
      wrongReviews={wrongReviews}
      resultPath={resultPath}
      imageSrc={lionelMessiFanTest.thumbnail}
      imageAlt="리오넬 메시 팬 퀴즈 썸네일"
      shareDescription="당신의 메시 찐팬력도 확인해 보세요."
      disclaimer={messiBank.test.disclaimer}
    />
  );
}
