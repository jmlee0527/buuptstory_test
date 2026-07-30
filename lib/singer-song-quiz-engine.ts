export type SingerSongQuizDifficulty = "medium" | "high" | "expert";
export type SingerSongQuizQuestionType = "A" | "B" | "C" | "D" | "E";

export type SingerSongQuizQuestion = {
  id: string;
  difficulty: SingerSongQuizDifficulty;
  type: SingerSongQuizQuestionType;
  question: string;
  options: string[];
  correctAnswer: string;
  answerIndex: number;
  songTitle: string;
  album: string;
  releaseDate: string;
  source: string;
  verified: true;
  explanation: string;
};

export type SingerSongQuizPresentedQuestion = SingerSongQuizQuestion & {
  originalId: string;
  prompt: string;
  choices: string[];
  optionOrder: number[];
};

export type SingerSongQuizAnswer = {
  questionId: string;
  choice: number;
};

export type SingerSongQuizConfig = {
  quizSize: number;
  quota: Record<SingerSongQuizDifficulty, number>;
};

const difficulties: SingerSongQuizDifficulty[] = ["medium", "high", "expert"];

function hash(seed: string) {
  let value = 2166136261;
  for (let index = 0; index < seed.length; index++) {
    value = Math.imul(value ^ seed.charCodeAt(index), 16777619);
  }
  return value >>> 0;
}

function createRandom(seed: string) {
  let state = hash(seed) || 1;
  return () => {
    state += 0x6d2b79f5;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

export function seededSingerSongShuffle<T>(items: readonly T[], seed: string) {
  const random = createRandom(seed);
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index--) {
    const swapIndex = Math.floor(random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
}

export function createSingerSongQuizSession(
  questions: readonly SingerSongQuizQuestion[],
  config: SingerSongQuizConfig,
  seed: string,
  recentIds: string[] = [],
): SingerSongQuizPresentedQuestion[] {
  const selected = difficulties.flatMap((difficulty) => {
    const pool = seededSingerSongShuffle(
      questions.filter((question) => question.difficulty === difficulty),
      `${seed}:${difficulty}`,
    );
    const prioritized = [
      ...pool.filter((question) => !recentIds.includes(question.id)),
      ...pool.filter((question) => recentIds.includes(question.id)),
    ];
    return prioritized.slice(0, config.quota[difficulty]);
  });

  if (
    selected.length !== config.quizSize ||
    new Set(selected.map((question) => question.id)).size !== config.quizSize
  ) {
    throw new Error("가수 노래 팬 퀴즈 세션을 구성하지 못했습니다.");
  }

  return seededSingerSongShuffle(selected, `${seed}:questions`).map((question) => {
    const optionOrder = seededSingerSongShuffle([0, 1, 2, 3], `${seed}:${question.id}:options`);
    return {
      ...question,
      originalId: question.id,
      prompt: question.question,
      choices: optionOrder.map((optionIndex) => question.options[optionIndex]),
      optionOrder,
    };
  });
}

export function calculateSingerSongQuizResult(
  questions: readonly SingerSongQuizQuestion[],
  answers: SingerSongQuizAnswer[],
  quizSize: number,
) {
  const byId = new Map(questions.map((question) => [question.id, question]));
  const reviews = answers.flatMap((answer) => {
    const question = byId.get(answer.questionId);
    return question
      ? [{ question, choice: answer.choice, correct: answer.choice === question.answerIndex }]
      : [];
  });
  const correctCount = reviews.filter((review) => review.correct).length;
  const score = Math.round((correctCount / quizSize) * 100);
  const level = Math.max(1, Math.min(10, Math.ceil(score / 10)));
  return { correctCount, score, level, reviews };
}

export const encodeSingerSongQuizAnswers = (answers: SingerSongQuizAnswer[]) =>
  answers.map((answer) => `${encodeURIComponent(answer.questionId)}.${answer.choice}`).join("~");

export function parseSingerSongQuizAnswers(
  raw: string | undefined,
  questions: readonly SingerSongQuizQuestion[],
  quizSize: number,
): SingerSongQuizAnswer[] | null {
  if (!raw) return null;
  const byId = new Set(questions.map((question) => question.id));
  const answers = raw.split("~").map((token) => {
    const separator = token.lastIndexOf(".");
    return {
      questionId: decodeURIComponent(token.slice(0, separator)),
      choice: Number(token.slice(separator + 1)),
    };
  });

  return answers.length === quizSize &&
    new Set(answers.map((answer) => answer.questionId)).size === quizSize &&
    answers.every((answer) =>
      byId.has(answer.questionId) &&
      Number.isInteger(answer.choice) &&
      answer.choice >= 0 &&
      answer.choice < 4)
    ? answers
    : null;
}
