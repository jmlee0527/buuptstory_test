import type { TestCategory, TestDefinition } from "@/lib/types";

export type TestDiscoveryMetadata = {
  tags?: string[];
  relatedTests?: string[];
  relatedArticles?: string[];
  createdAt?: string;
  popularRank?: number;
  series?: string;
  disclaimer?: string;
};

export type CategoryLanding = {
  title: string;
  description: string;
  articleCategory?: "personality-psychology" | "love-relationships" | "work-lifestyle" | "fan-trends";
};

export const categoryLandings: Record<TestCategory, CategoryLanding> = {
  "성격.심리": {
    title: "무료 성격·심리 테스트 모음",
    description: "정신연령, MBTI, Big Five, EQ, 자존감과 회복탄력성처럼 나의 사고방식과 감정·행동 경향을 살펴보는 무료 테스트를 모았습니다. 결과는 자기이해를 위한 참고로 활용해 보세요.",
    articleCategory: "personality-psychology",
  },
  "연애.관계": {
    title: "무료 연애·관계 테스트 모음",
    description: "애착유형, 연애 성향, 관계 만족도와 소통 방식처럼 가까운 관계에서 반복되는 패턴을 가볍게 살펴보는 테스트를 모았습니다.",
    articleCategory: "love-relationships",
  },
  "직업.일상": {
    title: "직장·일상 성향 테스트 모음",
    description: "업무 페르소나, 직무 스트레스, 번아웃, 이직 의향과 소비 성향처럼 일과 생활에서 나타나는 선택 패턴을 확인할 수 있는 테스트를 모았습니다.",
    articleCategory: "work-lifestyle",
  },
  "팬 퀴즈": {
    title: "아이돌·가수·축구 팬퀴즈 모음",
    description: "아이돌과 가수의 멤버·앨범·노래, 축구 구단과 선수 기록까지 팬이라면 도전해 볼 만한 무료 팬퀴즈를 모았습니다. 비공식 팬 콘텐츠이며 문제와 보기는 매회 다르게 출제될 수 있습니다.",
    articleCategory: "fan-trends",
  },
  "건강.운세": {
    title: "건강 자가점검·오늘의 운세 모음",
    description: "스트레스와 생활 습관을 참고용으로 점검하거나 오늘의 운세를 가볍게 확인할 수 있는 콘텐츠를 모았습니다. 건강 관련 결과는 전문적인 진단을 대신하지 않습니다.",
    articleCategory: "personality-psychology",
  },
};

export const popularTestSlugs = [
  "mbti",
  "mental-age",
  "attachment-style-test",
  "menhera-test",
  "big-five",
  "stress-test",
  "limyoungwoong-song-fan-quiz",
  "youngtak-song-fan-quiz",
  "bts-jungkook-true-fan-test",
  "football-tactics-test",
  "work-persona-16",
  "relationship-satisfaction-test",
] as const;

/**
 * 모든 테스트 파일을 일괄 수정하지 않고도 중요한 클러스터부터 점진적으로 연결하기 위한 정적 설정입니다.
 * 새 테스트는 TestDefinition의 optional 필드에 직접 값을 넣으면 이 설정보다 우선합니다.
 */
