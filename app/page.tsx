import Link from "next/link";
import { TestCard } from "@/components/cards/TestCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { HomeHeroBanner } from "@/components/home/HomeHeroBanner";
import { homeBanners } from "@/data/home-banners";
import { tests } from "@/data/tests";
import { absoluteUrl, createMetadata, siteConfig } from "@/lib/site";

export const metadata = createMetadata({
  title: "미미테스트 | 팬 퀴즈·성격·심리 테스트",
  absoluteTitle: true,
  description: "미미테스트에서 짧고 재미있는 다양한 테스트로 새로운 나를 발견해보세요.",
  path: "/",
  keywords: ["무료 테스트", "성향 테스트", "종합 테스트", "심리 테스트", "연애 테스트", "팬 퀴즈"],
});

const rankedTests = [...tests].sort((a, b) => b.participants - a.participants);
const popularFanTests = rankedTests.filter((test) => test.category === "팬 퀴즈").slice(0, 8);
const newTests = tests.filter((test) => test.isNew).slice(0, 4);
const personalityTests = tests.filter((test) => test.category === "성격.심리").slice(0, 4);
const homeVisibleTests = [...popularFanTests, ...newTests, ...personalityTests];

export default function HomePage() {
  return (
    <>
      <HomeHero />

      <section id="popular-fan-quizzes" className="container-page scroll-mt-20 py-12 sm:py-16">
        <SectionReveal>
          <SectionHeader eyebrow="FAN QUIZ RANKING" title="인기 팬 퀴즈🔥" description="인기순 팬 퀴즈" href={`/category/${encodeURIComponent("팬 퀴즈")}`} />
          <div className="test-card-grid mt-7">{popularFanTests.map((test, index) => <TestCard key={test.slug} test={test} rank={index + 1} />)}</div>
        </SectionReveal>
      </section>

      <section className="border-y border-slate-200 bg-slate-50">
        <div className="container-page py-12 sm:py-16">
          <SectionReveal>
            <SectionHeader eyebrow="NEW TESTS" title="신규 테스트" description=" 최근 추가된 테스트에 도전해보세요." href="/tests" />
            <div className="test-card-grid mt-7">{newTests.map((test) => <TestCard key={test.slug} test={test} />)}</div>
          </SectionReveal>
        </div>
      </section>

      <section className="container-page py-12 sm:py-16">
        <SectionReveal>
          <SectionHeader eyebrow="PERSONALITY & MIND" title="성격.심리 테스트🌟" description="나의 성격.심리에 대해 알아보아요" href={`/category/${encodeURIComponent("성격.심리")}`} />
          <div className="test-card-grid mt-7">{personalityTests.map((test) => <TestCard key={test.slug} test={test} />)}</div>
        </SectionReveal>
      </section>

      <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "테스트는 무료인가요?", acceptedAnswer: { "@type": "Answer", text: "네, 모든 테스트는 회원가입 없이 무료로 이용할 수 있습니다." } }, { "@type": "Question", name: "결과는 어떻게 계산하나요?", acceptedAnswer: { "@type": "Answer", text: "각 답변을 테스트별 성향 가중치와 비교해 가장 가까운 결과를 제공합니다." } }] }} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": absoluteUrl("/#website"),
        url: absoluteUrl("/"),
        name: siteConfig.name,
        alternateName: [
          siteConfig.englishName,
          "미미 테스트",
          "memetest.co.kr",
        ],
        inLanguage: "ko-KR",
        potentialAction: {
          "@type": "SearchAction",
          target: `${absoluteUrl("/search")}?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      }} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "미미테스트 홈 추천 테스트",
        itemListElement: homeVisibleTests.map((test, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: test.title,
          url: absoluteUrl(test.href ?? `/tests/${test.slug}`),
        })),
      }} />
    </>
  );
}

function HomeHero() {
  return (
    <section className="border-b border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#eef4ff_100%)]">
      <div className="container-page grid gap-8 py-10 sm:py-14 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
        <SectionReveal>
          <p className="text-sm font-black text-primary">미미테스트</p>
          <h1 className="mt-3 max-w-xl text-4xl font-black leading-tight tracking-tight text-ink sm:text-5xl">
            다양한 질문으로
            <br />
            <span className="text-violet-700">나를 알아가는 시간</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-8 text-slate-600">
            아이돌·연예인 팬 퀴즈부터
            <br /> 성격·심리 테스트까지
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link href="#popular-fan-quizzes" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-primary px-6 text-sm font-black text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700">
              테스트 찾아보기
            </Link>
            <Link href="/search" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-6 text-sm font-black text-slate-700 transition hover:border-blue-200 hover:text-primary">
              검색으로 찾기
            </Link>
          </div>
        </SectionReveal>

        <SectionReveal>
          <HomeHeroBanner banners={homeBanners} />
        </SectionReveal>
      </div>
    </section>
  );
}

function SectionHeader({ eyebrow, title, description, href }: { eyebrow: string; title: string; description: string; href?: string }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-sm font-black text-primary">{eyebrow}</p>
        <h2 className="mt-2 text-2xl font-black tracking-tight text-ink sm:text-3xl">{title}</h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">{description}</p>
      </div>
      {href && <Link href={href} className="w-fit shrink-0 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-600 transition hover:border-blue-200 hover:text-primary">더 보기 →</Link>}
    </div>
  );
}
