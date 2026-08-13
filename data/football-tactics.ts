import type { TestDefinition } from "@/lib/types";
import lv2Questions from "@/data/question-banks/football-tactics-lv2.json";
import lv3Questions from "@/data/question-banks/football-tactics-lv3.json";
import lv4Questions from "@/data/question-banks/football-tactics-lv4.json";
import lv5Questions from "@/data/question-banks/football-tactics-lv5.json";
import distractorOverrides from "@/data/question-banks/football-tactics-distractors.json";
import questionOverrides from "@/data/question-banks/football-tactics-question-overrides.json";

export type FootballTacticsDifficulty = 2 | 3 | 4 | 5;

export type FootballTacticsQuestion = {
  id: string;
  difficulty: FootballTacticsDifficulty;
  category: string;
  question: string;
  choices: [string, string, string, string];
  correctAnswer: number;
  explanation: string;
  sourceNote: string;
  image?: string;
};

export type FootballTacticsAnswer = { questionId: string; choice: number };

export type FootballTacticsGradeProfile = {
  slug: string;
  name: string;
  icon: string;
  minScore: number;
  maxScore: number;
  summary: string;
  description: string;
  shareTemplate: string;
};

const footballTacticsSourceQuestions = [
  ...lv2Questions,
  ...lv3Questions,
  ...lv4Questions,
  ...lv5Questions,
] as FootballTacticsQuestion[];

export const footballTacticsQuestions = footballTacticsSourceQuestions.map((question) => {
  const distractors = distractorOverrides[question.id as keyof typeof distractorOverrides];
  const upgradedQuestion = questionOverrides[question.id as keyof typeof questionOverrides] ?? question.question;
  if (!distractors) return { ...question, question: upgradedQuestion };
  let distractorIndex = 0;
  const choices = question.choices.map((choice, index) => (
    index === question.correctAnswer ? choice : distractors[distractorIndex++]
  )) as FootballTacticsQuestion["choices"];
  return { ...question, question: upgradedQuestion, choices };
});

export const footballTacticsGradeProfiles: FootballTacticsGradeProfile[] = [
  {
    slug: "tactics-beginner",
    name: "축린이",
    icon: "🌱",
    minScore: 0,
    maxScore: 2,
    summary: "축구를 보는 재미는 이제부터 시작입니다.",
    description: "전술을 조금씩 알고 보면 같은 경기도 완전히 다르게 보일 수 있습니다. 선수만 따라가기보다 공 주변의 간격과 패스길부터 천천히 살펴보세요.",
    shareTemplate: "축잘알 퀴즈(전술편) {score}/10점, 축린이 🌱 너는 몇 점?",
  },
  {
    slug: "neighborhood-tactics-fan",
    name: "동네 축잘알",
    icon: "⚽",
    minScore: 3,
    maxScore: 4,
    summary: "기본적인 축구 전술은 꽤 알고 있습니다.",
    description: "포메이션과 주요 역할, 압박과 빌드업의 기본 원리를 이해하고 있습니다. 친구들과 축구 이야기할 때 쉽게 밀릴 수준은 아닙니다.",
    shareTemplate: "축잘알 퀴즈(전술편) {score}/10점, 동네 축잘알 ⚽ 너는 몇 점?",
  },
  {
    slug: "tactical-reader",
    name: "전술 좀 보는데?",
    icon: "👀",
    minScore: 5,
    maxScore: 6,
    summary: "선수만 보는 단계는 이미 지났습니다.",
    description: "경기를 볼 때 선수들의 위치와 팀 전체의 움직임까지 보기 시작한 수준입니다. 공이 없는 쪽의 폭과 수비라인의 반응도 자연스럽게 눈에 들어옵니다.",
    shareTemplate: "축잘알 퀴즈(전술편) {score}/10점, 전술 좀 보는데? 👀 너는 몇 점?",
  },
  {
    slug: "tactics-enthusiast",
    name: "전술 덕후",
    icon: "🧠",
    minScore: 7,
    maxScore: 8,
    summary: "포메이션 변화와 압박 구조까지 찾는 수준입니다.",
    description: "공을 가진 선수뿐 아니라 다음 패스와 제3자의 움직임을 함께 봅니다. 평범한 축구팬이라고 하기에는 이미 너무 많이 알고 있습니다.",
    shareTemplate: "축잘알 퀴즈(전술편) {score}/10점, 전술 덕후 🧠 너는 몇 점?",
  },
  {
    slug: "coach-login",
    name: "코치님?",
    icon: "📋",
    minScore: 9,
    maxScore: 9,
    summary: "경기 중 선수보다 전술판이 먼저 보이는 수준입니다.",
    description: "이 정도면 축구를 그냥 보는 사람이 아닙니다. 압박의 방향과 라인 사이 공간, 공을 잃은 뒤의 균형까지 거의 놓치지 않습니다.",
    shareTemplate: "축잘알 퀴즈(전술편) {score}/10점, 코치님? 📋 너는 몇 점?",
  },
  {
    slug: "manager-login",
    name: "감독님 로그인하세요",
    icon: "🏆",
    minScore: 10,
    maxScore: 10,
    summary: "10문제 전부 정답입니다.",
    description: "선수 움직임, 공간, 압박 구조까지 모두 읽어냈습니다. 이 정도면 다음 경기 선발 명단부터 고민해야 할 것 같습니다.",
    shareTemplate: "축잘알 퀴즈(전술편) 10/10점, 감독님 로그인하세요 🏆",
  },
];

