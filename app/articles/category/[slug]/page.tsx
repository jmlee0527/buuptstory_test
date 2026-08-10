import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { articleCategories, getArticleCategory, getArticlesByCategory } from "@/data/articles";
import { createMetadata } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return articleCategories.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { slug } = await params; const category = getArticleCategory(slug); return category ? createMetadata({ title: `${category.name} 콘텐츠`, description: `${category.name} 주제의 유용한 해설과 생활 가이드를 모았습니다.`, path: `/articles/category/${slug}`, keywords: [category.name, category.englishName] }) : {}; }
export default async function ArticleCategoryPage({ params }: Props) { const { slug } = await params; const category = getArticleCategory(slug); if (!category) notFound(); const items = getArticlesByCategory(slug); return <div className="container-page py-10 sm:py-14"><Breadcrumbs items={[{ name: "콘텐츠", href: "/articles" }, { name: category.name }]} /><header><p className="text-sm font-black text-primary">{category.englishName}</p><h1 className="mt-2 text-3xl font-black text-ink">{category.name}</h1><p className="mt-3 text-slate-600">{category.name} 주제를 일상에 적용할 수 있도록 차분하게 풀어낸 콘텐츠입니다.</p></header>{items.length ? <section className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{items.reverse().map((article) => <ArticleCard key={article.slug} article={article} />)}</section> : <p className="mt-10 rounded-2xl bg-white p-8 text-slate-600">이 카테고리의 콘텐츠를 준비하고 있습니다.</p>}</div>; }
