import assert from "node:assert/strict";
import fs from "node:fs";

const bank = JSON.parse(fs.readFileSync(new URL("../data/question-banks/rescene-true-fan.json", import.meta.url), "utf8"));
const questions = bank.questions.filter((question) => question.verificationStatus === "verified");
const quota = { easy: 5, medium: 6, hard: 4 };

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

function valid(items, maxCategory = 4) {
  const categories = new Map();
  const albums = new Map();
  for (const question of items) {
    categories.set(question.category, (categories.get(question.category) ?? 0) + 1);
    if (question.albumKey) albums.set(question.albumKey, (albums.get(question.albumKey) ?? 0) + 1);
  }
  return Math.max(...categories.values()) <= maxCategory &&
    [...albums.values()].every((count) => count <= 3) &&
    items.filter((question) => question.freshness === "time_sensitive").length <= 3;
}

function session(seed, recent = []) {
  for (let attempt = 0; attempt < 150; attempt++) {
    const picked = Object.entries(quota).flatMap(([difficulty, count]) => {
      const pool = shuffle(questions.filter((question) => question.difficulty === difficulty), `${seed}:${attempt}:${difficulty}`);
      const fresh = pool.filter((question) => !recent.includes(question.id));
      return (fresh.length >= count ? fresh : pool).slice(0, count);
    });
    if (!valid(picked, attempt < 100 ? 4 : 5)) continue;
    return shuffle(picked, `${seed}:questions`).map((question) => {
      const order = shuffle([0, 1, 2, 3], `${seed}:${question.id}:options`);
      return { ...question, order, shuffled: order.map((index) => question.options[index]), shuffledAnswer: order.indexOf(question.answerIndex) };
    });
  }
  throw new Error(`RESCENE session failed:${seed}`);
}

assert.equal(questions.length, 60);
assert.equal(new Set(questions.map((question) => question.id)).size, 60);
for (const difficulty of Object.keys(quota)) assert.equal(questions.filter((question) => question.difficulty === difficulty).length, 20);

const sources = new Map(bank.sources.map((source) => [source.id, source]));
for (const question of questions) {
  assert.equal(question.options.length, 4, question.id);
  assert.equal(new Set(question.options).size, 4, question.id);
  assert.ok(question.answerIndex >= 0 && question.answerIndex <= 3, question.id);
  assert.equal(question.options[question.answerIndex], question.answerText, question.id);
  assert.ok(question.explanation, question.id);
  for (const id of question.sourceIds) assert.ok(sources.get(id)?.url, `${question.id}:${id}`);
}

for (let score = 0; score <= 15; score++) assert.equal(bank.resultBands.filter((grade) => score >= grade.minScore && score <= grade.maxScore).length, 1, `${score}점`);

const positions = [0, 0, 0, 0];
const fingerprints = new Set();
let previous = [];
for (let run = 0; run < 1000; run++) {
  const selected = session(`rescene-${run}`, previous);
  previous = selected.map((question) => question.id);
  fingerprints.add(previous.join(","));
  assert.equal(selected.length, 15);
  assert.equal(new Set(previous).size, 15);
  for (const [difficulty, count] of Object.entries(quota)) assert.equal(selected.filter((question) => question.difficulty === difficulty).length, count);
  assert.ok(valid(selected, 5));
  for (const question of selected) {
    assert.equal(question.shuffled[question.shuffledAnswer], question.answerText);
    positions[question.shuffledAnswer]++;
  }
}

assert.deepEqual(session("stable").map((question) => [question.id, question.order]), session("stable").map((question) => [question.id, question.order]));
assert.ok(Math.max(...positions) / Math.min(...positions) < 1.15);

const header = fs.readFileSync(new URL("../components/layout/Header.tsx", import.meta.url), "utf8");
for (const [label, path] of [["Home", "/"], ["Category", "/categories"], ["Column", "/blog"], ["Search", "/search"]]) {
  assert.ok(header.includes(`href="${path}"`));
  assert.ok(header.includes(label));
}

const search = fs.readFileSync(new URL("../components/search/SearchForm.tsx", import.meta.url), "utf8");
assert.ok(search.includes("300"));
assert.ok(search.includes("/search?q="));
assert.ok(search.includes('event.key==="Escape"'));

console.log(JSON.stringify({
  questions: 60,
  difficulty: { easy: 20, medium: 20, hard: 20 },
  simulations: 1000,
  uniqueSessions: fingerprints.size,
  answerPositions: positions,
  navigation: "PASS",
  searchUrlSync: "PASS",
  status: "PASS",
}, null, 2));
