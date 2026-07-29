"use client";

import { CommonFanQuizResult, type CommonFanQuizWrongReview } from "@/components/fan-quiz/CommonFanQuizResult";
import { BTS_FAN_QUIZ_SIZE, btsFanTest } from "@/data/bts-fan";
import type { BtsFanGradeProfile, BtsQuizQuestion } from "@/lib/types";

type Props = {
  grade: BtsFanGradeProfile;
  score: number | null;
  easyCorrect: number | null;
  mediumCorrect: number | null;
  hardCorrect: number | null;
  wrong: { question: BtsQuizQuestion; choice: number }[];
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

export function BtsFanQuizResult({ grade, score, wrong, encodedAnswers }: Props) {
  const hasResult = score !== null;
  const shownScore = score ?? grade.maxScore;
  const resultPath = `/bts-fan-test/result/${grade.slug}${encodedAnswers ? `?r=${encodedAnswers}` : ""}`;

  return (
    <CommonFanQuizResult
      test={btsFanTest}
      gradeTitle={grade.name}
      gradeSummary={grade.subtitle}
      gradeDescription={grade.description}
      hasResult={hasResult}
      correctCount={score}
      totalCount={BTS_FAN_QUIZ_SIZE}
      pointScore={score}
      pointMaxScore={BTS_FAN_QUIZ_SIZE}
      levelScore={shownScore}
      levelMaxScore={BTS_FAN_QUIZ_SIZE}
      wrongReviews={toWrongReviews(wrong)}
      resultPath={resultPath}
      imageSrc={btsFanTest.thumbnail}
      imageAlt="BTS 팬 퀴즈 썸네일"
      shareDescription={grade.subtitle}
      disclaimer="본 테스트는 BTS, 하이브, 빅히트 뮤직의 공식 서비스가 아닌 비공식 팬 퀴즈입니다. 응답은 서버에 저장되지 않습니다."
    />
  );
}
