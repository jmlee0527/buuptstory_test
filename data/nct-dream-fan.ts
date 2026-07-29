import rawBank from "@/data/question-banks/nct-dream-true-fan.json";
import type { TestDefinition } from "@/lib/types";

export type NctDreamDifficulty="easy"|"medium"|"hard";
export type NctDreamQuestion={id:string;difficulty:NctDreamDifficulty;weight:number;category:string;topicKey:string;factGroup:string;question:string;choices:string[];answerIndex:number;answer:string;explanation:string;sourceIds:string[];verificationStatus:string};
export type NctDreamGrade={minScore:number;maxScore:number;title:string;badge:string;summary:string;slug:string;icon:string};
type Bank={test:{verifiedAt:string;seo:{metaTitle:string;metaDescription:string;primaryKeyword:string;secondaryKeywords:string[]};resultLevels:Omit<NctDreamGrade,"slug"|"icon">[]};questions:NctDreamQuestion[];sources:{id:string;url:string}[]};
export const nctDreamBank=rawBank as unknown as Bank;
export const NCT_DREAM_QUIZ_SIZE=15;
export const NCT_DREAM_MAX_SCORE=30;
export const nctDreamQuota:Record<NctDreamDifficulty,number>={easy:5,medium:5,hard:5};
export const nctDreamQuestions=nctDreamBank.questions.filter(q=>q.verificationStatus==="verified");
const visuals=[["dream-starter","🌱"],["nctzen-sprout","🍀"],["dream-explorer","🚀"],["trusted-nctzen","💚"],["7dream-core","⭐"],["dream-master","🏆"]]as const;
export const nctDreamGrades:NctDreamGrade[]=nctDreamBank.test.resultLevels.map((g,i)=>({...g,slug:visuals[i][0],icon:visuals[i][1]}));
export const getNctDreamQuestion=(id:string)=>nctDreamQuestions.find(q=>q.id===id);
export const getNctDreamGrade=(score:number)=>nctDreamGrades.find(g=>score>=g.minScore&&score<=g.maxScore)??nctDreamGrades[0];
export const getNctDreamGradeBySlug=(slug:string)=>nctDreamGrades.find(g=>g.slug===slug);

const seo=nctDreamBank.test.seo;
export const nctDreamFanTest:TestDefinition={type:"quiz",slug:"nct-dream-true-fan-test",title:"NCT DREAM 팬 퀴즈",shortTitle:"NCT DREAM 팬 퀴즈",cardTitle:"NCT DREAM 팬 퀴즈",description:"멤버부터 앨범, 수록곡, 공연 기록까지 15문제로 나의 시즈니 팬심을 확인해보세요.",category:"팬 퀴즈",duration:"약 3~5분",icon:"💚",thumbnail:"/tests/nct-dream-fan.jpg",participants:532,isNew:true,accent:"green",fanTheme:"mint-stage",itemCount:15,questions:[],resultSlugs:[],seoTitle:seo.metaTitle,seoDescription:seo.metaDescription,keywords:[seo.primaryKeyword,...seo.secondaryKeywords,"NCTDREAM","엔시티 드림"],seoContent:{heading:"NCT DREAM 팬 퀴즈란?",paragraphs:["NCT DREAM 멤버와 데뷔, 앨범, 수록곡, 일본 활동과 THE DREAM SHOW를 얼마나 잘 기억하고 있나요? 공식 사이트·공식 음원·공식 공연 공지를 기준으로 검증한 60문항에서 매회 15문제를 출제합니다.","쉬움·보통·어려움 문제를 각각 5개씩 구성하고, 같은 사실이나 특정 앨범에 문제가 몰리지 않도록 주제 균형을 맞춥니다. 결과에서는 30점 만점의 가중 점수와 정답 수, 시즈니 팬심 지수, 문제별 정답과 해설을 확인할 수 있습니다."],faqs:[["NCT DREAM 팬 퀴즈는 몇 문제인가요?","총 60문제의 검증된 문제 풀에서 쉬움, 보통, 어려움 난이도별로 5문제씩 뽑아 매회 15문제를 제공합니다."],["문제는 매번 같나요?","아니요. 난이도와 주제 균형을 유지하면서 문제와 선택지 순서를 무작위로 구성합니다."],["테스트 결과는 어떻게 계산하나요?","쉬움 1점, 보통 2점, 어려움 3점으로 가중치를 적용해 총 30점 기준의 팬심 레벨을 보여줍니다."]],assesses:"NCT DREAM 멤버, 음반, 수록곡, 일본 활동과 공연 기록에 대한 팬 지식"}};
