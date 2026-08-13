import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { TestSeoContent } from "@/components/seo/TestSeoContent";
import { TestRunner } from "@/components/test/TestRunner";
import { AgeStartForm } from "@/components/test/AgeStartForm";
import { getTest, tests } from "@/data/tests";
import { absoluteUrl, createMetadata, siteConfig } from "@/lib/site";
import { getTestCanonicalPath, getTestSeoDescription, getTestSeoKeywords, getTestSeoTitle } from "@/lib/test-seo";
import { parseCurrentAge } from "@/lib/marriage-engine";
import { WorldcupIntro } from "@/components/worldcup/WorldcupIntro";
import { WorldcupGame } from "@/components/worldcup/WorldcupGame";
import { foodWorldcupItems } from "@/data/food-worldcup";
import { BurnoutTestPage } from "@/components/test/BurnoutTestPage";
import { ConsumerStyleTestPage } from "@/components/test/ConsumerStyleTestPage";
import { LoveMbtiTestPage } from "@/components/test/LoveMbtiTestPage";
import { JealousyTestPage } from "@/components/test/JealousyTestPage";
import { RelationshipSatisfactionLanding } from "@/components/test/RelationshipSatisfactionLanding";
import { RelationshipSatisfactionTestPage } from "@/components/test/RelationshipSatisfactionTestPage";
import { InterpersonalAbilityLanding } from "@/components/test/InterpersonalAbilityLanding";
import { InterpersonalAbilityTestPage } from "@/components/test/InterpersonalAbilityTestPage";
import { AttachmentStyleTestPage } from "@/components/test/AttachmentStyleTestPage";
import { FootballQuizTestPage } from "@/components/test/FootballQuizTestPage";
import { FootballTacticsTestPage } from "@/components/test/FootballTacticsTestPage";
import { WorldCupWinnerQuizTestPage } from "@/components/test/WorldCupWinnerQuizTestPage";
import { ReactionTimeTestPage } from "@/components/test/ReactionTimeTestPage";
import { MbtiTestPage } from "@/components/test/MbtiTestPage";
import { SbtiTestPage } from "@/components/test/SbtiTestPage";
import { StressTestPage } from "@/components/test/StressTestPage";
import { ConvenienceStoreTestPage } from "@/components/test/ConvenienceStoreTestPage";
import { SnsTypeTestPage } from "@/components/test/SnsTypeTestPage";
import { BurgerBrandTestPage } from "@/components/test/BurgerBrandTestPage";
import { StandardTestLanding } from "@/components/test/StandardTestLanding";
import { FanQuizLanding } from "@/components/fan-quiz/FanQuizLanding";
import { ArsenalFanQuizTestPage } from "@/components/test/ArsenalFanQuizTestPage";
import { YoungtakFanQuizTestPage } from "@/components/test/YoungtakFanQuizTestPage";
import { YoungtakSongQuizTestPage } from "@/components/test/YoungtakSongQuizTestPage";
import { LimYoungWoongFanQuizTestPage } from "@/components/test/LimYoungWoongFanQuizTestPage";
import { LimYoungWoongSongQuizTestPage } from "@/components/test/LimYoungWoongSongQuizTestPage";
import { TetoEgenTestPage } from "@/components/test/TetoEgenTestPage";
import { BtsFanQuizTestPage } from "@/components/test/BtsFanQuizTestPage";
import { Fromis9FanQuizTestPage } from "@/components/test/Fromis9FanQuizTestPage";
import { SeventeenFanQuizTestPage } from "@/components/test/SeventeenFanQuizTestPage";
import { StrayKidsFanQuizTestPage } from "@/components/test/StrayKidsFanQuizTestPage";
import { ManchesterUnitedFanQuizTestPage } from "@/components/test/ManchesterUnitedFanQuizTestPage";
import { AteezFanQuizTestPage } from "@/components/test/AteezFanQuizTestPage";
import { ResceneFanQuizTestPage } from "@/components/test/ResceneFanQuizTestPage";
import { GirlsGenerationFanQuizTestPage } from "@/components/test/GirlsGenerationFanQuizTestPage";
import { TurnoverIntentionTestPage } from "@/components/test/TurnoverIntentionTestPage";
import { JobStressTestPage } from "@/components/test/JobStressTestPage";
import { WorkaholicTestPage } from "@/components/test/WorkaholicTestPage";
import { EgoResilienceTestPage } from "@/components/test/EgoResilienceTestPage";
import { BigbangFanQuizTestPage } from "@/components/test/BigbangFanQuizTestPage";
import { NctDreamFanQuizTestPage } from "@/components/test/NctDreamFanQuizTestPage";
import { LionelMessiFanQuizTestPage } from "@/components/test/LionelMessiFanQuizTestPage";
import { JungkookFanQuizTestPage } from "@/components/test/JungkookFanQuizTestPage";
import { WorkPersonaLanding } from "@/components/test/WorkPersonaLanding";
import { WorkPersonaTestPage } from "@/components/test/WorkPersonaTestPage";
import { MentalAgeTestPage } from "@/components/test/MentalAgeTestPage";
import { YoungOldTestPage } from "@/components/test/YoungOldTestPage";
import { IdealTypeTestPage } from "@/components/test/IdealTypeTestPage";
import { RelatedArticlesForTest } from "@/components/articles/RelatedArticlesForTest";

type Props = { params: Promise<{ slug: string }>; searchParams: Promise<{ start?: string; age?: string; play?: string; seed?: string }> };

export function generateStaticParams() { return tests.filter(({ href }) => !href).map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { slug } = await params;
  const query = await searchParams;
  const test = getTest(slug);
  if (!test) return {};
  const base = createMetadata({
    title: getTestSeoTitle(test),
    description: getTestSeoDescription(test),
    path: getTestCanonicalPath(test),
    keywords: getTestSeoKeywords(test),
    ogImage: false,
  });
  const isProgressView = query.start === "1" || query.play === "1" || Boolean(query.age) || Boolean(query.seed);
  return isProgressView ? { ...base, robots: { index: false, follow: true } } : base;
}

