import type { ResultProfile, ResultSlug, TestDefinition } from "@/lib/types";
import { officeAnimalTest } from "@/data/office-animals";
import { marriageTimingTest } from "@/data/marriage-timing";
import { kkondaePowerTest } from "@/data/kkondae-power";
import { weekendFoodWorldcup } from "@/data/food-worldcup";
import { burnoutRiskTest } from "@/data/burnout-risk";
import { consumerStyleTest } from "@/data/consumer-style";
import { loveMbtiTest } from "@/data/love-mbti";
import { loverScoreTest } from "@/data/lover-score";
import { jealousyTest } from "@/data/jealousy-test";
import { menheraTest } from "@/data/menhera-test";
import { relationshipSatisfactionTest } from "@/data/relationship-satisfaction";
import { interpersonalAbilityTest } from "@/data/interpersonal-ability";
import { dailyFortuneTest } from "@/data/fortune-data";
import { attachmentStyleTest } from "@/data/attachment-style";
import { joseonDestinyTest } from "@/data/joseon-destiny";
import { personalityCountryTest } from "@/data/personality-country";
import { colorPersonalityTest } from "@/data/color-personality";
import { enneagramTest } from "@/data/enneagram";
import { eqTest } from "@/data/eq-test";
import { bigFiveTest } from "@/data/big-five";
import { footballQuizTest } from "@/data/football-quiz";
import { footballTacticsTest } from "@/data/football-tactics";
import { worldCupWinnerQuizTest } from "@/data/worldcup-winners";
import { reactionTimeTest } from "@/data/reaction-time";
import { mbtiTest } from "@/data/mbti";
import { sbtiTest } from "@/data/sbti";
import { stressTest } from "@/data/stress-test";
import { cvsTest } from "@/data/convenience-store";
import { snsTest } from "@/data/sns-type";
import { burgerTest } from "@/data/burger-brand";
import { wizardCharacterTest } from "@/data/wizard-character";
import { coffeeBrandTest } from "@/data/coffee-brand";
import { selfEsteemTest } from "@/data/self-esteem";
import { nameCompatibilityTest } from "@/data/name-compatibility";
import { adhdScreeningTest } from "@/data/adhd-screening";
import { dementiaRiskTest } from "@/data/dementia-risk";
import { loverFruitTest } from "@/data/lover-fruit";
import { arsenalFanTest } from "@/data/arsenal-fan";
import { youngtakFanTest } from "@/data/youngtak-fan";
import { youngtakSongQuizTest } from "@/data/youngtak-song-quiz";
import { limYoungWoongFanTest } from "@/data/limyoungwoong-fan";
import { limYoungWoongSongQuizTest } from "@/data/limyoungwoong-song-quiz";
import { tetoEgenTest } from "@/data/teto-egen";
import { btsFanTest } from "@/data/bts-fan";
import { fromis9FanTest } from "@/data/fromis9-fan";
import { mentalAgeTest } from "@/data/mental-age";
import { youngOldTest } from "@/data/young-old";
import { idealTypeTest } from "@/data/ideal-type";
import { seventeenFanTest } from "@/data/seventeen-fan";
import { strayKidsFanTest } from "@/data/stray-kids-fan";
import { manchesterUnitedFanTest } from "@/data/manchester-united-fan";
import { ateezFanTest } from "@/data/ateez-fan";
import { resceneFanTest } from "@/data/rescene-fan";
import { girlsGenerationFanTest } from "@/data/girls-generation-fan";
import { turnoverIntentionTest } from "@/data/turnover-intention";
import { jobStressTest } from "@/data/job-stress";
import { workaholicTest } from "@/data/workaholic";
import { egoResilienceTest } from "@/data/ego-resilience";
import { bigbangFanTest } from "@/data/bigbang-fan";
import { nctDreamFanTest } from "@/data/nct-dream-fan";
import { lionelMessiFanTest } from "@/data/lionel-messi-fan";
import { jungkookFanTest } from "@/data/jungkook-fan";
import { workPersonaTest } from "@/data/work-persona";

export const questions = [
  "나는 초기 자본이 거의 없어도 시작할 수 있는 부업을 선호한다.",
  "나는 사람을 직접 상대하는 일보다 온라인으로 혼자 하는 일이 더 편하다.",
  "나는 상품을 고르고 판매하는 과정에 흥미가 있다.",
  "나는 꾸준히 콘텐츠를 만들고 올리는 일을 할 수 있다.",
  "나는 글쓰기, 정리, 설명하는 일을 비교적 잘하는 편이다.",
  "나는 개발, 디자인, 엑셀, 노션 같은 디지털 도구를 다루는 데 거부감이 없다.",
  "나는 퇴근 후나 주말에 몸을 움직이는 부업도 괜찮다.",
  "나는 단기간에 현금 흐름이 생기는 부업을 선호한다.",
  "나는 장기적으로 자동화되거나 자산화될 수 있는 부업에 관심이 있다.",
  "나는 재고, 고객 문의, 배송 같은 운영 업무를 감당할 수 있다.",
  "나는 촬영, 편집, SNS 운영처럼 노출이 필요한 활동도 괜찮다.",
  "나는 공간, 장비, 계정 등 이미 활용 가능한 자원이 있다.",
].map((text, index) => ({ id: index + 1, text }));

