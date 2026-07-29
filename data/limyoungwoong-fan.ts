import type {
  LimYoungWoongFanGradeProfile,
  LimYoungWoongQuestionCategory,
  LimYoungWoongQuestionDifficulty,
  LimYoungWoongQuizQuestion,
  TestDefinition,
} from "@/lib/types";

export const LIM_YOUNG_WOONG_FAN_QUIZ_SIZE = 15;
export const LIM_YOUNG_WOONG_FAN_MAX_SCORE = 100;
export const LIM_YOUNG_WOONG_VERIFIED_AT = "2026-07-10";

const sources = {
  artist: ["Bugs 임영웅 아티스트·앨범 정보", "https://music.bugs.co.kr/artist/80265501"],
  imHero: ["Bugs 정규 1집 IM HERO", "https://music.bugs.co.kr/album/20462525"],
  imHero2: ["Bugs 정규 2집 IM HERO 2", "https://music.bugs.co.kr/album/4126527"],
  polaroid: ["Bugs 싱글 Polaroid", "https://music.bugs.co.kr/album/20527897"],
  officialYoutube: ["임영웅 공식 YouTube", "https://www.youtube.com/@LYW_official"],
  tvChosun: ["TV CHOSUN 내일은 미스터트롯", "https://broadcast.tvchosun.com/broadcast/program/2/C201900070.cstv"],
  kbs: ["KBS 프로그램 공식", "https://program.kbs.co.kr/"],
  melon: ["Melon 임영웅 아티스트·앨범 검색", "https://www.melon.com/search/total/index.htm?q=%EC%9E%84%EC%98%81%EC%9B%85"],
  circle: ["Circle Chart 공식", "https://circlechart.kr/"],
  komca: ["한국음악저작권협회 작품 검색", "https://www.komca.or.kr/"],
  sbs: ["SBS 연예뉴스 임영웅 정규 2집 보도", "https://news.sbs.co.kr/news/endPage.do?news_id=N1008235338"],
  imbc: ["iMBC 임영웅 IM HERO 2 트랙리스트", "https://enews.imbc.com/News/RetrieveNewsInfo/472779"],
  cgv: ["CGV 임영웅 콘서트 영화 검색", "https://www.cgv.co.kr/search/?query=%EC%9E%84%EC%98%81%EC%9B%85"],
  news: ["연합뉴스 임영웅 기사 검색", "https://www.yna.co.kr/search/index?query=%EC%9E%84%EC%98%81%EC%9B%85"],
  mma: ["Melon Music Awards 공식", "https://www.melon.com/mma/"],
} as const;

const q = (
  id: string,
  category: LimYoungWoongQuestionCategory,
  difficulty: LimYoungWoongQuestionDifficulty,
  question: string,
  options: string[],
  correctAnswer: number,
  explanation: string,
  source: keyof typeof sources,
  secondary: keyof typeof sources,
  factCheckNote: string,
  isTimeSensitive = false,
): LimYoungWoongQuizQuestion => ({
  id,
  category,
  difficulty,
  question,
  options,
  correctAnswer,
  explanation,
  sourceTitle: sources[source][0],
  sourceUrl: sources[source][1],
  secondarySourceTitle: sources[secondary][0],
  secondarySourceUrl: sources[secondary][1],
  verifiedAt: LIM_YOUNG_WOONG_VERIFIED_AT,
  isTimeSensitive,
  factCheckNote,
});

