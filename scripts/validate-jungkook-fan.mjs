import assert from "node:assert/strict";
import fs from "node:fs";

const bank = JSON.parse(fs.readFileSync(new URL("../data/question-banks/jung-kook-true-fan-test-pool.json", import.meta.url), "utf8"));
const questions = bank.questions;
const quota = {
  easy: bank.test.selectionRule.easy,
  medium: bank.test.selectionRule.medium,
  hard: bank.test.selectionRule.hard,
};

function hash(seed) {
  let value = 2166136261;
  for (const char of seed) value = Math.imul(value ^ char.charCodeAt(0), 16777619);
  return value >>> 0;
}

function rng(seed) {
  let state = hash(seed) || 1;
  return () => {
    state += 0x6d2b79f5;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle(items, seed) {
  const random = rng(seed);
  const array = [...items];
  for (let index = array.length - 1; index > 0; index--) {
    const swapIndex = Math.floor(random() * (index + 1));
    [array[index], array[swapIndex]] = [array[swapIndex], array[index]];
  }
  return array;
}

function createSession(seed) {
  const selected = [];
  for (const [difficulty, count] of Object.entries(quota)) {
    selected.push(...shuffle(questions.filter((question) => question.difficulty === difficulty), `${seed}:${difficulty}`).slice(0, count));
  }
  return shuffle(selected, `${seed}:questions`).map((question) => {
    const optionOrder = shuffle([0, 1, 2, 3], `${seed}:${question.id}:options`);
    return {
      ...question,
      optionOrder,
      choices: optionOrder.map((index) => question.options[index]),
      shownAnswerIndex: optionOrder.indexOf(question.answerIndex),
    };
  });
}

assert.equal(bank.test.slugSuggestion, "bts-jungkook-true-fan-test");
assert.equal(bank.test.questionsPerAttempt, 12);
assert.equal(questions.length, 60);
assert.equal(new Set(questions.map((question) => question.id)).size, 60);
assert.deepEqual(Object.fromEntries(Object.keys(quota).map((difficulty) => [
  difficulty,
  questions.filter((question) => question.difficulty === difficulty).length,
])), { easy: 16, medium: 29, hard: 15 });
assert.deepEqual(quota, { easy: 4, medium: 5, hard: 3 });

for (const question of questions) {
  assert.equal(question.options.length, 4, `${question.id}: 4 options`);
  assert.equal(new Set(question.options).size, 4, `${question.id}: unique options`);
  assert.ok(Number.isInteger(question.answerIndex) && question.answerIndex >= 0 && question.answerIndex <= 3, `${question.id}: answerIndex`);
  assert.equal(question.options[question.answerIndex], question.answer, `${question.id}: answer`);
  assert.ok(question.explanation, `${question.id}: explanation`);
  assert.ok(question.sourceUrl, `${question.id}: sourceUrl`);
}

for (let score = 0; score <= 12; score++) {
  assert.equal(bank.test.resultTiers.filter((tier) => score >= tier.minScore && score <= tier.maxScore).length, 1, `${score}: result tier`);
}

const answerPositions = [0, 0, 0, 0];
const signatures = new Set();
for (let index = 0; index < 1000; index++) {
  const picked = createSession(`validate-${index}`);
  assert.equal(picked.length, 12);
  assert.equal(new Set(picked.map((question) => question.id)).size, 12);
  assert.deepEqual(Object.fromEntries(Object.keys(quota).map((difficulty) => [
    difficulty,
    picked.filter((question) => question.difficulty === difficulty).length,
  ])), quota);
  signatures.add(picked.map((question) => question.id).sort((a, b) => a - b).join(","));
  for (const question of picked) {
    assert.equal(question.choices[question.shownAnswerIndex], question.answer);
    answerPositions[question.shownAnswerIndex]++;
  }
}

assert.ok(signatures.size > 950, `unique sessions: ${signatures.size}`);
for (const count of answerPositions) assert.ok(Math.abs(count - 3000) < 420);

console.log(JSON.stringify({
  questions: questions.length,
  quota,
  simulations: 1000,
  uniqueSessions: signatures.size,
  answerPositions,
  resultCoverage: "0-12 PASS",
  status: "PASS",
}, null, 2));
