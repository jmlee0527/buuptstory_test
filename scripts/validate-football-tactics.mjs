import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const files = [
  "data/question-banks/football-tactics-lv2.json",
  "data/question-banks/football-tactics-lv3.json",
  "data/question-banks/football-tactics-lv4.json",
];
const questions = files.flatMap((file) => JSON.parse(fs.readFileSync(path.join(root, file), "utf8")));
const expectedCounts = { 2: 36, 3: 54, 4: 30 };
const quotas = { 2: 4, 3: 5, 4: 3 };

if (questions.length !== 120) throw new Error(`축구 전술 문제은행은 120문제여야 합니다: ${questions.length}`);
const ids = new Set();
for (const question of questions) {
  if (ids.has(question.id)) throw new Error(`중복 문항 ID: ${question.id}`);
  ids.add(question.id);
  if (!(question.difficulty in expectedCounts)) throw new Error(`${question.id}: 허용되지 않은 난이도`);
  if (typeof question.category !== "string" || !question.category.trim()) throw new Error(`${question.id}: category 누락`);
  if (typeof question.question !== "string" || question.question.trim().length < 12) throw new Error(`${question.id}: 질문이 너무 짧거나 비어 있음`);
  if (!Array.isArray(question.choices) || question.choices.length !== 4) throw new Error(`${question.id}: 선택지는 정확히 4개여야 함`);
  if (new Set(question.choices).size !== 4 || question.choices.some((choice) => typeof choice !== "string" || !choice.trim())) throw new Error(`${question.id}: 선택지 중복 또는 공백`);
  if (!Number.isInteger(question.correctAnswer) || question.correctAnswer < 0 || question.correctAnswer > 3) throw new Error(`${question.id}: 올바르지 않은 정답 인덱스`);
  if (typeof question.explanation !== "string" || question.explanation.split(/[.!?]\s|[.!?]$/).filter(Boolean).length < 2) throw new Error(`${question.id}: 해설은 최소 2문장이어야 함`);
  if (typeof question.sourceNote !== "string" || !question.sourceNote.trim()) throw new Error(`${question.id}: sourceNote 누락`);
  if (question.image !== undefined && (typeof question.image !== "string" || !question.image.startsWith("/"))) throw new Error(`${question.id}: image는 루트 상대 경로여야 함`);
}

const difficultyCounts = Object.fromEntries([2, 3, 4].map((difficulty) => [difficulty, questions.filter((question) => question.difficulty === difficulty).length]));
for (const [difficulty, count] of Object.entries(expectedCounts)) {
  if (difficultyCounts[difficulty] !== count) throw new Error(`LV.${difficulty} 문항 수 오류: ${difficultyCounts[difficulty]}`);
}

function shuffle(items) {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }
  return result;
}

const sessionSignatures = new Set();
for (let simulation = 0; simulation < 1000; simulation += 1) {
  const selected = [2, 3, 4].flatMap((difficulty) => shuffle(questions.filter((question) => question.difficulty === difficulty)).slice(0, quotas[difficulty]));
  if (selected.length !== 12 || new Set(selected.map((question) => question.id)).size !== 12) throw new Error("12문제 세션 중복 또는 수량 오류");
  for (const [difficulty, quota] of Object.entries(quotas)) {
    if (selected.filter((question) => question.difficulty === Number(difficulty)).length !== quota) throw new Error(`세션 LV.${difficulty} 할당 오류`);
  }
  sessionSignatures.add(selected.map((question) => question.id).sort().join(","));
}

const gradeRanges = [[0, 3], [4, 6], [7, 8], [9, 10], [11, 11], [12, 12]];
for (let score = 0; score <= 12; score += 1) {
  if (gradeRanges.filter(([min, max]) => score >= min && score <= max).length !== 1) throw new Error(`${score}점 결과 등급 경계 오류`);
}

console.log(JSON.stringify({ questions: questions.length, difficulty: difficultyCounts, quota: quotas, simulations: 1000, uniqueSessions: sessionSignatures.size, scoreRange: "0-12 PASS", status: "PASS" }, null, 2));
