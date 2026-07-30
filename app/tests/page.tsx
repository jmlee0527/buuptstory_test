import { TestsPageContent } from "@/components/pages/TestsPageContent";
import { JsonLd } from "@/components/seo/JsonLd";
import { tests } from "@/data/tests";
import { absoluteUrl, createMetadata } from "@/lib/site";

export const metadata = createMetadata({ title: "테스트 목록", description: "부업, 성격, 직업, 소비와 투자 성향 등 나를 발견하는 무료 테스트를 만나보세요.", path: "/tests", keywords: ["무료 테스트", "성향 테스트"] });

export default function TestsPage() {
  return (
    <>
      <TestsPageContent tests={tests} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "미미테스트 테스트 목록",
        description: "미미테스트에서 제공하는 무료 테스트 목록",
        url: absoluteUrl("/tests"),
        inLanguage: "ko-KR",
        mainEntity: {
          "@type": "ItemList",
          itemListElement: tests.map((test, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: test.title,
            url: absoluteUrl(test.href ?? `/tests/${test.slug}`),
          })),
        },
      }} />
    </>
  );
}
