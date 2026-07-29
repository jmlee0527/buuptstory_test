import assert from "node:assert/strict";
import fs from "node:fs";

// 소녀시대 팬 퀴즈 문제은행·출제 정책 검증 (prebuild에서 실행)
const bank = JSON.parse(fs.readFileSync(new URL("../data/question-banks/girls-generation-true-fan.json", import.meta.url), "utf8"));
const questions = bank.questions.filter((q) => q.verificationStatus === "verified");
const quota = bank.selectionPolicy.difficultyQuota;
const limits = bank.selectionPolicy;

function hash(seed) { let v = 2166136261; for (const c of seed) v = Math.imul(v ^ c.charCodeAt(0), 16777619); return v >>> 0; }
function rng(seed) { let s = hash(seed) || 1; return () => { s += 0x6d2b79f5; let v = s; v = Math.imul(v ^ (v >>> 15), v | 1); v ^= v + Math.imul(v ^ (v >>> 7), v | 61); return ((v ^ (v >>> 14)) >>> 0) / 4294967296; }; }
function shuffle(items, seed) { const r = rng(seed), a = [...items]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
function valid(items, maxCategory) {
  const categories = new Map(), albums = new Map();
  for (const q of items) { categories.set(q.category, (categories.get(q.category) ?? 0) + 1); if (q.albumKey) albums.set(q.albumKey, (albums.get(q.albumKey) ?? 0) + 1); }
  return Math.max(...categories.values()) <= maxCategory
    && [...albums.values()].every((n) => n <= limits.maxPerAlbumKey)
    && items.filter((q) => q.freshness === "time_sensitive").length <= limits.maxTimeSensitive;
}
function session(seed, recent = []) {
  for (let attempt = 0; attempt < 150; attempt++) {
    const picked = Object.entries(quota).flatMap(([d, n]) => {
      const pool = shuffle(questions.filter((q) => q.difficulty === d), `${seed}:${attempt}:${d}`);
      const fresh = pool.filter((q) => !recent.includes(q.id));
      return (fresh.length >= n ? fresh : pool).slice(0, n);
    });
    if (!valid(picked, attempt < 100 ? limits.maxPerCategory : limits.maxPerCategory + 1)) continue;
    return shuffle(picked, `${seed}:questions`).map((q) => {
      const order = shuffle([0, 1, 2, 3], `${seed}:${q.id}:options`);
      return { ...q, order, shuffled: order.map((i) => q.options[i]), shuffledAnswer: order.indexOf(q.answerIndex) };
    });
  }
  throw new Error(`GIRLS GENERATION session failed:${seed}`);
}

// 문제은행 무결성
assert.equal(bank.questions.length, 60, "문제 수 60");
assert.equal(questions.length, 60, "verified 60");
assert.equal(new Set(questions.map((q) => q.id)).size, 60, "id 중복 없음");
for (const d of Object.keys(quota)) assert.equal(questions.filter((q) => q.difficulty === d).length, 20, `${d} 20문항`);
const sources = new Map(bank.sources.map((s) => [s.id, s]));
for (const q of questions) {
  assert.equal(q.options.length, 4, `${q.id} 보기 4개`);
  assert.equal(new Set(q.options).size, 4, `${q.id} 중복 보기 없음`);
  assert.ok(Number.isInteger(q.answerIndex) && q.answerIndex >= 0 && q.answerIndex <= 3, `${q.id} answerIndex 범위`);
  assert.equal(q.options[q.answerIndex], q.answerText, `${q.id} answerText 일치`);
  assert.ok(q.explanation && q.sourceIds.length > 0, `${q.id} 해설·출처`);
  for (const id of q.sourceIds) assert.ok(sources.has(id), `${q.id} 출처 ${id} 존재`);
}

// 결과 등급 경계: 0~15점 전 구간 커버 + 경계 지점
const bands = bank.resultBands;
for (let s = 0; s <= 15; s++) assert.equal(bands.filter((b) => s >= b.minScore && s <= b.maxScore).length, 1, `${s}점 단일 등급`);
for (const [score, min, max] of [[0, 0, 3], [3, 0, 3], [4, 4, 7], [7, 4, 7], [8, 8, 10], [10, 8, 10], [11, 11, 13], [13, 11, 13], [14, 14, 15], [15, 14, 15]]) {
  const band = bands.find((b) => score >= b.minScore && score <= b.maxScore);
  assert.ok(band.minScore === min && band.maxScore === max, `${score}점 경계`);
}

// 출제 시뮬레이션
let prev = [];
for (let i = 0; i < 300; i++) {
  const s = session(`validate-${i}`, prev);
  assert.equal(s.length, 15, "15문항");
  assert.equal(new Set(s.map((q) => q.id)).size, 15, "중복 출제 없음");
  const d = { easy: 0, medium: 0, hard: 0 };
  for (const q of s) {
    d[q.difficulty]++;
    assert.equal(q.shuffled[q.shuffledAnswer], q.answerText, `${q.id} 셔플 후 정답 재계산`);
  }
  assert.deepEqual(d, { easy: 5, medium: 6, hard: 4 }, "난이도 5·6·4");
  prev = s.map((q) => q.id);
}
console.log("validate-girls-generation-fan: 60문항·난이도·정답 무결성, 등급 경계, 300세션 출제 규칙 검증 통과");
