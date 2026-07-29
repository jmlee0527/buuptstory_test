import {
  JUNGKOOK_QUIZ_SIZE,
  getJungkookGrade,
  getJungkookQuestion,
  jungkookQuestions,
  jungkookQuota,
} from "@/data/jungkook-fan";
import type { JungkookDifficulty, JungkookQuestion } from "@/data/jungkook-fan";

export type JungkookPresentedQuestion = Omit<JungkookQuestion, "question" | "options"> & {
  originalId: number;
  prompt: string;
  choices: string[];
  optionOrder: number[];
};

export type JungkookAnswer = { questionId: number; choice: number };

function hash(seed: string) {
  let value = 2166136261;
  for (let index = 0; index < seed.length; index++) value = Math.imul(value ^ seed.charCodeAt(index), 16777619);
  return value >>> 0;
}

function rng(seed: string) {
  let state = hash(seed) || 1;
  return () => {
    state += 0x6d2b79f5;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

export function seededJungkookShuffle<T>(items: readonly T[], seed: string) {
  const random = rng(seed);
  const array = [...items];
  for (let index = array.length - 1; index > 0; index--) {
    const swapIndex = Math.floor(random() * (index + 1));
    [array[index], array[swapIndex]] = [array[swapIndex], array[index]];
  }
  return array;
}

export function createJungkookSession(seed: string, recentIds: number[] = []): JungkookPresentedQuestion[] {
  const selected: JungkookQuestion[] = [];
  for (const difficulty of Object.keys(jungkookQuota) as JungkookDifficulty[]) {
    const pool = seededJungkookShuffle(
      jungkookQuestions.filter((question) => question.difficulty === difficulty),
      `${seed}:${difficulty}`,
    );
    const ordered = [
      ...pool.filter((question) => !recentIds.includes(question.id)),
      ...pool.filter((question) => recentIds.includes(question.id)),
    ];
    selected.push(...ordered.slice(0, jungkookQuota[difficulty]));
  }

  if (selected.length !== JUNGKOOK_QUIZ_SIZE || new Set(selected.map((question) => question.id)).size !== JUNGKOOK_QUIZ_SIZE) {
    throw new Error("BTS 정국 팬 퀴즈 세션 생성 실패");
  }

  return seededJungkookShuffle(selected, `${seed}:questions`).map((question) => {
    const optionOrder = seededJungkookShuffle([0, 1, 2, 3], `${seed}:${question.id}:options`);
    return {
      ...question,
      originalId: question.id,
      prompt: question.question,
      choices: optionOrder.map((index) => question.options[index]),
      optionOrder,
    };
  });
}

export function calculateJungkookResult(answers: JungkookAnswer[]) {
  const reviews = answers.flatMap((answer) => {
    const question = getJungkookQuestion(answer.questionId);
    return question ? [{ question, choice: answer.choice, correct: answer.choice === question.answerIndex }] : [];
  });
  const score = reviews.filter((review) => review.correct).length;
  return {
    score,
    accuracy: Math.round((score / JUNGKOOK_QUIZ_SIZE) * 100),
    grade: getJungkookGrade(score),
    reviews,
  };
}

export const encodeJungkookAnswers = (answers: JungkookAnswer[]) =>
  answers.map((answer) => `${answer.questionId}.${answer.choice}`).join("-");

export function parseJungkookAnswers(raw?: string): JungkookAnswer[] | null {
  if (!raw) return null;
  const answers = raw.split("-").map((token) => {
    const [questionId, choice] = token.split(".");
    return { questionId: Number(questionId), choice: Number(choice) };
  });
  return answers.length === JUNGKOOK_QUIZ_SIZE &&
    new Set(answers.map((answer) => answer.questionId)).size === JUNGKOOK_QUIZ_SIZE &&
    answers.every((answer) =>
      getJungkookQuestion(answer.questionId) &&
      Number.isInteger(answer.choice) &&
      answer.choice >= 0 &&
      answer.choice < 4)
    ? answers
    : null;
}
