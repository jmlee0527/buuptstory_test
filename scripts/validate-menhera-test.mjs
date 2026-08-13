import fs from "node:fs";

const source = fs.readFileSync("data/menhera-test.ts", "utf8");
const domains = ["relationshipAnxiety", "reassuranceNeed", "rumination", "exclusivity", "emotionalDependence"];
const domainBlocks = Object.fromEntries(domains.map((domain, index) => {
  const start = source.indexOf(`${domain}: [`, source.indexOf("const scenarios"));
  const nextStarts = domains.slice(index + 1).map((next) => source.indexOf(`${next}: [`, start + 1)).filter((value) => value >= 0);
  const end = nextStarts.length ? Math.min(...nextStarts) : source.indexOf("};\n\nconst optionSets", start);
  const block = source.slice(start, end);
  return [domain, [...block.matchAll(/"((?:[^"\\]|\\.)*)"/g)].map((match) => JSON.parse(`"${match[1]}"`))];
}));

const questions = domains.flatMap((domain, domainIndex) => domainBlocks[domain].map((text, index) => ({ id: `mh-${String(domainIndex + 1).padStart(2, "0")}-${String(index + 1).padStart(2, "0")}`, domain, text, reverse: index % 4 === 1 })));
if (questions.length !== 200) throw new Error(`멘헤라 문제은행은 200문항이어야 합니다: ${questions.length}`);
for (const domain of domains) if (domainBlocks[domain].length !== 40) throw new Error(`${domain}: 40문항이 아닙니다 (${domainBlocks[domain].length})`);
if (new Set(questions.map((question) => question.text.replace(/\s+/g, " ").trim())).size !== 200) throw new Error("중복 상황 문항이 있습니다.");
const directPattern = /나는\s*(?:질투|집착|불안)|질투가\s*심|연락이\s*없으면\s*불안|상대에게\s*집착|멘헤라(?:인가|일까|성향)/;
for (const question of questions) {
  if (directPattern.test(question.text)) throw new Error(`${question.id}: 평가 의도를 직접 드러내는 표현`);
  if (question.text.length < 20) throw new Error(`${question.id}: 상황 설명이 너무 짧습니다.`);
}
const reverseCounts = Object.fromEntries(domains.map((domain) => [domain, questions.filter((question) => question.domain === domain && question.reverse).length]));
for (const [domain, count] of Object.entries(reverseCounts)) if (count !== 10) throw new Error(`${domain}: 역채점 문항 수 오류 (${count})`);

function shuffle(items) {
  const output = [...items];
  for (let index = output.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(Math.random() * (index + 1));
    [output[index], output[swap]] = [output[swap], output[index]];
  }
  return output;
}
const signatures = new Set();
for (let simulation = 0; simulation < 1000; simulation += 1) {
  const session = shuffle(domains.flatMap((domain) => shuffle(questions.filter((question) => question.domain === domain)).slice(0, 2)));
  if (session.length !== 10 || new Set(session.map(({ id }) => id)).size !== 10) throw new Error("10문항 세션 수량 또는 중복 오류");
  for (const domain of domains) if (session.filter((question) => question.domain === domain).length !== 2) throw new Error(`${domain}: 세션 균형 오류`);
  signatures.add(session.map(({ id }) => id).sort().join(","));
}
const ranges = [[0, 9], [10, 19], [20, 29], [30, 39], [40, 49], [50, 59], [60, 69], [70, 79], [80, 89], [90, 100]];
for (let score = 0; score <= 100; score += 1) if (ranges.filter(([min, max]) => score >= min && score <= max).length !== 1) throw new Error(`${score}% 레벨 경계 오류`);
console.log(JSON.stringify({ questions: questions.length, domains: Object.fromEntries(domains.map((domain) => [domain, domainBlocks[domain].length])), reverseScored: reverseCounts, simulations: 1000, uniqueSessions: signatures.size, scoreRange: "0-100 PASS", levels: 10, status: "PASS" }, null, 2));
