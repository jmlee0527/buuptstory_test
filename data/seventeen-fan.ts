import rawBank from "@/data/question-banks/seventeen-true-fan.json";
import type { TestDefinition } from "@/lib/types";

export type SeventeenDifficulty = "초급" | "중급" | "고급";
export type SeventeenSource = { name: string; url: string };
export type SeventeenQuestion = {
  id: string;
  difficulty: SeventeenDifficulty;
  category: string;
  type: string;
  prompt: string;
  choices: string[];
  answerIndex: number;
  answerKey: string;
  answerText: string;
  explanation: string;
  sources: SeventeenSource[];
  verifiedAt: string;
  verificationStatus: string;
  seoKeywords: string[];
  memo?: string;
};

type SeventeenBank = {
  verifiedAt: string;
  sampling: { questionsPerAttempt: number; difficultyMix: Record<SeventeenDifficulty, number> };
  scoring: { tiers: Array<{ min: number; max: number; name: string; description: string }> };
  questions: SeventeenQuestion[];
};

export type SeventeenGrade = { min: number; max: number; name: string; description: string; slug: string; icon: string };
export const seventeenBank = rawBank as unknown as SeventeenBank;
export const SEVENTEEN_QUIZ_SIZE = 15;
export const seventeenDifficultyQuota: Record<SeventeenDifficulty, number> = { 초급: 5, 중급: 6, 고급: 4 };
export const seventeenQuestions = seventeenBank.questions.filter((question) => question.verificationStatus === "검증 완료");
const gradeVisuals = [
  ["getting-ready", "🌱"], ["carat-sprout", "🌿"], ["studious-carat", "📚"],
  ["verified-carat", "✅"], ["true-carat", "💎"], ["diamond-carat", "💠"],
] as const;
export const seventeenGrades: SeventeenGrade[] = seventeenBank.scoring.tiers.map((grade, index) => ({ ...grade, slug: gradeVisuals[index][0], icon: gradeVisuals[index][1] }));
export const getSeventeenQuestion = (id: string) => seventeenQuestions.find((question) => question.id === id);
export const getSeventeenGrade = (score: number) => seventeenGrades.find((grade) => score >= grade.min && score <= grade.max) ?? seventeenGrades[0];
export const getSeventeenGradeBySlug = (slug: string) => seventeenGrades.find((grade) => grade.slug === slug);

export const seventeenFanTest: TestDefinition = {
  type: "quiz",
  slug: "seventeen-true-fan",
  title: "세븐틴 팬 퀴즈",
  shortTitle: "세븐틴 팬 퀴즈",
  cardTitle: "세븐틴 팬 퀴즈",
  description: "멤버·유닛·노래·앨범으로 확인하는 나의 캐럿력",
  category: "팬 퀴즈",
  duration: "약 3분",
  icon: "💎",
  thumbnail: "/tests/seventeen-fan.jpg",
  participants: 5717,
  accent: "indigo",
  fanTheme: "blue-spotlight",
  isNew: true,
  itemCount: SEVENTEEN_QUIZ_SIZE,
  questions: [],
  resultSlugs: [],
  seoTitle: "세븐틴 팬 퀴즈 | 멤버·노래·앨범 퀴즈",
  seoDescription: "세븐틴 멤버, 유닛, 대표곡, 앨범과 수록곡 문제 15개로 나의 캐럿력을 확인해 보세요. 난이도별 랜덤 출제되는 세븐틴 팬 퀴즈입니다.",
  keywords: ["세븐틴 팬 퀴즈", "세븐틴 퀴즈", "세븐틴 팬 테스트", "캐럿 테스트", "세븐틴 멤버 퀴즈", "세븐틴 노래 퀴즈", "SEVENTEEN quiz"],
  seoContent: {
    heading: "세븐틴 팬 퀴즈란?",
    paragraphs: [
      "세븐틴 멤버와 유닛, 대표곡, 앨범, 수록곡까지 얼마나 알고 있나요? 공식 프로필과 디스코그래피 등 공개 자료를 바탕으로 검증한 60문항 중 초급 5문항, 중급 6문항, 고급 4문항이 매번 새롭게 출제됩니다. 정답을 고르는 동안에는 답이나 해설이 보이지 않으며, 제출 뒤 나의 캐럿력과 오답 해설을 확인할 수 있습니다.",
      "보기와 문항 순서는 세션별로 섞이지만 같은 시도에서는 새로고침해도 유지됩니다. 생일 문제와 특정 앨범 중심 문제가 지나치게 몰리지 않도록 출제 규칙을 적용했으며, 다시 도전하면 다른 조합으로 즐길 수 있습니다. 본 콘텐츠는 공식 인증 시험이 아닌 미미테스트의 비공식 팬 퀴즈입니다.",
    ],
    faqs: [
      ["세븐틴 팬 퀴즈는 몇 문제인가요?", "한 번에 총 15문항이 출제됩니다. 초급 5문항, 중급 6문항, 고급 4문항으로 구성됩니다."],
      ["문제는 매번 같나요?", "아니요. 검증 완료된 60문항에서 난이도와 편중 방지 규칙에 맞춰 무작위로 구성됩니다."],
      ["어떤 자료를 바탕으로 만들었나요?", "공식 프로필, 공식 디스코그래피, 공식 Weverse 공지를 우선 확인하고 일부 자료는 신뢰할 수 있는 인터뷰로 교차 검증했습니다."],
    ],
    assesses: "세븐틴 멤버, 유닛, 노래, 앨범과 수록곡에 대한 팬 지식",
  },
};
