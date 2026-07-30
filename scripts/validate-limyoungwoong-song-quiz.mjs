import fs from "node:fs";
import path from "node:path";

const dataFile = path.join(process.cwd(), "data", "limyoungwoong-song-quiz.ts");
const builderFile = path.join(process.cwd(), "lib", "singer-song-quiz-bank.ts");
const dataSource = fs.readFileSync(dataFile, "utf8");
const builderSource = fs.readFileSync(builderFile, "utf8");
const generatedBlock = builderSource.slice(builderSource.indexOf("return songs.flatMap"));

const songRows = [...dataSource.matchAll(
  /\{ title: "(.+?)", album: ".+?", releaseDate: "\d{4}-\d{2}-\d{2}".+?difficulty: "(medium|high|expert)".+?source: .+? \},/g,
)];
const directTemplates = [...generatedBlock.matchAll(/makeQuestion\(\s*song,\s*songIndex,\s*\d,\s*"([A-E])"/g)];
const metadataTemplates = [...generatedBlock.matchAll(/makeMetadataQuestion\(song, songIndex\)/g)];
const templateCount = directTemplates.length + metadataTemplates.length;

if (songRows.length !== 30) {
  throw new Error(`곡 카탈로그는 30곡이어야 합니다. 현재 ${songRows.length}곡`);
}
if (templateCount !== 10) {
  throw new Error(`곡별 문항 템플릿은 10개여야 합니다. 현재 ${templateCount}개`);
}

const titles = songRows.map((row) => row[1]);
if (new Set(titles).size !== titles.length) {
  throw new Error("곡 카탈로그에 중복 제목이 있습니다.");
}

for (const difficulty of ["medium", "high", "expert"]) {
  const count = songRows.filter((row) => row[2] === difficulty).length;
  if (count !== 10) {
    throw new Error(`${difficulty} 곡은 10개여야 합니다. 현재 ${count}개`);
  }
}

for (const type of ["A", "B", "C", "D"]) {
  const count = directTemplates.filter((row) => row[1] === type).length;
  if (count !== 2) {
    throw new Error(`TYPE ${type} 템플릿은 2개여야 합니다. 현재 ${count}개`);
  }
}
if (directTemplates.filter((row) => row[1] === "E").length !== 1 || metadataTemplates.length !== 1) {
  throw new Error("TYPE E 템플릿은 앨범 문항 1개와 세부 메타데이터 문항 1개여야 합니다.");
}

const totalQuestions = songRows.length * templateCount;
if (totalQuestions !== 300) {
  throw new Error(`총 문항은 300개여야 합니다. 현재 ${totalQuestions}개`);
}

console.log("임영웅 노래 팬 퀴즈 검증 완료: 총 300문항, 난이도별 100문항, TYPE A~E 각 60문항");