export const limYoungWoongFanQuestions: LimYoungWoongQuizQuestion[] = [
  q("limyoungwoong_q001", "early-music", "easy", "임영웅이 공식 음원을 발표하며 데뷔한 해는?", ["2016년", "2017년", "2018년", "2019년"], 0, "임영웅은 2016년 ‘미워요’와 ‘소나기’를 발표하며 데뷔했습니다.", "artist", "melon", "음원 플랫폼의 아티스트 소개와 초기 발매 목록을 대조했습니다."),
  q("limyoungwoong_q002", "early-music", "easy", "임영웅의 2016년 데뷔 음원에 함께 실린 두 곡의 조합은?", ["계단말고 엘리베이터·뭣이 중헌디", "미워요·소나기", "이제 나만 믿어요·HERO", "Polaroid·London Boy"], 1, "2016년 데뷔 음원에는 ‘미워요’와 ‘소나기’가 수록됐습니다.", "artist", "melon", "초기 싱글 수록곡과 발매 연도를 확인했습니다."),
  q("limyoungwoong_q003", "competition", "easy", "임영웅이 2020년 최종 우승한 TV조선 경연 프로그램은?", ["미스트롯", "국민가수", "내일은 미스터트롯", "팬텀싱어"], 2, "임영웅은 TV조선 ‘내일은 미스터트롯’에서 최종 진을 차지했습니다.", "tvChosun", "artist", "방송사 프로그램 정보와 공식 아티스트 소개를 대조했습니다."),
  q("limyoungwoong_q004", "competition", "easy", "‘내일은 미스터트롯’ 최종 결과에서 임영웅이 받은 호칭은?", ["선", "미", "4위", "진"], 3, "임영웅은 해당 경연에서 최종 1위인 ‘진’에 올랐습니다.", "tvChosun", "artist", "최종 방송 결과를 기준으로 확인했습니다."),
  q("limyoungwoong_q005", "discography", "easy", "임영웅의 첫 정규앨범 제목은?", ["IM HERO", "Polaroid", "HERO", "IM HERO 2"], 0, "2022년 발매된 ‘IM HERO’가 임영웅의 첫 정규앨범입니다.", "imHero", "artist", "앨범 유형과 소개 문구에서 첫 정규앨범임을 확인했습니다."),
  q("limyoungwoong_q006", "discography", "easy", "정규 1집 ‘IM HERO’의 발매일은?", ["2021년 10월 11일", "2022년 5월 2일", "2022년 11월 15일", "2023년 6월 5일"], 1, "‘IM HERO’는 2022년 5월 2일 발매됐습니다.", "imHero", "circle", "음원 플랫폼 앨범 정보와 차트 등록 정보를 대조했습니다."),
  q("limyoungwoong_q007", "song-album-link", "easy", "정규 1집 ‘IM HERO’의 타이틀곡은?", ["무지개", "우리들의 블루스", "다시 만날 수 있을까", "인생찬가"], 2, "‘다시 만날 수 있을까’가 정규 1집의 타이틀곡입니다.", "imHero", "officialYoutube", "앨범 트랙 표기와 공식 뮤직비디오를 확인했습니다."),
  q("limyoungwoong_q008", "fandom", "easy", "임영웅의 공식 팬덤명으로 사용되는 이름은?", ["별빛시대", "히어로즈", "영웅나라", "영웅시대"], 3, "임영웅의 팬덤명은 ‘영웅시대’입니다.", "officialYoutube", "news", "공식 채널과 공식 활동 보도에서 사용되는 명칭을 확인했습니다."),
  q("limyoungwoong_q009", "songs", "easy", "미스터트롯 우승 후 2020년에 발표한 곡은?", ["이제 나만 믿어요", "모래 알갱이", "온기", "Do or Die"], 0, "‘이제 나만 믿어요’는 2020년 발표된 우승자 특전곡입니다.", "artist", "melon", "아티스트 발매 목록과 음원 정보를 확인했습니다."),
  q("limyoungwoong_q010", "songs", "easy", "2021년에 발표된 임영웅의 싱글은?", ["HERO", "별빛 같은 나의 사랑아", "Polaroid", "HOME"], 1, "‘별빛 같은 나의 사랑아’는 2021년에 발표됐습니다.", "artist", "melon", "싱글 발매 연도를 확인했습니다."),
  q("limyoungwoong_q011", "acting", "easy", "임영웅이 OST로 참여한 ‘사랑은 늘 도망가’가 삽입된 KBS 드라마는?", ["효심이네 각자도생", "미녀와 순정남", "현재는 아름다워", "신사와 아가씨"], 3, "‘사랑은 늘 도망가’는 KBS 주말드라마 ‘신사와 아가씨’ OST입니다.", "kbs", "artist", "KBS 프로그램 정보와 OST 발매 정보를 대조했습니다."),
  q("limyoungwoong_q012", "acting", "easy", "‘신사와 아가씨 OST Part.2’의 임영웅 노래 제목은?", ["우리들의 블루스", "천국보다 아름다운", "사랑은 늘 도망가", "아버지"], 2, "해당 OST Part.2의 곡은 ‘사랑은 늘 도망가’입니다.", "artist", "kbs", "OST 앨범명과 드라마 공식 정보를 확인했습니다."),
  q("limyoungwoong_q013", "songs", "easy", "2023년 6월에 발표된 임영웅의 싱글은?", ["모래 알갱이", "온기", "HERO", "별빛 같은 나의 사랑아"], 0, "‘모래 알갱이’는 2023년 6월 5일 발매됐습니다.", "artist", "melon", "음원 플랫폼 발매 목록에서 날짜를 확인했습니다."),
  q("limyoungwoong_q014", "songs", "easy", "2023년 10월에 발표된 곡은?", ["Polaroid", "Do or Die", "HOME", "온기"], 1, "‘Do or Die’는 2023년 10월 9일 발매됐습니다.", "artist", "melon", "싱글 발매일을 대조했습니다."),
  q("limyoungwoong_q015", "songs", "easy", "2024년 싱글 ‘온기’에 함께 수록된 곡은?", ["London Boy", "HERO", "HOME", "무지개"], 2, "2024년 5월 공개된 싱글에는 ‘온기’와 ‘HOME’이 함께 수록됐습니다.", "artist", "officialYoutube", "발매 목록과 공식 영상 공개 정보를 확인했습니다."),
  q("limyoungwoong_q016", "broadcast", "easy", "2021년 KBS 송년특집으로 방송된 임영웅 단독 쇼의 제목은?", ["마이 리틀 히어로", "아임 히어로 더 파이널", "영웅본색", "We're HERO 임영웅"], 3, "KBS는 2021년 송년특집으로 ‘We're HERO 임영웅’을 방송했습니다.", "kbs", "news", "KBS 공식 편성 자료와 관련 보도를 확인했습니다."),
  q("limyoungwoong_q017", "broadcast", "easy", "2023년 KBS에서 방송된 임영웅의 단독 리얼리티 예능은?", ["마이 리틀 히어로", "뽕숭아학당", "사랑의 콜센타", "히든싱어"], 0, "‘마이 리틀 히어로’는 2023년 KBS에서 방송된 단독 리얼리티 프로그램입니다.", "kbs", "news", "프로그램명과 방송사를 확인했습니다."),
  q("limyoungwoong_q018", "discography", "easy", "정규 2집 ‘IM HERO 2’의 타이틀곡은?", ["ULSSIGU", "순간을 영원처럼", "답장을 보낸지", "나는야 HERO"], 1, "‘순간을 영원처럼’이 ‘IM HERO 2’의 타이틀곡입니다.", "imHero2", "sbs", "앨범 트랙 표기와 SBS 발매 보도를 대조했습니다.", true),

  q("limyoungwoong_q019", "song-album-link", "medium", "싱글 ‘Polaroid’에 함께 수록된 곡은?", ["온기", "무지개", "London Boy", "HERO"], 2, "2022년 싱글 ‘Polaroid’에는 ‘London Boy’와 ‘Polaroid’ 두 곡이 수록됐습니다.", "polaroid", "artist", "싱글 트랙 목록을 확인했습니다."),
  q("limyoungwoong_q020", "discography", "medium", "싱글 ‘Polaroid’의 발매일은?", ["2021년 3월 9일", "2022년 5월 2일", "2023년 6월 5일", "2022년 11월 15일"], 3, "‘Polaroid’는 2022년 11월 15일 발매됐습니다.", "polaroid", "artist", "앨범 기본정보와 아티스트 발매 목록을 대조했습니다."),
  q("limyoungwoong_q021", "discography", "medium", "정규 1집 ‘IM HERO’의 수록곡 수는?", ["12곡", "10곡", "11곡", "13곡"], 0, "‘IM HERO’에는 총 12곡이 수록됐습니다.", "imHero", "circle", "앨범 트랙 수를 확인했습니다."),
  q("limyoungwoong_q022", "song-album-link", "medium", "정규 1집 ‘IM HERO’의 2번 트랙은?", ["아버지", "무지개", "보금자리", "연애편지"], 1, "‘무지개’는 ‘IM HERO’의 2번 트랙입니다.", "imHero", "officialYoutube", "앨범 트랙 순서를 확인했습니다."),
  q("limyoungwoong_q023", "acting", "medium", "정규 1집 ‘IM HERO’의 4번 트랙은?", ["손이 참 곱던 그대", "아버지", "우리들의 블루스", "사랑역"], 2, "‘우리들의 블루스’는 ‘IM HERO’의 4번 트랙입니다.", "imHero", "officialYoutube", "앨범 트랙 순서를 확인했습니다."),
  q("limyoungwoong_q024", "songs", "medium", "정규 1집 ‘IM HERO’의 6번 트랙은?", ["사랑해 진짜", "보금자리", "인생찬가", "A bientot"], 3, "‘A bientot’는 ‘IM HERO’의 6번 트랙입니다.", "imHero", "officialYoutube", "앨범 트랙 순서를 확인했습니다."),
  q("limyoungwoong_q025", "songs", "medium", "정규 1집 ‘IM HERO’의 8번 트랙은?", ["보금자리", "사랑역", "연애편지", "아버지"], 0, "‘보금자리’는 ‘IM HERO’의 8번 트랙입니다.", "imHero", "officialYoutube", "앨범 트랙 순서를 확인했습니다."),
  q("limyoungwoong_q026", "discography", "medium", "정규 1집 ‘IM HERO’의 10번 트랙은?", ["사랑해요 그대를", "연애편지", "인생찬가", "사랑해 진짜"], 1, "‘연애편지’는 ‘IM HERO’의 10번 트랙입니다.", "imHero", "officialYoutube", "앨범 트랙 순서를 확인했습니다."),
  q("limyoungwoong_q027", "discography", "medium", "정규 1집 ‘IM HERO’의 마지막 트랙은?", ["사랑해요 그대를", "연애편지", "인생찬가", "아버지"], 2, "12번 트랙 ‘인생찬가’가 앨범의 마지막 곡입니다.", "imHero", "officialYoutube", "앨범 전체 트랙 순서를 확인했습니다."),
  q("limyoungwoong_q028", "title-distinction", "medium", "다음 중 정규 1집 ‘IM HERO’ 수록곡이 아닌 것은?", ["사랑역", "사랑해 진짜", "손이 참 곱던 그대", "Do or Die"], 3, "‘Do or Die’는 2023년 별도 싱글이며 ‘IM HERO’ 수록곡이 아닙니다.", "imHero", "artist", "정규 1집 목록과 싱글 발매 목록을 비교했습니다."),
  q("limyoungwoong_q029", "release-order", "medium", "다음 활동 가운데 가장 먼저 발표된 곡은?", ["이제 나만 믿어요", "별빛 같은 나의 사랑아", "다시 만날 수 있을까", "모래 알갱이"], 0, "‘이제 나만 믿어요’는 2020년, 나머지는 2021년 이후 발표됐습니다.", "artist", "melon", "각 곡의 발매 연도를 비교했습니다."),
  q("limyoungwoong_q030", "title-distinction", "medium", "2022년 11월 한 싱글에서 더블 타이틀로 공개된 조합은?", ["온기·HOME", "London Boy·Polaroid", "HERO·이제 나만 믿어요", "모래 알갱이·Do or Die"], 1, "‘London Boy’와 ‘Polaroid’는 같은 싱글의 두 타이틀곡입니다.", "polaroid", "artist", "싱글의 타이틀 표시를 확인했습니다."),
  q("limyoungwoong_q031", "production", "medium", "‘다시 만날 수 있을까’의 작사·작곡자는?", ["설운도", "조영수", "이적", "로이킴"], 2, "이적이 ‘다시 만날 수 있을까’를 작사·작곡했습니다.", "imHero", "komca", "앨범 크레딧과 저작권 정보를 대조했습니다."),
  q("limyoungwoong_q032", "official-content", "medium", "‘다시 만날 수 있을까’ 공식 뮤직비디오가 올로케이션으로 촬영된 도시는?", ["런던", "서울", "로스앤젤레스", "파리"], 3, "앨범 소개에 따르면 뮤직비디오는 파리 올로케이션으로 촬영됐습니다.", "imHero", "officialYoutube", "앨범 소개와 공식 뮤직비디오 정보를 확인했습니다."),
  q("limyoungwoong_q033", "acting", "medium", "정규 1집 수록곡과 같은 제목을 가진 tvN 드라마는?", ["우리들의 블루스", "나의 해방일지", "갯마을 차차차", "사랑의 불시착"], 0, "‘우리들의 블루스’는 정규 1집 수록곡이자 tvN 드라마 제목입니다.", "imHero", "news", "앨범 정보와 드라마 공식 명칭을 대조했습니다."),
  q("limyoungwoong_q034", "songs", "medium", "‘Do or Die’의 정확한 발매일은?", ["2023년 6월 5일", "2023년 10월 9일", "2024년 5월 6일", "2022년 11월 15일"], 1, "‘Do or Die’는 2023년 10월 9일 발매됐습니다.", "artist", "melon", "음원 플랫폼 발매일을 확인했습니다."),
  q("limyoungwoong_q035", "songs", "medium", "‘온기’와 ‘HOME’이 담긴 싱글의 발매일은?", ["2023년 10월 9일", "2024년 4월 14일", "2024년 5월 6일", "2025년 4월 14일"], 2, "두 곡은 2024년 5월 6일 함께 공개됐습니다.", "artist", "officialYoutube", "발매 목록과 공식 영상 게시 정보를 확인했습니다."),
  q("limyoungwoong_q036", "title-distinction", "medium", "2024년 ‘온기’와 함께 공개된 영어 제목의 곡은?", ["HERO", "London Boy", "Do or Die", "HOME"], 3, "‘HOME’은 ‘온기’와 함께 공개된 곡입니다.", "artist", "officialYoutube", "싱글 트랙 구성을 확인했습니다."),
  q("limyoungwoong_q037", "discography", "medium", "정규 2집 ‘IM HERO 2’가 발매된 날짜는?", ["2025년 8월 29일", "2025년 4월 14일", "2024년 5월 6일", "2026년 1월 1일"], 0, "‘IM HERO 2’는 2025년 8월 29일 발매됐습니다.", "imHero2", "sbs", "앨범 정보와 방송사 발매 보도를 대조했습니다.", true),
  q("limyoungwoong_q038", "discography", "medium", "정규 2집 ‘IM HERO 2’의 수록곡 수는?", ["10곡", "11곡", "12곡", "13곡"], 1, "‘IM HERO 2’에는 총 11곡이 수록됐습니다.", "imHero2", "imbc", "앨범 트랙 목록과 공식 SNS 기반 보도를 확인했습니다.", true),
  q("limyoungwoong_q039", "song-album-link", "medium", "정규 2집 ‘IM HERO 2’의 3번 트랙은?", ["답장을 보낸지", "ULSSIGU", "순간을 영원처럼", "들꽃이 될게요"], 2, "‘순간을 영원처럼’은 3번 트랙이자 타이틀곡입니다.", "imHero2", "sbs", "앨범 트랙 순서와 타이틀 표기를 확인했습니다.", true),
  q("limyoungwoong_q040", "production", "medium", "정규 2집 ‘IM HERO 2’의 2번 트랙은?", ["답장을 보낸지", "순간을 영원처럼", "비가 와서", "ULSSIGU"], 3, "‘ULSSIGU’는 ‘IM HERO 2’의 2번 트랙입니다.", "imHero2", "imbc", "앨범 트랙 순서를 확인했습니다.", true),
  q("limyoungwoong_q041", "song-album-link", "medium", "정규 2집 ‘IM HERO 2’의 5번 트랙은?", ["비가 와서", "Wonderful Life", "그댈 위한 멜로디", "돌아보지 마세요"], 0, "‘비가 와서’는 ‘IM HERO 2’의 5번 트랙입니다.", "imHero2", "sbs", "앨범 트랙 순서를 확인했습니다.", true),
  q("limyoungwoong_q042", "collaboration", "medium", "정규 2집 ‘IM HERO 2’의 7번 트랙은?", ["Wonderful Life", "그댈 위한 멜로디", "나는야 HERO", "우리에게 안녕"], 1, "‘그댈 위한 멜로디’는 ‘IM HERO 2’의 7번 트랙입니다.", "imHero2", "imbc", "앨범 트랙 순서를 확인했습니다.", true),

  q("limyoungwoong_q043", "song-album-link", "hard", "정규 2집 ‘IM HERO 2’의 마지막 트랙은?", ["나는야 HERO", "알겠어요 미안해요", "우리에게 안녕", "돌아보지 마세요"], 2, "11번 트랙 ‘우리에게 안녕’이 앨범의 마지막 곡입니다.", "imHero2", "sbs", "앨범 전체 트랙 순서를 확인했습니다.", true),
  q("limyoungwoong_q044", "production", "hard", "‘IM HERO 2’에서 임영웅이 작사에 참여한 2번 트랙은?", ["답장을 보낸지", "순간을 영원처럼", "들꽃이 될게요", "ULSSIGU"], 3, "‘ULSSIGU’는 임영웅이 작사한 곡으로 앨범 크레딧에 표기됩니다.", "imHero2", "imbc", "정규 2집 공식 크레딧을 확인했습니다.", true),
  q("limyoungwoong_q045", "production", "hard", "‘IM HERO 2’에서 임영웅이 작사와 작곡에 모두 이름을 올린 곡은?", ["비가 와서", "Wonderful Life", "들꽃이 될게요", "순간을 영원처럼"], 0, "‘비가 와서’는 임영웅이 작사·작곡한 곡으로 크레딧에 기재됩니다.", "imHero2", "komca", "앨범 크레딧과 저작권 정보를 대조했습니다.", true),
  q("limyoungwoong_q046", "official-content", "hard", "정규 2집 수록곡 중 임영웅이 작곡에 참여한 마지막 트랙은?", ["나는야 HERO", "우리에게 안녕", "돌아보지 마세요", "알겠어요 미안해요"], 1, "‘우리에게 안녕’은 임영웅이 작곡에 참여한 11번 트랙입니다.", "imHero2", "komca", "앨범 트랙 순서와 작곡 크레딧을 확인했습니다.", true),
  q("limyoungwoong_q047", "title-distinction", "hard", "‘다시 만날 수 있을까’의 편곡자는?", ["정재일", "이적", "양시온", "임헌일"], 2, "앨범 크레딧에서 편곡은 양시온, 스트링 편곡은 정재일로 구분됩니다.", "imHero", "komca", "편곡과 스트링 편곡 크레딧을 구분해 확인했습니다."),
  q("limyoungwoong_q048", "title-distinction", "hard", "‘다시 만날 수 있을까’의 스트링 편곡자는?", ["양시온", "이적", "임헌일", "정재일"], 3, "정재일이 해당 곡의 스트링 편곡을 맡았습니다.", "imHero", "komca", "앨범 상세 크레딧을 확인했습니다."),
  q("limyoungwoong_q049", "production", "hard", "정규 1집 수록곡 ‘A bientot’의 작사·작곡자로 표기된 이름은?", ["gong", "이적", "설운도", "송봉주"], 0, "‘A bientot’의 작사·작곡·편곡은 모두 gong으로 표기돼 있습니다.", "imHero", "komca", "앨범 크레딧과 저작권 정보를 대조했습니다."),
  q("limyoungwoong_q050", "production", "hard", "정규 1집 수록곡 ‘연애편지’의 작사·작곡자는?", ["윤명선", "송봉주", "우지민", "박정란"], 1, "‘연애편지’는 송봉주가 작사·작곡했습니다.", "imHero", "komca", "앨범 크레딧을 확인했습니다."),
  q("limyoungwoong_q051", "collaboration", "hard", "‘별빛 같은 나의 사랑아’의 작사·작곡자로 알려진 가수는?", ["조영수", "이적", "설운도", "로이킴"], 2, "‘별빛 같은 나의 사랑아’는 설운도가 작사·작곡한 곡입니다.", "melon", "komca", "음원 참여 정보와 저작권 정보를 확인했습니다."),
  q("limyoungwoong_q052", "competition", "hard", "‘이제 나만 믿어요’의 작곡자는?", ["이적", "설운도", "윤명선", "조영수"], 3, "‘이제 나만 믿어요’는 김이나 작사, 조영수 작곡으로 공개됐습니다.", "melon", "komca", "음원 크레딧과 저작권 정보를 대조했습니다."),
  q("limyoungwoong_q053", "official-content", "hard", "2022 전국투어 공연 실황을 담아 2023년 극장 개봉한 영화 제목은?", ["아임 히어로 더 파이널", "아임 히어로 더 스타디움", "마이 리틀 히어로", "We're HERO 임영웅"], 0, "‘아임 히어로 더 파이널’은 2022 전국투어 앙코르 공연 실황을 담은 콘서트 영화입니다.", "cgv", "news", "극장 개봉 정보와 공연 보도를 확인했습니다."),
  q("limyoungwoong_q054", "official-content", "hard", "‘아임 히어로 더 파이널’이 극장 개봉한 해는?", ["2022년", "2023년", "2024년", "2025년"], 1, "해당 콘서트 영화는 2023년에 극장 개봉했습니다.", "cgv", "news", "영화 개봉 연도를 확인했습니다."),
  q("limyoungwoong_q055", "broadcast", "hard", "2024년 서울월드컵경기장 공연을 담은 콘서트 영화는?", ["아임 히어로 더 파이널", "We're HERO 임영웅", "아임 히어로 더 스타디움", "마이 리틀 히어로"], 2, "‘아임 히어로 더 스타디움’은 서울월드컵경기장 공연 실황을 담았습니다.", "cgv", "news", "영화 소개와 공연 장소를 대조했습니다."),
  q("limyoungwoong_q056", "concert", "hard", "2024년 ‘IM HERO - THE STADIUM’ 공연이 열린 장소는?", ["고척스카이돔", "KSPO DOME", "서울올림픽주경기장", "서울월드컵경기장"], 3, "해당 스타디움 공연은 서울월드컵경기장에서 열렸습니다.", "news", "cgv", "공연 보도와 콘서트 영화 소개를 확인했습니다."),

  q("limyoungwoong_q057", "song-album-link", "expert", "정규 2집 ‘IM HERO 2’의 1번 트랙은?", ["답장을 보낸지", "ULSSIGU", "순간을 영원처럼", "들꽃이 될게요"], 0, "‘답장을 보낸지’가 정규 2집의 문을 여는 1번 트랙입니다.", "imHero2", "imbc", "앨범 전체 트랙 순서를 확인했습니다.", true),
  q("limyoungwoong_q058", "songs", "expert", "정규 2집 ‘IM HERO 2’의 9번 트랙은?", ["돌아보지 마세요", "알겠어요 미안해요", "나는야 HERO", "우리에게 안녕"], 1, "‘알겠어요 미안해요’는 ‘IM HERO 2’의 9번 트랙입니다.", "imHero2", "sbs", "앨범 트랙 순서를 확인했습니다.", true),
  q("limyoungwoong_q059", "discography", "expert", "정규 1집 ‘IM HERO’의 1번 트랙은?", ["무지개", "우리들의 블루스", "다시 만날 수 있을까", "손이 참 곱던 그대"], 2, "타이틀곡 ‘다시 만날 수 있을까’가 1번 트랙입니다.", "imHero", "officialYoutube", "앨범 트랙 순서와 타이틀 표기를 확인했습니다."),
  q("limyoungwoong_q060", "awards", "expert", "2022 멜론뮤직어워드에서 임영웅이 받은 5개 상에 함께 포함된 두 대상은?", ["올해의 레코드·올해의 베스트송", "올해의 베스트송·올해의 앨범", "올해의 레코드·올해의 아티스트", "올해의 아티스트·올해의 앨범"], 3, "임영웅은 2022 MMA에서 올해의 아티스트와 올해의 앨범을 포함해 5관왕을 기록했습니다.", "mma", "artist", "시상식 수상 내역과 음원 플랫폼 공식 아티스트 소개를 대조했습니다."),
];

