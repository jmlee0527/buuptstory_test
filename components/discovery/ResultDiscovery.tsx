import Link from "next/link";
import { RelatedArticlesForTest } from "@/components/articles/RelatedArticlesForTest";
import { tests } from "@/data/tests";
import { getNewestTests, getPopularTests, getRelatedTests } from "@/lib/test-discovery";

export function ResultDiscovery({ currentTestSlug }: { currentTestSlug: string }) {
  const current = tests.find((test) => test.slug === currentTestSlug);
  if (!current) return null;
  const similar = getRelatedTests(current, tests, 4);
  const excluded = [current.slug, ...similar.map((test) => test.slug)];
  const popular = getPopularTests(tests, { exclude: excluded, limit: 3 });
  const newest = getNewestTests(tests, { exclude: [...excluded, ...popular.map((test) => test.slug)], limit: 3 });

  return (
    <div className="container-page pb-14">
      <div className="mx-auto max-w-3xl border-t border-[#353535]/15 pt-10">
        <DiscoveryRow eyebrow="SIMILAR TESTS" title="비슷한 테스트" tests={similar} />
        <DiscoveryRow eyebrow="POPULAR NOW" title="지금 인기 있는 테스트" tests={popular} compact />
        <DiscoveryRow eyebrow="NEW TESTS" title="새로 나온 테스트" tests={newest} compact />
        <RelatedArticlesForTest testSlug={current.slug} />
      </div>
    </div>
  );
}

function DiscoveryRow({ eyebrow, title, tests: items, compact = false }: { eyebrow: string; title: string; tests: typeof tests; compact?: boolean }) {
  if (!items.length) return null;
  return (
    <section className="mt-9 first:mt-0">
      <p className="text-xs font-black tracking-[.14em] text-primary">{eyebrow}</p>
      <div className="mt-2 flex items-end justify-between gap-4"><h2 className="text-xl font-black text-ink">{title}</h2><Link href="/tests" className="shrink-0 text-sm font-bold text-primary hover:underline">전체 보기</Link></div>
      <div className={`mt-4 grid gap-3 ${compact ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
        {items.map((test) => <Link key={test.slug} href={test.href ?? `/tests/${test.slug}`} className="rounded-sm border border-[#353535]/20 bg-[#fffdf6] p-4 transition hover:-translate-y-0.5 hover:border-[#4267A8]"><div className="flex items-center gap-3"><span className="text-2xl" aria-hidden="true">{test.icon}</span><h3 className="font-extrabold leading-6 text-ink">{test.shortTitle}</h3></div>{!compact && <p className="mt-2 text-sm leading-6 text-slate-600">{test.description}</p>}</Link>)}
      </div>
    </section>
  );
}