const profile = (
  slug: ResultSlug,
  name: string,
  icon: string,
  tagline: string,
  vector: number[],
  details: Partial<ResultProfile> = {},
): ResultProfile => ({
  slug,
  name,
  icon,
  tagline,
  vector,
  reason: `${name}은(는) 현재 가진 강점과 선호하는 업무 방식의 균형이 잘 맞는 부업입니다.`,
  analysis: `혼자 몰입하는 시간과 실행력을 수익으로 연결할 가능성이 높습니다. 작은 실험으로 수요를 확인한 뒤 잘되는 방식을 반복해 보세요.`,
  difficulty: "보통",
  initialCost: "0~10만 원",
  monetizationSpeed: "1~3개월",
  pros: ["본업과 병행하기 좋음", "경험이 쌓일수록 효율이 높아짐", "작게 검증하고 확장 가능"],
  cons: ["초기 학습 시간이 필요함", "수익이 안정되기까지 편차가 있음"],
  firstSteps: ["주 5시간의 고정 작업 시간을 확보하세요.", "작은 결과물 하나를 7일 안에 완성하세요.", "첫 고객 또는 방문자의 반응을 기록하고 개선하세요."],
  platforms: ["네이버", "크몽", "인스타그램"],
  ...details,
});

// 각 배열의 순서는 12개 질문과 동일하며 -2(매우 비선호)~2(매우 적합)입니다.
export const resultProfiles: ResultProfile[] = [
  profile("blog", "블로그", "✍️", "글이 쌓일수록 단단해지는 콘텐츠 자산형", [2,2,0,2,2,1,-2,-1,2,-1,-1,0], { difficulty:"쉬움", initialCost:"0~5만 원", monetizationSpeed:"3~6개월", platforms:["네이버 블로그","워드프레스","티스토리"] }),
  profile("smart-store", "스마트스토어", "🛍️", "상품 감각을 매출로 바꾸는 온라인 셀러형", [0,1,2,1,0,1,-1,1,1,2,0,1], { initialCost:"10~100만 원", platforms:["네이버 스마트스토어","쿠팡","11번가"] }),
  profile("affiliate-marketing", "제휴마케팅", "🔗", "추천과 콘텐츠를 연결하는 성과형", [2,2,1,2,2,1,-2,0,2,-1,1,0], { difficulty:"쉬움", initialCost:"0~10만 원", platforms:["쿠팡파트너스","애드픽","링크프라이스"] }),
  profile("airbnb", "에어비앤비", "🏠", "공간과 환대를 수익화하는 운영형", [-1,-1,0,0,0,-1,1,1,1,2,0,2], { difficulty:"어려움", initialCost:"100만 원 이상", monetizationSpeed:"1~2개월", platforms:["에어비앤비","야놀자","여기어때"] }),
  profile("unmanned-store", "무인점포", "🏪", "입지와 운영 시스템을 설계하는 사업형", [-2,0,2,-1,-1,0,1,1,2,2,-1,2], { difficulty:"어려움", initialCost:"1,000만 원 이상", monetizationSpeed:"3~6개월", platforms:["네이버 플레이스","당근 비즈프로필","포스 솔루션"] }),
  profile("emoticon-creator", "이모티콘 제작", "🎨", "표현력을 디지털 상품으로 만드는 창작형", [2,2,-1,1,0,2,-2,-1,2,-2,1,0], { monetizationSpeed:"3~6개월", platforms:["카카오 이모티콘 스튜디오","OGQ마켓","라인 크리에이터스"] }),
  profile("youtube", "유튜브", "🎬", "영상으로 팬과 자산을 함께 만드는 크리에이터형", [1,0,-1,2,1,1,-1,-1,2,-1,2,1], { difficulty:"어려움", initialCost:"0~50만 원", monetizationSpeed:"6개월 이상", platforms:["유튜브","프리미어 프로","CapCut"] }),
  profile("tiktok", "틱톡", "📱", "짧고 빠른 콘텐츠 실험에 강한 트렌드형", [2,0,0,2,-1,1,0,0,1,-1,2,1], { initialCost:"0~10만 원", monetizationSpeed:"1~3개월", platforms:["틱톡","CapCut","인스타그램 릴스"] }),
  profile("app-development", "앱 개발", "📲", "문제를 제품으로 해결하는 디지털 빌더형", [1,2,-1,1,0,2,-2,-2,2,-2,-1,0], { difficulty:"어려움", monetizationSpeed:"3~6개월", platforms:["App Store","Google Play","Flutter"] }),
  profile("web-development", "웹 개발", "💻", "기술을 바로 가치로 연결하는 전문 서비스형", [2,2,-1,0,1,2,-2,1,1,-2,-1,0], { difficulty:"어려움", monetizationSpeed:"1~2개월", platforms:["크몽","숨고","위시켓"] }),
  profile("delivery-rider", "배달 라이더", "🛵", "움직인 만큼 빠르게 보상받는 실행형", [1,-1,-2,-2,-2,-1,2,2,-2,-1,-1,1], { difficulty:"쉬움", initialCost:"0~100만 원", monetizationSpeed:"1주 이내", platforms:["배민커넥트","쿠팡이츠 배달파트너","요기요 라이더"] }),
  profile("ebook", "전자책", "📘", "지식과 경험을 한 권의 자산으로 만드는 작가형", [2,2,-1,1,2,1,-2,-1,2,-2,-1,0], { initialCost:"0~5만 원", monetizationSpeed:"1~3개월", platforms:["크몽","탈잉","리디북스"] }),
  profile("online-class", "클래스 판매", "🧑‍🏫", "잘하는 일을 체계화해 가르치는 교육형", [1,0,-1,2,2,1,-1,-1,2,-1,2,1], { initialCost:"0~30만 원", monetizationSpeed:"3~6개월", platforms:["클래스101","탈잉","인프런"] }),
  profile("talent-market", "재능 판매", "🤝", "보유 기술로 가장 먼저 고객을 만나는 프리랜서형", [2,0,-1,-1,1,2,-1,2,0,-1,0,1], { monetizationSpeed:"1개월 이내", platforms:["크몽","숨고","오투잡"] }),
  profile("sns-monetization", "SNS 수익화", "💬", "관계와 취향을 브랜드로 키우는 소셜형", [2,0,0,2,1,1,-1,-1,2,-1,2,1], { monetizationSpeed:"3~6개월", platforms:["인스타그램","스레드","브런치스토리"] }),
  profile("secondhand-trading", "중고거래", "♻️", "주변의 숨은 가치를 빠르게 현금화하는 실속형", [2,-1,2,-1,-1,-1,1,2,-1,2,0,2], { difficulty:"쉬움", initialCost:"0원", monetizationSpeed:"1주 이내", platforms:["당근","중고나라","번개장터"] }),
  profile("reselling", "리셀", "👟", "시장 가격과 희소성을 읽는 거래형", [0,1,2,-1,-1,0,0,2,0,2,0,1], { initialCost:"50만 원 이상", monetizationSpeed:"1개월 이내", platforms:["KREAM","솔드아웃","번개장터"] }),
  profile("data-labeling", "데이터 라벨링", "🏷️", "정확성과 반복 집중력이 강한 온라인 작업형", [2,2,-2,-2,-1,1,-2,2,-2,-2,-2,0], { difficulty:"쉬움", initialCost:"0원", monetizationSpeed:"1개월 이내", platforms:["크라우드웍스","에이모","레이블러"] }),
  profile("part-time-job", "단기 알바", "⏱️", "정해진 시간에 확실한 수입을 만드는 현실형", [2,-1,-2,-2,-2,-2,2,2,-2,0,-1,0], { difficulty:"쉬움", initialCost:"0원", monetizationSpeed:"당일~1주", platforms:["알바몬","알바천국","당근알바"] }),
  profile("digital-template", "디지털 템플릿 판매", "🧩", "정리 능력을 반복 판매 가능한 상품으로 만드는 설계형", [2,2,0,1,2,2,-2,-1,2,-2,-1,0], { initialCost:"0~5만 원", monetizationSpeed:"1~3개월", platforms:["크몽","Gumroad","Notion 템플릿 갤러리"] }),
];

