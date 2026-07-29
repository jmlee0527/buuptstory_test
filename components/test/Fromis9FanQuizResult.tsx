"use client";

import { CommonFanQuizResult, type CommonFanQuizWrongReview } from "@/components/fan-quiz/CommonFanQuizResult";
import { FROMIS9_FAN_QUIZ_SIZE, fromis9FanTest } from "@/data/fromis9-fan";
import type { Fromis9FanGradeProfile, Fromis9QuizQuestion } from "@/lib/types";

type Props = {
  grade: Fromis9FanGradeProfile;
  score: number | null;
  easyCorrect: number | null;
  mediumCorrect: number | null;
  hardCorrect: number | null;
  wrong: { question: Fromis9QuizQuestion; choice: number }[];
  categoryRates: { label: string; correct: number; total: number; rate: number }[];
  encodedAnswers: string | null;
};

function toWrongReviews(wrong: Props["wrong"]): CommonFanQuizWrongReview[] {
  return wrong.map(({ question, choice }) => ({
    id: question.id,
    question: question.question,
    choiceText: question.choices[choice] ?? "선택 없음",
    correctText: question.choices[question.correctAnswer] ?? "",
    explanation: question.explanation,
    point: 1,
    note: `출처: ${question.source}`,
  }));
}

export function Fromis9FanQuizResult({ grade, score, wrong, encodedAnswers }: Props) {
  const hasResult = score !== null;
  const shownScore = score ?? grade.maxScore;
  const resultPath = `/fromis9-fan-test/result/${grade.slug}${encodedAnswers ? `?r=${encodedAnswers}` : ""}`;

  return (
    <CommonFanQuizResult
      test={fromis9FanTest}
      gradeTitle={grade.name}
      gradeSummary={grade.subtitle}
      gradeDescription={grade.description}
      hasResult={hasResult}
      correctCount={score}
      totalCount={FROMIS9_FAN_QUIZ_SIZE}
      pointScore={score}
      pointMaxScore={FROMIS9_FAN_QUIZ_SIZE}
      levelScore={shownScore}
      levelMaxScore={FROMIS9_FAN_QUIZ_SIZE}
      wrongReviews={toWrongReviews(wrong)}
      resultPath={resultPath}
      imageSrc={fromis9FanTest.thumbnail}
      imageAlt="프로미스나인 팬 퀴즈 썸네일"
      shareDescription={grade.subtitle}
      disclaimer="본 테스트는 프로미스나인 또는 소속사의 공식 서비스가 아닌 비공식 팬 퀴즈입니다. 응답은 서버에 저장되지 않습니다."
    />
  );
}
