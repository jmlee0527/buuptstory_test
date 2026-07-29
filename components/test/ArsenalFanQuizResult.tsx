"use client";

import { CommonFanQuizResult, type CommonFanQuizWrongReview } from "@/components/fan-quiz/CommonFanQuizResult";
import { arsenalDifficultyWeights, arsenalFanTest } from "@/data/arsenal-fan";
import type { ArsenalFanGradeProfile, ArsenalQuizQuestion } from "@/lib/types";

type Props = {
  grade: ArsenalFanGradeProfile;
  fanIndex: number | null;
  totalCorrect: number | null;
  total: number;
  weightedScore: number | null;
  maxScore: number;
  easyCorrect: number | null;
  mediumCorrect: number | null;
  hardCorrect: number | null;
  wrong: { question: ArsenalQuizQuestion; choice: number }[];
  categoryRates: { label: string; correct: number; total: number; rate: number }[];
  encodedAnswers: string | null;
};

function toWrongReviews(wrong: Props["wrong"]): CommonFanQuizWrongReview[] {
  return wrong.map(({ question, choice }) => ({
    id: question.id,
    question: question.question,
    choiceText: question.options[choice] ?? "선택 없음",
    correctText: question.options[question.correctAnswer] ?? "",
    explanation: question.explanation,
    point: arsenalDifficultyWeights[question.difficulty],
    note: question.sourceName ? `출처: ${question.sourceName} · 확인일 ${question.verifiedAt}` : undefined,
  }));
}

export function ArsenalFanQuizResult({ grade, fanIndex, totalCorrect, total, weightedScore, maxScore, wrong, encodedAnswers }: Props) {
  const hasResult = fanIndex !== null;
  const resultPath = `/arsenal-fan-test/result/${grade.slug}${encodedAnswers ? `?r=${encodedAnswers}` : ""}`;

  return (
    <CommonFanQuizResult
      test={arsenalFanTest}
      gradeTitle={grade.title}
      gradeSummary={grade.subtitle}
      gradeDescription={grade.description}
      hasResult={hasResult}
      correctCount={totalCorrect}
      totalCount={total}
      pointScore={weightedScore}
      pointMaxScore={maxScore}
      levelScore={fanIndex ?? grade.maxScore}
      levelMaxScore={100}
      wrongReviews={toWrongReviews(wrong)}
      resultPath={resultPath}
      imageSrc={arsenalFanTest.thumbnail}
      imageAlt="아스날 팬 퀴즈 썸네일"
      shareDescription={grade.subtitle}
      disclaimer="본 테스트는 아스날 FC 또는 프리미어리그의 공식 서비스가 아닌 비공식 팬 퀴즈입니다. 응답은 서버에 저장되지 않습니다."
    />
  );
}
