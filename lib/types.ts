export type ResultSlug =
  | "blog"
  | "smart-store"
  | "affiliate-marketing"
  | "airbnb"
  | "unmanned-store"
  | "emoticon-creator"
  | "youtube"
  | "tiktok"
  | "app-development"
  | "web-development"
  | "delivery-rider"
  | "ebook"
  | "online-class"
  | "talent-market"
  | "sns-monetization"
  | "secondhand-trading"
  | "reselling"
  | "data-labeling"
  | "part-time-job"
  | "digital-template";

export type TestOption = { label: string; text: string; value: number };
export type TestQuestion = { id: number; text: string; options?: TestOption[] };

export type ResultProfile = {
  slug: ResultSlug;
  name: string;
  icon: string;
  tagline: string;
  reason: string;
  analysis: string;
  difficulty: "쉬움" | "보통" | "어려움";
  initialCost: string;
  monetizationSpeed: string;
  pros: string[];
  cons: string[];
  firstSteps: string[];
  platforms: string[];
  vector: number[];
};

export type TestSeoContent = {
  heading: string;
  paragraphs: string[];
  faqs: [question: string, answer: string][];
  /** Quiz JSON-LD의 assesses 값 (측정 대상 설명) */
  assesses?: string;
};

export type TestCategory = "성격.심리" | "연애.관계" | "직업.일상" | "팬 퀴즈" | "건강.운세";

export type FanQuizThemeId =
  | "purple-night"
  | "mint-stage"
  | "pink-ticket"
  | "blue-spotlight"
  | "yellow-pop"
  | "red-backstage";

export type TestDefinition = {
  type?: "quiz" | "worldcup" | "adaptive" | "likert" | "fortune" | "calculator";
  slug: string;
  href?: string;
  title: string;
  shortTitle: string;
  cardTitle?: string;
  description: string;
  category: TestCategory;
  duration: string;
  icon: string;
  /** 카드·랜딩 상단 썸네일 이미지 경로 (없으면 icon 이모지 사용) */
  thumbnail?: string;
  questions: TestQuestion[];
  resultSlugs: string[];
  seoTitle?: string;
  seoDescription?: string;
  /** 화면 제목과 분리해 점진적으로 적용하는 검색 메타데이터입니다. */
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
  keywords?: string[];
  seoContent?: TestSeoContent;
  /** 정적 콘텐츠 탐색용 메타데이터입니다. 값이 없어도 카테고리 기반 fallback이 동작합니다. */
  tags?: string[];
  relatedTests?: string[];
  relatedArticles?: string[];
  createdAt?: string;
  popularRank?: number;
  series?: string;
  disclaimer?: string;
  participants: number;
  accent: "blue" | "orange" | "pink" | "purple" | "green" | "indigo" | "teal";
  fanTheme?: FanQuizThemeId;
  isNew?: boolean;
  itemCount?: number;
};

export type FortuneCardId =
  | "start"
  | "chance"
  | "rest"
  | "love"
  | "focus"
  | "luck"
  | "change"
  | "growth"
  | "balance"
  | "courage";

export type FortuneGrade = "매우 좋음" | "좋음" | "은은한 행운" | "차분한 상승";

export type FortuneCard = {
  id: FortuneCardId;
  name: string;
  description: string;
  icon: string;
  symbol: string;
};

export type FortuneResult = {
  id: string;
  cardId: FortuneCardId;
  grade: FortuneGrade;
  score: number;
  total: string;
  money: string;
  love: string;
  work: string;
  caution: string;
  luckyColor: string;
  luckyNumber: number;
  luckyItem: string;
  message: string;
};

export type ScoredResult = ResultProfile & { score: number; percentage: number };

export type AnimalSlug =
  | "office-rat" | "office-ox" | "office-tiger" | "office-rabbit"
  | "office-dragon" | "office-snake" | "office-horse" | "office-sheep"
  | "office-monkey" | "office-rooster" | "office-dog" | "office-pig";

export type AnimalProfile = {
  slug: AnimalSlug;
  animal: string;
  emoji: string;
  alias: string;
  summary: string;
  traits: string[];
  workplaceScene: string;
  bossRelation: string;
  colleagueRelation: string;
  workStyle: string;
  strengths: string[];
  weaknesses: string[];
  roles: string[];
  famousCharacter: string;
};

export type ScoredAnimal = AnimalProfile & { score: number; percentage: number };

export type MarriageTendency =
  | "marriageIntent" | "relationshipReady" | "financialReady"
  | "careerPriority" | "independence" | "familyPressure"
  | "stability" | "romanticImpulse" | "cautiousness";

export type MarriageResultSlug =
  | "marriage-fast" | "marriage-stable-prep" | "marriage-career-first"
  | "marriage-free-romance" | "marriage-careful-decision" | "marriage-independent-life";

export type MarriageResultProfile = {
  slug: MarriageResultSlug;
  name: string;
  icon: string;
  summary: string;
  ageOffset?: [number, number];
  analysis: string;
  accelerators: string[];
  delays: string[];
  partnerType: string;
  preparations: string[];
};

