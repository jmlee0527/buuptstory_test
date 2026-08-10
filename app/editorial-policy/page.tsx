import Link from "next/link";
import { PolicyLayout } from "@/components/content/PolicyLayout";
import { createMetadata, siteConfig } from "@/lib/site";

export const metadata = createMetadata({ title: "콘텐츠 제작 및 검수 정책", description: `${siteConfig.name}의 자료 조사, 정보 확인, 업데이트와 오류 수정 원칙을 안내합니다.`, path: "/editorial-policy", keywords: ["콘텐츠 제작 정책", "콘텐츠 검수 정책"] });

export default function EditorialPolicyPage() {
  return <PolicyLayout title="콘텐츠 제작 및 검수 정책" description="미미테스트가 테스트와 정보성 콘텐츠를 만들고 관리하는 기준을 공개합니다." updatedAt="2026년 8월 10일" sections={[
    { title: "1. 콘텐츠 제작 목적", content: <p>흥미로운 테스트와 설명 콘텐츠를 통해 사용자가 자신의 성향과 일상을 돌아볼 출발점을 제공합니다. 결과를 사실이나 진단처럼 단정하지 않고, 중요한 결정을 대신하지 않습니다.</p> },
    { title: "2. 자료 조사와 정보 확인", content: <><p>주제와 가까운 공공기관, 학술·교육기관, 공식 발표 등 확인 가능한 공개 자료를 우선 참고합니다. 여러 출처가 필요할 때는 핵심 사실이 서로 일치하는지 확인하고, 출처를 확인하기 어려운 주장과 수치는 사용하지 않습니다.</p><p>팬 콘텐츠는 소속사, 아티스트 공식 채널, 음반 정보와 공식 대회·구단 기록 등을 우선 확인하며 비공식 팬 콘텐츠임을 명확히 표시합니다.</p></> },
    { title: "3. 심리·성격 콘텐츠 기준", content: <p>성격과 관계 개념은 자기 이해를 돕는 일반 정보로 다룹니다. 검사 결과만으로 사람을 고정된 유형으로 단정하거나 질환을 진단하지 않습니다. 건강 관련 자가 점검은 전문적인 진단과 치료를 대신하지 않는다는 한계를 안내합니다.</p> },
    { title: "4. 업데이트와 오류 수정", content: <p>시의성이 있는 정보는 공개일과 수정일을 표시하고, 공식 정보가 바뀌거나 오류가 확인되면 관련 범위를 검토해 수정합니다. 중요한 의미가 달라지는 수정은 내용을 다시 확인한 뒤 반영합니다.</p> },
    { title: "5. AI 도구 사용 원칙", content: <p>아이디어 정리, 문장 교정, 코드 작성 보조에 AI 도구를 사용할 수 있으나, 공개 전 사람이 맥락과 사실관계, 과장 표현, 사용자 안전을 확인합니다. AI가 만든 내용을 검토 없이 대량 게시하지 않으며 존재하지 않는 전문가나 출처를 만들지 않습니다.</p> },
    { title: "6. 사용자 신고와 피드백", content: <p>오류, 권리 침해, 불편 사항은 <Link href="/contact" className="font-bold text-primary hover:underline">문의하기</Link>에서 접수합니다. 페이지 주소와 수정이 필요한 부분을 알려주시면 사실관계와 영향 범위를 확인해 반영 여부를 결정합니다.</p> },
  ]} />;
}
