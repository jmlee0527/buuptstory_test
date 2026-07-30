import type { TestDefinition } from "@/lib/types";
import type {
  SingerSongQuizDifficulty,
  SingerSongQuizQuestion,
  SingerSongQuizQuestionType,
} from "@/lib/singer-song-quiz-engine";

export const YOUNGTAK_SONG_QUIZ_SIZE = 12;
export const YOUNGTAK_SONG_QUIZ_MAX_SCORE = 100;
export const YOUNGTAK_SONG_QUIZ_VERIFIED_AT = "2026-07-30";

export const youngtakSongQuizQuota: Record<SingerSongQuizDifficulty, number> = {
  medium: 4,
  high: 4,
  expert: 4,
};

type SongRecord = {
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

const BUGS_MMM = "https://music.bugs.co.kr/album/4077412";
const BUGS_FORM = "https://music.bugs.co.kr/album/4089759";
const BUGS_SUPER = "https://music.bugs.co.kr/album/4106616";
const BUGS_WHY = "https://music.bugs.co.kr/album/20201635";
const BUGS_JJIN = "https://music.bugs.co.kr/album/20311994";
const BUGS_ABALONE = "https://music.bugs.co.kr/artist/80259668/albums";

const songs: SongRecord[] = [
  { title: "니가 왜 거기서 나와", album: "니가 왜 거기서 나와", releaseDate: "2018-10-21", albumType: "싱글", trackNumber: 1, titleTrack: true, theme: "뜻밖의 장소에서 마주친 연인", keyword: "뜻밖의 만남", difficulty: "medium", source: BUGS_WHY },
  { title: "찐이야", album: "내일은 미스터트롯 결승전 베스트", releaseDate: "2020-03-13", albumType: "컴필레이션", trackNumber: 5, titleTrack: true, theme: "진짜 사랑을 향한 감탄", keyword: "진짜 사랑", difficulty: "medium", source: BUGS_JJIN },
  { title: "전복 먹으러 갈래", album: "전복 먹으러 갈래", releaseDate: "2022-02-10", albumType: "싱글", trackNumber: 1, titleTrack: true, theme: "바다로 떠나는 유쾌한 데이트 제안", keyword: "바다 데이트", difficulty: "medium", source: BUGS_ABALONE },
  { title: "신사답게", album: "MMM", releaseDate: "2022-07-04", albumType: "정규 1집", trackNumber: 4, titleTrack: true, theme: "품격과 여유를 지키는 사랑", keyword: "신사의 품격", difficulty: "medium", source: BUGS_MMM },
  { title: "폼미쳤다", album: "FORM", releaseDate: "2023-08-01", albumType: "정규 2집", trackNumber: 3, titleTrack: true, theme: "자신감 넘치는 태도와 에너지", keyword: "당당한 자신감", difficulty: "medium", source: BUGS_FORM },
  { title: "니편이야", album: "FORM", releaseDate: "2023-08-01", albumType: "정규 2집", trackNumber: 9, titleTrack: false, theme: "언제나 곁을 지키겠다는 약속", keyword: "한결같은 약속", difficulty: "medium", source: BUGS_FORM },
  { title: "슈퍼슈퍼", album: "SuperSuper", releaseDate: "2024-09-03", albumType: "EP", trackNumber: 1, titleTrack: true, theme: "힘차게 솟아나는 긍정 에너지", keyword: "긍정 에너지", difficulty: "medium", source: BUGS_SUPER },
  { title: "한량가", album: "MMM", releaseDate: "2022-07-04", albumType: "정규 1집", trackNumber: 11, titleTrack: false, theme: "오늘 밤을 신명 나게 즐기는 흥", keyword: "밤의 흥", difficulty: "medium", source: BUGS_MMM },
  { title: "톡톡톡", album: "FORM", releaseDate: "2023-08-01", albumType: "정규 2집", trackNumber: 2, titleTrack: false, theme: "마음을 두드리는 설렘", keyword: "두드리는 설렘", difficulty: "medium", source: BUGS_FORM },
  { title: "가을이 오려나", album: "SuperSuper", releaseDate: "2024-09-03", albumType: "EP", trackNumber: 4, titleTrack: false, theme: "계절이 바뀌며 찾아오는 그리움", keyword: "가을의 그리움", difficulty: "medium", source: BUGS_SUPER },

  { title: "담", album: "MMM", releaseDate: "2022-07-04", albumType: "정규 1집", trackNumber: 1, titleTrack: false, theme: "앞을 막는 벽을 넘어서는 의지", keyword: "벽을 넘는 의지", difficulty: "high", source: BUGS_MMM },
  { title: "재잘대", album: "MMM", releaseDate: "2022-07-04", albumType: "정규 1집", trackNumber: 2, titleTrack: false, theme: "걱정을 내려놓고 이어가는 다정한 대화", keyword: "다정한 대화", difficulty: "high", source: BUGS_MMM },
  { title: "우주선", album: "MMM", releaseDate: "2022-07-04", albumType: "정규 1집", trackNumber: 3, titleTrack: false, theme: "소중한 사람과 함께 떠나는 우주 여행", keyword: "함께할 우주", difficulty: "high", source: BUGS_MMM },
  { title: "머선 129", album: "MMM", releaseDate: "2022-07-04", albumType: "정규 1집", trackNumber: 7, titleTrack: false, theme: "예상 밖의 상황에서 커지는 설렘", keyword: "뜻밖의 설렘", difficulty: "high", source: BUGS_MMM },
  { title: "찬찬히", album: "MMM", releaseDate: "2022-07-04", albumType: "정규 1집", trackNumber: 8, titleTrack: false, theme: "서두르지 않고 천천히 다가가는 마음", keyword: "느린 마음", difficulty: "high", source: BUGS_MMM },
  { title: "갈색우산", album: "MMM", releaseDate: "2022-07-04", albumType: "정규 1집", trackNumber: 9, titleTrack: false, theme: "비 오는 날 우산에 스민 추억", keyword: "비와 추억", difficulty: "high", source: BUGS_MMM },
  { title: "올려", album: "FORM", releaseDate: "2023-08-01", albumType: "정규 2집", trackNumber: 4, titleTrack: false, theme: "한계를 더 높이 끌어올리는 에너지", keyword: "한계를 올리는 힘", difficulty: "high", source: BUGS_FORM },
  { title: "값", album: "FORM", releaseDate: "2023-08-01", albumType: "정규 2집", trackNumber: 7, titleTrack: false, theme: "스스로의 가치를 당당하게 바라보는 태도", keyword: "나의 가치", difficulty: "high", source: BUGS_FORM },
  { title: "사랑옥", album: "SuperSuper", releaseDate: "2024-09-03", albumType: "EP", trackNumber: 3, titleTrack: false, theme: "사랑을 정성껏 품어 두는 공간", keyword: "사랑의 공간", difficulty: "high", source: BUGS_SUPER },
  { title: "Brighten", album: "SuperSuper", releaseDate: "2024-09-03", albumType: "EP", trackNumber: 5, titleTrack: false, theme: "어두운 마음이 환하게 밝아지는 순간", keyword: "밝아지는 순간", difficulty: "high", source: BUGS_SUPER },

  { title: "Second Chance", album: "MMM", releaseDate: "2022-07-04", albumType: "정규 1집", trackNumber: 5, titleTrack: false, theme: "다시 찾아온 기회를 붙드는 마음", keyword: "두 번째 기회", difficulty: "expert", source: BUGS_MMM },
  { title: "달이 되어", album: "MMM", releaseDate: "2022-07-04", albumType: "정규 1집", trackNumber: 6, titleTrack: false, theme: "달빛처럼 곁을 비추는 그리움", keyword: "달빛의 그리움", difficulty: "expert", source: BUGS_MMM },
  { title: "아내", album: "MMM", releaseDate: "2022-07-04", albumType: "정규 1집", trackNumber: 10, titleTrack: false, theme: "오랜 시간 곁을 지킨 사람에게 전하는 고마움", keyword: "곁을 지킨 고마움", difficulty: "expert", source: BUGS_MMM },
  { title: "안녕 김녕", album: "MMM", releaseDate: "2022-07-04", albumType: "정규 1집", trackNumber: 12, titleTrack: false, theme: "제주의 바다 마을에 건네는 작별 인사", keyword: "제주와 작별", difficulty: "expert", source: BUGS_MMM },
  { title: "로렐라이", album: "FORM", releaseDate: "2023-08-01", albumType: "정규 2집", trackNumber: 1, titleTrack: false, theme: "거스를 수 없는 목소리에 이끌리는 마음", keyword: "신비한 이끌림", difficulty: "expert", source: BUGS_FORM },
  { title: "이별해, 예쁘게", album: "FORM", releaseDate: "2023-08-01", albumType: "정규 2집", trackNumber: 5, titleTrack: false, theme: "마지막까지 아름답게 보내려는 이별", keyword: "아름다운 이별", difficulty: "expert", source: BUGS_FORM },
  { title: "우길걸우겨", album: "FORM", releaseDate: "2023-08-01", albumType: "정규 2집", trackNumber: 6, titleTrack: false, theme: "고집스러운 마음과 팽팽한 대화", keyword: "팽팽한 고집", difficulty: "expert", source: BUGS_FORM },
  { title: "돌아가네", album: "FORM", releaseDate: "2023-08-01", albumType: "정규 2집", trackNumber: 8, titleTrack: false, theme: "흘러간 시간과 기억을 되짚는 마음", keyword: "되돌아보는 시간", difficulty: "expert", source: BUGS_FORM },
  { title: "풀리나", album: "FORM", releaseDate: "2023-08-01", albumType: "정규 2집", trackNumber: 10, titleTrack: false, theme: "답답하게 얽힌 마음이 풀리길 바라는 소망", keyword: "풀리길 바라는 마음", difficulty: "expert", source: BUGS_FORM },
  { title: "사막에 빙어", album: "SuperSuper", releaseDate: "2024-09-03", albumType: "EP", trackNumber: 2, titleTrack: false, theme: "서로 어울리지 않는 이미지가 만드는 유쾌함", keyword: "반전의 유쾌함", difficulty: "expert", source: BUGS_SUPER },
];

const unique = (values: string[]) => [...new Set(values)];

function optionsFor(correct: string, values: string[], offset: number) {
  const distractors = unique(values).filter((value) => value !== correct);
  const picked = Array.from({ length: 3 }, (_, index) => distractors[(offset + index * 7) % distractors.length]);
  const options = unique([correct, ...picked]);
  if (options.length !== 4) throw new Error(`선택지 생성 실패: ${correct}`);
  const answerIndex = offset % 4;
  options.splice(0, 1);
  options.splice(answerIndex, 0, correct);
  return { options, answerIndex };
}

function makeQuestion(
  song: SongRecord,
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
    id: `youngtak-song-${song.difficulty}-${String(songIndex + 1).padStart(2, "0")}-${variant + 1}`,
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

const titles = songs.map((song) => song.title);
const themes = songs.map((song) => song.theme);
const keywords = songs.map((song) => song.keyword);
const albums = songs.map((song) => song.album);
const dates = songs.map((song) => song.releaseDate);
const years = songs.map((song) => song.releaseDate.slice(0, 4));
const albumTypes = songs.map((song) => song.albumType);
const trackNumbers = Array.from({ length: 12 }, (_, index) => `${index + 1}번`);

function makeMetadataQuestion(song: SongRecord, songIndex: number) {
  const mode = songIndex % 4;
  if (mode === 0) {
    return makeQuestion(song, songIndex, 9, "E", `“${song.keyword}”라는 단서로 떠올린 곡의 정확한 발매일은?`, song.releaseDate, dates, `「${song.title}」의 발매일은 ${song.releaseDate}입니다.`);
  }
  if (mode === 1) {
    return makeQuestion(song, songIndex, 9, "E", `“${song.keyword}”라는 단서로 떠올린 곡이 담긴 음반의 유형은?`, song.albumType, albumTypes, `「${song.title}」은 ${song.albumType} 음반인 ${song.album}에 수록되었습니다.`);
  }
  if (mode === 2) {
    return makeQuestion(song, songIndex, 9, "E", `“${song.keyword}”라는 단서로 떠올린 곡의 앨범 트랙 번호는?`, `${song.trackNumber}번`, trackNumbers, `「${song.title}」은 ${song.album}의 ${song.trackNumber}번 트랙입니다.`);
  }
  return makeQuestion(song, songIndex, 9, "E", `“${song.keyword}”라는 단서로 떠올린 곡의 발매 연도는?`, song.releaseDate.slice(0, 4), years, `「${song.title}」의 발매일은 ${song.releaseDate}입니다.`);
}

export const youngtakSongQuizQuestions: SingerSongQuizQuestion[] = songs.flatMap((song, songIndex) => [
  makeQuestion(song, songIndex, 0, "A", `${song.album} ${song.trackNumber}번 곡의 제목 빈칸을 완성하세요. 「${song.title.replace(song.title.split(" ").at(-1) ?? song.title, "___")}」`, song.title.split(" ").at(-1) ?? song.title, songs.map((item) => item.title.split(" ").at(-1) ?? item.title), `정답을 완성하면 영탁의 곡 「${song.title}」이 됩니다.`),
  makeQuestion(song, songIndex, 1, "A", `「${song.title}」을 떠올리게 하는 짧은 주제 단서의 빈칸은? “${song.keyword.split(" ").slice(0, -1).join(" ")} ___”`, song.keyword.split(" ").at(-1) ?? song.keyword, keywords.map((item) => item.split(" ").at(-1) ?? item), `이 문항은 가사를 길게 인용하지 않고 「${song.title}」의 핵심 주제를 짧게 요약했습니다.`),
  makeQuestion(song, songIndex, 2, "B", `짧은 노래 주제 단서 “${song.theme}”가 가리키는 영탁의 곡은?`, song.title, titles, `이 주제 단서는 「${song.title}」을 가리킵니다.`),
  makeQuestion(song, songIndex, 3, "B", `${song.album}의 ${song.trackNumber}번 트랙이며 “${song.keyword}”를 핵심 단서로 삼은 곡은?`, song.title, titles, `「${song.title}」은 ${song.album}의 ${song.trackNumber}번 트랙입니다.`),
  makeQuestion(song, songIndex, 4, "C", `다음 중 「${song.title}」의 노래 내용을 가장 가깝게 요약한 짧은 단서는?`, song.theme, themes, `「${song.title}」의 내용은 “${song.theme}”로 요약할 수 있습니다.`),
  makeQuestion(song, songIndex, 5, "C", `「${song.title}」을 떠올리게 하는 핵심 이미지로 가장 알맞은 것은?`, song.keyword, keywords, `「${song.title}」의 핵심 이미지 단서는 “${song.keyword}”입니다.`),
  makeQuestion(song, songIndex, 6, "D", `「${song.title}」의 제목 다음에 이어질 노래의 중심 정서로 가장 가까운 것은?`, song.theme, themes, `가사를 직접 이어 쓰는 대신 저작권을 지키며 다음 흐름을 의미 단위로 확인하는 문항입니다.`),
  makeQuestion(song, songIndex, 7, "D", `짧은 단서 “${song.keyword}”에서 이어지는 곡의 제목은?`, song.title, titles, `“${song.keyword}”는 「${song.title}」을 구분하는 짧은 주제 단서입니다.`),
  makeQuestion(song, songIndex, 8, "E", `“${song.theme}”라는 단서로 떠올린 곡이 수록된 앨범은?`, song.album, albums, `「${song.title}」은 ${song.album}에 수록되었습니다.`),
  makeMetadataQuestion(song, songIndex),
]);

export const getYoungtakSongQuizQuestion = (id: string) =>
  youngtakSongQuizQuestions.find((question) => question.id === id);

export const youngtakSongQuizTest: TestDefinition = {
  type: "quiz",
  slug: "youngtak-song-fan-quiz",
  title: "영탁 팬 퀴즈(노래 버전)",
  shortTitle: "영탁 노래 팬 퀴즈",
  cardTitle: "영탁 팬 퀴즈(노래 버전)",
  description: "영탁의 대표곡과 정규 앨범 수록곡을 짧은 노래 단서와 음악 정보로 맞혀 보세요.",
  category: "팬 퀴즈",
  duration: "약 3분",
  icon: "🎤",
  thumbnail: "/tests/youngtak-song-fan.png",
  participants: 0,
  accent: "purple",
  fanTheme: "purple-night",
  isNew: true,
  itemCount: YOUNGTAK_SONG_QUIZ_SIZE,
  questions: [],
  resultSlugs: Array.from({ length: 10 }, (_, index) => `level-${index + 1}`),
  seoTitle: "영탁 팬 퀴즈(노래 버전) | 영탁 노래 퀴즈",
  seoDescription: "미미테스트 영탁 팬 퀴즈(노래 버전)에서 대표곡과 앨범 수록곡 300문항 중 난이도별 4문항씩 총 12문제를 풀고 LEVEL 1~10 결과를 확인해 보세요.",
  keywords: ["영탁 팬 퀴즈", "영탁 노래 퀴즈", "영탁 가사 퀴즈", "영탁 팬 테스트", "영탁 노래 테스트"],
  seoContent: {
    heading: "영탁 팬 퀴즈(노래 버전)란?",
    paragraphs: [
      "영탁의 대표곡과 정규 1집 MMM, 정규 2집 FORM, EP SuperSuper의 수록곡을 바탕으로 구성한 비공식 팬 퀴즈입니다.",
      "중·상·최상 각 100문항, 총 300문항에서 난이도별 4문항씩 뽑아 12문항을 출제합니다. 긴 가사 대신 짧은 곡명·주제 단서와 검증된 앨범 정보를 사용합니다.",
      "정답 개수는 100점 만점으로 환산되고 결과는 별도 별칭 없이 LEVEL 1부터 LEVEL 10까지 표시됩니다.",
    ],
    faqs: [
      ["몇 문제가 출제되나요?", "총 300문항 중 중 4문항, 상 4문항, 최상 4문항을 무작위로 뽑아 12문항이 출제됩니다."],
      ["문제와 보기 순서는 매번 같나요?", "아니요. 재도전할 때 문제 조합과 전체 순서, 보기 순서가 다시 섞입니다."],
      ["점수와 레벨은 어떻게 계산되나요?", "12문항의 정답 개수를 100점 만점으로 환산하고 점수에 따라 LEVEL 1~10으로 표시합니다."],
      ["공식 영탁 테스트인가요?", "아니요. 공개된 음원·앨범 정보를 바탕으로 미미테스트가 제작한 비공식 팬 퀴즈입니다."],
    ],
    assesses: "영탁의 대표곡, 앨범 수록곡과 발매 정보에 대한 팬 지식",
  },
};

export const youngtakSongCatalogForValidation = songs;