export type MarriageScores = Record<MarriageTendency, number>;

export type KkondaeResultSlug = "kkondae-clean-zone" | "kkondae-signal" | "kkondae-latte" | "kkondae-pro-latte" | "kkondae-master";
export type KkondaeResultProfile = {
  slug: KkondaeResultSlug;
  name: string;
  icon: string;
  minScore: number;
  maxScore: number;
  summary: string;
  analysis: string;
  traits: string[];
  caution: string;
  phrases: string[];
  methods: string[];
  shareText: string;
};

export type FoodWorldcupItem = {
  slug: string;
  resultSlug: string;
  name: string;
  emoji: string;
  image: string;
  description: string;
  recommendation: string;
  deliveryTip: string;
  sides: string[];
  reasons: string[];
};

export type BurnoutDomain = "energy" | "emotional" | "disengagement" | "interpersonal" | "recovery";
export type BurnoutBranch = "energy" | "disengagement" | "interpersonal" | "recovery";
export type BurnoutQuestion = { id:string; text:string; domain:BurnoutDomain; reverse?:boolean };
export type BurnoutResultSlug = "burnout-stable" | "burnout-fatigue" | "burnout-caution" | "burnout-high-risk" | "burnout-intensive-recovery";
export type BurnoutResultProfile = {
  slug:BurnoutResultSlug;
  name:string;
  icon:string;
  minScore:number;
  maxScore:number;
  summary:string;
  description:string;
  baseGuides:string[];
};
export type BurnoutDomainScores = Record<BurnoutDomain, number>;

export type ConsumerDomain = "planning" | "impulsivity" | "experience" | "future" | "quality";
export type ConsumerQuestion = { id:string; text:string; domain:ConsumerDomain; reverse?:boolean };
export type ConsumerResultSlug = "consumer-investment-ready" | "consumer-value-explorer" | "consumer-experience-first" | "consumer-premium-seeker" | "consumer-flex" | "consumer-impulsive";
export type ConsumerDomainScores = Record<ConsumerDomain,number>;
export type ConsumerResultProfile = {
  slug:ConsumerResultSlug;
  name:string;
  icon:string;
  summary:string;
  description:string;
  strengths:string[];
  cautions:string[];
  recommendations:string[];
  typicalScores:ConsumerDomainScores;
};

export type LoveDomain = "stability" | "expression" | "leadership" | "independence" | "loveLanguage";
export type LoveLanguage = "words" | "time" | "gifts" | "acts" | "touch";
export type LoveQuestion = { id:string; text:string; domain:LoveDomain; reverse?:boolean; loveLanguage?:LoveLanguage };
export type LoveResultSlug = "love-gentle-secure" | "love-passionate-direct" | "love-devoted-carer" | "love-free-independent" | "love-thrill-seeker" | "love-careful-observer" | "love-emotional-immersive" | "love-tsundere-avoidant";
export type LoveDomainScores = Record<LoveDomain,number>;
export type LoveLanguageScores = Record<LoveLanguage,number>;
export type LoveResultProfile = {
  slug:LoveResultSlug;
  name:string;
  icon:string;
  summary:string;
  description:string;
  relationshipStyle:string;
  traits:string[];
  strengths:string[];
  cautions:string[];
  idealPartner:string;
  relationshipNeed:string;
  relationshipGift:string;
  conflictPattern:string;
  typicalScores:LoveDomainScores;
  typicalLanguage:LoveLanguage;
};

export type AttachmentDomain = "anxiety" | "avoidance";
export type AttachmentQuestion = { id:string; text:string; domain:AttachmentDomain; reverse?:boolean };
export type AttachmentResultSlug = "attachment-secure" | "attachment-anxious" | "attachment-avoidant" | "attachment-fearful";
export type AttachmentAxisScores = Record<AttachmentDomain,number>;
export type AttachmentResultProfile = {
  slug:AttachmentResultSlug;
  name:string;
  icon:string;
  summary:string;
  description:string;
  strengths:string[];
  cautions:string[];
  tips:string[];
  goodFit:string;
  watchPattern:string;
  matrixLabel:string;
  shareText:string;
};

export type JoseonTrait = "leadership" | "intelligence" | "creativity" | "adventure" | "empathy" | "practicality";
export type JoseonScores = Record<JoseonTrait, number>;
export type JoseonQuestion = { id:number; text:string; options:TestOption[]; weights:[Partial<JoseonScores>, Partial<JoseonScores>] };
export type JoseonResultProfile = {
  slug:string;
  name:string;
  icon:string;
  summary:string;
  personality:string;
  joseonLife:string;
  modernJobs:string[];
  famousComparison:string;
  shareText:string;
  targetScores:JoseonScores;
};

