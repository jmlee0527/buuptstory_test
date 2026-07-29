import rawBank from "@/data/question-banks/bigbang-true-fan.json";
import type { TestDefinition } from "@/lib/types";

export type BigbangDifficulty = "easy" | "medium" | "hard";
export type BigbangQuestion = { id:string; difficulty:BigbangDifficulty; category:string; topicGroup:string; question:string; options:string[]; answerIndex:number; answer:string; explanation:string; sourceIds:string[]; verificationStatus:string };
export type BigbangGrade = { min:number; max:number; name:string; summary:string; slug:string; icon:string };
type Bank = { seo:{metaTitle:string;metaDescription:string;keywords:string[]}; scoring:{resultTiers:Omit<BigbangGrade,"slug"|"icon">[]}; verification:{verifiedAt:string}; questions:BigbangQuestion[] };
export const bigbangBank = rawBank as unknown as Bank;
export const BIGBANG_QUIZ_SIZE = 15;
export const bigbangQuota:Record<BigbangDifficulty,number> = { easy:5, medium:6, hard:4 };
export const bigbangQuestions = bigbangBank.questions.filter((q) => q.verificationStatus === "verified");
const visuals = [["entry-explorer","🎧"],["playlist-vip","💿"],["era-vip","✨"],["golden-crown-vip","👑"],["legendary-vip","🌟"],["archive-master","🏆"]] as const;
export const bigbangGrades:BigbangGrade[] = bigbangBank.scoring.resultTiers.map((g,i) => ({...g,slug:visuals[i][0],icon:visuals[i][1]}));
export const getBigbangQuestion = (id:string) => bigbangQuestions.find((q) => q.id === id);
export const getBigbangGrade = (score:number) => bigbangGrades.find((g) => score >= g.min && score <= g.max) ?? bigbangGrades[0];
export const getBigbangGradeBySlug = (slug:string) => bigbangGrades.find((g) => g.slug === slug);

export const bigbangFanTest:TestDefinition = {type:"quiz",slug:"bigbang-true-fan-test",title:"빅뱅 팬 퀴즈 – 나는 진짜 VIP일까?",shortTitle:"빅뱅 팬 퀴즈",cardTitle:"빅뱅 팬 퀴즈",description:"노래·앨범·수록곡·콘서트 기록으로 확인하는 나의 VIP 팬 지수",category:"팬 퀴즈",duration:"약 3분",icon:"👑",thumbnail:"/tests/bigbang-fan.jpg",participants:614,isNew:true,accent:"indigo",fanTheme:"purple-night",itemCount:15,questions:[],resultSlugs:[],seoTitle:bigbangBank.seo.metaTitle,seoDescription:bigbangBank.seo.metaDescription,keywords:bigbangBank.seo.keywords,seoContent:{heading:"빅뱅 팬 퀴즈란?",paragraphs:["BIGBANG의 데뷔와 대표곡, 앨범 수록곡, MADE SERIES, 공연 기록을 얼마나 정확히 기억하고 있나요? 검증 완료된 60문항 중 난이도별 15문항을 풀고 나의 VIP 팬 지수를 확인해 보세요.","한 번의 테스트는 easy 5문항, medium 6문항, hard 4문항으로 구성됩니다. 동일 주제가 반복되지 않도록 제한하고 최근 응시 문제와의 중복도 가능한 한 줄입니다. 제출 후에는 점수, 정답률, VIP 등급과 문항별 해설을 확인할 수 있습니다."],faqs:[["몇 문제가 출제되나요?","한 번에 15문항이 출제됩니다."],["문제는 매번 같나요?","아니요. 검증된 60문항에서 난이도와 주제 제한에 따라 새롭게 구성됩니다."],["공식 BIGBANG 테스트인가요?","아니요. 공개된 공식 자료를 바탕으로 미미테스트가 자체 제작한 비공식 팬 퀴즈입니다."]],assesses:"BIGBANG의 데뷔, 음반, 노래, 공연 기록에 대한 팬 지식"}};
