import { JsonLd } from "@/components/seo/JsonLd";
import { HomePageContent } from "@/components/home/HomePageContent";
import { tests } from "@/data/tests";
import { absoluteUrl, createMetadata, siteConfig } from "@/lib/site";

export const metadata = createMetadata({
  title: "미미테스트 | 팬 퀴즈·성격·심리 테스트",
  absoluteTitle: true,
  description: "미미테스트에서 짧고 재미있는 다양한 테스트로 새로운 나를 발견해보세요.",
  path: "/",
  keywords: ["무료 테스트", "성향 테스트", "종합 테스트", "심리 테스트", "연애 테스트", "팬 퀴즈"],
});

const rankedTests = [...tests].sort((a, b) => b.participants - a.participants);
const popularFanTests = rankedTests.filter((test) => test.category === "팬 퀴즈").slice(0, 8);
const newTests = tests.filter((test) => test.isNew).slice(0, 4);
const personalityTests = tests.filter((test) => test.category === "성격.심리").slice(0, 4);
const homeVisibleTests = [...popularFanTests, ...newTests, ...personalityTests];

export default function HomePage() {
  return (
    <>
      <HomePageContent popularFanTests={popularFanTests} newTests={newTests} personalityTests={personalityTests} />

      <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "테스트는 무료인가요?", acceptedAnswer: { "@type": "Answer", text: "네, 모든 테스트는 회원가입 없이 무료로 이용할 수 있습니다." } }, { "@type": "Question", name: "결과는 어떻게 계산하나요?", acceptedAnswer: { "@type": "Answer", text: "각 답변을 테스트별 성향 가중치와 비교해 가장 가까운 결과를 제공합니다." } }] }} />
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
