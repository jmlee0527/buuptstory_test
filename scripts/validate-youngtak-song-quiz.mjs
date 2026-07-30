import fs from "node:fs";
import path from "node:path";

const file = path.join(process.cwd(), "data", "youngtak-song-quiz.ts");
const source = fs.readFileSync(file, "utf8");
const songRows = [...source.matchAll(/\{ title: ".+?", album: ".+?", releaseDate: "\d{4}-\d{2}-\d{2}".+?difficulty: "(medium|high|expert)".+?source: .+? \},/g)];
const generatedBlock = source.slice(source.indexOf("export const youngtakSongQuizQuestions"));
const directTemplateRows = [...generatedBlock.matchAll(/makeQuestion\(song, songIndex, \d, "[A-E]"/g)];
const metadataTemplateRows = [...generatedBlock.matchAll(/makeMetadataQuestion\(song, songIndex\)/g)];
const templateCount = directTemplateRows.length + metadataTemplateRows.length;

if (songRows.length !== 30) throw new Error(`곡 카탈로그는 30곡이어야 합니다. 현재 ${songRows.length}곡`);
if (templateCount !== 10) throw new Error(`곡별 문항 템플릿은 10개여야 합니다. 현재 ${templateCount}개`);

for (const difficulty of ["medium", "high", "expert"]) {
  const count = songRows.filter((row) => row[1] === difficulty).length;
  if (count !== 10) throw new Error(`${difficulty} 곡은 10개여야 합니다. 현재 ${count}개`);
}

for (const type of ["A", "B", "C", "D"]) {
  const count = directTemplateRows.filter((row) => row[0].includes(`"${type}"`)).length;
  if (count !== 2) throw new Error(`TYPE ${type} 템플릿은 2개여야 합니다. 현재 ${count}개`);
}
if (directTemplateRows.filter((row) => row[0].includes('"E"')).length !== 1 || metadataTemplateRows.length !== 1) {
  throw new Error("TYPE E 템플릿은 앨범 문항 1개와 세부 메타데이터 문항 1개여야 합니다.");
}

const totalQuestions = songRows.length * templateCount;
if (totalQuestions !== 300) throw new Error(`총 문항은 300개여야 합니다. 현재 ${totalQuestions}개`);

console.log("영탁 노래 팬 퀴즈 검증 완료: 총 300문항, 난이도별 100문항, TYPE A~E 각 60문항");