export const limYoungWoongDifficultyScores: Record<LimYoungWoongQuestionDifficulty, number> = { easy: 4, medium: 6, hard: 9, expert: 12 };

export const limYoungWoongCategoryLabels: Record<LimYoungWoongQuestionCategory, string> = {
  profile: "기본 프로필", "early-music": "데뷔·초기 활동", "trot-transition": "트로트 활동", discography: "앨범·발매", songs: "대표곡", "release-order": "활동 순서", broadcast: "방송", competition: "경연", concert: "콘서트", production: "작사·작곡", collaboration: "협업", "official-content": "공식 콘텐츠", acting: "OST·드라마", fandom: "팬덤", "interview-activity": "공식 활동", awards: "수상", "song-album-link": "곡·앨범 연결", "title-distinction": "명칭 구분",
};

export const limYoungWoongFanGradeProfiles: LimYoungWoongFanGradeProfile[] = [
  { slug: "limyoungwoong-entry", minScore: 0, maxScore: 19, title: "임영웅 입문 준비 중", summary: "대표곡부터 가볍게 만나며 팬심을 키워갈 단계예요.", description: "임영웅의 음악과 활동을 이제 알아가기 시작한 구간입니다. 지식 퀴즈 점수는 팬심의 크기나 자격을 판단하지 않아요. ‘이제 나만 믿어요’, ‘별빛 같은 나의 사랑아’, ‘다시 만날 수 있을까’처럼 대표곡부터 즐기고 오답노트에서 앨범 연결을 확인하면 다음 도전이 훨씬 익숙해집니다.", traits: ["새로운 음악을 발견하는 단계", "재도전 상승 폭이 큼", "대표 활동부터 넓혀가는 중"], recommendations: ["공식 채널 대표곡 플레이리스트 듣기", "오답노트에서 앨범·발매 순서 확인하기"], shareTexts: ["나의 임영웅 팬심 지수는 {score}점! 이제부터 즐겁게 알아가는 중이에요.", "임영웅 팬 퀴즈 입문 단계! 다음 도전도 기대해요."] },
  { slug: "limyoungwoong-curious", minScore: 20, maxScore: 39, title: "관심이 생긴 예비 영웅시대", summary: "대표곡과 주요 활동이 조금씩 익숙해지고 있어요.", description: "임영웅의 대표곡과 주요 방송 활동을 어느 정도 알고 있는 단계입니다. 정규앨범의 세부 수록곡이나 발매 순서에서는 헷갈릴 수 있지만, 활동 흐름을 따라가면 팬심 지식이 빠르게 쌓일 구간이에요. 공식 팬클럽 가입 여부와 관계없이 누구나 음악을 좋아하는 방식으로 참여할 수 있습니다.", traits: ["대표곡 기본 지식 보유", "방송 활동에 대한 친숙함", "앨범 지식이 성장 중"], recommendations: ["IM HERO 대표 트랙 순서 살펴보기", "공식 무대 영상으로 곡과 활동 연결하기"], shareTexts: ["나의 임영웅 팬심 지수는 {score}점, 관심이 생긴 예비 영웅시대!", "임영웅 팬 퀴즈 {score}점! 당신은 몇 점인가요?"] },
  { slug: "limyoungwoong-solid-fan", minScore: 40, maxScore: 59, title: "제법 잘 아는 임영웅 팬", summary: "대표곡을 넘어 앨범과 방송 활동도 꽤 알고 있어요.", description: "일반 대중보다 임영웅의 음악과 활동을 폭넓게 알고 있습니다. 대표 싱글과 정규 1집, 주요 방송 기록은 안정적으로 맞히지만 세부 크레딧이나 정규 2집 트랙 순서에서는 조금 흔들릴 수 있어요. 분야별 정답률을 확인해 약한 영역만 보완하면 찐팬 구간으로 자연스럽게 올라갈 수 있습니다.", traits: ["대표곡·방송 지식 안정적", "앨범 활동 흐름을 이해", "세부 크레딧은 보강 중"], recommendations: ["정규 1·2집 수록곡 비교하기", "작사·작곡 크레딧 확인하기"], shareTexts: ["나의 임영웅 팬심 지수는 {score}점! 제법 잘 아는 팬이에요.", "임영웅 퀴즈 {score}점, 찐팬 구간을 향해!"] },
  { slug: "limyoungwoong-real-fan", minScore: 60, maxScore: 79, title: "확실한 임영웅 찐팬", summary: "음악과 무대, 방송 활동을 꾸준히 지켜본 팬이에요.", description: "대표곡은 물론 앨범, OST, 방송, 콘서트 영화까지 여러 활동을 균형 있게 기억하고 있습니다. 보통 난이도는 안정적으로 풀고 어려운 문제에서도 실력을 보여준 수준이에요. 정규앨범의 세부 트랙과 제작 크레딧까지 조금만 더 보강하면 백과사전 구간도 충분히 가능합니다.", traits: ["활동 흐름 이해도가 높음", "음악·방송 지식이 균형적", "어려운 문제도 해결 가능"], recommendations: ["앨범 북클릿 크레딧 살펴보기", "콘서트·공식 콘텐츠 기록 복습하기"], shareTexts: ["나의 임영웅 팬심 지수는 {score}점, 확실한 찐팬!", "임영웅 팬 퀴즈에서 {score}점 나왔어요."] },
  { slug: "limyoungwoong-encyclopedia", minScore: 80, maxScore: 94, title: "임영웅 백과사전", summary: "앨범, 무대, 방송과 활동 순서까지 폭넓게 알고 있어요.", description: "임영웅의 핵심 활동을 매우 넓고 정확하게 파악하고 있습니다. 대표곡뿐 아니라 앨범 트랙 순서, 발표 시기, 제작 크레딧과 공연 기록까지 안정적으로 연결하는 수준이에요. 주변에서 임영웅 관련 정보를 물어볼 만한 단계이며, 최상 난이도 한두 문제만 더 잡으면 팬심 만렙에 가깝습니다.", traits: ["앨범·무대 지식 탄탄", "세부 활동 기록에도 강함", "팬 지식인급 연결 능력"], recommendations: ["최상 난이도 오답만 따로 확인하기", "공식 크레딧과 최신 앨범 기록 살펴보기"], shareTexts: ["나의 임영웅 팬심 지수는 {score}점, 임영웅 백과사전!", "임영웅 백과사전 등급이 나왔어요. 당신도 도전해보세요."] },
  { slug: "limyoungwoong-max", minScore: 95, maxScore: 100, title: "임영웅 팬심 만렙", summary: "쉬운 문제부터 최상 난이도까지 거의 완벽한 최상위 팬이에요.", description: "임영웅의 노래, 앨범, 방송, 콘서트와 제작 참여 기록까지 매우 정확하게 기억하고 있습니다. 단순히 대표곡을 아는 수준을 넘어 활동의 순서와 세부 맥락까지 함께 이해하는 단계예요. 팬심에는 다양한 모양이 있지만, 이번 지식 퀴즈 기준으로는 마음껏 축하받아도 좋은 만렙 구간입니다.", traits: ["최상 난이도까지 해결", "세부 크레딧에 강함", "활동 흐름과 맥락을 함께 기억"], recommendations: ["친구에게 결과 공유하기", "새 활동이 나오면 문제은행 업데이트 제안하기"], shareTexts: ["나의 임영웅 팬심 지수는 {score}점, 팬심 만렙!", "임영웅 팬 퀴즈 만렙 달성! 당신은 몇 점인가요?"] },
];

