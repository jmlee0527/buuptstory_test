import Link from "next/link";
import { tests } from "@/data/tests";
import { getRelatedTests } from "@/lib/test-discovery";
import type { TestDefinition } from "@/lib/types";

export function TestRecommendations({ current, limit = 4, title = "함께 해보면 좋은 테스트" }: { current: TestDefinition; limit?: number; title?: string }) {
  const related = getRelatedTests(current, tests, limit);
  if (!related.length) return null;
  return (
    <section className="paper-card mx-auto mt-8 max-w-3xl p-6 sm:p-8" aria-labelledby={`related-tests-${current.slug}`}>
      <p className="text-sm font-black text-primary">NEXT TEST</p>
      <h2 id={`related-tests-${current.slug}`} className="mt-2 text-xl font-black text-ink">{title}</h2>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {related.map((test) => (
          <Link key={test.slug} href={test.href ?? `/tests/${test.slug}`} className="rounded-sm border border-[#353535]/20 bg-[#fffdf6] p-5 transition hover:-translate-y-0.5 hover:border-[#4267A8]">
            <div className="flex items-start gap-3"><span className="text-2xl" aria-hidden="true">{test.icon}</span><div><h3 className="font-extrabold text-ink">{test.shortTitle}</h3><p className="mt-1 text-sm leading-6 text-slate-600">{test.description}</p></div></div>
          </Link>
        ))}
      </div>
    </section>
  );
}
