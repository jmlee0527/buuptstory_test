import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/data/articles";
import { getArticleCategory } from "@/data/articles";

export function ArticleCard({ article }: { article: Article }) {
  const category = getArticleCategory(article.category);
  return (
    <article className="notebook-card overflow-hidden border bg-white shadow-card">
      <Link href={`/articles/${article.slug}`} className="group block h-full">
        <div className="notebook-photo relative aspect-[16/9] bg-slate-100">
          <Image src={article.thumbnail} alt="" fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover transition group-hover:scale-[1.02]" />
        </div>
        <div className="p-5">
          <p className="text-xs font-extrabold text-primary">{category?.name}</p>
          <h2 className="mt-2 text-lg font-black leading-7 text-ink group-hover:text-primary">{article.title}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">{article.description}</p>
          <time className="mt-4 block text-xs text-slate-400" dateTime={article.updatedAt}>업데이트 {article.updatedAt.replaceAll("-", ".")}</time>
        </div>
      </Link>
    </article>
  );
}
