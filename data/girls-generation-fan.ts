import rawBank from "@/data/question-banks/girls-generation-true-fan.json";
import type { TestDefinition } from "@/lib/types";

// 소녀시대 팬 퀴즈 — 문제·정답·해설·결과 등급은 첨부 JSON 문제은행을 단일 원본으로 사용합니다.
// 문제 내용을 이 파일에서 수정하지 마세요. 검수는 data/question-banks/girls-generation-true-fan.json에서 진행합니다.
export type GirlsGenerationDifficulty = "easy" | "medium" | "hard";
export type GirlsGenerationQuestion = {
  id: string;
  difficulty: GirlsGenerationDifficulty;
  category: string;
  albumKey: string | null;
  question: string;
  options: string[];
  answerIndex: number;
  answerText: string;
  explanation: string;
  sourceIds: string[];
  verificationStatus: string;
  freshness: "stable" | "time_sensitive";
  seoTags: string[];
};
export type GirlsGenerationGrade = {
  minScore: number;
  maxScore: number;
  title: string;
  summary: string;
  slug: string;
  icon: string;
};
type Source = { id: string; url: string };
type Bank = {
  test: { verificationCutoff?: string };
  verificationCutoff?: string;
  seo: {
    slug: string;
    canonicalPath: string;
    metaTitle: string;
    metaDescription: string;
    primaryKeyword: string;
    secondaryKeywords: string[];
    shareTextTemplate: string;
  };
  selectionPolicy: {
    difficultyQuota: Record<GirlsGenerationDifficulty, number>;
    maxPerCategory: number;
    maxPerAlbumKey: number;
    maxTimeSensitive: number;
  };
  resultBands: Omit<GirlsGenerationGrade, "slug" | "icon">[];
  sources: Source[];
  questions: GirlsGenerationQuestion[];
};

export const girlsGenerationBank = rawBank as unknown as Bank;
export const GIRLS_GENERATION_QUIZ_SIZE = 15;
export const girlsGenerationQuota = girlsGenerationBank.selectionPolicy.difficultyQuota;
export const girlsGenerationSelectionLimits = {
  maxPerCategory: girlsGenerationBank.selectionPolicy.maxPerCategory,
  maxPerAlbumKey: girlsGenerationBank.selectionPolicy.maxPerAlbumKey,
  maxTimeSensitive: girlsGenerationBank.selectionPolicy.maxTimeSensitive,
};
export const girlsGenerationQuestions = girlsGenerationBank.questions.filter((question) => question.verificationStatus === "verified");

// slug와 아이콘은 라우팅/표시용 부가 정보로, 등급명·설명은 JSON resultBands를 그대로 사용합니다.
const visuals = [
  ["seedling-sone", "🌱"],
  ["growing-sone", "🎀"],
  ["skilled-sone", "🎤"],
  ["hardcore-sone", "💎"],
  ["legend-sone", "👑"],
] as const;
export const girlsGenerationGrades: GirlsGenerationGrade[] = girlsGenerationBank.resultBands.map((grade, index) => ({
  ...grade,
  slug: visuals[index][0],
  icon: visuals[index][1],
}));

export const getGirlsGenerationQuestion = (id: string) => girlsGenerationQuestions.find((question) => question.id === id);
export const getGirlsGenerationGrade = (score: number) =>
  girlsGenerationGrades.find((grade) => score >= grade.minScore && score <= grade.maxScore) ?? girlsGenerationGrades[0];
export const getGirlsGenerationGradeBySlug = (slug: string) => girlsGenerationGrades.find((grade) => grade.slug === slug);

export const girlsGenerationFanTest: TestDefinition = {
  type: "quiz",
  slug: "girls-generation-true-fan-test",
  title: "소녀시대 팬 퀴즈",
  shortTitle: "소녀시대 팬 퀴즈",
  cardTitle: "소녀시대 팬 퀴즈",
  description: "데뷔곡부터 정규앨범, 태티서와 Oh!GG까지 나의 S♡NE 덕력을 확인해 보세요.",
  category: "팬 퀴즈",
  duration: "약 3분",
  icon: "🎀",
  thumbnail: "/tests/girls-generation-fan.jpg",
  participants: 684,
  accent: "pink",
  fanTheme: "pink-ticket",
  isNew: true,
  itemCount: GIRLS_GENERATION_QUIZ_SIZE,
  questions: [],
  resultSlugs: [],
  seoTitle: girlsGenerationBank.seo.metaTitle,
  seoDescription: girlsGenerationBank.seo.metaDescription,
  keywords: [girlsGenerationBank.seo.primaryKeyword, ...girlsGenerationBank.seo.secondaryKeywords, "Girls' Generation True Fan Test", "Girls Generation 테스트", "girls generation quiz"],
  seoContent: {
    heading: "소녀시대 팬 퀴즈란?",
    paragraphs: [
      "소녀시대 팬 퀴즈는 멤버와 데뷔, 다시 만난 세계와 Gee, 소원을 말해봐 같은 대표곡, 정규앨범과 FOREVER 1, 태티서·Oh!GG 유닛 활동까지 공식 자료로 검증한 60문항 문제은행에서 매번 15문항을 뽑아 진행하는 팬덤 퀴즈입니다.",
      "난이도는 easy 5문항, medium 6문항, hard 4문항으로 항상 균형이 유지되고, 같은 분야나 같은 앨범에 문제가 몰리지 않도록 출제를 제한합니다. 문제 순서와 보기 순서가 매번 바뀌기 때문에 다시 도전할 때마다 새로운 시험처럼 즐길 수 있습니다.",
      "결과에서는 15점 만점 점수와 정답률, 새싹 S♡NE부터 레전드 S♡NE까지 5단계 등급, 그리고 문제별 정답과 해설 복습을 제공합니다. 본 테스트는 공개된 공식 자료를 바탕으로 제작된 비공식 팬 콘텐츠입니다.",
    ],
    faqs: [
      ["문제는 어떻게 출제되나요?", "검증된 60문항 중 easy 5, medium 6, hard 4 비율로 15문항이 무작위 출제됩니다. 같은 분야 최대 4문항, 같은 앨범 최대 3문항으로 편중을 제한하고, 재응시 시 직전 문제와 겹침을 줄입니다."],
      ["정답과 해설은 언제 볼 수 있나요?", "진행 중에는 정답이 표시되지 않고, 15문항을 모두 제출한 뒤 결과 화면에서 문제별 정답과 해설을 복습할 수 있습니다."],
      ["결과 등급은 어떻게 나뉘나요?", "정답 1개당 1점으로 계산해 0~3점, 4~7점, 8~10점, 11~13점, 14~15점의 5단계 S♡NE 등급으로 나뉩니다."],
      ["공식 테스트인가요?", "아니요. 공개된 공식 자료를 바탕으로 미미테스트가 자체 제작한 비공식 팬 퀴즈이며, 멤버 사진과 공식 로고는 사용하지 않습니다."],
    ],
    assesses: "소녀시대 멤버, 데뷔, 대표곡, 정규앨범, 유닛 활동에 대한 팬 지식",
  },
};