export type CountryTrait = "openness" | "structure" | "socialEnergy" | "independence" | "nature" | "ambition" | "culture" | "safety";
export type CountryScores = Record<CountryTrait, number>;
export type CountryQuestion = { id:number; text:string; options:TestOption[]; weights:[Partial<CountryScores>, Partial<CountryScores>] };
export type CountryResultProfile = {
  slug:string;
  country:string;
  flag:string;
  summary:string;
  personality:string;
  matchReason:string;
  lifestyle:string;
  keywords:string[];
  similarCountries:string[];
  shareText:string;
  targetScores:CountryScores;
};

export type LoverTrait =
  | "care"        // 배려심
  | "responsibility" // 책임감
  | "expression"  // 표현력
  | "stability"   // 안정감
  | "conflict"    // 갈등해결력
  | "independence"// 독립성
  | "humor"       // 유머감각
  | "trust";      // 신뢰도

export type LoverScores = Record<LoverTrait, number>;
export type LoverQuestion = { id:number; text:string; options:TestOption[]; weights:[Partial<LoverScores>, Partial<LoverScores>] };
export type LoverResultSlug =
  | "lover-perfect-partner"          // 98점 완벽한 애인감
  | "lover-marriage-material"        // 95점 결혼까지 생각나는 타입
  | "lover-reliable-partner"         // 92점 믿고 기대고 싶은 타입
  | "lover-exciting-heartflutter"    // 89점 설렘을 잘 주는 타입
  | "lover-warm-but-awkward"         // 86점 다정하지만 표현이 서툰 타입
  | "lover-comfy-friendlike"         // 83점 친구 같은 편안한 타입
  | "lover-free-relationship"        // 80점 자유로운 연애 타입
  | "lover-slow-to-open"             // 77점 천천히 가까워지는 타입
  | "lover-push-pull-charm"          // 74점 매력은 있지만 밀당이 있는 타입
  | "lover-solo-time-important"      // 71점 혼자만의 시간이 중요한 타입
  | "lover-needs-expression-practice"// 68점 감정 표현 연습이 필요한 타입
  | "lover-growing-potential";       // 65점 연애 성장 가능성이 큰 타입

export type LoverResultProfile = {
  slug:LoverResultSlug;
  name:string;
  scoreLabel:string;
  icon:string;
  summary:string;
  description:string;
  reason:string;
  strengths:string[];
  cautions:string[];
  idealPartner:string;
  goodMatchTypes:string[];
  shareTextTemplate:string;
  typicalScores:LoverScores;
};

export type ColorPersonalityTrait = "extraversion" | "planning" | "emotion" | "empathy" | "challenge" | "stability" | "creativity" | "independence" | "realism" | "intuition";
export type ColorPersonalityScores = Record<ColorPersonalityTrait, number>;
export type ColorPersonalitySlug = "red" | "blue" | "green" | "yellow" | "purple" | "pink" | "orange" | "black" | "white" | "brown" | "turquoise" | "navy" | "gold" | "silver" | "lavender" | "rainbow";
export type ColorPersonalityQuestion = { id:number; text:string; options:TestOption[]; weights:[Partial<Record<ColorPersonalitySlug, number>>, Partial<Record<ColorPersonalitySlug, number>>] };
export type ColorPersonalityProfile = {
  slug:ColorPersonalitySlug;
  colorName:string;
  englishName:string;
  typeName:string;
  emoji:string;
  hex:string;
  gradient:string;
  summary:string;
  description:string;
  strengths:string[];
  cautions:string[];
  relationshipStyle:string;
  loveStyle:string;
  stressStyle:string;
  careerStyle:string;
  goodMatches:ColorPersonalitySlug[];
  difficultMatches:ColorPersonalitySlug[];
  shareText:string;
  traitScores:ColorPersonalityScores;
};

export type EnneagramTypeKey = "type1" | "type2" | "type3" | "type4" | "type5" | "type6" | "type7" | "type8" | "type9";
export type EnneagramScores = Record<EnneagramTypeKey, number>;
export type EnneagramResultSlug = "type-1" | "type-2" | "type-3" | "type-4" | "type-5" | "type-6" | "type-7" | "type-8" | "type-9";
export type EnneagramQuestion = { id:number; text:string; options:TestOption[]; weights:Partial<EnneagramScores>[] };
export type EnneagramProfile = {
  slug:EnneagramResultSlug;
  typeKey:EnneagramTypeKey;
  number:number;
  name:string;
  icon:string;
  keywords:string[];
  desire:string;
  fear:string;
  summary:string;
  description:string;
  strengths:string[];
  caution:string;
  relationshipStyle:string;
  goodMatches:EnneagramResultSlug[];
  growthTip:string;
  shareText:string;
};

export type EqDomain = "selfAwareness" | "selfRegulation" | "empathy" | "socialSkills" | "resilience";
export type EqDomainScores = Record<EqDomain, number>;
export type EqQuestion = { id:number; text:string; domain:EqDomain; options:TestOption[] };
export type EqResultSlug = "eq-master" | "eq-empathy-leader" | "eq-balanced-realist" | "eq-growth" | "eq-potential";
export type EqResultProfile = {
  slug:EqResultSlug;
  name:string;
  icon:string;
  minPercent:number;
  maxPercent:number;
  summary:string;
  description:string;
  traits:string[];
  strengths:string[];
  growthTips:string[];
  recommendedActions:string[];
};

