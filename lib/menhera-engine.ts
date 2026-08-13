import {
  getMenheraLevel,
  getMenheraQuestion,
  menheraDomainOrder,
  menheraQuestions,
  type MenheraDomain,
  type MenheraOption,
  type MenheraQuestion,
} from "@/data/menhera-test";

export const MENHERA_QUESTION_COUNT = 10;
export const MENHERA_PER_DOMAIN = 2;
const RECENT_KEY = "mimi-menhera-recent";
const RECENT_LIMIT = 100;

export type MenheraAnswer = { questionId: string; value: number };
export type MenheraDomainScores = Record<MenheraDomain, number>;

export function shuffleMenhera<T>(items: readonly T[]): T[] {
  const output = [...items];
  for (let index = output.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [output[index], output[swapIndex]] = [output[swapIndex], output[index]];
  }
  return output;
}

export function pickMenheraQuestions(recentIds: string[] = []): MenheraQuestion[] {
  const selected = menheraDomainOrder.flatMap((domain) => {
    const pool = menheraQuestions.filter((question) => question.domain === domain);
    const fresh = pool.filter((question) => !recentIds.includes(question.id));
    return shuffleMenhera(fresh.length >= MENHERA_PER_DOMAIN ? fresh : pool).slice(0, MENHERA_PER_DOMAIN);
  });
  return shuffleMenhera(selected);
}

export function shuffleMenheraOptions(question: MenheraQuestion): MenheraQuestion {
  return { ...question, options: shuffleMenhera(question.options) as [MenheraOption, MenheraOption, MenheraOption, MenheraOption] };
}

export function loadRecentMenheraIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const parsed: unknown = JSON.parse(window.localStorage.getItem(RECENT_KEY) ?? "[]");
    return Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === "string") : [];
  } catch {
    return [];
  }
}

export function saveRecentMenheraIds(ids: string[]) {
  if (typeof window === "undefined") return;
  try {
    const recent = loadRecentMenheraIds().filter((id) => !ids.includes(id));
    window.localStorage.setItem(RECENT_KEY, JSON.stringify([...ids, ...recent].slice(0, RECENT_LIMIT)));
  } catch {
    // 저장이 제한된 환경에서도 테스트 진행은 계속됩니다.
  }
}

export function calculateMenheraResult(answers: MenheraAnswer[]) {
  if (answers.length !== MENHERA_QUESTION_COUNT) throw new Error("10문항에 모두 답해야 합니다.");
  const domainRaw = Object.fromEntries(menheraDomainOrder.map((domain) => [domain, 0])) as Record<MenheraDomain, number>;
  const counts = Object.fromEntries(menheraDomainOrder.map((domain) => [domain, 0])) as Record<MenheraDomain, number>;
  let totalRaw = 0;
  const seen = new Set<string>();

  for (const answer of answers) {
    const question = getMenheraQuestion(answer.questionId);
    if (!question || seen.has(question.id) || !Number.isInteger(answer.value) || answer.value < 0 || answer.value > 3) throw new Error("답변 데이터가 올바르지 않습니다.");
    if (!question.options.some((option) => option.value === answer.value)) throw new Error("문항에 없는 선택지입니다.");
    seen.add(question.id);
    const scored = question.reverseScored ? 3 - answer.value : answer.value;
    domainRaw[question.domain] += scored;
    counts[question.domain] += 1;
    totalRaw += scored;
  }

  if (menheraDomainOrder.some((domain) => counts[domain] !== MENHERA_PER_DOMAIN)) throw new Error("영역별 문항 구성이 올바르지 않습니다.");
  const score = Math.round((totalRaw / (MENHERA_QUESTION_COUNT * 3)) * 100);
  const domainScores = Object.fromEntries(menheraDomainOrder.map((domain) => [domain, Math.round((domainRaw[domain] / (MENHERA_PER_DOMAIN * 3)) * 100)])) as MenheraDomainScores;
  return { score, level: getMenheraLevel(score), domainScores };
}

export function encodeMenheraAnswers(answers: MenheraAnswer[]) {
  return answers.map((answer) => `${answer.questionId}.${answer.value}`).join(",");
}

export function parseMenheraAnswers(raw?: string): MenheraAnswer[] | null {
  if (!raw) return null;
  const tokens = raw.split(",");
  if (tokens.length !== MENHERA_QUESTION_COUNT) return null;
  const answers: MenheraAnswer[] = [];
  const seen = new Set<string>();
  for (const token of tokens) {
    const separator = token.lastIndexOf(".");
    const questionId = token.slice(0, separator);
    const value = Number(token.slice(separator + 1));
    const question = getMenheraQuestion(questionId);
    if (!question || seen.has(questionId) || !Number.isInteger(value) || value < 0 || value > 3 || !question.options.some((option) => option.value === value)) return null;
    seen.add(questionId);
    answers.push({ questionId, value });
  }
  try {
    calculateMenheraResult(answers);
    return answers;
  } catch {
    return null;
  }
}

export function encodeMenheraDomainScores(scores: MenheraDomainScores) {
  return menheraDomainOrder.map((domain) => String(scores[domain]).padStart(3, "0")).join("");
}