export function getLimYoungWoongFanGrade(score: number) {
  return limYoungWoongFanGradeProfiles.find((profile) => score >= profile.minScore && score <= profile.maxScore) ?? limYoungWoongFanGradeProfiles[0];
}
export function getLimYoungWoongQuestion(id: string) { return limYoungWoongFanQuestions.find((question) => question.id === id); }
export function getLimYoungWoongFanGradeProfile(slug: string) { return limYoungWoongFanGradeProfiles.find((profile) => profile.slug === slug); }

export function validateLimYoungWoongQuestionBank() {
  const counts = { easy: 0, medium: 0, hard: 0, expert: 0 } as Record<LimYoungWoongQuestionDifficulty, number>;
  const answerCounts = [0, 0, 0, 0];
  const ids = new Set<string>();
  const questionTexts = new Set<string>();
  for (const question of limYoungWoongFanQuestions) {
    counts[question.difficulty] += 1;
    answerCounts[question.correctAnswer] += 1;
    if (ids.has(question.id)) throw new Error(`Duplicated LimYoungWoong question id: ${question.id}`);
    ids.add(question.id);
    if (questionTexts.has(question.question)) throw new Error(`Duplicated LimYoungWoong question text: ${question.question}`);
    questionTexts.add(question.question);
    if (question.options.length !== 4) throw new Error(`${question.id} must have exactly four options.`);
    if (new Set(question.options).size !== 4) throw new Error(`${question.id} has duplicated options.`);
    if (!Number.isInteger(question.correctAnswer) || question.correctAnswer < 0 || question.correctAnswer > 3) throw new Error(`${question.id} has invalid correctAnswer.`);
    if (!question.options[question.correctAnswer]) throw new Error(`${question.id} has no correct option.`);
    if (!question.explanation || !question.sourceUrl || !question.secondarySourceUrl || !question.verifiedAt || !question.category) throw new Error(`${question.id} lacks required metadata.`);
  }
  if (limYoungWoongFanQuestions.length !== 60) throw new Error(`LimYoungWoong question bank must include exactly 60 questions. Current: ${limYoungWoongFanQuestions.length}`);
  if (counts.easy !== 18 || counts.medium !== 24 || counts.hard !== 14 || counts.expert !== 4) throw new Error(`Invalid LimYoungWoong difficulty counts: ${JSON.stringify(counts)}`);
  if (answerCounts.some((count) => count !== 15)) throw new Error(`Answer positions must be exactly balanced: ${answerCounts.join(",")}`);
  return { total: limYoungWoongFanQuestions.length, counts, answerCounts };
}

