import fs from "node:fs";
import path from "node:path";

const localeDir = path.join(process.cwd(), "locales");
const localeNames = ["ko", "en", "ja", "zh"];
const dictionaries = Object.fromEntries(
  localeNames.map((locale) => [
    locale,
    JSON.parse(fs.readFileSync(path.join(localeDir, `${locale}.json`), "utf8")),
  ]),
);
const sourceKeys = Object.keys(dictionaries.ko).sort();

for (const locale of localeNames.slice(1)) {
  const keys = Object.keys(dictionaries[locale]).sort();
  const missing = sourceKeys.filter((key) => !keys.includes(key));
  const extra = keys.filter((key) => !sourceKeys.includes(key));
  if (missing.length || extra.length) {
    throw new Error(`${locale} 사전 키 불일치: 누락 ${missing.join(", ") || "없음"}, 추가 ${extra.join(", ") || "없음"}`);
  }
}

for (const [locale, dictionary] of Object.entries(dictionaries)) {
  for (const [key, value] of Object.entries(dictionary)) {
    if (typeof value !== "string" || value.trim() === "") {
      throw new Error(`${locale}.${key} 번역 값이 비어 있습니다.`);
    }
    const sourceVariables = [...dictionaries.ko[key].matchAll(/\{(\w+)\}/g)].map((match) => match[1]).sort();
    const targetVariables = [...value.matchAll(/\{(\w+)\}/g)].map((match) => match[1]).sort();
    if (sourceVariables.join(",") !== targetVariables.join(",")) {
      throw new Error(`${locale}.${key} 변수 불일치: ${targetVariables.join(",")}`);
    }
  }
}

console.log(`다국어 사전 검증 완료: ${localeNames.length}개 언어, 언어별 ${sourceKeys.length}개 UI 문구`);

const contentSourcePath = path.join(localeDir, "content-ko.json");
if (fs.existsSync(contentSourcePath)) {
  const contentSource = JSON.parse(fs.readFileSync(contentSourcePath, "utf8"));
  const contentKeys = Object.keys(contentSource);
  for (const locale of localeNames.slice(1)) {
    const targetPath = path.join(localeDir, `content-${locale}.json`);
    if (!fs.existsSync(targetPath)) {
      throw new Error(`${locale} 콘텐츠 번역 카탈로그가 없습니다.`);
    }
    const target = JSON.parse(fs.readFileSync(targetPath, "utf8"));
    const missing = contentKeys.filter((key) => typeof target[key] !== "string" || !target[key].trim());
    const extra = Object.keys(target).filter((key) => !(key in contentSource));
    if (missing.length || extra.length) {
      throw new Error(`${locale} 콘텐츠 카탈로그 불일치: 누락 ${missing.length}개, 추가 ${extra.length}개`);
    }
  }
  console.log(`테스트 콘텐츠 번역 검증 완료: 언어별 ${contentKeys.length}개 문구`);
}
