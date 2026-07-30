import type { Locale } from "@/lib/i18n";
import type { TestDefinition, TestQuestion } from "@/lib/types";

type LocalizedQuestion = {
  text?: string;
  options?: Record<number, string>;
};

type TestTranslation = {
  title?: string;
  shortTitle?: string;
  cardTitle?: string;
  description?: string;
  questions?: Record<number, LocalizedQuestion>;
  /** 결과 등급, 해설처럼 테스트 고유 타입에 포함된 문자열의 원문→번역 오버레이 */
  content?: Record<string, string>;
};

const translations: Partial<Record<Locale, Record<string, TestTranslation>>> = {
  en: {
    "limyoungwoong-song-fan-quiz": {
      title: "Lim Young Woong Fan Quiz (Song Edition)",
      shortTitle: "Lim Young Woong Song Fan Quiz",
      cardTitle: "Lim Young Woong Fan Quiz (Song Edition)",
      description: "Match Lim Young Woong's signature songs and album tracks using short musical clues and release information.",
    },
    "youngtak-song-fan-quiz": {
      title: "Youngtak Fan Quiz (Song Edition)",
      shortTitle: "Youngtak Song Fan Quiz",
      cardTitle: "Youngtak Fan Quiz (Song Edition)",
      description: "Test your knowledge of Youngtak's signature songs, albums, and musical clues.",
    },
  },
  ja: {
    "limyoungwoong-song-fan-quiz": {
      title: "イム・ヨンウン ファンクイズ（楽曲編）",
      shortTitle: "イム・ヨンウン 楽曲ファンクイズ",
      cardTitle: "イム・ヨンウン ファンクイズ（楽曲編）",
      description: "短い楽曲ヒントやリリース情報から、イム・ヨンウンの代表曲とアルバム収録曲を当ててみましょう。",
    },
    "youngtak-song-fan-quiz": {
      title: "ヨンタク ファンクイズ（楽曲編）",
      shortTitle: "ヨンタク 楽曲ファンクイズ",
      cardTitle: "ヨンタク ファンクイズ（楽曲編）",
      description: "ヨンタクの代表曲やアルバム、楽曲にまつわる知識を試してみましょう。",
    },
  },
  zh: {
    "limyoungwoong-song-fan-quiz": {
      title: "林英雄粉丝问答（歌曲版）",
      shortTitle: "林英雄歌曲粉丝问答",
      cardTitle: "林英雄粉丝问答（歌曲版）",
      description: "根据简短的歌曲线索和发行信息，挑战林英雄的代表作与专辑收录曲。",
    },
    "youngtak-song-fan-quiz": {
      title: "Youngtak粉丝问答（歌曲版）",
      shortTitle: "Youngtak歌曲粉丝问答",
      cardTitle: "Youngtak粉丝问答（歌曲版）",
      description: "挑战你对Youngtak代表歌曲、专辑和音乐线索的了解。",
    },
  },
};

function fallbackTitle(title: string, locale: Locale) {
  return title;
}

function localizeQuestion(question: TestQuestion, translation?: LocalizedQuestion): TestQuestion {
  if (!translation) return question;
  return {
    ...question,
    text: translation.text ?? question.text,
    options: question.options?.map((option) => ({
      ...option,
      text: translation.options?.[option.value] ?? option.text,
    })),
  };
}

export function localizeTest(test: TestDefinition, locale: Locale): TestDefinition {
  if (locale === "ko") return test;
  const translation = translations[locale]?.[test.slug];
  return {
    ...test,
    title: translation?.title ?? fallbackTitle(test.title, locale),
    shortTitle: translation?.shortTitle ?? fallbackTitle(test.shortTitle, locale),
    cardTitle: translation?.cardTitle
      ? translation.cardTitle
      : test.cardTitle
        ? fallbackTitle(test.cardTitle, locale)
        : undefined,
    description: translation?.description ?? test.description,
    questions: test.questions.map((question) =>
      localizeQuestion(question, translation?.questions?.[question.id])),
  };
}

export function localizeTestText(testSlug: string, text: string, locale: Locale) {
  if (locale === "ko") return text;
  return translations[locale]?.[testSlug]?.content?.[text] ?? text;
}

export function localizeDuration(duration: string, locale: Locale) {
  if (locale === "ko") return duration;
  const match = duration.match(/약\s*(\d+)분/);
  if (!match) return duration;
  if (locale === "en") return `About ${match[1]} min`;
  if (locale === "ja") return `約${match[1]}分`;
  return `约${match[1]}分钟`;
}

export function localizeAnswerType(answerType: string, locale: Locale) {
  if (locale === "ko") return answerType;
  const values: Record<string, Record<Exclude<Locale, "ko">, string>> = {
    "4지선다": { en: "4 choices", ja: "4択", zh: "四选一" },
    "2지선다": { en: "2 choices", ja: "2択", zh: "二选一" },
    "5점 척도": { en: "5-point scale", ja: "5段階評価", zh: "5点量表" },
    "4점 척도": { en: "4-point scale", ja: "4段階評価", zh: "4点量表" },
    "O/X": { en: "True / False", ja: "O / X", zh: "是 / 否" },
  };
  return values[answerType]?.[locale] ?? answerType;
}
