import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/articles/ArticleBody";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { articles, getArticle, getArticleCategory } from "@/data/articles";
import { getTest } from "@/data/tests";
import { absoluteUrl, createMetadata, siteConfig } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return articles.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { slug } = await params; const article = getArticle(slug); return article ? createMetadata({ title: article.title, description: article.description, path: `/articles/${slug}`, keywords: article.keywords, type: "article", ogImagePath: article.thumbnail }) : {}; }
export default async function ArticlePage({ params }: Props) {
  const { slug } = await params; const article = getArticle(slug); if (!article) notFound(); const category = getArticleCategory(article.category); const relatedTests = article.relatedTests.map(getTest).filter(Boolean); const relatedArticles = article.relatedArticles.map(getArticle).filter(Boolean);
  const faqs = article.content.filter((block) => block.type === "faq").flatMap((block) => block.items);
  return <div className="container-page py-10 sm:py-14"><Breadcrumbs items={[{ name: "콘텐츠", href: "/articles" }, { name: category?.name ?? "콘텐츠", href: `/articles/category/${article.category}` }, { name: article.title }]} /><article className="mx-auto max-w-3xl"><header><Link href={`/articles/category/${article.category}`} className="text-sm font-extrabold text-primary">{category?.name}</Link><h1 className="mt-3 text-3xl font-black leading-tight tracking-tight text-ink sm:text-5xl">{article.title}</h1><p className="mt-5 text-lg leading-8 text-slate-600">{article.description}</p><div className="mt-5 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500"><span>{article.author}</span><time dateTime={article.publishedAt}>작성 {article.publishedAt.replaceAll("-", ".")}</time><time dateTime={article.updatedAt}>수정 {article.updatedAt.replaceAll("-", ".")}</time></div></header><div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-3xl bg-slate-100"><Image src={article.thumbnail} alt={`${article.title} 대표 이미지`} fill priority sizes="(max-width: 768px) 100vw, 768px" className="object-cover" /></div><ArticleBody blocks={article.content} /></article>
  {relatedTests.length > 0 && <section className="mx-auto mt-12 max-w-3xl border-t border-slate-200 pt-9"><h2 className="text-2xl font-black text-ink">관련 테스트</h2><div className="mt-5 grid gap-3 sm:grid-cols-2">{relatedTests.map((test) => test && <Link key={test.slug} href={test.href ?? `/tests/${test.slug}`} className="rounded-2xl border border-blue-100 bg-blue-50 p-5 hover:border-blue-300"><span className="text-2xl" aria-hidden="true">{test.icon}</span><h3 className="mt-2 font-black text-ink">{test.shortTitle}</h3><p className="mt-1 text-sm leading-6 text-slate-600">{test.description}</p></Link>)}</div></section>}
  {relatedArticles.length > 0 && <section className="mx-auto mt-12 max-w-3xl"><h2 className="text-2xl font-black text-ink">다른 콘텐츠 보기</h2><div className="mt-5 grid gap-5 sm:grid-cols-2">{relatedArticles.map((item) => item && <ArticleCard key={item.slug} article={item} />)}</div></section>}
  <JsonLd data={{ "@context": "https://schema.org", "@type": "Article", headline: article.title, description: article.description, image: absoluteUrl(article.thumbnail), datePublished: article.publishedAt, dateModified: article.updatedAt, mainEntityOfPage: absoluteUrl(`/articles/${article.slug}`), inLanguage: "ko-KR", author: { "@type": "Organization", name: article.author }, publisher: { "@type": "Organization", name: siteConfig.name, "@id": absoluteUrl("/#organization") } }} />
  {faqs.length > 0 && <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) }} />}</div>;
}