export type BigFiveDomain = "openness" | "conscientiousness" | "extraversion" | "agreeableness" | "neuroticism";
export type BigFiveScores = Record<BigFiveDomain, number>;
export type BigFiveQuestion = { id:number; text:string; domain:BigFiveDomain; reverse?:boolean; options:TestOption[] };
export type BigFiveResultSlug = "big-five-open-explorer" | "big-five-steady-planner" | "big-five-social-spark" | "big-five-warm-harmonizer" | "big-five-sensitive-insight";
export type BigFiveResultProfile = {
  slug:BigFiveResultSlug;
  domain:BigFiveDomain;
  name:string;
  icon:string;
  summary:string;
  description:string;
  strengths:string[];
  cautions:string[];
  workStyle:string;
  relationshipStyle:string;
  loveStyle:string;
  stressStyle:string;
  growthPoints:string[];
};

export type FootballQuizDifficulty = "easy" | "medium" | "hard";
export type FootballQuizCategory =
  | "player" | "worldcup" | "championsleague" | "premierleague"
  | "laliga" | "seriea" | "bundesliga" | "history" | "coach" | "transfer" | "record";
export type FootballQuizQuestion = {
  id: string;
  difficulty: FootballQuizDifficulty;
  category: FootballQuizCategory;
  question: string;
  choices: string[];
  correctAnswer: number;
  explanation: string;
};
export type FootballQuizAnswer = { questionId: string; choice: number };
export type FootballGradeSlug = "football-beginner" | "football-casual" | "football-sprout" | "football-expert" | "football-god";
export type FootballGradeProfile = {
  slug: FootballGradeSlug;
  name: string;
  icon: string;
  minScore: number;
  maxScore: number;
  summary: string;
  description: string;
  comment: string;
  shareTemplate: string;
};

export type WorldCupWinnerQuestion = {
  id: string;
  year: number;
  host: string;
  winner: string;
  semifinalists: [string, string, string, string];
  answerIndex: number;
  final: string;
  note?: string;
};
export type WorldCupWinnerAnswer = { questionId: string; choice: number };
export type WorldCupWinnerGradeSlug =
  | "worldcup-legend"
  | "worldcup-historian"
  | "worldcup-fan"
  | "worldcup-casual"
  | "worldcup-rookie";
export type WorldCupWinnerGradeProfile = {
  slug: WorldCupWinnerGradeSlug;
  name: string;
  icon: string;
  minScore: number;
  maxScore: number;
  summary: string;
  description: string;
  comment: string;
  shareTemplate: string;
};

export type ReactionGradeSlug =
  | "reaction-lightning" | "reaction-progamer" | "reaction-eagle" | "reaction-athlete"
  | "reaction-above-average" | "reaction-average" | "reaction-relaxed" | "reaction-sloth";
export type ReactionGradeProfile = {
  slug: ReactionGradeSlug;
  name: string;
  icon: string;
  minMs: number;
  maxMs: number;
  summary: string;
  description: string;
};

export type MbtiAxis = "EI" | "SN" | "TF" | "JP";
export type MbtiLetter = "E" | "I" | "S" | "N" | "T" | "F" | "J" | "P";
export type MbtiQuestion = {
  id: number;
  axis: MbtiAxis;
  text: string;
  options: [{ text: string; letter: MbtiLetter }, { text: string; letter: MbtiLetter }];
};
export type MbtiTypeProfile = {
  code: string;
  slug: string;
  name: string;
  icon: string;
  tagline: string;
  description: string[];
  strengths: string[];
  cautions: string[];
  careers: string[];
  relationshipTip: string;
  shareText: string;
};

// SBTI: 5개 모델 × 15개 차원, 각 차원은 L/M/H 3단계로 평가됩니다.
export type SbtiDimensionKey =
  | "sociability" | "nunchi" | "meddling"          // 사회 모델
  | "tension" | "stamina" | "recovery"             // 에너지 모델
  | "mental" | "selfEsteem" | "hyunta"             // 멘탈 모델
  | "desire" | "appetite" | "approval"             // 욕망 모델
  | "lifeSkill" | "planning" | "endurance";        // 생존 모델
export type SbtiLevel = "L" | "M" | "H";
export type SbtiLevels = Record<SbtiDimensionKey, SbtiLevel>;
export type SbtiQuestion = {
  id: number;
  text: string;
  options: { text: string; weights: Partial<Record<SbtiDimensionKey, number>>; drunk?: boolean }[];
};
export type SbtiTypeProfile = {
  slug: string;
  code: string;
  name: string;
  icon: string;
  summary: string;
  description: string;
  traits: string[];
  shareText: string;
  targets: SbtiLevels;
  /** hidden: 특정 응답 조합에서만 등장, fallback: 매칭도 60% 미만일 때 배정 */
  special?: "hidden" | "fallback";
};

