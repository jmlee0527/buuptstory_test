import Link from "next/link";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { articleCategories, articles } from "@/data/articles";
import { createMetadata } from "@/lib/site";

export const metadata = createMetadata({ title: "콘텐츠", description: "성격과 심리, 연애와 관계, 직장생활과 팬 트렌드를 이해하는 데 도움을 주는 읽을거리입니다.", path: "/articles", keywords: ["성격 심리 콘텐츠", "연애 관계 칼럼"] });

export default function ArticlesPage() {
  return <div className="container-page py-10 sm:py-14"><Breadcrumbs items={[{ name: "콘텐츠" }]} /><header className="max-w-3xl"><p className="text-sm font-black text-primary">MIMI CONTENTS</p><h1 className="mt-3 text-3xl font-black tracking-tight text-ink sm:text-4xl">알아두면 나를 이해하는 데 도움이 되는 이야기</h1><p className="mt-4 leading-8 text-slate-600">테스트 결과를 한 번의 라벨로 끝내지 않고 일상에서 해석하고 활용할 수 있도록 정리했습니다.</p></header><nav className="mt-8 flex flex-wrap gap-2" aria-label="콘텐츠 카테고리">{articleCategories.map((category) => <Link key={category.slug} href={`/articles/category/${category.slug}`} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 hover:border-blue-200 hover:text-primary">{category.name}</Link>)}</nav><section className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" aria-label="전체 콘텐츠">{[...articles].reverse().map((article) => <ArticleCard key={article.slug} article={article} />)}</section></div>;
}
