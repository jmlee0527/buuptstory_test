import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { TestCard } from "@/components/cards/TestCard";
import { CategoryTiles } from "@/components/category/CategoryTiles";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { tests } from "@/data/tests";
import { absoluteUrl, createMetadata } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };
const categories = [...new Set(tests.map((test) => test.category))];
const legacyCategoryRedirects: Record<string, string> = {
  결혼: "연애.관계",
  돈: "직업.일상",
  부업: "직업.일상",
  직장: "직업.일상",
  성격: "성격.심리",
  운세: "건강.운세",
};
const fanQuizCategoryDescription = "아이돌·연예인·스포츠 팬퀴즈와 팬 퀴즈를 모아보세요.";
export function generateStaticParams() { return categories.map((slug) => ({ slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = decodeURIComponent(slug);
  const redirectedCategory = legacyCategoryRedirects[category];
  if (redirectedCategory) {
    return createMetadata({ title: `${redirectedCategory} 테스트`, description: `${redirectedCategory}에 관한 무료 테스트를 모아보세요.`, path: `/category/${encodeURIComponent(redirectedCategory)}`, keywords: [`${redirectedCategory} 테스트`] });
  }
  if (category === "음식") {
    return createMetadata({ title: "주말 배달음식 월드컵", description: "고민할수록 배고파지는 음식 월드컵으로 오늘의 메뉴를 골라보세요.", path: "/tests/weekend-food-worldcup", keywords: ["음식 월드컵", "배달음식 테스트"] });
  }
  if (category === "팬 퀴즈") {
    return createMetadata({
      title: "팬퀴즈 테스트",
      description: fanQuizCategoryDescription,
      path: `/category/${encodeURIComponent(category)}`,
      keywords: ["팬퀴즈", "팬 퀴즈", "팬 테스트", "찐팬 퀴즈", "아이돌 팬퀴즈", "팬덤 퀴즈"],
    });
  }
  return createMetadata({ title: `${category} 테스트`, description: `${category}에 관한 무료 테스트를 모아보세요.`, path: `/category/${encodeURIComponent(category)}`, keywords: [`${category} 테스트`] });
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = decodeURIComponent(slug);
  const redirectedCategory = legacyCategoryRedirects[category];
  if (redirectedCategory) permanentRedirect(`/category/${encodeURIComponent(redirectedCategory)}`);
  if (category === "음식") permanentRedirect("/tests/weekend-food-worldcup");
  if (!categories.some((item) => item === category)) notFound();
  const matchingTests = tests.filter((test) => test.category === category);
  const description =
    category === "팬 퀴즈"
      ? fanQuizCategoryDescription
      : `${category}에 관한 테스트입니다.`;
  return (
    <div className="container-page py-10 sm:py-14">
      <Breadcrumbs items={[{ name: "테스트", href: "/tests" }, { name: category }]} />
      <h1 className="text-3xl font-black tracking-tight text-ink sm:text-4xl">{category}</h1>
      <p className="mt-3 text-slate-600">{description}</p>
      <div className="mt-8"><CategoryTiles activeCategory={category} /></div>
      {matchingTests.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-black text-ink">테스트</h2>
          <div className="test-card-grid mt-5">{matchingTests.map((test) => <TestCard key={test.slug} test={test} />)}</div>
        </section>
      )}
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: `${category} 테스트`,
        description,
        url: absoluteUrl(`/category/${encodeURIComponent(category)}`),
        inLanguage: "ko-KR",
        mainEntity: {
          "@type": "ItemList",
          itemListElement: matchingTests.map((test, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: test.title,
            url: absoluteUrl(test.href ?? `/tests/${test.slug}`),
          })),
        },
      }} />
    </div>
  );
}
