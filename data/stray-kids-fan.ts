import rawBank from "@/data/question-banks/stray-kids-true-fan.json";
import type { TestDefinition } from "@/lib/types";

export type StrayKidsDifficulty = "easy" | "medium" | "hard";
export type StrayKidsQuestion = {
  id: string; difficulty: StrayKidsDifficulty; category: string; type: string; question: string;
  options: string[]; answerIndex: number; answer: string; explanation: string;
  source: { publisher: string; url: string; verifiedAt: string };
  seoKeywords: string[]; status: string;
  contentPolicy: { rumorFree: boolean; privateLifeExcluded: boolean; sensitivePersonalInfoExcluded: boolean; lyricQuotationExcluded: boolean };
};
export type StrayKidsGrade = { minScore: number; maxScore: number; name: string; headline: string; description: string; slug: string; icon: string };
type Bank = { test: { scoring: { weightByDifficulty: Record<StrayKidsDifficulty, number>; maximumWeightedScore: number }; resultTiers: Omit<StrayKidsGrade, "slug" | "icon">[] }; questions: StrayKidsQuestion[]; validationReport: { checks: Record<string, boolean>; structuralIssues: unknown[] } };

export const strayKidsBank = rawBank as unknown as Bank;
export const STRAY_KIDS_QUIZ_SIZE = 15;
export const STRAY_KIDS_MAX_SCORE = 29;
export const strayKidsQuota: Record<StrayKidsDifficulty, number> = { easy: 5, medium: 6, hard: 4 };
export const strayKidsWeights: Record<StrayKidsDifficulty, number> = { easy: 1, medium: 2, hard: 3 };
export const strayKidsQuestions = strayKidsBank.questions.filter((question) => question.status === "verified_primary_source");
const visuals = [["entry", "🌱"], ["explorer", "🧭"], ["stay-sprout", "🌿"], ["stay", "⭐"], ["content-stay", "🎬"], ["true-stay", "💎"], ["you-make-stay", "👑"]] as const;
export const strayKidsGrades: StrayKidsGrade[] = strayKidsBank.test.resultTiers.map((grade, index) => ({ ...grade, slug: visuals[index][0], icon: visuals[index][1] }));
export const getStrayKidsQuestion = (id: string) => strayKidsQuestions.find((question) => question.id === id);
export const getStrayKidsGrade = (score: number) => strayKidsGrades.find((grade) => score >= grade.minScore && score <= grade.maxScore) ?? strayKidsGrades[0];
export const getStrayKidsGradeBySlug = (slug: string) => strayKidsGrades.find((grade) => grade.slug === slug);

export const strayKidsFanTest: TestDefinition = {
  type: "quiz", slug: "stray-kids-true-fan-test", title: "스트레이 키즈 팬 퀴즈", shortTitle: "스트레이 키즈 팬 퀴즈", cardTitle: "스트레이 키즈 팬 퀴즈",
  description: "멤버·앨범·노래·유닛으로 확인하는 나의 STAY 팬심", category: "팬 퀴즈", duration: "약 3분", icon: "⚡", thumbnail: "/tests/stray-kids-fan.jpg",
  participants: 2843, accent: "purple", fanTheme: "purple-night", isNew: true, itemCount: 15, questions: [], resultSlugs: [],
  seoTitle: "스트레이 키즈 팬 퀴즈 | 나는 몇 점짜리 STAY?",
  seoDescription: "스트레이 키즈 멤버, 앨범, 타이틀곡, 수록곡, 유닛과 발매 순서를 묻는 15문항 팬 퀴즈. 매번 달라지는 문제로 나의 STAY 팬심을 확인해 보세요.",
  keywords: ["스트레이 키즈 팬 퀴즈", "스트레이 키즈 테스트", "스트레이 키즈 퀴즈", "스키즈 팬 퀴즈", "스키즈 퀴즈", "STAY 테스트", "스트레이 키즈 멤버", "스트레이 키즈 노래", "스트레이 키즈 앨범", "Stray Kids quiz", "Stray Kids true fan test"],
  seoContent: { heading: "스트레이 키즈 팬 퀴즈란?", paragraphs: ["스트레이 키즈 멤버와 앨범, 타이틀곡, 수록곡과 유닛 활동을 얼마나 잘 알고 있나요? 공식 프로필과 공식 디스코그래피를 기준으로 검증한 180문항에서 난이도별 15문항을 풀고 나의 STAY 팬심을 확인해 보세요.", "매 시도마다 easy 5문항, medium 6문항, hard 4문항이 출제됩니다. 같은 앨범과 카테고리, 최신 연도 문제가 한쪽에 몰리지 않도록 구성하고, 문제와 보기 순서는 세션별로 섞습니다. 결과에서는 정답 수와 난이도 가중 점수, 팬심 백분율, 틀린 문제의 해설을 확인할 수 있습니다."], faqs: [["몇 문제가 출제되나요?", "한 번에 15문항이 출제됩니다."], ["문제는 매번 같나요?", "아니요. 검증된 180문항에서 편중 방지 규칙에 따라 새롭게 구성됩니다."], ["공식 테스트인가요?", "아니요. 공식 공개 자료를 바탕으로 미미테스트가 제작한 비공식 팬 퀴즈입니다."]], assesses: "스트레이 키즈 멤버, 앨범, 노래, 유닛과 발매 순서에 대한 팬 지식" },
};
