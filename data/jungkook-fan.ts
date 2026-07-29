import rawBank from "@/data/question-banks/jung-kook-true-fan-test-pool.json";
import type { TestDefinition } from "@/lib/types";

export type JungkookDifficulty = "easy" | "medium" | "hard";

export type JungkookQuestion = {
  id: number;
  difficulty: JungkookDifficulty;
  category: string;
  question: string;
  options: string[];
  answerIndex: number;
  answer: string;
  explanation: string;
  sourceUrl: string;
  keywords: string[];
};

type RawResultTier = {
  minScore: number;
  maxScore: number;
  title: string;
  description: string;
};

type JungkookBank = {
  schemaVersion: string;
  test: {
    slugSuggestion: string;
    titleKo: string;
    titleEn: string;
    subject: string;
    questionPoolSize: number;
    questionsPerAttempt: number;
    selectionRule: Record<JungkookDifficulty, number> & {
      shuffleQuestions: boolean;
      shuffleOptions: boolean;
      avoidDuplicateQuestionIds: boolean;
    };
    seo: {
      metaTitleKo: string;
      metaDescriptionKo: string;
      keywords: string[];
    };
    verificationDate: string;
    introKo: string;
    guideKo: string[];
    resultTiers: RawResultTier[];
  };
  questions: JungkookQuestion[];
};

export type JungkookGrade = {
  min: number;
  max: number;
  name: string;
  slug: string;
  icon: string;
  summary: string;
};

export const jungkookBank = rawBank as JungkookBank;
export const JUNGKOOK_QUIZ_SIZE = jungkookBank.test.questionsPerAttempt;
export const JUNGKOOK_MAX_SCORE = JUNGKOOK_QUIZ_SIZE;
export const jungkookQuota: Record<JungkookDifficulty, number> = {
  easy: jungkookBank.test.selectionRule.easy,
  medium: jungkookBank.test.selectionRule.medium,
  hard: jungkookBank.test.selectionRule.hard,
};
export const jungkookQuestions = jungkookBank.questions;

const gradeDetails = [
  { slug: "jungkook-getting-ready", icon: "🌱" },
  { slug: "jungkook-growing-fan", icon: "🎧" },
  { slug: "jungkook-top-fan", icon: "⭐" },
  { slug: "jungkook-true-fan", icon: "💜" },
  { slug: "jungkook-golden-master", icon: "🏆" },
] as const;

export const jungkookGrades: JungkookGrade[] = jungkookBank.test.resultTiers.map((tier, index) => ({
  min: tier.minScore,
  max: tier.maxScore,
  name: tier.title,
  slug: gradeDetails[index].slug,
  icon: gradeDetails[index].icon,
  summary: tier.description,
}));

export const getJungkookQuestion = (id: number) => jungkookQuestions.find((question) => question.id === id);
export const getJungkookGrade = (score: number) => jungkookGrades.find((grade) => score >= grade.min && score <= grade.max) ?? jungkookGrades[0];
export const getJungkookGradeBySlug = (slug: string) => jungkookGrades.find((grade) => grade.slug === slug);

export const jungkookFanTest: TestDefinition = {
  type: "quiz",
  slug: "bts-jungkook-true-fan-test",
  title: "BTS 정국 팬 퀴즈",
  shortTitle: "BTS 정국 팬 퀴즈",
  cardTitle: "BTS 정국 팬 퀴즈",
  description: jungkookBank.test.introKo,
  category: "팬 퀴즈",
  duration: "약 3분",
  icon: "💜",
  thumbnail: "/tests/bts-jungkook-fan.png",
  participants: 0,
  accent: "purple",
  fanTheme: "purple-night",
  isNew: true,
  itemCount: JUNGKOOK_QUIZ_SIZE,
  questions: [],
  resultSlugs: jungkookGrades.map((grade) => grade.slug),
  seoTitle: "BTS 정국 팬 퀴즈 | 정국 퀴즈 12문제로 팬력 확인",
  seoDescription: jungkookBank.test.seo.metaDescriptionKo,
  keywords: [
    ...jungkookBank.test.seo.keywords,
    "방탄소년단 정국",
    "방탄소년단 팬퀴즈",
    "Jung Kook",
  ],
  seoContent: {
    heading: "BTS 정국 팬 퀴즈란?",
    paragraphs: [
      jungkookBank.test.introKo,
      jungkookBank.test.guideKo.join(" "),
      "정국의 공식 음악과 공연, BTS 활동 기록을 바탕으로 구성한 비공식 팬 퀴즈입니다. 문제를 다시 풀면 새로운 조합과 보기 순서로 도전할 수 있습니다.",
    ],
    faqs: [
      ["몇 문제가 출제되나요?", "전체 60문항 중 쉬움 4문항, 보통 5문항, 어려움 3문항을 뽑아 총 12문항이 출제됩니다."],
      ["문제와 보기는 매번 같나요?", "아니요. 다시 도전하면 문제 조합과 보기 순서가 달라질 수 있습니다."],
      ["결과는 어떻게 계산되나요?", "정답 1개당 1점으로 계산하며 12점 만점 기준 5개 결과 구간으로 안내합니다."],
      ["공식 BTS 테스트인가요?", "아니요. 공개된 공식·신뢰도 높은 자료를 바탕으로 미미테스트가 제작한 비공식 팬 퀴즈입니다."],
    ],
    assesses: "BTS 정국의 음악, 앨범, 공연과 공식 활동 기록에 대한 팬 지식",
  },
};
