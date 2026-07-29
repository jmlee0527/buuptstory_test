import rawBank from "@/data/question-banks/lionel-messi-true-fan.json";
import type { TestDefinition } from "@/lib/types";

export type MessiDifficulty = "easy" | "medium" | "hard";

export type MessiQuestion = {
  id: string;
  number: number;
  difficulty: MessiDifficulty;
  category: string;
  topicKey: string;
  factGroup: string;
  question: string;
  options: string[];
  answerIndex: number;
  answer: string;
  explanation: string;
  tags: string[];
  sourceIds: string[];
  verificationStatus: string;
};

export type MessiGrade = {
  min: number;
  max: number;
  name: string;
  slug: string;
  icon: string;
  summary: string;
};

type MessiBank = {
  test: {
    intro: string;
    englishTitle: string;
    disclaimer: string;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
  sampling: {
    difficultyQuota: Record<MessiDifficulty, number>;
  };
  scoring: {
    maximumScore: number;
    resultTiers: MessiGrade[];
  };
  verification: {
    verifiedAt: string;
  };
  sources: Record<string, { title: string; url: string }>;
  questions: MessiQuestion[];
};

export const messiBank = rawBank as MessiBank;
export const MESSI_QUIZ_SIZE = 12;
export const MESSI_MAX_SCORE = 12;
export const messiQuota = messiBank.sampling.difficultyQuota;
export const messiQuestions = messiBank.questions.filter((question) => question.verificationStatus === "verified");
export const messiGrades = messiBank.scoring.resultTiers;

export const getMessiQuestion = (id: string) => messiQuestions.find((question) => question.id === id);
export const getMessiGrade = (score: number) => messiGrades.find((grade) => score >= grade.min && score <= grade.max) ?? messiGrades[0];
export const getMessiGradeBySlug = (slug: string) => messiGrades.find((grade) => grade.slug === slug);

export const lionelMessiFanTest: TestDefinition = {
  type: "quiz",
  slug: "lionel-messi-true-fan-test",
  title: "리오넬 메시 팬 퀴즈",
  shortTitle: "메시 팬 퀴즈",
  cardTitle: "리오넬 메시 팬 퀴즈",
  description: "바르셀로나의 전설적인 기록부터 아르헨티나 월드컵 우승, 인터 마이애미 활약까지 12문제로 확인해 보세요.",
  category: "팬 퀴즈",
  duration: "약 3분",
  icon: "⚽",
  thumbnail: "/tests/lionel-messi/cover.png",
  participants: 924,
  accent: "blue",
  fanTheme: "blue-spotlight",
  isNew: true,
  itemCount: MESSI_QUIZ_SIZE,
  questions: [],
  resultSlugs: messiGrades.map((grade) => grade.slug),
  seoTitle: messiBank.seo.metaTitle,
  seoDescription: messiBank.seo.metaDescription,
  keywords: messiBank.seo.keywords,
  seoContent: {
    heading: "리오넬 메시 팬 퀴즈란?",
    paragraphs: [
      "리오넬 메시 팬 퀴즈는 FC 바르셀로나 시절의 주요 기록, 아르헨티나 대표팀의 월드컵과 코파 아메리카 우승, PSG와 인터 마이애미에서의 활동까지 공식 기록을 바탕으로 구성한 축구 퀴즈입니다.",
      "60문항 문제은행에서 매번 하 4문항, 중 5문항, 상 3문항을 뽑아 총 12문항을 제공합니다. 문제와 보기 순서는 섞이지만 정답 매핑은 유지되며, 바르셀로나·아르헨티나·PSG·인터 마이애미 영역이 한쪽으로 치우치지 않도록 구성합니다.",
      "결과에서는 맞힌 문제 수, 정답률, 메시 팬 등급, 문제별 정답과 해설을 확인할 수 있습니다. 이 테스트는 미미테스트가 자체 제작한 비공식 팬 퀴즈이며, 선수나 구단의 공식 서비스가 아닙니다.",
    ],
    faqs: [
      ["몇 문제가 출제되나요?", "총 60문항 풀에서 난이도와 분야 균형을 맞춰 12문항이 출제됩니다."],
      ["문제는 매번 같나요?", "아니요. 새로 시작할 때마다 문제 조합과 보기 순서가 바뀔 수 있습니다."],
      ["어떤 자료를 기준으로 하나요?", "구단 공식 프로필, FIFA, UEFA, CONMEBOL, Olympics.com, Ballon d’Or 공식 자료 등 공개 공식 기록을 기준으로 구성했습니다."],
      ["결과는 어떻게 계산되나요?", "정답 1개당 1점으로 계산하며 12점 만점 기준 5단계 팬 등급을 보여줍니다."],
    ],
    assesses: "리오넬 메시의 클럽, 대표팀, 수상 기록과 주요 경기 장면에 대한 팬 지식",
  },
};