export type StressQuestion = {
  id: number;
  text: string;
  /** true면 역채점 문항 (4 - 응답값) */
  reverse?: boolean;
};
export type StressGradeSlug = "stress-low" | "stress-moderate" | "stress-high";
export type StressGradeProfile = {
  slug: StressGradeSlug;
  name: string;
  icon: string;
  minScore: number;
  maxScore: number;
  summary: string;
  description: string;
  signals: string[];
  tips: string[];
  shareText: string;
};

export type JealousyDomain = "relationshipAnxiety" | "comparisonSensitivity" | "reassuranceNeed" | "emotionRegulation" | "trustFlexibility";
export type JealousyQuestion = {
  id: number;
  text: string;
  domain: JealousyDomain;
  options: { value: number; label: string }[];
};
export type JealousyDomainScores = Record<JealousyDomain, number>;
export type JealousyGradeSlug =
  | "jealousy-secure"
  | "jealousy-light"
  | "jealousy-alert"
  | "jealousy-sensitive"
  | "jealousy-intensive";
export type JealousyGradeProfile = {
  slug: JealousyGradeSlug;
  name: string;
  icon: string;
  minScore: number;
  maxScore: number;
  summary: string;
  description: string;
  strengths: string[];
  cautions: string[];
  tips: string[];
  communicationScripts: string[];
  shareText: string;
};

export type RelationshipDimension =
  | "emotional_intimacy"
  | "communication_conflict"
  | "trust_respect"
  | "reciprocity_daily_fit"
  | "support_future_satisfaction";
export type RelationshipQuestion = {
  id: number;
  text: string;
  dimension: RelationshipDimension;
  reverseScored: boolean;
  options: { text: string; score: number }[];
};
export type RelationshipDimensionScores = Record<RelationshipDimension, number>;
export type RelationshipResultSlug =
  | "relationship-signal-check"
  | "relationship-reconnect-ready"
  | "relationship-growth-adjusting"
  | "relationship-comfort-stable"
  | "relationship-deep-partner";
export type RelationshipResultProfile = {
  slug: RelationshipResultSlug;
  title: string;
  icon: string;
  minScore: number;
  maxScore: number;
  summary: string;
  description: string;
  strengths: string[];
  cautions: string[];
  recommendations: string[];
  image: string;
  shareText: string;
};
export type RelationshipDimensionGuide = {
  key: RelationshipDimension;
  title: string;
  description: string;
  recommendations: string[];
};

export type InterpersonalDimension =
  | "empathy_understanding"
  | "self_expression"
  | "relationship_reciprocity"
  | "conflict_repair";
export type InterpersonalQuestion = {
  id: number;
  text: string;
  dimension: InterpersonalDimension;
  reverseScored: boolean;
  options: { text: string; score: number }[];
};
export type InterpersonalDimensionScores = Record<InterpersonalDimension, number>;
export type InterpersonalResultSlug =
  | "interpersonal-ready"
  | "interpersonal-careful-connector"
  | "interpersonal-situational-growth"
  | "interpersonal-flexible-communicator"
  | "interpersonal-trust-coordinator";
export type InterpersonalResultProfile = {
  slug: InterpersonalResultSlug;
  title: string;
  icon: string;
  minScore: number;
  maxScore: number;
  summary: string;
  description: string;
  strengths: string[];
  cautions: string[];
  recommendations: string[];
  image: string;
  shareText: string;
};
export type InterpersonalDimensionGuide = {
  key: InterpersonalDimension;
  title: string;
  description: string;
  recommendations: string[];
};

export type WizardCharacterTrait =
  | "courage"
  | "wisdom"
  | "leadership"
  | "friendship"
  | "loyalty"
  | "creativity"
  | "independence"
  | "ambition"
  | "responsibility"
  | "empathy"
  | "action"
  | "analysis";
export type WizardCharacterScores = Record<WizardCharacterTrait, number>;
export type WizardCharacterQuestion = {
  id: number;
  text: string;
  options: {
    label: string;
    text: string;
    value: number;
    weights: Partial<WizardCharacterScores>;
  }[];
};
export type WizardCharacterProfile = {
  slug: string;
  name: string;
  koreanName: string;
  symbol: string;
  palette: [string, string];
  summary: string;
  description: string;
  strengths: string[];
  cautions: string[];
  goodMatches: string[];
  difficultMatch: string;
  coreTraits: WizardCharacterTrait[];
  targetScores: WizardCharacterScores;
  shareText: string;
};

export type CoffeeBrandTrait =
  | "trendy"
  | "emotion"
  | "practicality"
  | "rationality"
  | "leisure"
  | "activity"
  | "independence"
  | "sociability"
  | "challenge"
  | "stability"
  | "creativity"
  | "premium";
