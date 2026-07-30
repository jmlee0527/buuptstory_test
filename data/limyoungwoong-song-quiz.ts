import type { TestDefinition } from "@/lib/types";
import {
  buildSingerSongQuestionBank,
  type SingerSongRecord,
} from "@/lib/singer-song-quiz-bank";
import type { SingerSongQuizDifficulty } from "@/lib/singer-song-quiz-engine";

export const LIMYOUNGWOONG_SONG_QUIZ_SIZE = 12;
export const LIMYOUNGWOONG_SONG_QUIZ_VERIFIED_AT = "2026-07-30";

export const limYoungWoongSongQuizQuota: Record<SingerSongQuizDifficulty, number> = {
  medium: 4,
  high: 4,
  expert: 4,
};

const BUGS_IM_HERO = "https://music.bugs.co.kr/album/20462525";
const BUGS_IM_HERO_2 = "https://music.bugs.co.kr/album/4126527";
const BUGS_ARTIST = "https://music.bugs.co.kr/artist/80265501";
const BUGS_POLAROID = "https://music.bugs.co.kr/album/20527897";
const BUGS_DO_OR_DIE = "https://music.bugs.co.kr/album/4091827";
const BUGS_WARMTH = "https://music.bugs.co.kr/album/4100882";

const songs: SingerSongRecord[] = [
  { title: "다시 만날 수 있을까", album: "IM HERO", releaseDate: "2022-05-02", albumType: "정규 1집", trackNumber: 1, titleTrack: true, theme: "떠난 사람과 다시 만나고 싶은 간절한 마음", keyword: "간절한 재회", difficulty: "medium", source: BUGS_IM_HERO },
  { title: "무지개", album: "IM HERO", releaseDate: "2022-05-02", albumType: "정규 1집", trackNumber: 2, titleTrack: false, theme: "소중한 사람과 함께 떠나는 행복한 여행", keyword: "함께할 여행", difficulty: "medium", source: BUGS_IM_HERO },
  { title: "우리들의 블루스", album: "IM HERO", releaseDate: "2022-05-02", albumType: "정규 1집", trackNumber: 4, titleTrack: false, theme: "평범한 삶의 슬픔과 희망을 감싸는 위로", keyword: "삶의 위로", difficulty: "medium", source: BUGS_IM_HERO },
  { title: "아버지", album: "IM HERO", releaseDate: "2022-05-02", albumType: "정규 1집", trackNumber: 5, titleTrack: false, theme: "아버지를 향한 그리움과 뒤늦은 고마움", keyword: "아버지의 그리움", difficulty: "medium", source: BUGS_IM_HERO },
  { title: "사랑역", album: "IM HERO", releaseDate: "2022-05-02", albumType: "정규 1집", trackNumber: 7, titleTrack: false, theme: "사랑의 만남과 이별을 기차역에 빗댄 마음", keyword: "사랑의 기차역", difficulty: "medium", source: BUGS_IM_HERO },
  { title: "사랑은 늘 도망가", album: "신사와 아가씨 OST Part.2", releaseDate: "2021-10-11", albumType: "OST", trackNumber: 1, titleTrack: true, theme: "붙잡으려 할수록 멀어지는 사랑의 안타까움", keyword: "도망가는 사랑", difficulty: "medium", source: BUGS_ARTIST },
  { title: "이제 나만 믿어요", album: "내일은 미스터트롯 우승자 특전곡", releaseDate: "2020-04-03", albumType: "싱글", trackNumber: 1, titleTrack: true, theme: "앞으로의 길을 함께하겠다는 든든한 약속", keyword: "믿음의 약속", difficulty: "medium", source: BUGS_ARTIST },
  { title: "별빛 같은 나의 사랑아", album: "별빛 같은 나의 사랑아", releaseDate: "2021-03-09", albumType: "싱글", trackNumber: 1, titleTrack: true, theme: "오랜 시간 곁을 비춘 사랑을 향한 고백", keyword: "별빛의 사랑", difficulty: "medium", source: BUGS_ARTIST },
  { title: "모래 알갱이", album: "모래 알갱이", releaseDate: "2023-06-05", albumType: "싱글", trackNumber: 1, titleTrack: true, theme: "작은 존재도 편안히 쉬어가길 바라는 위로", keyword: "작은 쉼표", difficulty: "medium", source: BUGS_ARTIST },
  { title: "Do or Die", album: "Do or Die", releaseDate: "2023-10-09", albumType: "싱글", trackNumber: 1, titleTrack: true, theme: "무대 위에서 후회 없이 나아가는 뜨거운 열정", keyword: "도전의 열정", difficulty: "medium", source: BUGS_DO_OR_DIE },

  { title: "손이 참 곱던 그대", album: "IM HERO", releaseDate: "2022-05-02", albumType: "정규 1집", trackNumber: 3, titleTrack: false, theme: "고운 손에 남은 세월과 사랑을 바라보는 마음", keyword: "고운 손의 기억", difficulty: "high", source: BUGS_IM_HERO },
  { title: "A bientot", album: "IM HERO", releaseDate: "2022-05-02", albumType: "정규 1집", trackNumber: 6, titleTrack: false, theme: "이별 뒤에도 다시 만날 날을 기약하는 인사", keyword: "다시 만날 인사", difficulty: "high", source: BUGS_IM_HERO },
  { title: "보금자리", album: "IM HERO", releaseDate: "2022-05-02", albumType: "정규 1집", trackNumber: 8, titleTrack: false, theme: "사랑하는 사람과 머물 따뜻한 공간을 향한 마음", keyword: "따뜻한 보금자리", difficulty: "high", source: BUGS_IM_HERO },
  { title: "사랑해 진짜", album: "IM HERO", releaseDate: "2022-05-02", albumType: "정규 1집", trackNumber: 9, titleTrack: false, theme: "꾸밈없이 진심을 전하는 밝고 솔직한 사랑", keyword: "솔직한 고백", difficulty: "high", source: BUGS_IM_HERO },
  { title: "연애편지", album: "IM HERO", releaseDate: "2022-05-02", albumType: "정규 1집", trackNumber: 10, titleTrack: false, theme: "말로 다 하지 못한 사랑을 글에 담는 마음", keyword: "편지의 사랑", difficulty: "high", source: BUGS_IM_HERO },
  { title: "사랑해요 그대를", album: "IM HERO", releaseDate: "2022-05-02", albumType: "정규 1집", trackNumber: 11, titleTrack: false, theme: "한 사람을 향해 깊고 변함없는 사랑을 전하는 고백", keyword: "변함없는 고백", difficulty: "high", source: BUGS_IM_HERO },
  { title: "ULSSIGU", album: "IM HERO 2", releaseDate: "2025-08-29", albumType: "정규 2집", trackNumber: 2, titleTrack: false, theme: "흥겨운 추임새와 자신감으로 분위기를 끌어올리는 노래", keyword: "흥겨운 에너지", difficulty: "high", source: BUGS_IM_HERO_2 },
  { title: "순간을 영원처럼", album: "IM HERO 2", releaseDate: "2025-08-29", albumType: "정규 2집", trackNumber: 3, titleTrack: true, theme: "소중한 지금의 순간을 오래 간직하고 싶은 마음", keyword: "영원할 순간", difficulty: "high", source: BUGS_IM_HERO_2 },
  { title: "Polaroid", album: "Polaroid", releaseDate: "2022-11-15", albumType: "싱글", trackNumber: 2, titleTrack: true, theme: "함께한 시간을 한 장의 사진처럼 간직하는 사랑", keyword: "사진 속 추억", difficulty: "high", source: BUGS_POLAROID },
  { title: "온기", album: "온기", releaseDate: "2024-05-06", albumType: "싱글", trackNumber: 2, titleTrack: true, theme: "지친 마음에 따뜻함을 건네는 조용한 위로", keyword: "따뜻한 위로", difficulty: "high", source: BUGS_WARMTH },

  { title: "인생찬가", album: "IM HERO", releaseDate: "2022-05-02", albumType: "정규 1집", trackNumber: 12, titleTrack: false, theme: "굴곡진 삶을 견딘 모두에게 보내는 힘찬 응원", keyword: "인생의 응원", difficulty: "expert", source: BUGS_IM_HERO },
  { title: "답장을 보낸지", album: "IM HERO 2", releaseDate: "2025-08-29", albumType: "정규 2집", trackNumber: 1, titleTrack: false, theme: "답장을 보낸 뒤 상대의 마음을 기다리는 시간", keyword: "답장 뒤 기다림", difficulty: "expert", source: BUGS_IM_HERO_2 },
  { title: "들꽃이 될게요", album: "IM HERO 2", releaseDate: "2025-08-29", albumType: "정규 2집", trackNumber: 4, titleTrack: false, theme: "화려하지 않아도 곁을 지키겠다는 다정한 약속", keyword: "들꽃의 약속", difficulty: "expert", source: BUGS_IM_HERO_2 },
  { title: "비가 와서", album: "IM HERO 2", releaseDate: "2025-08-29", albumType: "정규 2집", trackNumber: 5, titleTrack: false, theme: "비가 내리는 날 되살아나는 지난 기억과 감정", keyword: "빗속의 기억", difficulty: "expert", source: BUGS_IM_HERO_2 },
  { title: "Wonderful Life", album: "IM HERO 2", releaseDate: "2025-08-29", albumType: "정규 2집", trackNumber: 6, titleTrack: false, theme: "함께 살아가는 오늘의 삶을 밝게 긍정하는 마음", keyword: "빛나는 삶", difficulty: "expert", source: BUGS_IM_HERO_2 },
  { title: "그댈 위한 멜로디", album: "IM HERO 2", releaseDate: "2025-08-29", albumType: "정규 2집", trackNumber: 7, titleTrack: false, theme: "소중한 사람만을 위해 노래를 들려주고 싶은 마음", keyword: "그대의 멜로디", difficulty: "expert", source: BUGS_IM_HERO_2 },
  { title: "돌아보지 마세요", album: "IM HERO 2", releaseDate: "2025-08-29", albumType: "정규 2집", trackNumber: 8, titleTrack: false, theme: "지나간 시간을 뒤로하고 앞으로 나아가라는 당부", keyword: "앞으로의 발걸음", difficulty: "expert", source: BUGS_IM_HERO_2 },
  { title: "알겠어요 미안해요", album: "IM HERO 2", releaseDate: "2025-08-29", albumType: "정규 2집", trackNumber: 9, titleTrack: false, theme: "늦게 이해한 마음에 미안함을 전하는 고백", keyword: "늦은 미안함", difficulty: "expert", source: BUGS_IM_HERO_2 },
  { title: "나는야 HERO", album: "IM HERO 2", releaseDate: "2025-08-29", albumType: "정규 2집", trackNumber: 10, titleTrack: false, theme: "스스로 주인공이 되어 힘차게 나아가는 자신감", keyword: "나만의 영웅", difficulty: "expert", source: BUGS_IM_HERO_2 },
  { title: "우리에게 안녕", album: "IM HERO 2", releaseDate: "2025-08-29", albumType: "정규 2집", trackNumber: 11, titleTrack: false, theme: "함께한 관계의 마지막에 건네는 차분한 인사", keyword: "마지막 인사", difficulty: "expert", source: BUGS_IM_HERO_2 },
];

