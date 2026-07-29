import rawBank from "@/data/question-banks/manchester-united-true-fan.json";
import type { TestDefinition } from "@/lib/types";

export type ManchesterUnitedDifficulty = "easy" | "medium" | "hard";
export type ManchesterUnitedQuestion = { id: string; difficulty: ManchesterUnitedDifficulty; category: string; era: string; type: string; question: string; options: string[]; answerIndex: number; answer: string; explanation: string; sourceIds: string[]; seoKeywords: string[]; status: string; contentPolicy: { rumorFree: boolean; sensitivePrivateInfoExcluded: boolean; officialOrGoverningBodySourcesOnly: boolean } };
export type ManchesterUnitedGrade = { minScore: number; maxScore: number; key: string; title: string; headline: string; description: string; icon: string };
type Source = { id?: string; sourceId?: string; url: string; name?: string; publisher?: string };
type Bank = { test: { resultTiers: Omit<ManchesterUnitedGrade, "icon">[] }; questions: ManchesterUnitedQuestion[]; sourceCatalog: Source[] | Record<string, Source>; validationReport: { passed: boolean; checks: Record<string, boolean>; unknownSourceIds: string[] } };
export const manchesterUnitedBank = rawBank as unknown as Bank;
export const MANCHESTER_UNITED_QUIZ_SIZE = 15, MANCHESTER_UNITED_MAX_SCORE = 29;
export const manchesterUnitedQuota: Record<ManchesterUnitedDifficulty, number> = { easy: 5, medium: 6, hard: 4 };
export const manchesterUnitedWeights: Record<ManchesterUnitedDifficulty, number> = { easy: 1, medium: 2, hard: 3 };
export const manchesterUnitedQuestions = manchesterUnitedBank.questions.filter((q) => q.status === "verified");
const icons = ["🌱", "🔎", "🏟️", "🔴", "⭐", "📚", "👑"];
export const manchesterUnitedGrades: ManchesterUnitedGrade[] = manchesterUnitedBank.test.resultTiers.map((grade, index) => ({ ...grade, icon: icons[index] }));
export const getManchesterUnitedQuestion = (id: string) => manchesterUnitedQuestions.find((q) => q.id === id);
export const getManchesterUnitedGrade = (score: number) => manchesterUnitedGrades.find((g) => score >= g.minScore && score <= g.maxScore) ?? manchesterUnitedGrades[0];
export const getManchesterUnitedGradeByKey = (key: string) => manchesterUnitedGrades.find((g) => g.key === key);

export const manchesterUnitedFanTest: TestDefinition = {
  type: "quiz", slug: "manchester-united-true-fan-test", title: "맨유 팬 퀴즈", shortTitle: "맨유 팬 퀴즈", cardTitle: "맨유 팬 퀴즈",
  description: "창단 역사·올드 트래포드·우승 기록·레전드로 확인하는 맨유 팬심", category: "팬 퀴즈", duration: "약 4~6분", icon: "⚽", thumbnail: "/tests/manchester-united-fan.jpg", participants: 918, accent: "orange", fanTheme: "red-backstage", isNew: true, itemCount: 15, questions: [], resultSlugs: [],
  seoTitle: "맨유 팬 퀴즈 | 나는 몇 점짜리 맨유 팬?", seoDescription: "맨유 창단 역사, 올드 트래포드, 프리미어리그·챔피언스리그 우승, 레전드 선수와 명경기를 묻는 15문항 퀴즈로 나의 팬심을 확인해 보세요.",
  keywords: ["맨유 팬 퀴즈", "맨체스터 유나이티드 팬 퀴즈", "맨체스터 유나이티드 퀴즈", "맨유 퀴즈", "맨유 테스트", "EPL 축구 퀴즈", "프리미어리그 팬 테스트", "Manchester United quiz", "Manchester United true fan test", "Red Devils quiz", "올드 트래포드", "맨유 역사", "맨유 레전드", "맨유 우승 기록"],
  seoContent: { heading: "맨유 팬 퀴즈란?", paragraphs: ["뉴턴 히스 시절부터 올드 트래포드, 버스비 베이브스, 1999년 트레블과 유럽 정상의 순간까지 얼마나 기억하고 있나요? 공식 구단·프리미어리그·UEFA·FA 자료로 검증한 60문항에서 난이도별로 무작위 출제되는 15문항을 풀고 맨유 팬심을 확인해 보세요.", "한 번의 테스트는 easy 5문항, medium 6문항, hard 4문항으로 구성됩니다. 카테고리와 시대가 한쪽에 몰리지 않도록 최소 6개 카테고리와 5개 시대를 포함하며, 결과에서는 정답 수와 29점 만점의 가중 점수, 팬심 백분율, 문제별 해설을 확인할 수 있습니다."], faqs: [["몇 문제가 출제되나요?", "한 번에 15문항이 출제됩니다."], ["문제는 매번 같나요?", "아니요. 60문항에서 난이도와 시대·카테고리 분포를 고려해 구성됩니다."], ["공식 테스트인가요?", "아니요. 공식 공개 자료를 기준으로 미미테스트가 제작한 비공식 팬 퀴즈입니다."]], assesses: "맨체스터 유나이티드의 역사, 경기장, 우승 기록과 레전드에 대한 팬 지식" },
};
