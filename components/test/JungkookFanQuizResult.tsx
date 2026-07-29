"use client";

import Link from "next/link";
import { CommonFanQuizResult, type CommonFanQuizWrongReview } from "@/components/fan-quiz/CommonFanQuizResult";
import {
  JUNGKOOK_MAX_SCORE,
  JUNGKOOK_QUIZ_SIZE,
  jungkookBank,
  jungkookFanTest,
} from "@/data/jungkook-fan";
import type { JungkookAnswer } from "@/lib/jungkook-fan-engine";
import { calculateJungkookResult, encodeJungkookAnswers } from "@/lib/jungkook-fan-engine";

export function JungkookFanQuizResult({ answers }: { answers: JungkookAnswer[] | null }) {
  if (!answers) {
    return (
      <main className="container-page py-16 text-center">
        <h1 className="text-3xl font-black">결과 정보가 없습니다</h1>
        <Link href="/tests/bts-jungkook-true-fan-test?start=1" className="mt-6 inline-flex rounded-xl bg-primary px-6 py-3 font-bold text-white">
          테스트 시작하기
        </Link>
      </main>
    );
  }

  const result = calculateJungkookResult(answers);
  const encoded = encodeJungkookAnswers(answers);
  const resultPath = `/bts-jungkook-true-fan-test/result/${result.grade.slug}?r=${encoded}`;
  const wrongReviews: CommonFanQuizWrongReview[] = result.reviews
    .filter((review) => !review.correct)
    .map((review) => ({
      id: String(review.question.id),
      question: review.question.question,
      choiceText: review.question.options[review.choice] ?? "선택 없음",
      correctText: review.question.answer,
      explanation: review.question.explanation,
      point: 1,
      note: `검증 기준일: ${jungkookBank.test.verificationDate}`,
    }));

  return (
    <CommonFanQuizResult
      test={jungkookFanTest}
      gradeTitle={result.grade.name}
      gradeSummary={result.grade.summary}
      gradeDescription={result.grade.summary}
      hasResult
      correctCount={result.score}
      totalCount={JUNGKOOK_QUIZ_SIZE}
      pointScore={result.score}
      pointMaxScore={JUNGKOOK_MAX_SCORE}
      wrongReviews={wrongReviews}
      resultPath={resultPath}
      imageAlt="BTS 정국 팬 퀴즈 썸네일"
      imageObjectPosition="center 28%"
      shareDescription="당신의 BTS 정국 팬력도 확인해 보세요."
      disclaimer="본 테스트는 공개된 공식·신뢰도 높은 자료를 바탕으로 미미테스트가 제작한 비공식 팬 퀴즈이며 BTS, 정국 또는 관련 권리자와 공식적인 관계가 없습니다."
    />
  );
}
