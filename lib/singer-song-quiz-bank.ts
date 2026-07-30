import type {
  SingerSongQuizDifficulty,
  SingerSongQuizQuestion,
  SingerSongQuizQuestionType,
} from "@/lib/singer-song-quiz-engine";

export type SingerSongRecord = {
  title: string;
  album: string;
  releaseDate: string;
  albumType: string;
  trackNumber: number;
  titleTrack: boolean;
  theme: string;
  keyword: string;
  difficulty: SingerSongQuizDifficulty;
  source: string;
};

type BuildConfig = {
  artistName: string;
  idPrefix: string;
  songs: SingerSongRecord[];
};

const unique = (values: string[]) => [...new Set(values)];

function optionsFor(correct: string, values: string[], offset: number) {
  const distractors = unique(values).filter((value) => value !== correct);
  const picked = Array.from(
    { length: 3 },
    (_, index) => distractors[(offset + index * 7) % distractors.length],
  );
  const options = unique([correct, ...picked]);
  if (options.length !== 4) throw new Error(`선택지 생성 실패: ${correct}`);
  const answerIndex = offset % 4;
  options.splice(0, 1);
  options.splice(answerIndex, 0, correct);
  return { options, answerIndex };
}

export function buildSingerSongQuestionBank({ artistName, idPrefix, songs }: BuildConfig) {
  const titles = songs.map((song) => song.title);
  const themes = songs.map((song) => song.theme);
  const keywords = songs.map((song) => song.keyword);
  const albums = songs.map((song) => song.album);
  const dates = songs.map((song) => song.releaseDate);
  const years = songs.map((song) => song.releaseDate.slice(0, 4));
  const albumTypes = songs.map((song) => song.albumType);
  const maxTrackNumber = Math.max(...songs.map((song) => song.trackNumber), 4);
  const trackNumbers = Array.from({ length: maxTrackNumber }, (_, index) => `${index + 1}번`);

  function makeQuestion(
    song: SingerSongRecord,
    songIndex: number,
    variant: number,
    type: SingerSongQuizQuestionType,
    question: string,
    correctAnswer: string,
    optionValues: string[],
    explanation: string,
  ): SingerSongQuizQuestion {
    const { options, answerIndex } = optionsFor(correctAnswer, optionValues, songIndex + variant);
    return {
      id: `${idPrefix}-${song.difficulty}-${String(songIndex + 1).padStart(2, "0")}-${variant + 1}`,
      difficulty: song.difficulty,
      type,
      question,
      options,
      correctAnswer,
      answerIndex,
      songTitle: song.title,
      album: song.album,
      releaseDate: song.releaseDate,
      source: song.source,
      verified: true,
      explanation,
    };
  }

  function makeMetadataQuestion(song: SingerSongRecord, songIndex: number) {
    const mode = songIndex % 4;
    if (mode === 0) {
      return makeQuestion(
        song,
        songIndex,
        9,
        "E",
        `“${song.keyword}”라는 단서로 떠올린 곡의 정확한 발매일은?`,
        song.releaseDate,
        dates,
        `「${song.title}」의 발매일은 ${song.releaseDate}입니다.`,
      );
    }
    if (mode === 1) {
      return makeQuestion(
        song,
        songIndex,
        9,
        "E",
        `“${song.keyword}”라는 단서로 떠올린 곡이 담긴 음반의 유형은?`,
        song.albumType,
        albumTypes,
        `「${song.title}」은 ${song.albumType} 음반인 ${song.album}에 수록되었습니다.`,
      );
    }
    if (mode === 2) {
      return makeQuestion(
        song,
        songIndex,
        9,
        "E",
        `“${song.keyword}”라는 단서로 떠올린 곡의 앨범 트랙 번호는?`,
        `${song.trackNumber}번`,
        trackNumbers,
        `「${song.title}」은 ${song.album}의 ${song.trackNumber}번 트랙입니다.`,
      );
    }
    return makeQuestion(
      song,
      songIndex,
      9,
      "E",
      `“${song.keyword}”라는 단서로 떠올린 곡의 발매 연도는?`,
      song.releaseDate.slice(0, 4),
      years,
      `「${song.title}」의 발매일은 ${song.releaseDate}입니다.`,
    );
  }

  return songs.flatMap((song, songIndex) => {
    const titleLastWord = song.title.split(" ").at(-1) ?? song.title;
    const keywordLastWord = song.keyword.split(" ").at(-1) ?? song.keyword;
    return [
      makeQuestion(
        song,
        songIndex,
        0,
        "A",
        `${song.album} ${song.trackNumber}번 곡의 제목 빈칸을 완성하세요. 「${song.title.replace(titleLastWord, "___")}」`,
        titleLastWord,
        songs.map((item) => item.title.split(" ").at(-1) ?? item.title),
        `정답을 완성하면 ${artistName}의 곡 「${song.title}」이 됩니다.`,
      ),
      makeQuestion(
        song,
        songIndex,
        1,
        "A",
        `「${song.title}」을 떠올리게 하는 짧은 주제 단서의 빈칸은? “${song.keyword.split(" ").slice(0, -1).join(" ")} ___”`,
        keywordLastWord,
        keywords.map((item) => item.split(" ").at(-1) ?? item),
        `이 문항은 가사를 길게 인용하지 않고 「${song.title}」의 핵심 주제를 짧게 요약했습니다.`,
      ),
      makeQuestion(
        song,
        songIndex,
        2,
        "B",
        `짧은 노래 주제 단서 “${song.theme}”가 가리키는 ${artistName}의 곡은?`,
        song.title,
        titles,
        `이 주제 단서는 「${song.title}」을 가리킵니다.`,
      ),
      makeQuestion(
        song,
        songIndex,
        3,
        "B",
        `${song.album}의 ${song.trackNumber}번 트랙이며 “${song.keyword}”를 핵심 단서로 삼은 곡은?`,
        song.title,
        titles,
        `「${song.title}」은 ${song.album}의 ${song.trackNumber}번 트랙입니다.`,
      ),
      makeQuestion(
        song,
        songIndex,
        4,
        "C",
        `다음 중 「${song.title}」의 노래 내용을 가장 가깝게 요약한 짧은 단서는?`,
        song.theme,
        themes,
        `「${song.title}」의 내용은 “${song.theme}”로 요약할 수 있습니다.`,
      ),
      makeQuestion(
        song,
        songIndex,
        5,
        "C",
        `「${song.title}」을 떠올리게 하는 핵심 이미지로 가장 알맞은 것은?`,
        song.keyword,
        keywords,
        `「${song.title}」의 핵심 이미지 단서는 “${song.keyword}”입니다.`,
      ),
      makeQuestion(
        song,
        songIndex,
        6,
        "D",
        `「${song.title}」의 제목 다음에 이어질 노래의 중심 정서로 가장 가까운 것은?`,
        song.theme,
        themes,
        "가사를 직접 이어 쓰는 대신 저작권을 지키며 다음 흐름을 의미 단위로 확인하는 문항입니다.",
      ),
      makeQuestion(
        song,
        songIndex,
        7,
        "D",
        `짧은 단서 “${song.keyword}”에서 이어지는 곡의 제목은?`,
        song.title,
        titles,
        `“${song.keyword}”는 「${song.title}」을 구분하는 짧은 주제 단서입니다.`,
      ),
      makeQuestion(
        song,
        songIndex,
        8,
        "E",
        `“${song.theme}”라는 단서로 떠올린 곡이 수록된 앨범은?`,
        song.album,
        albums,
        `「${song.title}」은 ${song.album}에 수록되었습니다.`,
      ),
      makeMetadataQuestion(song, songIndex),
    ];
  });
}