export default async function TestDetailPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { start, age, play, seed } = await searchParams;
  const test = getTest(slug);
  if (!test) notFound();
  if (test.href) redirect(test.href);
  if (test.type === "fortune") redirect(test.href ?? "/fortune/today");
  if (test.type === "worldcup") {
    const parsedSeed = Number(seed);
    return play === "1" && Number.isInteger(parsedSeed) && parsedSeed > 0
      ? <WorldcupGame items={foodWorldcupItems} seed={parsedSeed} />
      : <><WorldcupIntro /><div className="container-page pb-10 sm:pb-14"><TestSeoContent test={test} /><RelatedTests current={test} /></div></>;
  }
  const isOfficeAnimal = test.slug === "office-animal-test";
  const isMarriageTiming = test.slug === "marriage-timing-test";
  const isKkondaePower = test.slug === "kkondae-power-test";
  const isBurnoutRisk = test.slug === "burnout-risk-test";
  const isConsumerStyle = test.slug === "consumer-style-test";
  const isLoveMbti = test.slug === "love-mbti-test";
  const isJealousy = test.slug === "jealousy-test";
  const isRelationshipSatisfaction = test.slug === "relationship-satisfaction-test";
  const isInterpersonalAbility = test.slug === "interpersonal-ability-test";
  const isLoverScore = test.slug === "lover-score-test";
  const isAttachmentStyle = test.slug === "attachment-style-test";
  const isJoseonDestiny = test.slug === "joseon-destiny-test";
  const isPersonalityCountry = test.slug === "personality-country-test";
  const isColorPersonality = test.slug === "color-personality-test";
  const isEnneagram = test.slug === "enneagram";
  const isEqTest = test.slug === "eq-test";
  const isBigFive = test.slug === "big-five";
  const isFootballQuiz = test.slug === "football-iq-test";
  const isFootballTactics = test.slug === "football-tactics-test";
  const isWorldCupWinnerQuiz = test.slug === "worldcup-winner-quiz";
  const isReactionTime = test.slug === "reaction-time-test";
  const isMbti = test.slug === "mbti";
  const isSbti = test.slug === "sbti";
  const isStressTest = test.slug === "stress-test";
  const isCvsTest = test.slug === "convenience-store-test";
  const isSnsTest = test.slug === "sns-type-test";
  const isBurgerTest = test.slug === "burger-brand-test";
  const isWizardCharacter = test.slug === "harry-potter-character-test";
  const isCoffeeBrand = test.slug === "coffee-brand-test";
  const isLoverFruit = test.slug === "lover-fruit-test";
  const isSelfEsteem = test.slug === "self-esteem-test";
  const isAdhdScreening = test.slug === "adhd-self-check";
  const isDementiaRisk = test.slug === "dementia-risk-test";
  const isArsenalFan = test.slug === "arsenal-fan-test";
  const isYoungtakFan = test.slug === "youngtak-fan-test";
  const isYoungtakSongQuiz = test.slug === "youngtak-song-fan-quiz";
  const isLimYoungWoongFan = test.slug === "limyoungwoong-fan-test";
  const isLimYoungWoongSongQuiz = test.slug === "limyoungwoong-song-fan-quiz";
  const isTetoEgen = test.slug === "teto-egen-test";
  const isMentalAge = test.slug === "mental-age";
  const isYoungOld = test.slug === "young-old";
  const isIdealType = test.slug === "ideal-type";
  const currentAge = isMarriageTiming ? parseCurrentAge(age) : null;

  const isFromis9Fan = test.slug === "fromis9-fan-test";
  const isSeventeenFan = test.slug === "seventeen-true-fan";
  const isStrayKidsFan = test.slug === "stray-kids-true-fan-test";
  const isManchesterUnitedFan = test.slug === "manchester-united-true-fan-test";
  const isAteezFan = test.slug === "ateez-true-fan-test";
  const isTurnoverIntention = test.slug === "turnover-intention";
  const isJobStress = test.slug === "job-stress";
  const isWorkaholic = test.slug === "workaholic";
  const isEgoResilience = test.slug === "ego-resilience-test";
  if (isInterpersonalAbility && start === "1") return <InterpersonalAbilityTestPage />;
  if (isInterpersonalAbility) return <InterpersonalAbilityLanding test={test} />;
  if (isRelationshipSatisfaction && start === "1") return <RelationshipSatisfactionTestPage />;
  if (isRelationshipSatisfaction) return <RelationshipSatisfactionLanding test={test} />;
  if (isEgoResilience && start === "1") return <EgoResilienceTestPage />;
  if (isEgoResilience) return <StandardTestLanding test={test} answerType="4점 척도" insight="자아탄력성은 힘든 일을 겪지 않는 능력이 아니라 흔들린 뒤 감정과 상황을 정리하고 다시 일상으로 돌아오는 힘과 관련됩니다. 최근 1개월의 실제 모습을 기준으로 자기조절력, 현실적인 긍정적 회복력, 관계 회복력을 각각 4문항으로 살펴봅니다. 부정적인 감정을 억누르거나 모든 문제를 혼자 해결하는 것을 높은 점수로 보지 않습니다. 이 테스트는 12문항의 자가 점검형 콘텐츠이며 전문 심리검사나 의료 진단을 대신하지 않습니다." />;
  if (isWorkaholic && start === "1") return <WorkaholicTestPage />;
  if (isWorkaholic) return <StandardTestLanding test={test} answerType="4점 척도" insight="최근 3개월의 반복적인 업무 습관을 기준으로 과도한 업무 투입, 강박적인 업무 욕구, 심리적 퇴근의 어려움, 일과 생활의 경계 침범, 성과와 자기 가치 결합의 5개 영역을 살펴봅니다. 오래 일하거나 일을 좋아한다는 이유만으로 워커홀릭이라고 보지 않고, 필요할 때 멈추고 쉴 수 있는 건강한 업무 몰입과 내적 압박 때문에 업무를 놓기 어려운 과몰입을 구분합니다. 결과는 자기이해용이며 의료 진단이나 공식 인사평가가 아닙니다." />;
  if (isJobStress && start === "1") return <JobStressTestPage />;
  if (isJobStress) return <StandardTestLanding test={test} answerType="4점 척도" insight="최근 4주 동안의 직장생활을 기준으로 업무환경, 업무량, 자율성, 관계와 지원, 고용 안정성, 조직 체계, 보상과 인정, 직장 문화의 8개 영역을 살펴봅니다. 각 영역은 4문항으로 구성되고 긍정적인 환경을 묻는 문항은 역채점합니다. 결과에서는 미미테스트 자체 기준의 0~100점 직무 스트레스 점수, 주요 원인과 비교적 안정적인 영역, 개인이 점검할 방법과 조직에 협의할 방법을 나누어 제공합니다. 표준화된 심리검사나 의료·산업안전보건 진단이 아닌 자기이해용 콘텐츠입니다." />;
  if (isTurnoverIntention && start === "1") return <TurnoverIntentionTestPage />;
  if (isTurnoverIntention) return <StandardTestLanding test={test} answerType="4점 척도" insight="최근 3개월 동안의 직장생활을 기준으로, 회사를 떠나고 싶은 마음이 어느 정도인지와 그 마음을 만드는 원인을 함께 살펴봅니다. 직접적인 이직 의향 8문항과 조직 애착·업무 의미, 성장 가능성, 보상·공정성, 인간관계·조직문화, 업무 부담·회복 각 4문항, 총 28문항으로 구성되며 일부 문항은 역채점으로 계산됩니다. 결과에서는 0~100점의 이직 의향 점수와 5단계 유형, 영역별 점수 그래프, 점수가 가장 높은 원인 유형과 상황별 점검 가이드를 제공합니다. 이 테스트는 표준화된 심리검사나 인사평가 도구가 아닌 자기이해용 참고 콘텐츠입니다." />;
  const isGirlsGenerationFan = test.slug === "girls-generation-true-fan-test";
  const isBigbangFan = test.slug === "bigbang-true-fan-test";
  const isNctDreamFan = test.slug === "nct-dream-true-fan-test";
  const isLionelMessiFan = test.slug === "lionel-messi-true-fan-test";
  const isJungkookFan = test.slug === "bts-jungkook-true-fan-test";
  const isWorkPersona = test.slug === "work-persona-16";
  if (isYoungtakSongQuiz && start === "1") return <YoungtakSongQuizTestPage />;
  if (isYoungtakSongQuiz) return <FanQuizLanding test={test} insight="영탁의 대표 싱글과 정규 1집 MMM, 정규 2집 FORM, 미니앨범 SuperSuper의 수록곡을 바탕으로 구성한 노래 팬 퀴즈입니다. 중·상·최상 각 100문항의 총 300문항 풀에서 난이도별 4문항씩 12문항을 출제하며, 긴 가사 대신 짧은 곡명·주제 단서와 검증된 앨범 정보를 사용합니다. 결과는 100점 만점과 LEVEL 1~10으로 표시됩니다." />;
  if (isLimYoungWoongSongQuiz && start === "1") return <LimYoungWoongSongQuizTestPage />;
  if (isLimYoungWoongSongQuiz) return <FanQuizLanding test={test} insight="임영웅의 정규 1집 IM HERO와 정규 2집 IM HERO 2, 대표 싱글과 OST 수록곡을 바탕으로 구성한 노래 팬 퀴즈입니다. 중·상·최상 각 100문항의 총 300문항 풀에서 난이도별 4문항씩 12문항을 출제하며, 긴 가사 대신 짧은 곡명·주제 단서와 검증된 앨범 정보를 사용합니다. 결과는 100점 만점과 LEVEL 1~10으로 표시됩니다." />;
  if (isWorkPersona && start === "1") return <WorkPersonaTestPage />;
  if (isWorkPersona) return <><WorkPersonaLanding /><div className="container-page pb-12"><TestSeoContent test={test} itemCount={15} answerType="4지선다" /><RelatedTests current={test} /></div></>;
  if (isNctDreamFan && start === "1") return <NctDreamFanQuizTestPage />;
  if (isNctDreamFan) return <FanQuizLanding test={test} insight="NCT DREAM 멤버와 데뷔, 앨범, 수록곡, 일본 활동, THE DREAM SHOW를 공식 자료로 검증한 60문항 중 15문항을 출제합니다. 동일 사실은 반복하지 않고 topicKey와 수록곡 문제, 카테고리 구성을 균형 있게 조정합니다. 결과에서는 30점 만점의 가중 점수와 정답 수, 시즈니 팬심 지수, 문제별 해설을 제공합니다. 본 테스트는 비공식 팬 퀴즈입니다." />;
  if (isLionelMessiFan && start === "1") return <LionelMessiFanQuizTestPage />;
  if (isLionelMessiFan) return <FanQuizLanding test={test} insight="바르셀로나의 전설적인 기록부터 아르헨티나의 월드컵 우승, PSG 시절과 인터 마이애미 활약까지 공식 자료로 검증한 60문항 중 12문항을 출제합니다. 바르셀로나, 아르헨티나 대표팀, PSG, 인터 마이애미 영역이 한쪽으로 치우치지 않도록 구성하며 결과에서는 12점 만점 점수와 정답률, 메시 팬 등급, 문제별 해설을 확인할 수 있습니다. 본 테스트는 비공식 팬 퀴즈입니다." />;
  if (isJungkookFan && start === "1") return <JungkookFanQuizTestPage />;
  if (isJungkookFan) return <FanQuizLanding test={test} insight="전체 60문항 풀에서 쉬움 4문항, 보통 5문항, 어려움 3문항을 뽑아 총 12문항이 출제됩니다. 각 문제는 4지선다형이며 한 개의 정답만 있습니다. 제출 후 정답과 간단한 해설을 확인할 수 있고, 다시 도전하면 새로운 문제 조합과 보기 순서가 나올 수 있습니다." />;
  if (isBigbangFan && start === "1") return <BigbangFanQuizTestPage />;
  if (isBigbangFan) return <FanQuizLanding test={test} insight="BIGBANG의 데뷔와 대표곡, 앨범 수록곡, MADE SERIES, 공연 기록을 공식 자료로 검증한 60문항 중 15문항을 출제합니다. 동일 topicGroup은 한 회차에 한 번만 포함하고 카테고리 편중도 제한합니다. 결과에서는 15점 만점 점수와 정답률, VIP 등급, 문제별 해설을 확인할 수 있습니다. 본 테스트는 비공식 팬 퀴즈입니다." />;
  if (isGirlsGenerationFan && start === "1") return <GirlsGenerationFanQuizTestPage />;
  if (isGirlsGenerationFan) return <FanQuizLanding test={test} insight="소녀시대 멤버와 데뷔, 다시 만난 세계·Gee·소원을 말해봐 같은 대표곡, 정규앨범과 FOREVER 1, 태티서와 Oh!GG 유닛 활동까지 공식 자료로 검증한 60문항 문제은행에서 15문항이 무작위 출제됩니다. 같은 분야와 같은 앨범에 문제가 몰리지 않도록 제한하며, 정답과 해설은 제출 후 결과 화면에서 공개됩니다. 결과에서는 15점 만점 점수와 정답률, 5단계 S♡NE 등급, 문제별 해설 복습을 제공합니다. 본 테스트는 공식 서비스가 아닌 비공식 팬 퀴즈입니다." />;
  const isResceneFan = test.slug === "rescene-true-fan-test";
  if (isResceneFan && start === "1") return <ResceneFanQuizTestPage />;
  if (isResceneFan) return <FanQuizLanding test={test} insight="RESCENE 멤버와 데뷔, LOVE ATTACK, SCENEDROME, Glow Up, lip bomb과 향기 콘셉트를 공식 자료로 검증한 60문항 중 15문항을 출제합니다. 동일 카테고리와 albumKey, 최신성 문항의 편중을 제한하며 결과에서는 점수와 REMINE 등급, 문제별 해설을 확인할 수 있습니다." />;
  if (isAteezFan && start === "1") return <AteezFanQuizTestPage />;
  if (isAteezFan) return <FanQuizLanding test={test} insight="ATEEZ 멤버와 데뷔, 앨범, 타이틀곡, 수록곡과 유닛 활동을 공식 자료로 검증한 60문항 중 15문항을 출제합니다. 동일 카테고리와 음반·시리즈, 최신성 문항이 한쪽에 몰리지 않도록 제한하며 결과에서는 점수와 정답률, ATINY 등급과 문제별 해설을 확인할 수 있습니다." />;
  if (isManchesterUnitedFan && start === "1") return <ManchesterUnitedFanQuizTestPage />;
  if (isManchesterUnitedFan) return <FanQuizLanding test={test} insight="뉴턴 히스 시절부터 올드 트래포드, 버스비 베이브스, 1999년 트레블과 유럽 정상의 순간까지 공식 자료로 검증한 60문항 중 15문항을 출제합니다. 최소 6개 카테고리와 5개 시대를 포함하도록 구성하며 결과에서는 정답 수, 29점 만점의 가중 점수와 맨유 팬심 백분율을 확인할 수 있습니다." />;
  if (isStrayKidsFan && start === "1") return <StrayKidsFanQuizTestPage />;
  if (isStrayKidsFan) return <FanQuizLanding test={test} insight="스트레이 키즈 멤버와 앨범, 타이틀곡, 수록곡과 유닛 활동을 공식 공개 자료로 검증한 180문항 중 15문항이 출제됩니다. 같은 앨범과 카테고리, 최신 연도 문제의 편중을 제한하며 결과에서는 정답 수, 29점 만점의 가중 점수와 STAY 팬심 백분율을 확인할 수 있습니다. 본 테스트는 비공식 팬 퀴즈입니다." />;
  if (isSeventeenFan && start === "1") return <SeventeenFanQuizTestPage />;
  if (isSeventeenFan) return <FanQuizLanding test={test} insight="세븐틴 멤버와 유닛, 대표곡, 앨범과 수록곡까지 공식 공개 자료로 검증한 60문항 중 15문항이 출제됩니다. 같은 시도에서는 문제와 보기 순서가 유지되고, 다시 도전하면 새로운 조합으로 나의 캐럿력을 확인할 수 있습니다. 본 테스트는 미미테스트가 자체 제작한 비공식 팬 퀴즈입니다." />;
  if (isFromis9Fan && start === "1") return <Fromis9FanQuizTestPage />;
  if (isFromis9Fan) return <FanQuizLanding test={test} insight="나는 프로미스나인을 얼마나 알고 있을까요? 아이돌학교와 '프로미스의 방'에서 시작된 데뷔 스토리부터 To. Heart와 두근두근, DM, Supersonic까지의 디스코그래피, 첫 단독 콘서트 LOVE FROM., 음악방송 1위 기록과 최신 5인 체제 활동까지 60개 문제은행에서 매번 15문제가 랜덤 출제됩니다. 모든 문제는 공식 발표와 공개 기록으로 사실 검증을 거쳤습니다. 결과에서는 6단계 팬심 등급과 분야별 정답률, 해설이 담긴 오답노트를 확인할 수 있습니다. 본 테스트는 프로미스나인 또는 소속사의 공식 서비스가 아닌 비공식 팬 퀴즈입니다." />;
  const isBtsFan = test.slug === "bts-fan-test";
  if (isBtsFan && start === "1") return <BtsFanQuizTestPage />;
  if (isBtsFan) return <FanQuizLanding test={test} insight="나는 BTS를 얼마나 알고 있을까요? 멤버와 데뷔부터 음반, 콘서트, 달려라 방탄·본 보야지 같은 공식 콘텐츠, 빌보드·기네스·그래미 기록과 솔로 활동, 2026년 최신 완전체 활동까지 60개 문제은행에서 매번 15문제가 랜덤 출제됩니다. 모든 문제는 공식 발표와 공식 기록으로 사실 검증을 거쳤습니다. 결과에서는 6단계 팬심 등급과 분야별 정답률, 해설이 담긴 오답노트를 확인할 수 있습니다. 본 테스트는 BTS 또는 소속사의 공식 서비스가 아닌 비공식 팬 퀴즈입니다." />;
  if (isTetoEgen && start === "1") return <TetoEgenTestPage />;
  if (isTetoEgen) return <StandardTestLanding test={test} answerType="2지선다" insight="나는 테토일까, 에겐일까? 카페에서 메뉴를 고르는 방식, 단체 채팅방에서의 첫 행동, 여행을 준비하는 순서처럼 자연스러운 일상 선택 70개 문제은행에서 매번 14문항(쉬움 4·보통 6·어려움 4)이 랜덤으로 출제됩니다. 각 선택지는 테토 점수와 에겐 점수를 동시에 갖고 있고 문항마다 다른 가중치가 적용되어, 어떤 답이 어느 쪽인지 눈치채기 어렵게 설계했습니다. 결과에서는 테토력·에겐력 비율(%)과 8가지 유형 중 나의 유형, 연애·친구·직장에서의 모습, 잘 맞는 유형과 반대 유형과의 케미까지 상세 분석을 제공합니다." />;
  if (isSelfEsteem && start !== "1") return <StandardTestLanding test={test} insight="실패, 칭찬, 비교, 피드백, 낯선 관계와 중요한 결정처럼 일상에서 자주 만나는 14가지 상황을 통해 자기수용, 자기효능감, 사회적 비교, 실패 회복력, 타인 평가 민감도, 자기신뢰, 감정 안정성과 자기연민을 함께 살펴봅니다. 각 선택은 2~4개 요인에 복합적으로 반영되며 결과에서는 현재 점수보다 나를 지지하는 영역과 조금 더 돌보면 좋은 영역을 구체적으로 확인할 수 있습니다." />;
  if (isMentalAge && start !== "1") return <StandardTestLanding test={test} insight="정신연령 테스트는 실제 나이나 지능을 측정하는 검사가 아닙니다. 친구와의 약속, 낯선 변화, 소비와 시간 관리처럼 한국의 일상에서 자주 마주치는 84개의 상황형 문항 풀에서 매번 15개를 균형 있게 출제합니다. 감정 조절, 책임감, 계획성, 자기통제력, 현실 판단력과 호기심, 즉흥성, 유연성, 사회적 개방성, 놀이성의 조합을 바탕으로 현재의 사고방식을 나이 이미지로 표현합니다. 실제 나이는 선택 입력이며 결과 차이 문구에만 사용하고 저장하지 않습니다." />;
  if (isYoungOld && start !== "1") return <StandardTestLanding test={test} insight="영크크 늙크크 테스트는 실제 나이나 세대를 판단하는 검사가 아닙니다. 원본·공식 또는 보조 트렌드 출처를 함께 기록한 48개 최신 밈 문제 풀에서 매번 12문제를 출제합니다. 쉬움 4개·보통 5개·어려움 3개가 고정되며, 동일 밈은 한 세션에 한 번만 나옵니다. 밈의 관련 인물·그룹, 원본 콘텐츠, 유래 상황, 사용 맥락과 연결 콘텐츠를 함께 확인해 트렌디 지수와 영크크·늙크크 결과를 안내합니다. 재검토 기한이 지난 문항은 자동으로 출제에서 제외합니다." />;
  if (isIdealType && start === "1") return <IdealTypeTestPage />;
  if (isAdhdScreening && start !== "1") return <StandardTestLanding test={test} answerType="5점 척도" insight="이 테스트는 ADHD를 진단하는 의료검사가 아닙니다. 세계적으로 널리 사용되는 성인 ADHD 선별검사의 평가 개념을 참고하여 현재 ADHD 관련 특성이 어느 정도 나타나는지 확인하는 참고용 자가 체크입니다. 정확한 진단은 반드시 정신건강의학과 전문의의 평가를 통해 이루어져야 하며, 결과에 따라 전문의 진단이 필요할 수 있습니다. 최근 6개월의 경험을 기준으로 응답해 주세요." />;
  if (isDementiaRisk && start !== "1") return <StandardTestLanding test={test} answerType="5점 척도" insight="이 테스트는 치매를 진단하는 의료검사가 아닙니다. 최근 기억력, 일상생활 변화, 생활습관 위험요인을 확인하는 참고용 자가 체크입니다. 결과가 높거나 일상생활에 불편이 있다면 신경과, 정신건강의학과, 치매안심센터 등 전문기관 상담을 권장합니다. 최근 6개월~1년 사이의 변화를 기준으로 응답해 주세요." />;
  if (isYoungtakFan && start !== "1") return <FanQuizLanding test={test} insight="나는 영탁을 얼마나 잘 알고 있을까요? 노래, 앨범, 방송, 무대, 콘서트, 작사·작곡 참여와 활동 기록까지 총 60개의 문제은행에서 15문항이 랜덤으로 출제됩니다. 결과에서는 카테고리별 정답률과 오답노트를 확인할 수 있습니다. 본 테스트는 영탁 또는 소속사의 공식 서비스가 아닌 비공식 팬 퀴즈입니다." />;
  if (isLimYoungWoongFan && start !== "1") return <FanQuizLanding test={test} insight="나는 임영웅을 얼마나 잘 알고 있을까요? 데뷔, 노래, 정규앨범, 경연, 방송, OST, 콘서트와 제작 크레딧까지 공식·주요 음원 자료로 검증한 60개 문제은행에서 15문항이 랜덤 출제됩니다. 결과에서는 분야별 정답률과 오답노트를 확인할 수 있습니다. 본 테스트는 임영웅 또는 소속사의 공식 서비스가 아닌 비공식 팬 퀴즈입니다." />;
  if (isArsenalFan && start !== "1") return <FanQuizLanding test={test} insight="나는 아스날을 얼마나 잘 알고 있을까요? 선수와 감독, 우승 기록, 홈구장, 유럽대항전, 역사적인 경기까지 총 15개의 문제를 풀고 나의 아스날 팬 지수를 확인해 보세요. 문제은행은 50문항 이상으로 구성되어 있으며, 매번 새로운 조합으로 무작위 출제됩니다. 본 테스트는 아스날 FC 또는 프리미어리그의 공식 서비스가 아닌 비공식 팬 퀴즈입니다." />;
  if (isLoverFruit && start !== "1") return <StandardTestLanding test={test} insight="연인의 행동을 떠올리며 14가지 연애 상황에 답하면 애정 표현, 안정감, 독립성, 배려심, 유머감각, 감성, 리더십, 모험심, 책임감, 로맨틱함, 친화력, 솔직함을 함께 분석합니다. 단순한 과일 취향이 아니라 연인이 갈등을 풀고 마음을 표현하며 관계의 속도를 맞추는 방식을 20개 과일 성격 프로필과 비교해 가장 닮은 과일 유형을 찾아드려요." />;
  if (isCoffeeBrand && start !== "1") return <StandardTestLanding test={test} insight="휴일, 여행, 선물, 일과 인간관계처럼 익숙한 10가지 상황에서 고른 답으로 트렌디함, 감성, 현실성, 합리성, 여유, 활동성, 독립성, 친화력, 도전성, 안정성, 창의성과 프리미엄 지향을 함께 분석합니다. 단순히 좋아하는 메뉴를 맞히는 대신 생활 리듬과 소비 기준의 전체 조합을 15개 커피 브랜드 이미지와 비교해 가장 어울리는 결과를 찾아드려요." />;
  if (isBurgerTest && start === "1") return <BurgerBrandTestPage />;
  if (isSnsTest && start === "1") return <SnsTypeTestPage />;
  if (isCvsTest && start === "1") return <ConvenienceStoreTestPage />;
  if (isStressTest && start === "1") return <StressTestPage />;
  if (isMbti && start === "1") return <MbtiTestPage />;
  if (isSbti && start === "1") return <SbtiTestPage />;
  if (isReactionTime && start === "1") return <ReactionTimeTestPage />;
  if (isFootballQuiz && start === "1") return <FootballQuizTestPage />;
  if (isFootballTactics && start === "1") return <FootballTacticsTestPage />;
  if (isFootballTactics) return <StandardTestLanding test={test} answerType="4지선다" insight="포메이션과 포지션 역할부터 빌드업, 압박과 압박 회피, 하프스페이스, 수적·위치적 우위, 제3자 움직임, 공격과 수비 전환까지 실제 경기에서 나타나는 전술 원리를 10문제로 확인합니다. 120문제 은행에서 LV.2 3문제, LV.3 4문제, LV.4 3문제가 매번 랜덤 출제되며, 실제 전술 선택지와 비슷하게 설계한 근접 오답을 비교해야 합니다. 난이도 가중치 없이 정답 개수를 0~10점으로 계산하고 결과에서 정답과 전술 해설, 검토 자료 범주를 확인할 수 있습니다." />;
  if (isWorldCupWinnerQuiz && start === "1") return <WorldCupWinnerQuizTestPage />;
  if (isYoungtakFan && start === "1") return <YoungtakFanQuizTestPage />;
  if (isLimYoungWoongFan && start === "1") return <LimYoungWoongFanQuizTestPage />;
  if (isArsenalFan && start === "1") return <ArsenalFanQuizTestPage />;
  if (isBurnoutRisk && start === "1") return <BurnoutTestPage />;
  if (isConsumerStyle && start === "1") return <ConsumerStyleTestPage />;
  if (isLoveMbti && start === "1") return <LoveMbtiTestPage />;
  if (isJealousy && start === "1") return <JealousyTestPage />;
  if (isAttachmentStyle && start === "1") return <AttachmentStyleTestPage />;
  if (isMentalAge && start === "1") return <MentalAgeTestPage />;
  if (isYoungOld && start === "1") return <YoungOldTestPage />;
  if (start === "1" && (!isMarriageTiming || currentAge)) return <div className="container-page py-8 sm:py-12"><TestRunner test={test} currentAge={currentAge ?? undefined} /></div>;

  const itemCount=test.itemCount??test.questions.length;
  const answerType=test.type==="likert"||isBurnoutRisk||isBigFive?"5점 척도":isKkondaePower||isEnneagram||isEqTest||isFootballQuiz||isFootballTactics||isWorldCupWinnerQuiz||isYoungtakFan||isYoungtakSongQuiz||isLimYoungWoongFan||isLimYoungWoongSongQuiz||isJealousy||isSbti||isCvsTest||isSnsTest||isWizardCharacter||isCoffeeBrand||isLoverFruit||isSelfEsteem||isMentalAge||isYoungOld?"4지선다":isJoseonDestiny||isPersonalityCountry||isLoverScore||isColorPersonality||isMbti?"2지선다":"O/X";
  const seoTitle = getTestSeoTitle(test);
  const seoDescription = getTestSeoDescription(test);
  const seoKeywords = getTestSeoKeywords(test);
  const testUrl = absoluteUrl(getTestCanonicalPath(test));

  return (
    <div className="container-page py-10 sm:py-14">
      <Breadcrumbs items={[{ name: "테스트", href: "/tests" }, { name: test.shortTitle }]} />
      <section className="mx-auto max-w-3xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-card">
        {test.thumbnail ? (
          <div className="relative aspect-[16/10] min-h-60 w-full bg-slate-100">
            <Image src={test.thumbnail} alt={test.title} fill sizes="(max-width:768px) 100vw, 768px" className="object-cover object-center" priority />
          </div>
        ) : (
          <div className="grid min-h-60 place-items-center bg-gradient-to-br from-blue-50 via-indigo-50 to-sky-100"><span className="text-7xl" aria-hidden="true">{test.icon}</span></div>
        )}
        <div className="p-6 sm:p-10">
          <div className="flex gap-2 text-xs font-bold"><Link href={`/category/${encodeURIComponent(test.category)}`} className="rounded-full bg-blue-50 px-3 py-1 text-primary">{test.category}</Link><span className="rounded-full bg-slate-100 px-3 py-1 text-slate-500">{test.duration}</span></div>
          <h1 className="mt-5 text-3xl font-black tracking-tight text-ink sm:text-4xl">{test.title}</h1>
          <p className="mt-4 text-base leading-7 text-slate-600">{test.description}</p>
          <ul className="mt-6 grid gap-2 text-sm text-slate-600 sm:grid-cols-3">{isReactionTime ? <><li>✓ 총 3회 측정</li><li>✓ ms 단위 정밀 측정</li><li>✓ 회원가입 없음</li></> : <><li>✓ 총 {itemCount}문항</li><li>✓ {answerType} 간편 응답</li><li>✓ 회원가입 없음</li></>}</ul>
          {isMarriageTiming ? <AgeStartForm testSlug={test.slug} /> : <Link href={`/tests/${test.slug}?start=1`} className="mt-8 block w-full rounded-2xl bg-primary px-6 py-4 text-center text-base font-extrabold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700">무료로 테스트 시작하기</Link>}
          {!isMarriageTiming && <p className="mt-3 text-center text-xs text-slate-400">응답은 서버에 저장되지 않습니다.</p>}
        </div>
      </section>
      <section className="mx-auto mt-12 max-w-3xl rounded-3xl bg-white p-6 sm:p-8"><h2 className="text-xl font-extrabold text-ink">이 테스트로 알 수 있어요</h2><p className="mt-3 leading-7 text-slate-600">{isYoungtakFan ? "영탁 팬 퀴즈는 60개 문제은행에서 매번 15문항을 뽑아 노래, 앨범, 방송, 경연, 콘서트, 작사·작곡 참여, 팬덤과 활동 기록을 폭넓게 확인합니다. 보기 순서도 매번 바뀌므로 단순 암기보다 활동 흐름을 얼마나 알고 있는지 확인하기 좋습니다. 결과에서는 100점 만점 팬심 지수와 분야별 정답률, 오답노트를 제공합니다." : isLoverFruit ? "연인의 행동을 떠올리며 14가지 연애 상황에 답하면 애정 표현, 안정감, 독립성, 배려심, 유머감각, 감성, 리더십, 모험심, 책임감, 로맨틱함, 친화력, 솔직함을 함께 분석합니다. 딸기부터 오렌지까지 20개 과일 유형과 비교해 연인이 어떤 과일 이미지와 가장 닮았는지, 잘 맞는 과일 궁합과 관계 팁까지 확인할 수 있습니다." : isWizardCharacter ? "친구 관계, 낯선 모임, 경쟁, 실패와 팀 프로젝트 같은 10가지 일상 상황에서 고른 답으로 용기, 지혜, 리더십, 우정, 충성심, 창의성, 독립성, 야망, 책임감, 공감력, 행동력, 분석력을 함께 분석합니다. 한 가지 점수만 비교하지 않고 12가지 성향의 전체 조합을 캐릭터별 프로필과 비교해 가장 닮은 주인공과 숨은 보조 캐릭터를 찾아드려요." : isCvsTest ? "편의점에서 장보는 10번의 선택만으로 숨겨진 성격을 알아봅니다. 성격을 묻는 질문은 하나도 없어요. 삼각김밥, 컵라면, 음료, 과자처럼 익숙한 상품 중 지금 끌리는 것을 고르면, 12가지 성향 점수가 계산되어 소확행 수집가부터 신상 헌터까지 30가지 성격 유형 중 나와 가장 가까운 결과가 나옵니다. 결과에서는 성격 분석과 함께 오늘의 추천 편의점 조합도 알려드려요." : isStressTest ? "세계적으로 가장 널리 쓰이는 지각된 스트레스 척도(PSS-10)로 지난 1개월간의 스트레스 수준을 측정합니다. 예측불가능감, 통제불가능감, 과부하감을 묻는 10개 문항에 5점 척도로 답하면 0~40점의 스트레스 지수와 낮음·중간·높음 3단계 해석, 단계별 관리 방법까지 안내합니다. 결과는 의학적 진단이 아닌 자가 점검용 참고 정보입니다." : isMbti ? "MBTI 4가지 지표(E/I, S/N, T/F, J/P)를 40개의 양자택일 문항으로 분석합니다. 결과에서는 16가지 MBTI 유형 중 나의 유형과 지표별 성향 비율, 성격 특징, 강점과 주의점, 어울리는 직업 방향과 관계 팁까지 확인할 수 있습니다. 진행 상황이 자동 저장되어 중간에 나가도 이어서 할 수 있어요." : isSbti ? "MBTI 패러디로 화제가 된 SBTI를 30개 문항으로 진행합니다. 사회·에너지·멘탈·욕망·생존 5개 모델의 15개 차원을 L/M/H 3단계로 평가해, 장악자 CTRL부터 번아웃 사망자 DEAD까지 27가지 유형 중 나의 유형과 매칭도(%)를 알려드립니다. 특정 응답 조합에서만 나오는 히든 유형 DRUNK와 초희귀 폴백 유형 HHHH도 숨어 있어요." : isReactionTime ? "화면이 초록색으로 바뀌는 순간 터치하기까지 걸리는 시간을 밀리초(ms) 단위로 측정합니다. 0.8~4초 사이 랜덤 대기 후 시작되는 측정을 3회 반복해 평균 반응속도를 계산하고, 인간 번개부터 슬로우 모드까지 8개 등급 중 나의 반사신경 등급을 알려드립니다. 성급하게 터치한 회차는 기록에서 제외하고 다시 측정합니다." : isWorldCupWinnerQuiz ? "1930년 우루과이 월드컵부터 2022년 카타르 월드컵까지 모든 대회 우승국 문제은행에서 10문제를 랜덤 출제합니다. 각 문제는 연도와 개최국을 함께 보여주고, 보기는 우승국을 포함한 해당 대회의 4강권 국가 4개로 구성됩니다. 결과에서는 점수와 등급, 틀린 문제의 정답과 결승 스코어를 함께 확인할 수 있습니다." : isFootballQuiz ? "월드컵, 챔피언스리그, 프리미어리그·라리가 등 유럽 리그, 레전드 선수와 축구 역사까지 다양한 영역의 축구 상식을 15문제로 점검합니다. 쉬움·보통·어려움 문제은행에서 매번 랜덤으로 출제되며, 난이도별 배점을 반영해 0~100점의 축잘알 지수와 5단계 등급을 알려드립니다. 틀린 문제는 결과에서 정답과 해설로 다시 확인할 수 있습니다." : isJealousy ? "연애와 가까운 관계에서 나타나는 질투심을 관계 불안, 비교 민감도, 확인 욕구, 감정 조절, 신뢰 유연성 5개 영역으로 살펴봅니다. 15개의 실제 관계 상황형 질문에 답하면 0~100점의 질투심 레벨과 함께 강점, 주의점, 건강하게 표현하는 대화 문장을 확인할 수 있습니다." : isBigFive ? "개방성, 성실성, 외향성, 친화성, 정서 민감성 5개 OCEAN 성격 차원을 25개 문항으로 분석합니다. MBTI처럼 하나의 유형으로 단정하지 않고, 각 성격 특성이 얼마나 두드러지는지 점수와 레이더 차트로 보여주며 업무 스타일, 인간관계 스타일, 연애 스타일, 스트레스 반응과 성장 포인트까지 함께 안내합니다." : isEqTest ? "EQ 테스트와 공감지수 테스트를 통해 자기인식, 자기조절, 공감능력, 사회성, 감정회복력 5개 영역을 확인합니다. 15개 문항의 응답을 바탕으로 EQ 점수와 공감지수 점수, 강점 영역과 보완 영역을 함께 보여주며, 결과에서는 성장 팁과 추천 행동까지 안내합니다." : isEnneagram ? "애니어그램 테스트는 겉으로 보이는 행동보다 내면의 동기, 두려움, 욕구와 관계 방식을 중심으로 9가지 성격유형 중 나와 가장 가까운 유형을 찾아봅니다. 18개 문항을 통해 대표 유형과 상위 3개 유형 점수를 함께 확인할 수 있으며, 결과에서는 강점, 주의점, 잘 맞는 관계와 성장 방향을 안내합니다." : isColorPersonality ? "외향성, 계획성, 감정 표현, 공감 능력, 도전 성향, 안정 추구, 창의성, 독립성, 현실성, 직관성 등 10가지 성향을 바탕으로 나의 성격 컬러를 분석합니다. 12개의 일상 상황형 질문에 답하면 대표 컬러와 보조 컬러가 함께 계산되며, 성격 특징뿐 아니라 인간관계, 연애 스타일, 스트레스 반응, 어울리는 직업 성향까지 확인할 수 있습니다." : isPersonalityCountry ? "개방성, 질서·계획성, 사교 에너지, 자율성, 자연 선호, 성장 욕구, 문화 감성, 안정감 8가지 성향을 바탕으로 나와 잘 맞는 해외 국가의 라이프스타일 이미지를 분석합니다. 특정 국가를 단정적으로 설명하기보다, 당신의 생활 방식과 가치관이 어떤 분위기와 잘 맞는지 여행·생활 키워드 중심으로 안내합니다." : isJoseonDestiny ? "리더십, 지략, 창의성, 모험심, 공감력, 실용성 6가지 성향을 바탕으로 조선시대에서 어떤 운명을 살았을지 분석합니다. 역사적 고증보다 재미와 공유성을 우선한 테스트이며, 왕부터 전설의 책사까지 32가지 결과 중 가장 가까운 조선 캐릭터를 확인할 수 있습니다." : isAttachmentStyle ? "가까운 관계에서 반복되는 애착 불안과 애착 회피 경향을 2축으로 살펴봅니다. 상대의 반응 변화에 얼마나 민감한지, 친밀감과 감정 공유를 얼마나 편안하게 느끼는지에 따라 안정형, 불안형, 회피형, 불안회피형 중 현재 가장 가까운 관계 패턴을 안내합니다." : isLoveMbti ? "애착 안정성, 감정 표현력, 관계 주도성, 독립성과 애정 표현 선호를 함께 분석합니다. 8개 유형 가운데 가장 가까운 대표·보조 성향과 유형별 궁합을 확인할 수 있으며, 결과는 관계의 성공을 단정하는 진단이 아닌 소통 패턴을 돌아보기 위한 정보입니다." : isLoverScore ? "배려심, 책임감, 표현력, 안정감, 갈등해결력, 독립성, 유머감각, 신뢰도 8가지 지표를 바탕으로 나의 애인 점수와 연애 유형을 분석합니다. 특정 답이 ‘정답’이 되지 않도록, 일상에서 자연스럽게 선택하는 연애 패턴을 중심으로 결과를 계산합니다." : isConsumerStyle ? "계획성, 충동성, 경험 선호, 미래 지향성과 품질 추구를 함께 분석합니다. 단순히 많이 쓰거나 적게 쓰는지를 판단하지 않고, 무엇을 중요하게 여기며 어떤 상황에서 소비 결정이 달라지는지 살펴봅니다." : isBurnoutRisk ? "에너지 고갈, 정서적 소진, 업무·학업 거리두기, 대인관계 피로와 회복 가능성을 함께 살펴봅니다. 초반 응답에 맞춰 후속 질문이 달라지며, 결과는 의료 진단이 아닌 현재 상태를 돌아보기 위한 자가 점검 정보입니다." : isKkondaePower ? "업무 방식, 회식과 퇴근에 대한 생각, 피드백 방식, 변화 수용성과 세대 감수성을 살펴 현재의 직장 소통 성향을 점검합니다. 가볍게 웃으면서도 좋은 선배와 동료가 되는 방법을 확인할 수 있습니다." : isMarriageTiming ? "결혼 의지, 현재 관계, 경제적 준비, 커리어 우선순위와 독립성을 함께 살펴 지금 성향에서 결혼 가능성이 자연스럽게 높아지는 시기를 안내합니다. 결과는 예언이 아닌 현재 선택 패턴에 대한 참고 정보입니다." : isOfficeAnimal ? "업무 추진 방식, 정보 탐색, 협업과 갈등 대처, 정확성, 성과 욕구 등 실제 직장 행동을 기준으로 12지신 동물 유형과 비교합니다. 대표 유형과 함께 숨은 보조 성향도 확인할 수 있습니다." : "초기 자본, 선호 업무 방식, 콘텐츠 제작, 디지털 도구, 수익화 속도 등 12가지 기준을 바탕으로 20개 부업과의 적합도를 비교합니다. 대표 추천뿐 아니라 함께 고려할 만한 후보 3개도 확인할 수 있습니다."}</p></section>
      <TestSeoContent test={test} itemCount={isReactionTime ? undefined : itemCount} answerType={isReactionTime ? undefined : answerType} />
      <RelatedTests current={test} />
      <RelatedArticlesForTest testSlug={test.slug} />
      <JsonLd data={{"@context":"https://schema.org","@type":"CreativeWork",name:seoTitle,description:seoDescription,url:testUrl,inLanguage:"ko-KR",genre:"Self-assessment test",keywords:seoKeywords.slice(0,8).join(", "),interactivityType:"active",isAccessibleForFree:true,publisher:{"@type":"Organization","@id":absoluteUrl("/#organization"),name:siteConfig.name}}} />
      <JsonLd data={{ "@context":"https://schema.org", "@type":"WebApplication", name:seoTitle, description:seoDescription, url:testUrl, applicationCategory:"LifestyleApplication", operatingSystem:"Any", offers:{ "@type":"Offer", price:"0", priceCurrency:"KRW" } }} />
    </div>
  );
}

function RelatedTests({ current }: { current: (typeof tests)[number] }) {
  const related = [...tests]
    .filter((item) => item.slug !== current.slug)
    .sort((a, b) => Number(b.category === current.category) - Number(a.category === current.category) || b.participants - a.participants)
    .slice(0, 3);
  if (related.length === 0) return null;
  return (
    <section className="mx-auto mt-8 max-w-3xl">
      <h2 className="text-xl font-black text-ink">함께 해보면 좋은 테스트</h2>
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {related.map((item) => (
          <Link key={item.slug} href={item.href ?? `/tests/${item.slug}`} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card transition hover:-translate-y-0.5 hover:border-blue-200">
            <span className="text-3xl" aria-hidden="true">{item.icon}</span>
            <h3 className="mt-3 font-extrabold text-ink">{item.shortTitle}</h3>
            <p className="mt-1 text-xs leading-5 text-slate-500">{item.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
