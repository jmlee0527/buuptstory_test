import {
  iceCreamProfiles,
  iceCreamQuestions,
  iceCreamTraitKeys,
  type IceCreamProfile,
  type IceCreamScores,
} from "@/data/icecream-personality";

export const ICE_CREAM_QUESTION_COUNT = 12;

const axisBounds = Object.fromEntries(iceCreamTraitKeys.map((trait) => [
  trait,
  {
    min: iceCreamQuestions.reduce((total, question) => total + Math.min(...question.options.map((option) => option.weights[trait])), 0),
    max: iceCreamQuestions.reduce((total, question) => total + Math.max(...question.options.map((option) => option.weights[trait])), 0),
  },
])) as Record<keyof IceCreamScores, { min: number; max: number }>;

const clamp = (value: number, min = 0, max = 100) => Math.min(max, Math.max(min, value));

export function calculateIceCreamScores(answers: number[]): IceCreamScores {
  const raw = Object.fromEntries(iceCreamTraitKeys.map((trait) => [trait, 0])) as IceCreamScores;
  iceCreamQuestions.forEach((question, questionIndex) => {
    const optionIndex = answers[questionIndex];
    const option = question.options[optionIndex];
    if (!option) return;
    iceCreamTraitKeys.forEach((trait) => { raw[trait] += option.weights[trait]; });
  });
  return Object.fromEntries(iceCreamTraitKeys.map((trait) => {
    const { min, max } = axisBounds[trait];
    return [trait, Math.round(clamp(((raw[trait] - min) / (max - min)) * 100))];
  })) as IceCreamScores;
}

function distance(scores: IceCreamScores, target: IceCreamScores) {
  return Math.sqrt(iceCreamTraitKeys.reduce((sum, trait) => sum + (scores[trait] - target[trait]) ** 2, 0) / iceCreamTraitKeys.length);
}

export function calculateIceCreamResult(answers: number[]): {
  profile: IceCreamProfile;
  secondary: IceCreamProfile;
  scores: IceCreamScores;
  fitScore: number;
} {
  if (answers.length !== ICE_CREAM_QUESTION_COUNT || answers.some((answer) => !Number.isInteger(answer) || answer < 0 || answer > 3)) {
    throw new Error("아이스크림 테스트 답변 12개가 필요합니다.");
  }
  const scores = calculateIceCreamScores(answers);
  const ranked = iceCreamProfiles
    .map((profile) => ({ profile, distance: distance(scores, profile.targetScores) }))
    .sort((a, b) => a.distance - b.distance || a.profile.slug.localeCompare(b.profile.slug));
  return {
    profile: ranked[0].profile,
    secondary: ranked[1].profile,
    scores,
    fitScore: Math.round(clamp(100 - ranked[0].distance)),
  };
}

export const encodeIceCreamAnswers = (answers: number[]) => answers.join("");

export function parseIceCreamAnswers(value?: string): number[] | null {
  if (!value || !/^\d{12}$/.test(value)) return null;
  const answers = [...value].map(Number);
  return answers.every((answer) => answer >= 0 && answer <= 3) ? answers : null;
}
