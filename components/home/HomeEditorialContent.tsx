import Link from "next/link";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { articles } from "@/data/articles";

export function HomeEditorialContent() {
  return <section className="border-t border-slate-200 bg-white"><div className="container-page py-12 sm:py-16"><div className="grid gap-4 md:grid-cols-3">{[
    ["미미테스트는 어떤 서비스인가요?", "성격, 관계, 생활과 팬 문화를 가볍게 탐색하는 테스트와 이해를 돕는 읽을거리를 함께 제공합니다."],
    ["결과는 어떻게 활용하나요?", "결과는 자기 이해와 재미를 위한 참고 자료입니다. 건강, 진로, 관계처럼 중요한 판단을 대신하지 않습니다."],
    ["콘텐츠는 어떻게 만드나요?", "주제에 맞는 공개 자료를 확인하고, 과장된 단정은 피하며, 오류 제보와 최신 정보를 반영해 수정합니다."],
  ].map(([title, text]) => <div key={title} className="rounded-2xl border border-slate-200 bg-slate-50 p-6"><h2 className="text-lg font-black text-ink">{title}</h2><p className="mt-3 text-sm leading-7 text-slate-600">{text}</p></div>)}</div><div className="mt-12 flex items-end justify-between gap-4"><div><p className="text-sm font-black text-primary">RECENT CONTENTS</p><h2 className="mt-2 text-2xl font-black text-ink sm:text-3xl">최근 콘텐츠</h2></div><Link href="/articles" className="shrink-0 text-sm font-bold text-primary hover:underline">전체 보기</Link></div><div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{articles.slice(-3).reverse().map((article) => <ArticleCard key={article.slug} article={article} />)}</div><p className="mt-8 text-center text-sm text-slate-500"><Link href="/editorial-policy" className="font-bold text-slate-700 hover:text-primary">콘텐츠 제작 및 검수 정책</Link>에서 운영 원칙을 확인할 수 있습니다.</p></div></section>;
}