export const tests: TestDefinition[] = [limYoungWoongSongQuizTest, youngtakSongQuizTest, jungkookFanTest, lionelMessiFanTest, interpersonalAbilityTest, relationshipSatisfactionTest, egoResilienceTest, workaholicTest, {
  slug: "side-job-recommendation",
  title: "나에게 맞는 부업 추천 테스트",
  shortTitle: "부업 추천 테스트",
  description: "12개의 질문으로 나와 잘 맞는 부업을 찾아보세요.",
  category: "직업.일상",
  duration: "약 2분",
  icon: "✨",
  thumbnail: "/tests/side-job-recommendation.jpg",
  participants: 4382,
  accent: "blue",
  questions,
  resultSlugs: resultProfiles.map((item) => item.slug),
  seoTitle: "부업 추천 테스트 | 나에게 맞는 부업 찾기",
  seoDescription: "부업 추천 테스트로 나에게 맞는 부업을 찾아보세요. 초기 비용, 업무 성향, 콘텐츠 제작 적성까지 12개 질문으로 분석해 20가지 부업 중 가장 잘 맞는 부업을 추천하는 무료 테스트입니다.",
  keywords: ["부업 추천 테스트", "부업 추천", "부업 테스트", "직장인 부업", "재택 부업", "부업 찾기", "N잡 테스트", "투잡 추천", "무료 테스트"],
  seoContent: {
    heading: "부업 추천 테스트란?",
    paragraphs: [
      "부업 추천 테스트는 나의 성향과 상황에 맞는 부업을 찾아주는 무료 테스트입니다. 직장인 부업, 재택 부업, N잡에 관심은 있지만 무엇부터 시작할지 막막할 때, 12개의 O/X 질문만으로 나와 잘 맞는 부업 후보를 좁힐 수 있습니다.",
      "테스트는 초기 자본 여유, 혼자 하는 일과 사람을 상대하는 일 중 선호, 콘텐츠 제작 적성, 디지털 도구 활용 능력, 원하는 수익화 속도 등 12가지 기준으로 응답을 분석합니다. 블로그, 스마트스토어, 유튜브, 전자책, 재능 판매, 배달 라이더까지 실제로 많이 시작하는 20가지 부업과의 적합도를 비교해 가장 잘 맞는 부업을 추천합니다.",
      "결과에서는 추천 부업의 시작 난이도, 초기 비용, 예상 수익화 속도와 함께 장단점, 오늘 바로 시작하는 방법, 추천 플랫폼까지 안내합니다. 대표 추천 외에 함께 고려할 만한 후보 3개도 보여주므로, 나의 상황에 맞춰 여러 선택지를 비교해볼 수 있습니다.",
    ],
    faqs: [
      ["어떤 부업이 결과에 포함되나요?", "블로그, 스마트스토어, 제휴마케팅, 유튜브, 전자책, 재능 판매, 중고거래, 배달 라이더 등 초기 비용과 성격이 다른 20가지 부업이 포함되어 있습니다."],
      ["결과대로 하면 수익이 보장되나요?", "아니요. 결과는 성향 적합도를 기준으로 한 참고 정보이며, 실제 수익은 실행과 시장 상황에 따라 달라집니다."],
      ["부업 경험이 없어도 할 수 있나요?", "네. 오히려 처음 부업을 찾는 분들이 방향을 잡는 용도로 가장 적합하며, 결과 페이지의 첫 시작 방법부터 따라 하면 됩니다."],
    ],
    assesses: "부업 적합 성향과 업무 선호",
  },
}, jobStressTest, turnoverIntentionTest, workPersonaTest, nctDreamFanTest, bigbangFanTest, girlsGenerationFanTest, resceneFanTest, ateezFanTest, manchesterUnitedFanTest, strayKidsFanTest, seventeenFanTest, idealTypeTest, youngOldTest, mentalAgeTest, fromis9FanTest, btsFanTest, tetoEgenTest, limYoungWoongFanTest, youngtakFanTest, arsenalFanTest, footballTacticsTest, menheraTest, loverFruitTest, dementiaRiskTest, adhdScreeningTest, nameCompatibilityTest, selfEsteemTest, coffeeBrandTest, wizardCharacterTest, officeAnimalTest, marriageTimingTest, kkondaePowerTest, weekendFoodWorldcup, burnoutRiskTest, consumerStyleTest, loveMbtiTest, loverScoreTest, jealousyTest, attachmentStyleTest, joseonDestinyTest, personalityCountryTest, colorPersonalityTest, enneagramTest, eqTest, bigFiveTest, footballQuizTest, worldCupWinnerQuizTest, reactionTimeTest, mbtiTest, sbtiTest, stressTest, cvsTest, snsTest, burgerTest, dailyFortuneTest];

export const getTest = (slug: string) => tests.find((test) => test.slug === slug);
export const getResultProfile = (slug: string) => resultProfiles.find((item) => item.slug === slug);

// O/X 선택마다 모든 부업에 적용되는 명시적 가중치 테이블입니다.
export const questionWeights = questions.map((question, questionIndex) => ({
  questionId: question.id,
  weights: Object.fromEntries(
    resultProfiles.map((item) => [item.slug, {
      O: item.vector[questionIndex] + 2,
      X: -item.vector[questionIndex] + 2,
    }]),
  ) as Record<ResultSlug, { O: number; X: number }>,
}));
