"use client";

import { CommonFanQuizResult, type CommonFanQuizWrongReview } from "@/components/fan-quiz/CommonFanQuizResult";
import { LIM_YOUNG_WOONG_FAN_MAX_SCORE, limYoungWoongDifficultyScores, limYoungWoongFanTest } from "@/data/limyoungwoong-fan";
import type { LimYoungWoongFanGradeProfile, LimYoungWoongQuizQuestion } from "@/lib/types";

type Props = {
  grade: LimYoungWoongFanGradeProfile;
  fanIndex: number | null;
  totalCorrect: number | null;
  total: number;
  weightedScore: number | null;
  maxScore: number;
  easyCorrect: number | null;
  mediumCorrect: number | null;
  hardCorrect: number | null;
  expertCorrect: number | null;
  wrong: { question: LimYoungWoongQuizQuestion; choice: number }[];
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
    point: limYoungWoongDifficultyScores[question.difficulty],
    note: `검증 메모: ${question.factCheckNote} · 확인일 ${question.verifiedAt}`,
  }));
}

export function LimYoungWoongFanQuizResult({ grade, fanIndex, totalCorrect, total, weightedScore, maxScore, wrong, encodedAnswers }: Props) {
  const hasResult = fanIndex !== null;
  const resultPath = `/limyoungwoong-fan-test/result/${grade.slug}${encodedAnswers ? `?r=${encodedAnswers}` : ""}`;

  return (
    <CommonFanQuizResult
      test={limYoungWoongFanTest}
      gradeTitle={grade.title}
      gradeSummary={grade.summary}
      gradeDescription={grade.description}
      hasResult={hasResult}
      correctCount={totalCorrect}
      totalCount={total}
      pointScore={weightedScore}
      pointMaxScore={maxScore}
      levelScore={fanIndex ?? grade.maxScore}
      levelMaxScore={LIM_YOUNG_WOONG_FAN_MAX_SCORE}
      wrongReviews={toWrongReviews(wrong)}
      resultPath={resultPath}
      imageSrc={limYoungWoongFanTest.thumbnail}
      imageAlt="임영웅 팬 퀴즈 썸네일"
      shareDescription={grade.summary}
      disclaimer="본 테스트는 임영웅 또는 소속사의 공식 서비스가 아닌 비공식 팬 퀴즈입니다. 응답은 서버에 저장되지 않습니다."
    />
  );
}