export const limYoungWoongSongQuizQuestions = buildSingerSongQuestionBank({
  artistName: "임영웅",
  idPrefix: "limyoungwoong-song",
  songs,
});

export const limYoungWoongSongQuizTest: TestDefinition = {
  type: "quiz",
  slug: "limyoungwoong-song-fan-quiz",
  title: "임영웅 팬 퀴즈(노래 버전)",
  shortTitle: "임영웅 노래 팬 퀴즈",
  cardTitle: "임영웅 팬 퀴즈(노래 버전)",
  description: "임영웅의 대표곡과 정규 앨범 수록곡을 짧은 노래 단서와 음악 정보로 맞혀 보세요.",
  category: "팬 퀴즈",
  duration: "약 3분",
  icon: "🎤",
  thumbnail: "/tests/limyoungwoong-song-fan.png",
  participants: 0,
  accent: "blue",
  fanTheme: "blue-spotlight",
  isNew: true,
  itemCount: LIMYOUNGWOONG_SONG_QUIZ_SIZE,
  questions: [],
  resultSlugs: Array.from({ length: 10 }, (_, index) => `level-${index + 1}`),
  seoTitle: "임영웅 팬 퀴즈(노래 버전) | 임영웅 노래 퀴즈",
  seoDescription: "미미테스트 임영웅 팬 퀴즈(노래 버전)에서 대표곡과 앨범 수록곡 300문항 중 난이도별 4문항씩 총 12문제를 풀고 LEVEL 1~10 결과를 확인해 보세요.",
  keywords: ["임영웅 팬 퀴즈", "임영웅 노래 퀴즈", "임영웅 가사 퀴즈", "임영웅 노래 맞히기", "임영웅 팬 테스트"],
  seoContent: {
    heading: "임영웅 팬 퀴즈(노래 버전)란?",
    paragraphs: [
      "임영웅의 정규 1집 IM HERO와 정규 2집 IM HERO 2, 대표 싱글과 OST를 바탕으로 구성한 비공식 팬 퀴즈입니다.",
      "중·상·최상 각 100문항, 총 300문항에서 난이도별 4문항씩 뽑아 12문항을 출제합니다. 긴 가사 대신 짧은 곡명·주제 단서와 검증된 앨범 정보를 사용합니다.",
      "정답 개수는 100점 만점으로 환산되고 결과는 별도 별칭 없이 LEVEL 1부터 LEVEL 10까지 표시됩니다.",
    ],
    faqs: [
      ["몇 문제가 출제되나요?", "총 300문항 중 중 4문항, 상 4문항, 최상 4문항을 무작위로 뽑아 12문항이 출제됩니다."],
      ["문제와 보기 순서는 매번 같나요?", "아니요. 재도전할 때 문제 조합과 전체 순서, 보기 순서가 다시 섞입니다."],
      ["점수와 레벨은 어떻게 계산되나요?", "12문항의 정답 개수를 100점 만점으로 환산하고 점수에 따라 LEVEL 1~10으로 표시합니다."],
      ["공식 임영웅 테스트인가요?", "아니요. 공개된 음원·앨범 정보를 바탕으로 미미테스트가 제작한 비공식 팬 퀴즈입니다."],
    ],
    assesses: "임영웅의 대표곡, 정규 앨범 수록곡과 발매 정보에 대한 팬 지식",
  },
};

export const limYoungWoongSongCatalogForValidation = songs;