export const footballTacticsTest: TestDefinition = {
  type: "quiz",
  slug: "football-tactics-test",
  title: "축잘알 퀴즈(전술편)",
  shortTitle: "축잘알 퀴즈(전술편)",
  cardTitle: "축구 전술, 얼마나 알고 있을까?",
  description: "포메이션부터 빌드업, 압박, 하프스페이스까지 10문제로 축구 전술 이해도를 확인해보세요.",
  category: "팬 퀴즈",
  duration: "약 4분",
  icon: "🧠⚽",
  thumbnail: "/tests/football-tactics.jpg",
  participants: 0,
  accent: "green",
  fanTheme: "yellow-pop",
  isNew: true,
  itemCount: 10,
  questions: [],
  resultSlugs: footballTacticsGradeProfiles.map((profile) => profile.slug),
  seoTitle: "축잘알 퀴즈(전술편) | 당신의 축구 전술 이해도는 몇 점?",
  seoDescription: "포메이션부터 빌드업, 압박, 하프스페이스까지. 10문제로 알아보는 나의 축구 전술 이해도 테스트입니다.",
  keywords: ["축잘알 퀴즈 전술편", "축잘알 퀴즈", "축잘알 테스트", "축구 전술 테스트", "축구 전술 퀴즈", "축구 퀴즈", "축구 지식 테스트", "축구 포메이션 퀴즈", "축구 전술 상식", "축구 지식 퀴즈"],
  seoContent: {
    heading: "축잘알 퀴즈(전술편)란?",
    paragraphs: [
      "축잘알 퀴즈(전술편)는 선수 이름이나 우승 기록을 맞히는 상식 퀴즈가 아니라, 경기에서 나타나는 포메이션과 역할, 공간, 압박 구조를 얼마나 이해하는지 확인하는 무료 축구 전술 테스트입니다.",
      "총 150문제의 문제은행 중 새로 추가한 최상위 LV.5 복합 상황형 30문제에서 매번 10문제가 랜덤으로 출제됩니다. 한 가지 전술 용어를 맞히는 방식이 아니라 상대 압박 구조, 선수 배치, 다음 패스와 공을 잃은 뒤의 위험까지 동시에 비교해야 하며, 모든 보기는 실제 경기에서 선택할 법한 대응으로 설계했습니다.",
      "빌드업과 압박 회피, 하프스페이스, 오버로드, 제3자 움직임, 인버티드 풀백, False 9, 레스트 디펜스와 경기 상황별 판단까지 폭넓게 다룹니다. 결과 화면에서는 틀린 문제의 정답과 전술 원리를 설명하는 해설을 함께 확인할 수 있습니다.",
      "문제의 용어와 원리는 FIFA Training Centre 및 UEFA Performance Analysis·Technical Reports의 공개 자료를 중심으로 검토했습니다. 특정 감독의 철학을 절대적인 정답으로 두지 않고, 문제에 제시된 조건에서 가장 명확한 전술 원리를 묻습니다.",
    ],
    faqs: [
      ["몇 문제가 출제되나요?", "총 150문제의 문제은행 가운데 LV.5 복합 상황형 30문제에서 10개의 최상위 난도 문제가 랜덤 출제됩니다."],
      ["문제는 다시 할 때 달라지나요?", "네. 매번 난이도별 문제를 무작위로 선택하며 최근에 풀었던 문제를 우선 제외해 새로운 조합이 나오도록 구성했습니다."],
      ["점수는 어떻게 계산하나요?", "난이도 가중치 없이 맞힌 문제 수를 그대로 계산해 0점부터 10점까지 표시합니다."],
      ["어떤 전술이 정답인지 논란이 생기지 않나요?", "상황형 문제에는 압박 방식, 선수 위치, 가능한 패스 조건을 구체적으로 제시하고 해당 조건에서 정답 하나가 분명하도록 검수했습니다."],
      ["틀린 문제의 해설도 볼 수 있나요?", "네. 결과 화면에서 내 답, 정답, 2~4문장의 전술 해설과 참고 자료 범주를 확인할 수 있습니다."],
    ],
    assesses: "축구 포메이션과 현대 축구 전술 이해도",
  },
};

export const getFootballTacticsQuestion = (id: string) => footballTacticsQuestions.find((question) => question.id === id);
export const getFootballTacticsGradeProfile = (slug: string) => footballTacticsGradeProfiles.find((profile) => profile.slug === slug);
