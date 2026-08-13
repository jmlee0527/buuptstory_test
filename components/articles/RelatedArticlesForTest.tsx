import Link from "next/link";
import { getArticle, getArticlesForTest } from "@/data/articles";
import { getDiscoveryMetadata } from "@/data/test-discovery";
import { getTest } from "@/data/tests";

export function RelatedArticlesForTest({ testSlug }: { testSlug: string }) {
  const test = getTest(testSlug);
  const explicit = test ? (getDiscoveryMetadata(test).relatedArticles ?? []).map(getArticle).filter((article) => article !== undefined) : [];
  const related = [...explicit, ...getArticlesForTest(testSlug)].filter((article, index, all) => all.findIndex((item) => item.slug === article.slug) === index).slice(0, 4);
  if (!related.length) return null;
  return (
    <section className="paper-card mx-auto mt-8 max-w-3xl p-6 sm:p-8" aria-labelledby="related-articles-title">
      <p className="text-sm font-black text-primary">함께 읽어보세요</p>
      <h2 id="related-articles-title" className="mt-2 text-xl font-black text-ink">관련 콘텐츠</h2>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">{related.map((article) => <Link key={article.slug} href={`/articles/${article.slug}`} className="rounded-sm border border-[#353535]/20 bg-[#f4f1df] p-5 transition hover:-translate-y-0.5 hover:border-[#4267A8]"><span className="font-extrabold text-ink">{article.title}</span><span className="mt-2 block text-sm leading-6 text-slate-600">{article.description}</span></Link>)}</div>
    </section>
  );
}