export type CoffeeBrandScores = Record<CoffeeBrandTrait, number>;
export type CoffeeBrandQuestion = {
  id: number;
  text: string;
  options: {
    label: string;
    text: string;
    value: number;
    weights: Partial<CoffeeBrandScores>;
  }[];
};
export type CoffeeBrandProfile = {
  slug: string;
  name: string;
  symbol: string;
  palette: [string, string];
  summary: string;
  description: string;
  matchReason: string;
  strengths: string[];
  cautions: string[];
  menus: string[];
  goodMatches: string[];
  oppositeMatch: string;
  coreTraits: CoffeeBrandTrait[];
  targetScores: CoffeeBrandScores;
  shareText: string;
};

export type LoverFruitTrait =
  | "affection"
  | "stability"
  | "independence"
  | "consideration"
  | "humor"
  | "sensitivity"
  | "leadership"
  | "adventure"
  | "responsibility"
  | "romance"
  | "sociability"
  | "honesty";
export type LoverFruitScores = Record<LoverFruitTrait, number>;
export type LoverFruitQuestion = {
  id: number;
  text: string;
  options: {
    label: string;
    text: string;
    value: number;
    weights: Partial<LoverFruitScores>;
  }[];
};
export type LoverFruitProfile = {
  slug: string;
  name: string;
  emoji: string;
  palette: [string, string];
  title: string;
  summary: string;
  description: string;
  loveStyle: string[];
  strengths: string[];
  conflictStyle: string;
  tips: string[];
  goodMatches: string[];
  difficultMatch: string;
  difficultLabel: string;
  coreTraits: LoverFruitTrait[];
  targetScores: LoverFruitScores;
  answerPattern: number[];
  shareText: string;
};

export type ArsenalQuestionCategory =
  | "history"
  | "stadium"
  | "manager"
  | "player"
  | "honours"
  | "match"
  | "rivalry"
  | "europe"
  | "culture";
export type ArsenalQuestionDifficulty = "easy" | "medium" | "hard";
export type ArsenalQuizQuestion = {
  id: string;
  category: ArsenalQuestionCategory;
  difficulty: ArsenalQuestionDifficulty;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  sourceName: string;
  sourceUrl: string;
  verifiedAt: string;
  isTimeSensitive: boolean;
  referenceSeason?: string;
  kind?: "match-score" | "current-season" | "standard";
};
export type ArsenalPresentedQuestion = Omit<ArsenalQuizQuestion, "options" | "correctAnswer"> & {
  options: string[];
  correctAnswer: number;
  originalId: string;
  optionOrder: number[];
};
export type ArsenalFanGradeProfile = {
  slug: string;
  minScore: number;
  maxScore: number;
  title: string;
  subtitle: string;
  description: string;
  strengths: string[];
  shareText: string;
};
export type ArsenalFanAnswer = {
  questionId: string;
  choice: number;
};
export type ArsenalDifficultyStats = {
  easyCorrect: number;
  mediumCorrect: number;
  hardCorrect: number;
};

export type YoungtakQuestionCategory =
  | "profile"
  | "early-music"
  | "trot-transition"
  | "discography"
  | "songs"
  | "release-order"
  | "broadcast"
  | "competition"
  | "concert"
  | "production"
  | "collaboration"
  | "official-content"
  | "acting"
  | "fandom"
  | "interview-activity"
  | "awards"
  | "song-album-link"
  | "title-distinction";
export type YoungtakQuestionDifficulty = "easy" | "medium" | "hard" | "expert";
export type YoungtakQuizQuestion = {
  id: string;
  category: YoungtakQuestionCategory;
  difficulty: YoungtakQuestionDifficulty;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  sourceTitle: string;
  sourceUrl: string;
  secondarySourceTitle: string;
  secondarySourceUrl: string;
  verifiedAt: string;
  isTimeSensitive: boolean;
  factCheckNote: string;
};
export type YoungtakPresentedQuestion = Omit<YoungtakQuizQuestion, "options" | "correctAnswer"> & {
  options: string[];
  correctAnswer: number;
  originalId: string;
  optionOrder: number[];
};
export type YoungtakFanGradeProfile = {
  slug: string;
  minScore: number;
  maxScore: number;
  title: string;
  summary: string;
  description: string;
  traits: string[];
  recommendations: string[];
  shareTexts: string[];
};
export type YoungtakFanAnswer = {
  questionId: string;
  choice: number;
};

// 팬 지식 퀴즈는 동일한 검증/출제 구조를 공유하되, 테스트별 데이터와
// 결과 라우트는 독립적으로 관리합니다.
export type LimYoungWoongQuestionCategory = YoungtakQuestionCategory;
export type LimYoungWoongQuestionDifficulty = YoungtakQuestionDifficulty;
export type LimYoungWoongQuizQuestion = Omit<YoungtakQuizQuestion, "category" | "difficulty"> & {
  category: LimYoungWoongQuestionCategory;
  difficulty: LimYoungWoongQuestionDifficulty;
};
export type LimYoungWoongPresentedQuestion = Omit<LimYoungWoongQuizQuestion, "options" | "correctAnswer"> & {
  options: string[];
  correctAnswer: number;
  originalId: string;
  optionOrder: number[];
};
export type LimYoungWoongFanGradeProfile = YoungtakFanGradeProfile;
export type LimYoungWoongFanAnswer = YoungtakFanAnswer;