validateLimYoungWoongQuestionBank();

export const limYoungWoongFanTest: TestDefinition = {
  type: "quiz", slug: "limyoungwoong-fan-test", title: "임영웅 팬 퀴즈", shortTitle: "임영웅 팬 퀴즈", cardTitle: "임영웅 팬 퀴즈", description: "노래, 앨범, 무대, 방송과 콘서트까지 15문제로 임영웅 팬심 지수를 확인해보세요.", category: "팬 퀴즈", duration: "약 3~5분", icon: "🌟", thumbnail: "/tests/limyoungwoong-fan.jpg", participants: 8593, accent: "blue", fanTheme: "blue-spotlight", isNew: true, itemCount: LIM_YOUNG_WOONG_FAN_QUIZ_SIZE, questions: [], resultSlugs: [],
  seoTitle: "임영웅 팬 퀴즈｜나는 임영웅을 얼마나 잘 알고 있을까?",
  seoDescription: "임영웅의 노래, 앨범, 무대, 방송과 콘서트 퀴즈를 풀고 팬심 지수를 확인해보세요. 총 60문제 중 난이도별 15문제가 랜덤으로 출제됩니다.",
  keywords: ["임영웅 팬 퀴즈", "임영웅 팬 테스트", "임영웅 퀴즈", "임영웅 팬심 테스트", "임영웅 노래 퀴즈", "임영웅 테스트", "임영웅 팬심 지수", "임영웅 찐팬 퀴즈"],
  seoContent: {
    heading: "임영웅 팬 퀴즈란?",
    paragraphs: [
      "임영웅 팬 퀴즈는 임영웅의 노래, 앨범, 경연, 방송, OST, 콘서트와 공식 활동 기록을 바탕으로 팬심 지수를 확인하는 4지선다형 지식 퀴즈입니다. 대표곡만 묻는 단순한 임영웅 퀴즈가 아니라 쉬움부터 최상 난이도까지 균형 있게 구성했습니다.",
      "전체 문제은행은 60문항이며, 시작할 때마다 쉬움 4문항, 보통 6문항, 어려움 4문항, 최상 1문항이 랜덤으로 출제됩니다. 난이도별 배점을 적용해 총 100점 만점의 임영웅 팬심 지수를 계산하며, 같은 카테고리는 최대 2문항만 포함됩니다.",
      "결과에서는 팬심 유형, 난이도별 정답 수, 분야별 정답률과 오답노트를 확인할 수 있습니다. 본 테스트는 임영웅 또는 소속사의 공식 서비스가 아닌 비공식 팬 콘텐츠이며, 공식 사진·앨범 커버·가사 인용을 사용하지 않습니다.",
    ],
    faqs: [
      ["임영웅 팬 퀴즈는 몇 문제인가요?", "60개 문제은행에서 난이도별 15문항이 출제됩니다."],
      ["문제는 매번 동일한가요?", "아니요. 난이도와 카테고리 균형을 유지하면서 문제와 보기 순서가 달라질 수 있습니다."],
      ["팬심 점수는 어떻게 계산되나요?", "쉬움 4점, 보통 6점, 어려움 9점, 최상 12점으로 총 100점을 계산합니다."],
      ["틀린 문제의 정답을 볼 수 있나요?", "네. 결과 화면의 오답노트에서 정답, 해설과 검증 메모를 확인할 수 있습니다."],
      ["테스트 결과는 저장되나요?", "응답은 서버에 저장하지 않으며 공유 링크에는 채점을 위한 최소 정보만 포함됩니다."],
      ["공식 팬클럽 회원만 참여할 수 있나요?", "아니요. 임영웅의 음악과 활동에 관심 있는 누구나 참여할 수 있습니다."],
    ],
    assesses: "임영웅 음악·앨범·방송·공연 활동 지식",
  },
};
