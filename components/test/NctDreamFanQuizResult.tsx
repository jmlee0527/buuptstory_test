"use client";

import Link from "next/link";
import { CommonFanQuizResult, type CommonFanQuizWrongReview } from "@/components/fan-quiz/CommonFanQuizResult";
import { NCT_DREAM_MAX_SCORE, NCT_DREAM_QUIZ_SIZE, nctDreamFanTest } from "@/data/nct-dream-fan";
import type { NctDreamAnswer } from "@/lib/nct-dream-fan-engine";
import { calculateNctDreamResult, encodeNctDreamAnswers } from "@/lib/nct-dream-fan-engine";

export function NctDreamFanQuizResult({ answers }: { answers: NctDreamAnswer[] | null }) {
  if (!answers) {
    return (
      <main className="container-page py-16 text-center">
        <h1 className="text-3xl font-black">결과 정보가 없습니다</h1>
        <Link href="/tests/nct-dream-true-fan-test?start=1" className="mt-6 inline-flex rounded-xl bg-primary px-6 py-3 font-bold text-white">테스트 시작하기</Link>
      </main>
    );
  }

  const result = calculateNctDreamResult(answers);
  const encoded = encodeNctDreamAnswers(answers);
  const resultPath = `/nct-dream-true-fan-test/result/${result.grade.slug}?r=${encoded}`;
  const wrongReviews: CommonFanQuizWrongReview[] = result.reviews.filter((review) => !review.correct).map((review) => ({
    id: review.question.id,
    question: review.question.question,
    choiceText: review.question.choices[review.choice] ?? "선택 없음",
    correctText: review.question.answer,
    explanation: review.question.explanation,
    point: review.question.weight,
    note: "검증 기준: 2026년 7월",
  }));

  return (
    <CommonFanQuizResult
      test={nctDreamFanTest}
      gradeTitle={result.grade.title}
      gradeSummary={result.grade.badge}
      gradeDescription={result.grade.summary}
      hasResult
      correctCount={result.correctCount}
      totalCount={NCT_DREAM_QUIZ_SIZE}
      pointScore={result.score}
      pointMaxScore={NCT_DREAM_MAX_SCORE}
      wrongReviews={wrongReviews}
      resultPath={resultPath}
      imageSrc={nctDreamFanTest.thumbnail}
      imageAlt="NCT DREAM 팬 퀴즈 썸네일"
      shareDescription="당신의 NCT DREAM 팬심도 확인해 보세요."
      disclaimer="공식 사이트·공식 음원·공식 공연 공지를 기준으로 검증한 미미테스트의 비공식 팬 퀴즈입니다."
    />
  );
}
