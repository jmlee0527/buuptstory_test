import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const root = process.cwd();
const sourceDirectories = ["app", "components", "data", "lib"];
const outputPath = path.join(root, "locales", "content-ko.json");
const koreanPattern = /[가-힣]/;
const ignoredFiles = new Set([
  path.join(root, "lib", "i18n.ts"),
  path.join(root, "lib", "test-i18n.ts"),
]);

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const filePath = path.join(directory, entry.name);
    if (entry.isDirectory()) return walk(filePath);
    return /\.(?:ts|tsx|json)$/.test(entry.name) ? [filePath] : [];
  });
}

function addText(values, rawText) {
  const text = rawText.replace(/\s+/g, " ").trim();
  if (text && koreanPattern.test(text)) values.add(text);
}

function collectTypeScript(values, filePath) {
  const source = fs.readFileSync(filePath, "utf8");
  const sourceFile = ts.createSourceFile(
    filePath,
    source,
    ts.ScriptTarget.Latest,
    true,
    filePath.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
  );

  function visit(node) {
    if (
      ts.isStringLiteral(node)
      || ts.isNoSubstitutionTemplateLiteral(node)
      || ts.isJsxText(node)
      || ts.isTemplateHead(node)
      || ts.isTemplateMiddle(node)
      || ts.isTemplateTail(node)
    ) {
      addText(values, node.text);
    }
    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
}

function collectJson(values, value) {
  if (typeof value === "string") {
    addText(values, value);
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((item) => collectJson(values, item));
    return;
  }
  if (value && typeof value === "object") {
    Object.values(value).forEach((item) => collectJson(values, item));
  }
}

const values = new Set();
for (const directory of sourceDirectories) {
  for (const filePath of walk(path.join(root, directory))) {
    if (ignoredFiles.has(filePath)) continue;
    if (filePath.endsWith(".json")) {
      collectJson(values, JSON.parse(fs.readFileSync(filePath, "utf8")));
    } else {
      collectTypeScript(values, filePath);
    }
  }
}

const entries = [...values]
  .sort((left, right) => left.localeCompare(right, "ko"))
  .map((value) => [value, value]);

fs.writeFileSync(outputPath, `${JSON.stringify(Object.fromEntries(entries), null, 2)}\n`);
console.log(`콘텐츠 원문 카탈로그 생성 완료: ${entries.length}개 문구`);
