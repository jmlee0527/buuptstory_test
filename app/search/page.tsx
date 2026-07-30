import type { Metadata } from "next";
import { SearchPageContent } from "@/components/pages/SearchPageContent";
import { tests } from "@/data/tests";
import { createMetadata } from "@/lib/site";
import { searchTests } from "@/lib/test-search";

export const metadata: Metadata = {
  ...createMetadata({
    title: "테스트 검색",
    description: "키워드로 미미테스트의 심리, 성격, 연애, 직장, 팬 퀴즈를 검색해 보세요.",
    path: "/search",
    keywords: ["테스트 검색", "심리테스트 찾기", "무료 테스트"],
  }),
  robots: { index: false, follow: true },
};

type Props = { searchParams: Promise<{ q?: string }> };

export default async function SearchPage({ searchParams }: Props) {
  const { q = "" } = await searchParams;
  const query = q.trim().replace(/\s+/g, " ");
  const results = searchTests(tests, query);
  const suggestions = [...tests].sort((a, b) => Number(b.isNew) - Number(a.isNew) || b.participants - a.participants).slice(0, 8);

  return <SearchPageContent initialQuery={q} query={query} results={results} suggestions={suggestions} />;
}
