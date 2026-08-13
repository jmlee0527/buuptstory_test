import { JsonLd } from "@/components/seo/JsonLd";
import { HomePageContent } from "@/components/home/HomePageContent";
import { HomeEditorialContent } from "@/components/home/HomeEditorialContent";
import { tests } from "@/data/tests";
import { getNewestTests, getPopularTests } from "@/lib/test-discovery";
import { absoluteUrl, createMetadata, siteConfig } from "@/lib/site";

export const metadata = createMetadata({
  title: "미미테스트 | 팬 퀴즈·성격·심리 테스트",
  absoluteTitle: true,
  description: "미미테스트에서 짧고 재미있는 다양한 테스트로 새로운 나를 발견해보세요.",
  path: "/",
  keywords: ["무료 테스트", "성향 테스트", "종합 테스트", "심리 테스트", "연애 테스트", "팬 퀴즈"],
});

const popularFanTests = getPopularTests(tests, { category: "팬 퀴즈", limit: 8 });
const newTests = getNewestTests(tests, { limit: 4 });
const personalityTests = getPopularTests(tests, { category: "성격.심리", limit: 4 });
const relationshipTests = getPopularTests(tests, { category: "연애.관계", limit: 4 });
const workTests = getPopularTests(tests, { category: "직업.일상", limit: 4 });
const homeVisibleTests = [...popularFanTests, ...newTests, ...personalityTests, ...relationshipTests, ...workTests];

export default function HomePage() {
  return (
    <>
      <HomePageContent popularFanTests={popularFanTests} newTests={newTests} personalityTests={personalityTests} relationshipTests={relationshipTests} workTests={workTests} />
      <HomeEditorialContent />

      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": absoluteUrl("/#website"),
        url: absoluteUrl("/"),
        name: siteConfig.name,
        alternateName: [
          siteConfig.englishName,
          "미미 테스트",
          "memetest.co.kr",
        ],
        inLanguage: "ko-KR",
        potentialAction: {
          "@type": "SearchAction",
          target: `${absoluteUrl("/search")}?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      }} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "미미테스트 홈 추천 테스트",
        itemListElement: homeVisibleTests.map((test, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: test.title,
          url: absoluteUrl(test.href ?? `/tests/${test.slug}`),
        })),
      }} />
    </>
  );
}
