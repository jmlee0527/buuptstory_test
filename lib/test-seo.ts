import type { TestDefinition } from "@/lib/types";

const FAN_QUIZ_KEYWORD_LIMIT = 36;

function uniqueNonEmpty(values: string[]) {
  return [...new Set(values.map((value) => value.trim()).filter(Boolean))];
}

export function isFanQuizTest(test: TestDefinition) {
  return test.category === "팬 퀴즈";
}

function hasFandomSearchIntent(test: TestDefinition) {
  const haystack = [
    test.title,
    test.shortTitle,
    test.cardTitle ?? "",
    test.description,
    ...(test.keywords ?? []),
  ].join(" ");

  return /(찐팬|팬\s?테스트|팬심|팬\s?지수|덕력|팬\s?지식|팬\s?퀴즈|팬퀴즈)/u.test(haystack);
}

export function getTestCanonicalPath(test: TestDefinition) {
  return test.href ?? `/tests/${test.slug}`;
}

export function getFanQuizEntityName(test: TestDefinition) {
  const source = test.shortTitle || test.title;
  const cleaned = source
    .replace(/\s*[|–-].*$/u, "")
    .replace(/\s*(찐팬|진성팬|팬)?\s*(테스트|퀴즈).*$/u, "")
    .trim();

  return cleaned || source.replace(/\s*테스트.*$/u, "").trim() || source;
}

export function getTestSeoTitle(test: TestDefinition) {
  const title = test.seoTitle ?? test.title;
  if (!isFanQuizTest(test) || !hasFandomSearchIntent(test) || /(팬\s?퀴즈|진성팬\s*테스트)/u.test(title)) return title;

  return `${getFanQuizEntityName(test)} 팬퀴즈 | ${test.shortTitle}`;
}

export function getTestSeoDescription(test: TestDefinition) {
  const description = test.seoDescription ?? test.description;
  if (!isFanQuizTest(test) || !hasFandomSearchIntent(test) || /(팬\s?퀴즈|진성팬\s*테스트)/u.test(description)) return description;

  const summary = test.description.replace(/[.!?。！？]\s*$/u, "");
  return `${getFanQuizEntityName(test)} 팬퀴즈로 ${summary}. ${description}`;
}

export function getTestSeoKeywords(test: TestDefinition) {
  const keywords = [
    ...(test.keywords ?? []),
    test.shortTitle,
    test.title,
    `${test.category} 테스트`,
  ];

  if (isFanQuizTest(test) && hasFandomSearchIntent(test)) {
    const entity = getFanQuizEntityName(test);
    keywords.push(
      `${entity} 팬퀴즈`,
      `${entity} 팬 퀴즈`,
      `${entity} 퀴즈`,
      `${entity} 팬 테스트`,
      `${entity} 찐팬 퀴즈`,
      "팬퀴즈",
      "팬 퀴즈",
      "팬 테스트",
      "찐팬 퀴즈",
      "팬덤 퀴즈",
    );
  }

  return uniqueNonEmpty(keywords).slice(0, FAN_QUIZ_KEYWORD_LIMIT);
}