export const testDiscoveryMetadata: Record<string, TestDiscoveryMetadata> = {
  "mental-age": { tags: ["성격", "자기이해", "정신연령"], relatedTests: ["mbti", "big-five", "eq-test", "self-esteem-test"], createdAt: "2026-08-08", series: "나를 알아가는 테스트" },
  mbti: { tags: ["성격", "자기이해", "MBTI"], relatedTests: ["big-five", "enneagram", "work-persona-16", "love-mbti-test"], relatedArticles: ["introvert-vs-extrovert", "mbti-in-relationships", "personality-tests-in-ai-era-2026"], series: "나를 알아가는 테스트" },
  "big-five": { tags: ["성격", "심리", "자기이해"], relatedTests: ["mbti", "enneagram", "eq-test", "mental-age"], relatedArticles: ["personality-tests-in-ai-era-2026", "introvert-vs-extrovert"], series: "나를 알아가는 테스트" },
  "eq-test": { tags: ["공감", "감정", "자기이해"], relatedTests: ["interpersonal-ability-test", "ego-resilience-test", "big-five"], series: "나를 알아가는 테스트" },
  "self-esteem-test": { tags: ["자존감", "심리", "자기이해"], relatedTests: ["ego-resilience-test", "big-five", "mental-age"], series: "나를 알아가는 테스트" },
  "ego-resilience-test": { tags: ["회복탄력성", "스트레스", "심리"], relatedTests: ["stress-test", "self-esteem-test", "eq-test"], createdAt: "2026-08-11", series: "나를 알아가는 테스트" },
  "attachment-style-test": { tags: ["애착", "연애", "관계"], relatedTests: ["relationship-satisfaction-test", "love-mbti-test", "jealousy-test", "menhera-test"], relatedArticles: ["four-attachment-styles", "healthy-relationship-boundaries"], series: "관계를 이해하는 테스트" },
  "relationship-satisfaction-test": { tags: ["연애", "관계", "소통"], relatedTests: ["attachment-style-test", "interpersonal-ability-test", "jealousy-test"], createdAt: "2026-08-12", series: "관계를 이해하는 테스트" },
  "interpersonal-ability-test": { tags: ["대인관계", "소통", "공감"], relatedTests: ["eq-test", "relationship-satisfaction-test", "attachment-style-test"], createdAt: "2026-08-12", series: "관계를 이해하는 테스트" },
  "menhera-test": { tags: ["멘헤라", "연애", "관계", "애착"], relatedTests: ["jealousy-test", "attachment-style-test", "relationship-satisfaction-test", "love-mbti-test"], relatedArticles: ["healthy-relationship-boundaries", "four-attachment-styles", "different-texting-frequency-in-relationships"], createdAt: "2026-08-13", series: "관계를 이해하는 테스트", disclaimer: "본 테스트는 재미와 자기 이해를 위한 성향 콘텐츠이며 정신건강 상태나 질환을 진단하지 않습니다." },
  "jealousy-test": { tags: ["질투", "연애", "관계"], relatedTests: ["menhera-test", "attachment-style-test", "relationship-satisfaction-test"], series: "관계를 이해하는 테스트" },
  "love-mbti-test": { tags: ["연애", "관계", "MBTI"], relatedTests: ["attachment-style-test", "relationship-satisfaction-test", "mbti"], series: "관계를 이해하는 테스트" },
  "stress-test": { tags: ["스트레스", "건강", "자가점검"], relatedTests: ["ego-resilience-test", "burnout-risk-test", "job-stress"], relatedArticles: ["realistic-digital-rest-guide", "burnout-vs-tiredness"], disclaimer: "본 테스트는 자기 이해를 위한 참고용 콘텐츠이며 전문적인 의학적·심리적 진단을 제공하지 않습니다." },
  "adhd-self-check": { tags: ["ADHD", "집중", "자가점검"], relatedTests: ["stress-test", "reaction-time-test", "big-five"], disclaimer: "본 테스트는 참고용 자가점검 콘텐츠이며 ADHD를 진단하거나 의료 전문가의 평가를 대신하지 않습니다." },
  "dementia-risk-test": { tags: ["인지", "건강", "자가점검"], relatedTests: ["stress-test", "reaction-time-test", "mental-age"], disclaimer: "본 테스트는 참고용 콘텐츠이며 치매나 인지장애를 진단하지 않습니다. 우려되는 변화가 있다면 의료 전문가와 상담하세요." },
  "burnout-risk-test": { tags: ["번아웃", "직장", "스트레스"], relatedTests: ["workaholic", "job-stress", "ego-resilience-test"], relatedArticles: ["burnout-vs-tiredness", "psychological-detachment-after-work"], disclaimer: "본 테스트는 자기이해용 참고 콘텐츠이며 의료·심리 진단이나 공식 인사평가를 대신하지 않습니다." },
  "job-stress": { tags: ["직장", "스트레스", "업무"], relatedTests: ["burnout-risk-test", "workaholic", "turnover-intention"], createdAt: "2026-08-11" },
  workaholic: { tags: ["직장", "워커홀릭", "업무"], relatedTests: ["job-stress", "burnout-risk-test", "turnover-intention"], createdAt: "2026-08-11" },
  "turnover-intention": { tags: ["직장", "이직", "업무"], relatedTests: ["job-stress", "workaholic", "work-persona-16"], createdAt: "2026-08-11" },
  "work-persona-16": { tags: ["직장", "업무", "MBTI"], relatedTests: ["office-animal-test", "job-stress", "turnover-intention"], createdAt: "2026-08-12" },
  "football-tactics-test": { tags: ["축구", "전술", "팬퀴즈"], relatedTests: ["football-iq-test", "worldcup-winner-quiz", "lionel-messi-true-fan-test", "arsenal-fan-test", "manchester-united-true-fan-test"], relatedArticles: ["healthy-fandom-shortform-guide"], createdAt: "2026-08-13" },
  "football-iq-test": { tags: ["축구", "상식", "팬퀴즈"], relatedTests: ["football-tactics-test", "worldcup-winner-quiz", "lionel-messi-true-fan-test"] },
  "worldcup-winner-quiz": { tags: ["축구", "월드컵", "팬퀴즈"], relatedTests: ["football-iq-test", "football-tactics-test", "lionel-messi-true-fan-test"] },
  "youngtak-fan-test": { tags: ["영탁", "가수", "팬퀴즈"], relatedTests: ["youngtak-song-fan-quiz", "limyoungwoong-fan-test"] },
  "youngtak-song-fan-quiz": { tags: ["영탁", "노래", "팬퀴즈"], relatedTests: ["youngtak-fan-test", "limyoungwoong-song-fan-quiz"], createdAt: "2026-08-13" },
  "limyoungwoong-fan-test": { tags: ["임영웅", "가수", "팬퀴즈"], relatedTests: ["limyoungwoong-song-fan-quiz", "youngtak-fan-test"] },
  "limyoungwoong-song-fan-quiz": { tags: ["임영웅", "노래", "팬퀴즈"], relatedTests: ["limyoungwoong-fan-test", "youngtak-song-fan-quiz"], createdAt: "2026-08-13" },
  "bts-jungkook-true-fan-test": { tags: ["BTS", "정국", "아이돌", "팬퀴즈"], relatedTests: ["bts-fan-test", "seventeen-true-fan", "nct-dream-true-fan-test"], createdAt: "2026-08-12" },
  "bts-fan-test": { tags: ["BTS", "아이돌", "팬퀴즈"], relatedTests: ["bts-jungkook-true-fan-test", "seventeen-true-fan", "nct-dream-true-fan-test"] },
  "seventeen-true-fan": { tags: ["세븐틴", "아이돌", "팬퀴즈"], relatedTests: ["bts-fan-test", "nct-dream-true-fan-test", "stray-kids-true-fan-test"] },
  "nct-dream-true-fan-test": { tags: ["NCT DREAM", "아이돌", "팬퀴즈"], relatedTests: ["seventeen-true-fan", "stray-kids-true-fan-test", "bts-fan-test"], createdAt: "2026-08-11" },
};

export function getDiscoveryMetadata(test: TestDefinition): TestDiscoveryMetadata {
  const fallback = testDiscoveryMetadata[test.slug] ?? {};
  return {
    ...fallback,
    tags: test.tags ?? fallback.tags,
    relatedTests: test.relatedTests ?? fallback.relatedTests,
    relatedArticles: test.relatedArticles ?? fallback.relatedArticles,
    createdAt: test.createdAt ?? fallback.createdAt,
    popularRank: test.popularRank ?? fallback.popularRank,
    series: test.series ?? fallback.series,
    disclaimer: test.disclaimer ?? fallback.disclaimer,
  };
}
