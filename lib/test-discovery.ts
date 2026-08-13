import { popularTestSlugs, getDiscoveryMetadata } from "@/data/test-discovery";
import type { TestCategory, TestDefinition } from "@/lib/types";

function normalizeTag(tag: string) {
  return tag.toLocaleLowerCase("ko-KR").replace(/[\s·._-]+/g, "");
}

function testTags(test: TestDefinition) {
  const metadata = getDiscoveryMetadata(test);
  return new Set([
    test.category,
    ...(metadata.tags ?? []),
    ...(test.keywords ?? []),
  ].map(normalizeTag).filter(Boolean));
}

export function getPopularTests(tests: TestDefinition[], options: { category?: TestCategory; exclude?: string[]; limit?: number } = {}) {
  const excluded = new Set(options.exclude ?? []);
  const rank = new Map<string, number>(popularTestSlugs.map((slug, index) => [slug, index]));
  return tests
    .filter((test) => !excluded.has(test.slug) && (!options.category || test.category === options.category))
    .sort((a, b) => {
      const explicitA = getDiscoveryMetadata(a).popularRank ?? rank.get(a.slug) ?? Number.MAX_SAFE_INTEGER;
      const explicitB = getDiscoveryMetadata(b).popularRank ?? rank.get(b.slug) ?? Number.MAX_SAFE_INTEGER;
      return explicitA - explicitB || b.participants - a.participants || a.title.localeCompare(b.title, "ko-KR");
    })
    .slice(0, options.limit ?? 4);
}

export function getNewestTests(tests: TestDefinition[], options: { category?: TestCategory; exclude?: string[]; limit?: number } = {}) {
  const excluded = new Set(options.exclude ?? []);
  return tests
    .filter((test) => !excluded.has(test.slug) && (!options.category || test.category === options.category) && Boolean(getDiscoveryMetadata(test).createdAt || test.isNew))
    .sort((a, b) => {
      const dateA = getDiscoveryMetadata(a).createdAt ?? "";
      const dateB = getDiscoveryMetadata(b).createdAt ?? "";
      return dateB.localeCompare(dateA) || Number(b.isNew) - Number(a.isNew) || a.title.localeCompare(b.title, "ko-KR");
    })
    .slice(0, options.limit ?? 4);
}

export function getRelatedTests(current: TestDefinition, tests: TestDefinition[], limit = 4) {
  const metadata = getDiscoveryMetadata(current);
  const directOrder = new Map((metadata.relatedTests ?? []).map((slug, index) => [slug, index]));
  const currentTags = testTags(current);
  const candidates = tests.filter((test) => test.slug !== current.slug);

  return candidates
    .map((test) => {
      const direct = directOrder.get(test.slug);
      const overlap = [...testTags(test)].filter((tag) => currentTags.has(tag)).length;
      return { test, direct, overlap };
    })
    .sort((a, b) => {
      const directA = a.direct ?? Number.MAX_SAFE_INTEGER;
      const directB = b.direct ?? Number.MAX_SAFE_INTEGER;
      return Number(a.direct === undefined) - Number(b.direct === undefined)
        || directA - directB
        || b.overlap - a.overlap
        || Number(b.test.category === current.category) - Number(a.test.category === current.category)
        || b.test.participants - a.test.participants;
    })
    .slice(0, limit)
    .map(({ test }) => test);
}

export function findTestByResultSlug(tests: TestDefinition[], resultSlug: string) {
  return tests.find((test) => test.resultSlugs.includes(resultSlug));
}