export type SelfEsteemDomain =
  | "selfAcceptance"
  | "selfEfficacy"
  | "socialComparison"
  | "resilience"
  | "evaluationSensitivity"
  | "selfConfidence"
  | "emotionalStability"
  | "selfCompassion";
export type SelfEsteemDomainScores = Record<SelfEsteemDomain, number>;
export type SelfEsteemQuestion = {
  id: number;
  text: string;
  options: {
    label: string;
    text: string;
    value: number;
    weights: Partial<SelfEsteemDomainScores>;
  }[];
};
export type SelfEsteemLevelSlug =
  | "self-esteem-recharge"
  | "self-esteem-shaky"
  | "self-esteem-growing"
  | "self-esteem-healthy"
  | "self-esteem-very-healthy"
  | "self-esteem-solid";
export type SelfEsteemLevelProfile = {
  slug: SelfEsteemLevelSlug;
  level: number;
  name: string;
  icon: string;
  palette: [string, string];
  minScore: number;
  maxScore: number;
  summary: string;
  description: string;
  strengths: string[];
  cautions: string[];
  tips: string[];
};

// 편의점 성격 테스트: 12가지 내부 성향
export type CvsTrait =
  | "realism" | "emotion" | "planning" | "spontaneity"
  | "extraversion" | "introversion" | "curiosity" | "adventure"
  | "stability" | "optimism" | "creativity" | "empathy";
export type CvsScores = Record<CvsTrait, number>;
export type CvsQuestion = {
  id: number;
  text: string;
  options: { emoji: string; text: string; weights: Partial<CvsScores> }[];
};
export type CvsResultProfile = {
  slug: string;
  name: string;
  icon: string;
  summary: string;
  analysis: string;
  strengths: string[];
  cautions: string[];
  goodMatch: string;
  combo: { emoji: string; name: string }[];
  shareText: string;
  targets: CvsScores;
};

// SNS 유형 테스트: 16가지 내부 성향
export type SnsTrait =
  | "expression" | "extraversion" | "introversion" | "empathy"
  | "archiving" | "trend" | "humor" | "privacy"
  | "friendliness" | "spontaneity" | "planning" | "leadership"
  | "research" | "creativity" | "consuming" | "producing";
export type SnsScores = Record<SnsTrait, number>;
export type SnsQuestion = {
  id: number;
  text: string;
  options: { emoji: string; text: string; weights: Partial<SnsScores> }[];
};
export type SnsResultProfile = {
  slug: string;
  name: string;
  icon: string;
  summary: string;
  analysis: string;
  behaviors: string[];
  strengths: string[];
  cautions: string[];
  goodMatch: string;
  contentStyles: string[];
  platforms: string[];
  shareText: string;
  targets: SnsScores;
};

// 햄버거 브랜드 테스트: 12가지 내부 성향
export type BurgerTrait =
  | "trendy" | "premium" | "value" | "stability"
  | "activity" | "emotion" | "friendliness" | "challenge"
  | "creativity" | "practicality" | "uniqueness" | "leadership";
export type BurgerScores = Record<BurgerTrait, number>;
export type BurgerQuestion = {
  id: number;
  text: string;
  options: { emoji: string; text: string; weights: Partial<BurgerScores> }[];
};
export type BurgerBrandProfile = {
  slug: string;
  name: string;
  icon: string;
  tagline: string;
  summary: string;
  reason: string;
  strengths: string[];
  cautions: string[];
  menus: string[];
  /** 결과 그래프에 표시할 6개 핵심 성향 */
  keyTraits: BurgerTrait[];
  goodMatches: string[];
  opposite: string;
  shareText: string;
  targets: BurgerScores;
};

// 임영웅 팬 퀴즈 (영탁 팬 퀴즈와 동일한 구조)
export type LimYoungwoongQuestionCategory =
  | "profile" | "competition" | "songs" | "discography" | "ost" | "concert"
  | "fandom" | "broadcast" | "production" | "official-content"
  | "song-album-link" | "release-order" | "title-distinction";
