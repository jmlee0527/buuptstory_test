import {
  footballTacticsGradeProfiles,
  footballTacticsQuestions,
  getFootballTacticsQuestion,
  type FootballTacticsAnswer,
  type FootballTacticsDifficulty,
  type FootballTacticsGradeProfile,
  type FootballTacticsQuestion,
} from "@/data/football-tactics";

export const FOOTBALL_TACTICS_QUIZ_SIZE = 10;
export const FOOTBALL_TACTICS_QUOTAS: Record<FootballTacticsDifficulty, number> = { 2: 3, 3: 4, 4: 3 };
const RECENT_STORAGE_KEY = "mimi-football-tactics-recent";
const RECENT_LIMIT = 72;

export function shuffleFootballTactics<T>(items: readonly T[]): T[] {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }
  return result;
}

export function pickFootballTacticsQuestions(recentIds: string[] = []): FootballTacticsQuestion[] {
  const picked = ([2, 3, 4] as FootballTacticsDifficulty[]).flatMap((difficulty) => {
    const pool = footballTacticsQuestions.filter((question) => question.difficulty === difficulty);
    const fresh = pool.filter((question) => !recentIds.includes(question.id));
    const quota = FOOTBALL_TACTICS_QUOTAS[difficulty];
    return shuffleFootballTactics(fresh.length >= quota ? fresh : pool).slice(0, quota);
  });
  return shuffleFootballTactics(picked);
}

export function loadRecentFootballTacticsIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const parsed: unknown = JSON.parse(window.localStorage.getItem(RECENT_STORAGE_KEY) ?? "[]");
    return Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === "string") : [];
  } catch {
    return [];
  }
}

export function saveRecentFootballTacticsIds(newIds: string[]) {
  if (typeof window === "undefined") return;
  try {
    const merged = [...newIds, ...loadRecentFootballTacticsIds().filter((id) => !newIds.includes(id))].slice(0, RECENT_LIMIT);
    window.localStorage.setItem(RECENT_STORAGE_KEY, JSON.stringify(merged));
  } catch {
    // 시크릿 모드 등에서 저장할 수 없어도 테스트 진행에는 영향을 주지 않습니다.
  }
}

export function getFootballTacticsGrade(score: number): FootballTacticsGradeProfile {
  return footballTacticsGradeProfiles.find((profile) => score >= profile.minScore && score <= profile.maxScore) ?? footballTacticsGradeProfiles[0];
}

export type FootballTacticsResult = {
  score: number;
  correctCount: number;
  total: number;
  grade: FootballTacticsGradeProfile;
  wrong: { question: FootballTacticsQuestion; choice: number }[];
};

export function calculateFootballTacticsResult(answers: FootballTacticsAnswer[]): FootballTacticsResult {
  let correctCount = 0;
  const wrong: FootballTacticsResult["wrong"] = [];
  for (const answer of answers) {
    const question = getFootballTacticsQuestion(answer.questionId);
    if (!question) continue;
    if (answer.choice === question.correctAnswer) correctCount += 1;
    else wrong.push({ question, choice: answer.choice });
  }
  return { score: correctCount, correctCount, total: answers.length, grade: getFootballTacticsGrade(correctCount), wrong };
}

export function encodeFootballTacticsAnswers(answers: FootballTacticsAnswer[]): string {
  return answers.map((answer) => `${answer.questionId}.${answer.choice}`).join(",");
}

export function parseFootballTacticsAnswers(raw?: string): FootballTacticsAnswer[] | null {
  if (!raw) return null;
  const tokens = raw.split(",");
  if (tokens.length !== FOOTBALL_TACTICS_QUIZ_SIZE) return null;
  const seen = new Set<string>();
  const answers: FootballTacticsAnswer[] = [];
  for (const token of tokens) {
    const separator = token.lastIndexOf(".");
    const questionId = separator > 0 ? token.slice(0, separator) : "";
    const choice = Number(token.slice(separator + 1));
    const question = getFootballTacticsQuestion(questionId);
    if (!question || seen.has(question.id) || !Number.isInteger(choice) || choice < 0 || choice >= 4) return null;
    seen.add(question.id);
    answers.push({ questionId, choice });
  }
  return answers;
}
