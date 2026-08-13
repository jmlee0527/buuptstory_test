import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { CategoryPageContent } from "@/components/pages/CategoryPageContent";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { tests } from "@/data/tests";
import { articles } from "@/data/articles";
import { categoryLandings } from "@/data/test-discovery";
import { getNewestTests, getPopularTests } from "@/lib/test-discovery";
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
    const landing = categoryLandings[category];
    return createMetadata({
      title: landing.title,
      description: landing.description,
      path: `/category/${encodeURIComponent(category)}`,
      keywords: ["팬퀴즈", "팬 퀴즈", "팬 테스트", "찐팬 퀴즈", "아이돌 팬퀴즈", "팬덤 퀴즈"],
    });
  }
  const landing = categoryLandings[category as keyof typeof categoryLandings];
  return createMetadata({ title: landing?.title ?? `${category} 테스트`, description: landing?.description ?? `${category}에 관한 무료 테스트를 모아보세요.`, path: `/category/${encodeURIComponent(category)}`, keywords: [`${category} 테스트`] });
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = decodeURIComponent(slug);
  const redirectedCategory = legacyCategoryRedirects[category];
  if (redirectedCategory) permanentRedirect(`/category/${encodeURIComponent(redirectedCategory)}`);
  if (category === "음식") permanentRedirect("/tests/weekend-food-worldcup");
  if (!categories.some((item) => item === category)) notFound();
  const matchingTests = tests.filter((test) => test.category === category);
  const landing = categoryLandings[category as keyof typeof categoryLandings];
  const description = landing?.description ?? (category === "팬 퀴즈" ? fanQuizCategoryDescription : `${category}에 관한 테스트입니다.`);
  const popularTests = getPopularTests(matchingTests, { limit: 4 });
  const newTests = getNewestTests(matchingTests, { exclude: popularTests.map((test) => test.slug), limit: 4 });
  const relatedArticles = landing?.articleCategory ? articles.filter((article) => article.category === landing.articleCategory).slice(-3).reverse() : [];
  return (
    <>
      <CategoryPageContent category={category} title={landing?.title ?? `${category} 테스트`} description={description} tests={matchingTests} popularTests={popularTests} newTests={newTests} />
      {relatedArticles.length > 0 && <section className="container-page pb-14"><div className="border-t border-slate-200 pt-10"><div className="flex items-end justify-between gap-4"><div><p className="text-xs font-black tracking-[.14em] text-primary">RELATED CONTENT</p><h2 className="mt-2 text-2xl font-black text-ink">관련 콘텐츠</h2></div><Link href="/articles" className="text-sm font-bold text-primary hover:underline">콘텐츠 전체 보기</Link></div><div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{relatedArticles.map((article) => <ArticleCard key={article.slug} article={article} />)}</div></div></section>}
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: landing?.title ?? `${category} 테스트`,
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
    </>
  );
}