export type LimYoungwoongQuestionDifficulty = "easy" | "medium" | "hard" | "expert";
export type LimYoungwoongQuizQuestion = {
  id: string;
  category: LimYoungwoongQuestionCategory;
  difficulty: LimYoungwoongQuestionDifficulty;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  sourceTitle: string;
  sourceUrl: string;
  secondarySourceTitle: string;
  secondarySourceUrl: string;
  verifiedAt: string;
  isTimeSensitive: boolean;
  factCheckNote: string;
};
export type LimYoungwoongPresentedQuestion = Omit<LimYoungwoongQuizQuestion, "options" | "correctAnswer"> & {
  originalId: string;
  options: string[];
  correctAnswer: number;
  optionOrder: number[];
};
export type LimYoungwoongFanGradeProfile = {
  slug: string;
  minScore: number;
  maxScore: number;
  title: string;
  summary: string;
  description: string;
  traits: string[];
  recommendations: string[];
  shareTexts: string[];
};
export type LimYoungwoongFanAnswer = {
  questionId: string;
  choice: number;
};

export type BtsQuestionDifficulty = "easy" | "medium" | "hard";
export type BtsQuestionCategory =
  | "멤버" | "데뷔" | "음반" | "타이틀곡" | "수록곡" | "뮤직비디오"
  | "콘서트" | "FESTA" | "RUN BTS" | "Bon Voyage" | "팬덤" | "BT21"
  | "Billboard" | "Guinness" | "Grammy" | "MAMA" | "MMA" | "수상 기록"
  | "협업" | "솔로 활동" | "SNS" | "공식 콘텐츠" | "활동 연도" | "기록" | "퍼포먼스";
export type BtsQuizQuestion = {
  id: string;
  difficulty: BtsQuestionDifficulty;
  category: BtsQuestionCategory;
  question: string;
  choices: string[];
  correctAnswer: number;
  explanation: string;
  /** 사실 검증에 사용한 공식 출처 (내부 관리용) */
  source: string;
};
export type BtsPresentedQuestion = BtsQuizQuestion & {
  originalId: string;
  /** 화면 표시 순서 → 원본 choices 인덱스 */
  optionOrder: number[];
};
export type BtsFanAnswer = {
  questionId: string;
  choice: number;
};
export type BtsFanGradeProfile = {
  slug: string;
  minScore: number;
  maxScore: number;
  name: string;
  icon: string;
  subtitle: string;
  description: string;
  recommendation: string;
  shareText: string;
};

export type Fromis9QuestionDifficulty = "easy" | "medium" | "hard";
export type Fromis9QuestionCategory =
  | "멤버" | "그룹명" | "팬덤" | "데뷔" | "음반" | "타이틀곡" | "수록곡"
  | "음악방송" | "콘서트" | "공식 콘텐츠" | "예능" | "활동 연도"
  | "수상" | "기록" | "멤버 활동" | "기타 공식 정보";
export type Fromis9QuizQuestion = {
  id: string;
  difficulty: Fromis9QuestionDifficulty;
  category: Fromis9QuestionCategory;
  question: string;
  choices: string[];
  correctAnswer: number;
  explanation: string;
  /** 사실 검증에 사용한 공식 출처 (내부 관리용) */
  source: string;
};
export type Fromis9PresentedQuestion = Fromis9QuizQuestion & {
  originalId: string;
  /** 화면 표시 순서 → 원본 choices 인덱스 */
  optionOrder: number[];
};
export type Fromis9FanAnswer = {
  questionId: string;
  choice: number;
};
export type Fromis9FanGradeProfile = {
  slug: string;
  minScore: number;
  maxScore: number;
  name: string;
  icon: string;
  subtitle: string;
  description: string;
  recommendation: string;
  shareText: string;
};

export type TetoEgenDifficulty = "easy" | "medium" | "hard";
export type TetoEgenQuestionCategory =
  | "decision"
  | "relationship"
  | "emotion"
  | "conflict"
  | "planning"
  | "behavior";
export type TetoEgenAnswerOption = {
  label: string;
  tetoScore: number;
  egenScore: number;
};
export type TetoEgenQuestion = {
  id: string;
  question: string;
  difficulty: TetoEgenDifficulty;
  category: TetoEgenQuestionCategory;
  /** 난이도별 가중치. 최종 점수 = (tetoScore | egenScore) × weight */
  weight: number;
  answers: TetoEgenAnswerOption[];
};
export type TetoEgenPresentedQuestion = TetoEgenQuestion & {
  originalId: string;
  /** 화면에 표시된 순서 → 원본 answers 인덱스 */
  optionOrder: number[];
};
export type TetoEgenAnswer = {
  questionId: string;
  choice: number;
};
export type TetoEgenResultSlug =
  | "pure-teto"
  | "strong-teto"
  | "teto-lean"
  | "balance-teto"
  | "perfect-balance"
  | "balance-egen"
  | "egen-lean"
  | "pure-egen";
export type TetoEgenResultProfile = {
  slug: TetoEgenResultSlug;
  name: string;
  icon: string;
  /** 테토력(%) 기준 구간 */
  minTeto: number;
  maxTeto: number;
  summary: string;
  oneLiner: string;
  personality: string;
  perception: string;
  love: string;
  friendship: string;
  work: string;
  stress: string;
  strengths: string[];
  weaknesses: string[];
  goodMatch: string;
  oppositeChemistry: string;
  growth: string;
  shareText: string;
};
