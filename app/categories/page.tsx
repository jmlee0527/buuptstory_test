import { CategoriesPageContent } from "@/components/pages/CategoriesPageContent";
import { JsonLd } from "@/components/seo/JsonLd";
import { tests } from "@/data/tests";
import { absoluteUrl, createMetadata } from "@/lib/site";

export const metadata = createMetadata({ title: "테스트 카테고리", description: "성격·심리, 연애·관계, 직업·일상, 팬 퀴즈, 건강·운세 카테고리별 테스트를 둘러보세요.", path: "/categories", keywords: ["테스트 카테고리", "심리테스트 목록", "팬 퀴즈"] });
const categoryNames = ["성격.심리", "연애.관계", "직업.일상", "팬 퀴즈", "건강.운세"];

export default function CategoriesPage() {
  return (
    <>
      <CategoriesPageContent tests={tests} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "미미테스트 카테고리",
        itemListElement: categoryNames.map((category, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: category,
          url: absoluteUrl(`/category/${encodeURIComponent(category)}`),
        })),
      }} />
    </>
  );
}
