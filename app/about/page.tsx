import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { createMetadata, siteConfig } from "@/lib/site";

export const metadata = createMetadata({ title: "서비스 소개", description: `${siteConfig.name}의 운영 목적과 테스트·정보 콘텐츠 제작 원칙을 소개합니다.`, path: "/about", keywords: ["미미테스트 소개"] });

export default function AboutPage() {
  return (
    <div className="container-page py-10 sm:py-14"><Breadcrumbs items={[{ name: "서비스 소개" }]} />
      <div className="mx-auto max-w-3xl">
        <section className="rounded-3xl border border-slate-200 bg-white p-7 shadow-card sm:p-12"><span className="text-sm font-extrabold text-primary">미미테스트 소개</span><h1 className="mt-3 text-3xl font-black leading-tight tracking-tight text-ink sm:text-4xl">재미로 시작하고,<br />새로운 나를 발견해요.</h1><p className="mt-6 leading-8 text-slate-700">{siteConfig.name}는 성향, 재능, 직장생활, 연애관, 결혼관과 돈 관리 습관까지 다양한 관점으로 자신을 알아보는 종합 테스트 플랫폼입니다. 짧고 재미있지만 결과는 구체적이고 현실적인 테스트를 만드는 것을 중요하게 생각합니다.</p></section>
        <section className="mt-8 grid gap-4 sm:grid-cols-3">{[["명확하게","읽기 쉬운 질문과 결론부터 제시하는 콘텐츠"],["정직하게","수익 보장 없이 장점과 한계를 함께 안내"],["실용적으로","오늘 실행할 수 있는 작은 첫 단계 제공"]].map(([title,text]) => <div key={title} className="rounded-2xl bg-white p-6 shadow-card"><h2 className="font-extrabold text-ink">{title}</h2><p className="mt-3 text-sm leading-6 text-slate-600">{text}</p></div>)}</section>
        <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-7 sm:p-9"><h2 className="text-xl font-black text-ink">운영 목적과 콘텐츠 제작 원칙</h2><p className="mt-4 leading-7 text-slate-700">재미있는 참여 경험과 이해를 돕는 읽을거리를 함께 제공해 사용자가 자신의 성향, 관계와 생활을 가볍게 돌아볼 수 있도록 운영합니다.</p><ul className="mt-5 space-y-3 text-sm leading-7 text-slate-700"><li>• 독자의 중요한 결정을 대신하거나 결과를 진단처럼 단정하지 않습니다.</li><li>• 확인 가능한 공개 자료를 우선하고, 시의성이 있는 정보에는 작성·수정일을 표시합니다.</li><li>• 광고와 제휴 관계가 있는 경우 알아보기 쉽게 공개합니다.</li><li>• 존재하지 않는 전문가나 자격을 내세우지 않습니다.</li></ul></section>
        <section className="mt-8 grid gap-4 sm:grid-cols-2">{[["테스트 제작 기준","질문과 결과가 주제에 맞게 연결되는지 확인하고, 특정 응답을 정답처럼 유도하지 않습니다. 결과는 자기 이해와 재미를 위한 참고 정보로 제공합니다."],["팬 퀴즈 확인 원칙","아티스트·소속사 공식 채널, 공식 음반 정보, 구단·대회 기록 등 공개된 1차 자료를 우선 확인합니다. 비공식 팬 콘텐츠임을 표시합니다."],["심리·성격 콘텐츠 원칙","성격과 관계 개념을 고정된 낙인으로 사용하지 않습니다. 건강 관련 내용은 일반 정보의 한계를 밝히며 전문 진단을 대신하지 않습니다."],["수정과 피드백 정책","공식 정보 변경이나 오류 제보가 접수되면 관련 자료와 영향 범위를 확인합니다. 필요한 수정은 콘텐츠 수정일과 함께 반영합니다."]].map(([title,text]) => <div key={title} className="rounded-2xl border border-slate-200 bg-white p-6"><h2 className="font-extrabold text-ink">{title}</h2><p className="mt-3 text-sm leading-7 text-slate-600">{text}</p></div>)}</section>
        <section className="mt-8 rounded-3xl border border-blue-100 bg-blue-50 p-7 sm:p-9"><h2 className="text-xl font-black text-ink">더 자세한 운영 기준</h2><p className="mt-3 leading-7 text-slate-600">자료 조사, AI 도구 사용, 오류 수정과 사용자 신고 처리 기준을 공개하고 있습니다.</p><div className="mt-6 flex flex-wrap gap-3"><Link href="/editorial-policy" className="inline-flex rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white hover:bg-blue-700">제작 및 검수 정책 보기</Link><Link href="/contact" className="inline-flex rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 hover:border-blue-200">의견 보내기</Link></div></section>
      </div>
    </div>
  );
}
