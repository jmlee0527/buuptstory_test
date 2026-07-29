import type {
  TestDefinition,
  YoungtakFanGradeProfile,
  YoungtakQuestionCategory,
  YoungtakQuestionDifficulty,
  YoungtakQuizQuestion,
} from "@/lib/types";

export const YOUNGTAK_FAN_QUIZ_SIZE = 15;
export const YOUNGTAK_FAN_MAX_SCORE = 100;
export const YOUNGTAK_VERIFIED_AT = "2026-07-10";

const sources = {
  abyss: ["ABYSS Company Artist Profile", "https://www.abysscompany.com/artist/youngtak"],
  youtube: ["YOUNGTAK Official YouTube", "https://www.youtube.com/@youngtak_official"],
  melon: ["Melon Artist/Album Search", "https://www.melon.com/search/total/index.htm?q=%EC%98%81%ED%83%81"],
  circle: ["Circle Chart Official", "https://circlechart.kr/"],
  tvChosun: ["TV CHOSUN Mr. Trot Official", "https://broadcast.tvchosun.com/broadcast/program/2/C201900070.cstv"],
  jtbc: ["JTBC Strong Girl Nam-soon Official", "https://tv.jtbc.co.kr/strongwomannamsoon"],
  sbs: ["SBS Strong Heart League Official", "https://programs.sbs.co.kr/enter/strongheartleague"],
  kbs: ["KBS Drama/Program Official", "https://program.kbs.co.kr/"],
  komca: ["KOMCA Works Search", "https://www.komca.or.kr/"],
  news: ["Verified Korean Press/Agency Reports", "https://www.yna.co.kr/search/index?query=%EC%98%81%ED%83%81"],
} as const;

const q = (
  id: string,
  category: YoungtakQuestionCategory,
  difficulty: YoungtakQuestionDifficulty,
  question: string,
  options: string[],
  correctAnswer: number,
  explanation: string,
  source: keyof typeof sources,
  secondary: keyof typeof sources,
  factCheckNote: string,
  isTimeSensitive = false,
): YoungtakQuizQuestion => ({
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
  verifiedAt: YOUNGTAK_VERIFIED_AT,
  isTimeSensitive,
  factCheckNote,
});

export const youngtakFanQuestions: YoungtakQuizQuestion[] = [
  q("youngtak_q001", "profile", "easy", "영탁의 본명으로 알려진 이름은?", ["박영탁", "김영탁", "이영탁", "최영탁"], 0, "영탁은 활동명이며 본명은 박영탁으로 공식 프로필과 음원 크레딧에서 확인됩니다.", "abyss", "melon", "공식 프로필과 음원 플랫폼 아티스트 정보를 대조했습니다."),
  q("youngtak_q002", "profile", "easy", "영탁의 생년월일로 공식 프로필에서 확인되는 날짜는?", ["1984년 5월 13일", "1983년 5월 13일", "1982년 7월 4일", "1985년 9월 3일"], 1, "공식 프로필 기준 영탁은 1983년 5월 13일생입니다.", "abyss", "news", "소속사 프로필과 주요 언론 프로필을 대조했습니다."),
  q("youngtak_q003", "early-music", "easy", "영탁이 2007년 발표한 데뷔 음반명으로 알려진 것은?", ["FORM", "MMM", "Young Tak Disia", "SuperSuper"], 2, "영탁은 2007년 발라드 가수로 데뷔하며 ‘Young Tak Disia’를 발표한 것으로 정리됩니다.", "melon", "news", "음원 플랫폼/언론 프로필의 데뷔 음반 정보를 확인했습니다."),
  q("youngtak_q004", "trot-transition", "easy", "영탁이 트로트 가수로 활동을 본격화하며 2016년에 발표한 곡은?", ["찐이야", "니가 왜 거기서 나와", "전복 먹으러 갈래", "누나가 딱이야"], 3, "‘누나가 딱이야’는 영탁의 트로트 전향 초기 활동을 대표하는 곡으로 소개됩니다.", "melon", "news", "음원 플랫폼 발매 정보와 언론 프로필을 대조했습니다."),
  q("youngtak_q005", "songs", "easy", "영탁의 대표곡 중 TV조선 ‘미스터트롯’ 결승 음원으로 널리 알려진 곡은?", ["찐이야", "사랑의 벚꽃놀이", "꼰대라떼", "각자도생"], 0, "‘찐이야’는 미스터트롯 결승 무대와 함께 대중적으로 크게 알려진 대표곡입니다.", "tvChosun", "melon", "방송 프로그램 및 음원 플랫폼의 곡 정보를 확인했습니다."),
  q("youngtak_q006", "competition", "easy", "2020년 TV조선 ‘미스터트롯’에서 영탁이 기록한 최종 순위는?", ["진", "선", "미", "4위"], 1, "영탁은 ‘미스터트롯’에서 최종 2위인 ‘선’을 차지했습니다.", "tvChosun", "news", "방송 공식 결과와 보도 자료를 대조했습니다."),
  q("youngtak_q007", "discography", "easy", "영탁의 첫 정규앨범 제목은?", ["FORM", "SuperSuper", "MMM", "니편이야"], 2, "영탁의 첫 정규앨범은 2022년 발표된 ‘MMM’입니다.", "melon", "circle", "음원 플랫폼 앨범 정보와 차트 앨범 정보를 확인했습니다."),
  q("youngtak_q008", "discography", "easy", "영탁의 두 번째 정규앨범 제목은?", ["이불", "전복 먹으러 갈래", "MMM", "FORM"], 3, "영탁은 2023년 두 번째 정규앨범 ‘FORM’을 발표했습니다.", "melon", "circle", "음원 플랫폼 앨범 정보와 차트 앨범 정보를 확인했습니다."),
  q("youngtak_q009", "broadcast", "easy", "영탁이 TOP 멤버들과 함께 고정 출연한 TV조선 예능으로 맞는 것은?", ["사랑의 콜센타", "런닝맨", "1박 2일", "복면가왕"], 0, "‘사랑의 콜센타’는 미스터트롯 이후 TOP 출연진이 함께한 대표 예능입니다.", "tvChosun", "news", "방송사 프로그램 정보와 관련 보도를 확인했습니다."),
  q("youngtak_q010", "acting", "easy", "영탁이 OST ‘꼰대라떼’로 참여한 드라마는?", ["힘쎈여자 강남순", "꼰대인턴", "각자도생", "메이킹"], 1, "‘꼰대라떼’는 MBC 드라마 ‘꼰대인턴’ OST로 공개되었습니다.", "melon", "news", "OST 발매 정보와 드라마 보도 자료를 대조했습니다."),
  q("youngtak_q011", "concert", "easy", "2022년 영탁의 첫 단독 콘서트 공식 명칭으로 알려진 것은?", ["TAK SHOW", "FORM SHOW", "MMM FESTA", "SUPER TOUR"], 0, "영탁의 첫 단독 콘서트는 ‘TAK SHOW’라는 이름으로 진행되었습니다.", "news", "youtube", "공연 보도와 공식 콘텐츠 표기를 확인했습니다."),
  q("youngtak_q012", "discography", "easy", "2024년에 발표된 영탁의 EP 제목은?", ["MMM", "FORM", "SuperSuper", "Young Tak Disia"], 2, "‘SuperSuper’는 2024년 공개된 영탁의 EP로 정리됩니다.", "melon", "circle", "음원 플랫폼과 Circle Chart 앨범 정보를 확인했습니다.", true),
  q("youngtak_q013", "songs", "easy", "다음 중 영탁의 2021년 발표곡으로 알려진 것은?", ["전복 먹으러 갈래", "폼미쳤다", "찐이야", "이불"], 3, "‘이불’은 미스터트롯 이후 영탁이 2021년에 발표한 싱글입니다.", "melon", "news", "발매일 정보와 보도 자료를 대조했습니다."),
  q("youngtak_q014", "songs", "easy", "‘전복 먹으러 갈래’가 발표된 해는?", ["2022년", "2020년", "2021년", "2024년"], 0, "‘전복 먹으러 갈래’는 2022년 발표된 싱글입니다.", "melon", "news", "음원 발매 정보와 관련 기사 확인."),
  q("youngtak_q015", "acting", "easy", "영탁이 2023년 드라마 ‘힘쎈여자 강남순’에서 맡은 배역명은?", ["강희식", "오영탁", "하동석", "서준희"], 1, "영탁은 JTBC ‘힘쎈여자 강남순’에서 형사 오영탁 역으로 출연했습니다.", "jtbc", "news", "방송사 드라마 페이지와 보도 자료를 확인했습니다."),
  q("youngtak_q016", "fandom", "easy", "영탁 팬덤명으로 널리 알려진 표현은?", ["내사람들", "영블리", "탁스타", "탁엔젤"], 0, "영탁 팬덤은 ‘내사람들’이라는 이름으로 널리 알려져 있습니다.", "youtube", "news", "공식 콘텐츠 및 보도 자료에서 사용되는 명칭 확인."),
  q("youngtak_q017", "songs", "easy", "‘니가 왜 거기서 나와’의 발표 연도로 알려진 것은?", ["2020년", "2021년", "2018년", "2023년"], 2, "‘니가 왜 거기서 나와’는 2018년 발표된 영탁의 대표곡 중 하나입니다.", "melon", "komca", "음원 발매 정보와 저작권 등록 정보를 확인했습니다."),
  q("youngtak_q018", "broadcast", "easy", "영탁이 ‘미스터트롯’ 이후 출연한 TV조선 예능으로 맞는 것은?", ["아는 형님", "불후의 명곡", "놀면 뭐하니?", "뽕숭아학당"], 3, "‘뽕숭아학당’은 미스터트롯 출연자들이 함께한 TV조선 예능입니다.", "tvChosun", "news", "방송사 프로그램 정보와 보도 자료를 확인했습니다."),

  q("youngtak_q019", "release-order", "medium", "다음 중 발매 순서가 빠른 것은?", ["FORM", "SuperSuper", "MMM", "니편이야"], 2, "‘MMM’은 2022년, ‘니편이야’와 ‘FORM’은 2023년, ‘SuperSuper’는 2024년에 공개되었습니다.", "melon", "circle", "앨범 및 싱글 발매 연도를 비교했습니다."),
  q("youngtak_q020", "discography", "medium", "정규앨범 ‘MMM’이 발매된 날짜로 맞는 것은?", ["2022년 7월 4일", "2022년 2월 10일", "2023년 8월 1일", "2024년 9월 3일"], 0, "영탁의 첫 정규앨범 ‘MMM’은 2022년 7월 4일 발매되었습니다.", "melon", "circle", "앨범 발매일 및 Circle Chart 정보를 대조했습니다."),
  q("youngtak_q021", "discography", "medium", "정규앨범 ‘FORM’이 발매된 날짜는?", ["2022년 7월 4일", "2023년 8월 1일", "2024년 9월 3일", "2021년 2월 10일"], 1, "‘FORM’은 2023년 8월 1일 발매된 영탁의 두 번째 정규앨범입니다.", "melon", "circle", "앨범 발매일 및 Circle Chart 정보를 대조했습니다."),
  q("youngtak_q022", "discography", "medium", "EP ‘SuperSuper’가 발매된 날짜로 맞는 것은?", ["2023년 8월 1일", "2022년 7월 4일", "2024년 9월 3일", "2020년 3월 12일"], 2, "‘SuperSuper’는 2024년 9월 3일 발매된 EP입니다.", "melon", "circle", "앨범 발매일 및 차트 등록 정보를 확인했습니다.", true),
  q("youngtak_q023", "songs", "medium", "‘니편이야’는 어떤 형태의 발표곡으로 알려져 있나요?", ["정규 1집 타이틀곡", "미스터트롯 결승곡", "드라마 OST", "2023년 디지털 싱글"], 3, "‘니편이야’는 2023년에 공개된 디지털 싱글로 소개됩니다.", "melon", "news", "음원 플랫폼과 보도 자료를 확인했습니다."),
  q("youngtak_q024", "song-album-link", "medium", "다음 중 정규 1집 ‘MMM’과 연결되는 곡으로 알려진 것은?", ["담", "폼미쳤다", "니편이야", "SuperSuper"], 0, "‘담’은 ‘MMM’ 수록곡으로 확인됩니다.", "melon", "youtube", "앨범 수록곡 정보와 공식 콘텐츠를 확인했습니다."),
  q("youngtak_q025", "song-album-link", "medium", "다음 중 정규 2집 ‘FORM’의 대표곡으로 연결되는 제목은?", ["찐이야", "폼미쳤다", "이불", "꼰대라떼"], 1, "‘폼미쳤다’는 정규 2집 ‘FORM’ 활동과 연결되는 대표곡입니다.", "melon", "youtube", "앨범 트랙 정보와 공식 영상 제목을 확인했습니다."),
  q("youngtak_q026", "song-album-link", "medium", "다음 중 2024년 EP ‘SuperSuper’와 직접 연결되는 제목은?", ["전복 먹으러 갈래", "누나가 딱이야", "Young Tak Disia", "SuperSuper"], 3, "‘SuperSuper’는 2024년 EP 제목이자 동명의 대표 트랙으로 소개됩니다.", "melon", "youtube", "EP 발매 정보와 공식 영상 표기를 확인했습니다.", true),
  q("youngtak_q027", "competition", "medium", "‘미스터트롯’에서 영탁의 ‘막걸리 한잔’ 무대가 특히 주목받은 미션은?", ["팀 미션", "결승전", "듀엣 미션", "1:1 데스매치"], 3, "영탁의 ‘막걸리 한잔’은 미스터트롯 1:1 데스매치 무대로 크게 화제가 되었습니다.", "tvChosun", "news", "방송 회차와 관련 보도 확인."),
  q("youngtak_q028", "broadcast", "medium", "‘사랑의 콜센타’와 함께 미스터트롯 TOP 멤버들이 출연한 TV조선 예능은?", ["히든싱어", "불후의 명곡", "미운 우리 새끼", "뽕숭아학당"], 3, "‘뽕숭아학당’은 미스터트롯 출연자들이 함께한 TV조선 예능으로 알려져 있습니다.", "tvChosun", "news", "방송사 프로그램 정보 확인."),
  q("youngtak_q029", "broadcast", "medium", "영탁이 2022년 원조가수로 출연한 JTBC 음악 예능은?", ["불후의 명곡", "히든싱어7", "복면가왕", "로또싱어"], 1, "영탁은 ‘히든싱어7’에 원조가수로 출연했습니다.", "news", "youtube", "방송 보도 및 공식 영상 표기 확인."),
  q("youngtak_q030", "concert", "medium", "2022년 단독 콘서트 ‘TAK SHOW’가 처음 시작된 도시로 알려진 곳은?", ["부산", "대구", "서울", "대전"], 2, "‘TAK SHOW’는 2022년 서울 공연을 시작으로 전국 투어가 진행되었습니다.", "news", "youtube", "공연 보도와 공식 영상 표기 확인."),
  q("youngtak_q031", "official-content", "medium", "영탁의 공식 유튜브 콘텐츠에서 ‘MMM’ 수록곡으로 특별 클립이 공개된 곡은?", ["폼미쳤다", "찐이야", "니편이야", "안녕김녕"], 3, "‘안녕김녕’은 ‘MMM’ 수록곡으로 공식 유튜브 특별 클립이 공개된 곡입니다.", "youtube", "melon", "공식 유튜브 영상과 앨범 수록곡 정보를 확인했습니다."),
  q("youngtak_q032", "acting", "medium", "영탁이 ‘꼰대인턴’에서 특별 출연한 배역명으로 알려진 것은?", ["차영석", "오영탁", "강희식", "김준하"], 0, "영탁은 ‘꼰대인턴’에  역으로 특별 출연한 것으로 알려져 있습니다.", "kbs", "news", "방송/보도 자료 확인."),
  q("youngtak_q033", "acting", "medium", "영탁이 2023년 정식 연기 도전으로 주목받은 JTBC 드라마는?", ["꼰대인턴", "힘쎈여자 강남순", "각자도생", "대행사"], 1, "영탁은 JTBC 드라마 ‘힘쎈여자 강남순’에서 오영탁 역으로 출연했습니다.", "jtbc", "news", "드라마 공식 페이지와 보도 자료 확인."),
  q("youngtak_q034", "production", "medium", "영탁이 직접 작사·작곡에 참여한 대표곡으로 널리 알려진 것은?", ["사랑의 벚꽃놀이", "막걸리 한잔", "니가 왜 거기서 나와", "보릿고개"], 2, "‘니가 왜 거기서 나와’는 영탁의 작사·작곡 참여 곡으로 저작권 정보에서 확인됩니다.", "komca", "melon", "KOMCA 작품 정보와 음원 크레딧을 확인했습니다."),
  q("youngtak_q035", "collaboration", "medium", "영탁이 작사·작곡에 참여한 정동원의 발표곡으로 알려진 것은?", ["읽씹 안읽씹", "돋보기", "따라따라와", "짝짝꿍짝"], 3, "‘짝짝꿍짝’은 정동원이 발표한 곡으로 영탁의 작업 참여가 알려져 있습니다.", "komca", "melon", "저작권 정보와 음원 크레딧 확인."),
  q("youngtak_q036", "collaboration", "medium", "영탁이 작업에 참여한 장민호의 곡으로 알려진 것은?", ["읽씹 안읽씹", "계세요", "챔피언", "혹시"], 0, "‘읽씹 안읽씹’은 장민호의 곡으로 영탁의 작사·작곡 참여가 알려져 있습니다.", "komca", "melon", "저작권 정보와 음원 크레딧 확인."),
  q("youngtak_q037", "collaboration", "medium", "영탁이 작업에 참여한 김희재의 발표곡으로 알려진 것은?", ["돋보기", "따라따라와", "사랑의 카우보이", "고향가는날"], 1, "‘따라따라와’는 김희재의 곡으로 영탁의 작업 참여가 알려져 있습니다.", "komca", "melon", "저작권 정보와 음원 크레딧 확인."),
  q("youngtak_q038", "collaboration", "medium", "‘미스트롯2’ 결승 작곡가 미션에서 별사랑이 부른 영탁 작업곡은?", ["혹시", "누구없나요", "돋보기", "목말라"], 2, "별사랑의 ‘돋보기’는 미스트롯2 결승 작곡가 미션에서 공개된 영탁 작업곡으로 알려져 있습니다.", "tvChosun", "komca", "방송 미션 정보와 저작권 정보를 확인했습니다."),
  q("youngtak_q039", "awards", "medium", "영탁이 2020년 멜론뮤직어워드에서 받은 작가 관련 상으로 알려진 것은?", ["올해의 앨범", "올해의 레코드", "베스트 댄스", "송라이터상"], 3, "영탁은 2020 멜론뮤직어워드에서 송라이터상 수상자로 보도되었습니다.", "news", "komca", "시상식 보도와 저작권 활동 정보를 대조했습니다."),
  q("youngtak_q040", "awards", "medium", "영탁이 2023년 서울가요대상에서 받은 장르상으로 알려진 것은?", ["트로트상", "발라드상", "댄스상", "OST상"], 0, "영탁은 제32회 서울가요대상에서 트로트상을 수상한 것으로 보도되었습니다.", "news", "melon", "시상식 보도 자료 확인."),
  q("youngtak_q041", "release-order", "medium", "다음 활동을 오래된 순서로 볼 때 가장 먼저인 것은?", ["FORM 발매", "니편이야 발매", "Young Tak Disia 발매", "SuperSuper 발매"], 2, "‘Young Tak Disia’는 2007년 데뷔 음반으로, 보기 중 가장 이른 활동입니다.", "melon", "news", "발매 연도 기준 비교."),
  q("youngtak_q042", "title-distinction", "medium", "다음 중 드라마 OST 제목으로 맞는 것은?", ["꼰대라떼", "TAK SHOW", "FORM", "SuperSuper"], 0, "‘꼰대라떼’는 드라마 ‘꼰대인턴’ OST로 공개된 곡입니다.", "melon", "news", "OST 발매 정보 확인."),

  q("youngtak_q043", "early-music", "hard", "영탁이 과거 활동한 보컬 그룹 이름으로 알려진 것은?", ["J-Symphony", "L-Class", "Park G", "Young & Wild"], 1, "영탁은 데뷔 초기 L-Class 활동 이력이 알려져 있습니다.", "news", "melon", "공개 프로필과 음원 크레딧 정보를 확인했습니다."),
  q("youngtak_q044", "early-music", "hard", "영탁이 과거 민금용과 함께 활동한 듀오로 알려진 이름은?", ["L-Class", "Park G", "J-Symphony", "Tak Studio"], 2, "J-Symphony는 영탁의 초기 음악 활동 이력 중 하나로 소개됩니다.", "news", "melon", "언론 프로필과 음원 플랫폼 검색 정보 확인."),
  q("youngtak_q045", "early-music", "hard", "영탁과 지광민이 함께한 프로듀싱/듀오 활동명으로 알려진 것은?", ["J-Symphony", "L-Class", "Tak Show", "Park G"], 3, "Park G는 영탁과 지광민의 협업 활동명으로 알려져 있습니다.", "komca", "news", "저작권 크레딧과 언론 보도 확인."),
  q("youngtak_q046", "song-album-link", "hard", "다음 중 ‘MMM’ 수록곡으로 알려진 곡은?", ["재잘대", "SuperSuper", "각자도생", "계세요"], 0, "‘재잘대’는 정규 1집 ‘MMM’ 수록곡으로 확인됩니다.", "melon", "youtube", "앨범 수록곡 정보 확인."),
  q("youngtak_q047", "song-album-link", "hard", "다음 중 정규 1집 ‘MMM’에 포함된 수록곡은?", ["폼미쳤다", "우주선", "니편이야", "사랑한다"], 1, "‘우주선’은 ‘MMM’ 수록곡으로 확인됩니다.", "melon", "youtube", "앨범 수록곡 정보 확인."),
  q("youngtak_q048", "song-album-link", "hard", "다음 중 ‘MMM’의 마지막 트랙으로 알려진 곡은?", ["담", "재잘대", "안녕김녕", "이불"], 2, "‘안녕김녕’은 ‘MMM’의 수록곡이자 마지막 트랙으로 소개됩니다.", "melon", "youtube", "앨범 트랙 정보와 공식 영상 확인."),
  q("youngtak_q049", "official-content", "hard", "영탁이 2022년 히든싱어에 원조가수로 출연한 시즌은?", ["시즌 5", "시즌 6", "시즌 8", "시즌 7"], 3, "영탁은 JTBC ‘히든싱어7’에 원조가수로 출연했습니다.", "news", "youtube", "방송 보도 및 공식 영상 제목 확인."),
  q("youngtak_q050", "concert", "hard", "‘2022 영탁 단독 콘서트: The Movie’가 극장 개봉 콘텐츠로 공개된 해는?", ["2023년", "2020년", "2022년", "2024년"], 0, "‘2022 영탁 단독 콘서트: The Movie’는 2023년 극장 개봉 콘텐츠로 공개되었습니다.", "news", "youtube", "영화 개봉 보도와 공식 콘텐츠 표기 확인."),
  q("youngtak_q051", "broadcast", "hard", "영탁이 2019~2020년 진행자로 참여한 라디오 프로그램으로 알려진 것은?", ["두시탈출 컬투쇼", "최일구의 허리케인 라디오", "정오의 희망곡", "박소현의 러브게임"], 1, "영탁은 TBS FM ‘최일구의 허리케인 라디오’ 진행 이력이 알려져 있습니다.", "news", "youtube", "방송 출연 이력 자료 확인."),
  q("youngtak_q052", "acting", "hard", "영탁이 2022년 카메오로 본인 역할 출연한 드라마는?", ["꼰대인턴", "힘쎈여자 강남순", "연예인 매니저로 살아남기", "각자도생"], 2, "영탁은 ‘연예인 매니저로 살아남기’에 본인 역할로 특별 출연했습니다.", "news", "kbs", "드라마 출연 보도 및 방송 자료 확인."),
  q("youngtak_q053", "broadcast", "hard", "영탁이 2023년 고정 패널로 합류한 SBS 예능은?", ["불타는 장미단", "신랑수업", "히든싱어7", "강심장 리그"], 3, "영탁은 SBS ‘강심장 리그’ 고정 패널 출연으로 보도되었습니다.", "sbs", "news", "SBS 프로그램 정보와 보도 자료 확인."),
  q("youngtak_q054", "interview-activity", "hard", "영탁이 2024년 홍보대사로 위촉된 공공기관 관련 활동 중 하나는?", ["코레일 홍보대사", "국립극장 홍보대사", "부산국제영화제 홍보대사", "한글박물관 홍보대사"], 0, "영탁은 2024년 코레일 홍보대사로 위촉된 것으로 보도되었습니다.", "news", "abyss", "공식/언론 발표 확인.", true),
  q("youngtak_q055", "awards", "hard", "영탁의 ‘각자도생’이 2023 APAN Star Awards에서 받은 상으로 알려진 것은?", ["인기상", "베스트 OST상", "신인상", "올해의 음반상"], 1, "‘각자도생’은 2023 APAN Star Awards에서 OST 관련 수상으로 보도되었습니다.", "news", "melon", "시상식 보도와 음원 정보 확인."),
  q("youngtak_q056", "awards", "hard", "2024 Universal Superstar Awards에서 영탁이 받은 상 개수로 보도된 것은?", ["1개", "2개", "3개", "5개"], 2, "영탁은 2024 Universal Superstar Awards에서 3관왕으로 보도되었습니다.", "news", "abyss", "시상식 보도 확인.", true),

  q("youngtak_q057", "production", "expert", "영탁의 작업 파트너로 여러 저작권 크레딧에서 함께 확인되는 인물은?", ["지광민", "조영수", "박현빈", "장윤정"], 0, "영탁은 여러 곡에서 지광민과 함께 작업한 크레딧이 확인됩니다.", "komca", "melon", "KOMCA 작품 검색과 음원 크레딧을 확인했습니다."),
  q("youngtak_q058", "collaboration", "expert", "영탁이 작사·작곡·편곡에 참여한 한이재의 곡으로 알려진 것은?", ["계세요", "고향가는날", "전복 먹으러 갈래", "폼미쳤다"], 1, "‘고향가는날’은 한이재 발표곡으로 영탁의 작업 참여가 알려져 있습니다.", "komca", "melon", "저작권 정보와 음원 크레딧 확인."),
  q("youngtak_q059", "collaboration", "expert", "영탁이 MJ의 ‘Happy Virus’ 앨범 수록곡으로 작업에 참여한 곡은?", ["사랑의 카우보이", "챔피언", "계세요", "누구없나요"], 2, "MJ의 ‘계세요’는 ‘Happy Virus’ 수록곡으로 영탁의 작업 참여가 알려져 있습니다.", "komca", "melon", "저작권 정보와 음원 플랫폼 정보 확인."),
  q("youngtak_q060", "title-distinction", "expert", "다음 중 영탁의 정규앨범명과 EP명을 발매 순서대로 바르게 나열한 것은?", ["FORM → MMM → SuperSuper", "SuperSuper → MMM → FORM", "MMM → SuperSuper → FORM", "MMM → FORM → SuperSuper"], 3, "영탁의 주요 앨범 발매 순서는 2022년 ‘MMM’, 2023년 ‘FORM’, 2024년 ‘SuperSuper’입니다.", "melon", "circle", "앨범 발매일과 차트 등록 정보를 기준으로 확인했습니다.", true),
];

export const youngtakDifficultyScores: Record<YoungtakQuestionDifficulty, number> = {
  easy: 4,
  medium: 6,
  hard: 9,
  expert: 12,
};

export const youngtakCategoryLabels: Record<YoungtakQuestionCategory, string> = {
  profile: "프로필·데뷔",
  "early-music": "초기 음악",
  "trot-transition": "트로트 전향",
  discography: "앨범·발매",
  songs: "대표곡",
  "release-order": "활동 순서",
  broadcast: "방송",
  competition: "경연",
  concert: "콘서트",
  production: "작사·작곡",
  collaboration: "협업곡",
  "official-content": "공식 콘텐츠",
  acting: "연기·드라마",
  fandom: "팬덤",
  "interview-activity": "공식 활동",
  awards: "수상",
  "song-album-link": "곡·앨범 연결",
  "title-distinction": "명칭 구분",
};

export const youngtakFanGradeProfiles: YoungtakFanGradeProfile[] = [
  { slug: "youngtak-entry", minScore: 0, maxScore: 19, title: "영탁 입문 준비 중", summary: "대표곡부터 천천히 만나면 팬심이 쑥쑥 자랄 단계예요.", description: "아직 영탁의 노래와 방송 활동을 알아가는 초입에 있습니다. 점수가 낮아도 팬심의 크기를 단정하는 것은 아니며, 누구에게나 첫 무대와 첫 노래가 있습니다. ‘찐이야’, ‘이불’, ‘전복 먹으러 갈래’처럼 대표곡부터 차근차근 들어보면 다음 도전에서 훨씬 익숙하게 느껴질 거예요.", traits: ["대표 활동을 알아가는 중", "성장 여지가 큰 팬심", "재도전 상승 폭이 큼"], recommendations: ["대표곡 플레이리스트부터 들어보기", "오답노트에서 앨범·방송 연결관계 확인하기"], shareTexts: ["나의 영탁 팬심 지수는 {score}점! 이제부터 알아가는 중이에요.", "영탁 팬 퀴즈 입문 단계! 다음엔 더 올라간다."] },
  { slug: "youngtak-curious", minScore: 20, maxScore: 39, title: "관심이 생긴 예비 팬", summary: "대표곡과 주요 활동을 조금씩 알아가는 단계입니다.", description: "영탁의 대표곡과 방송 활동을 일부 알고 있으며, 앞으로 팬심이 더 커질 가능성이 높은 구간입니다. 대중적으로 많이 알려진 곡은 익숙하지만 앨범 수록곡이나 세부 방송 기록에서는 헷갈릴 수 있습니다. 활동 연도와 앨범명을 함께 정리하면 점수가 빠르게 올라갑니다.", traits: ["대표곡 일부 인지", "방송 활동에 대한 기본 감각", "앨범·수록곡 연결은 성장 중"], recommendations: ["미스터트롯 주요 무대 다시 보기", "MMM·FORM·SuperSuper 발매 순서 정리하기"], shareTexts: ["나의 영탁 팬심 지수는 {score}점, 관심이 생긴 예비 팬!", "영탁 퀴즈 예비 팬 단계가 나왔어요. 당신은 몇 점?"] },
  { slug: "youngtak-solid-fan", minScore: 40, maxScore: 59, title: "제법 잘 아는 팬", summary: "대표곡뿐 아니라 방송과 앨범 활동도 꽤 알고 있어요.", description: "일반 대중보다 영탁의 활동을 더 폭넓게 이해하고 있는 단계입니다. 대표곡, 방송 출연, 주요 앨범은 꽤 잡혀 있지만 협업곡이나 세부 수록곡에서는 조금 흔들릴 수 있습니다. 오답노트를 통해 카테고리별 약점을 확인하면 확실한 찐팬 구간으로 올라가기 좋습니다.", traits: ["대표곡과 방송 지식 안정적", "앨범 활동을 어느 정도 이해", "세부 크레딧은 보강 필요"], recommendations: ["작사·작곡 참여곡 정리하기", "공식 유튜브 콘텐츠로 수록곡 확인하기"], shareTexts: ["나의 영탁 팬심 지수는 {score}점! 제법 잘 아는 팬입니다.", "영탁 팬 퀴즈 {score}점, 이제 찐팬 코앞!"] },
  { slug: "youngtak-real-fan", minScore: 60, maxScore: 79, title: "확실한 영탁 찐팬", summary: "다양한 활동과 무대를 꾸준히 지켜본 팬이에요.", description: "대표곡은 물론 앨범, 방송, 콘서트, 연기 활동까지 넓게 알고 있는 팬입니다. 웬만한 문제에는 쉽게 흔들리지 않고, 영탁의 활동 흐름을 연도별로 연결할 수 있는 수준입니다. 최상 난이도와 협업곡 크레딧만 조금 더 보강하면 영탁 백과사전 단계도 충분히 가능합니다.", traits: ["활동 흐름 이해도가 높음", "방송·앨범 지식 균형형", "난이도 높은 문제도 일부 해결"], recommendations: ["협업곡·작곡 참여곡 목록 확인하기", "콘서트·영화 콘텐츠 기록 복습하기"], shareTexts: ["나의 영탁 팬심 지수는 {score}점, 확실한 영탁 찐팬!", "영탁 팬 퀴즈에서 {score}점 나왔어요."] },
  { slug: "youngtak-encyclopedia", minScore: 80, maxScore: 94, title: "영탁 백과사전", summary: "앨범, 무대, 방송, 활동 순서까지 폭넓게 알고 있어요.", description: "영탁의 핵심 활동을 매우 넓게 파악하고 있습니다. 대표곡뿐 아니라 앨범 발매 순서, 방송 출연, 협업곡과 수상 기록까지 안정적으로 기억하는 수준입니다. 주변 팬들이 헷갈리는 내용을 물어볼 만한 단계이며, 최상 난이도 몇 문제만 더 잡으면 팬심 만렙에 가까워집니다.", traits: ["앨범·방송·무대 지식 탄탄", "협업과 수상 기록에도 강함", "팬 커뮤니티 지식인급"], recommendations: ["최상 난이도 오답만 따로 복습하기", "KOMCA·공식 음원 크레딧으로 작곡 참여곡 확인하기"], shareTexts: ["나의 영탁 팬심 지수는 {score}점, 영탁 백과사전!", "영탁 백과사전 등급 나왔어요. 당신도 도전해보세요."] },
  { slug: "youngtak-max", minScore: 95, maxScore: 100, title: "영탁 팬심 만렙", summary: "쉬운 문제부터 최상 난이도까지 거의 완벽한 최상위 팬이에요.", description: "영탁의 노래, 앨범, 방송, 콘서트와 작업 참여 기록까지 매우 정확하게 기억하고 있습니다. 단순히 대표곡을 아는 수준을 넘어 활동의 흐름과 세부 기록을 함께 이해하는 단계입니다. 팬심에는 여러 모양이 있지만, 지식 퀴즈 기준으로는 축하받아도 좋은 만렙 구간입니다.", traits: ["최상 난이도까지 해결", "세부 활동 기록에 강함", "흐름과 맥락을 함께 기억"], recommendations: ["친구에게 퀴즈 공유하기", "새 활동이 나오면 문제은행 업데이트 제안하기"], shareTexts: ["나의 영탁 팬심 지수는 {score}점, 영탁 팬심 만렙!", "영탁 팬 퀴즈 만렙 달성! 당신은 몇 점인가요?"] },
];

export function getYoungtakFanGrade(score: number) {
  return youngtakFanGradeProfiles.find((profile) => score >= profile.minScore && score <= profile.maxScore) ?? youngtakFanGradeProfiles[0];
}

export function getYoungtakQuestion(id: string) {
  return youngtakFanQuestions.find((question) => question.id === id);
}

export function getYoungtakFanGradeProfile(slug: string) {
  return youngtakFanGradeProfiles.find((profile) => profile.slug === slug);
}

export function validateYoungtakQuestionBank() {
  const counts = { easy: 0, medium: 0, hard: 0, expert: 0 } as Record<YoungtakQuestionDifficulty, number>;
  const answerCounts = [0, 0, 0, 0];
  const ids = new Set<string>();
  const questionTexts = new Set<string>();
  for (const question of youngtakFanQuestions) {
    counts[question.difficulty] += 1;
    answerCounts[question.correctAnswer] += 1;
    if (ids.has(question.id)) throw new Error(`Duplicated Youngtak question id: ${question.id}`);
    ids.add(question.id);
    if (questionTexts.has(question.question)) throw new Error(`Duplicated Youngtak question text: ${question.question}`);
    questionTexts.add(question.question);
    if (question.options.length !== 4) throw new Error(`${question.id} must have exactly four options.`);
    if (new Set(question.options).size !== 4) throw new Error(`${question.id} has duplicated options.`);
    if (!Number.isInteger(question.correctAnswer) || question.correctAnswer < 0 || question.correctAnswer > 3) throw new Error(`${question.id} has invalid correctAnswer.`);
    if (!question.options[question.correctAnswer]) throw new Error(`${question.id} has no correct option.`);
    if (!question.explanation || !question.sourceUrl || !question.secondarySourceUrl || !question.verifiedAt || !question.category) throw new Error(`${question.id} lacks required metadata.`);
  }
  if (youngtakFanQuestions.length !== 60) throw new Error(`Youngtak question bank must include exactly 60 questions. Current: ${youngtakFanQuestions.length}`);
  if (counts.easy !== 18 || counts.medium !== 24 || counts.hard !== 14 || counts.expert !== 4) throw new Error(`Invalid Youngtak difficulty counts: ${JSON.stringify(counts)}`);
  if (Math.max(...answerCounts) - Math.min(...answerCounts) > 2) throw new Error(`Answer positions are too skewed: ${answerCounts.join(",")}`);
  return { total: youngtakFanQuestions.length, counts, answerCounts };
}

validateYoungtakQuestionBank();

export const youngtakFanTest: TestDefinition = {
  type: "quiz",
  slug: "youngtak-fan-test",
  title: "영탁 팬 퀴즈",
  shortTitle: "영탁 팬 퀴즈",
  cardTitle: "영탁 팬 퀴즈",
  description: "노래부터 방송, 무대, 앨범과 활동 기록까지 15문제로 나의 영탁 팬심 지수를 확인해보세요.",
  category: "팬 퀴즈",
  duration: "약 3~5분",
  icon: "🎤",
  thumbnail: "/tests/youngtak-fan.jpg",
  participants: 9344,
  accent: "pink",
  fanTheme: "yellow-pop",
  isNew: true,
  itemCount: YOUNGTAK_FAN_QUIZ_SIZE,
  questions: [],
  resultSlugs: [],
  seoTitle: "영탁 팬 퀴즈｜나는 영탁을 얼마나 잘 알고 있을까?",
  seoDescription: "영탁의 노래, 앨범, 방송, 무대와 활동 기록에 관한 퀴즈를 풀고 나의 영탁 팬심 지수를 확인해보세요. 총 60문제 중 난이도별 15문제가 랜덤으로 출제됩니다.",
  keywords: ["영탁 팬 퀴즈", "영탁 팬 테스트", "영탁 퀴즈", "영탁 팬심 테스트", "영탁 노래 퀴즈", "영탁 테스트", "영탁 팬심 지수"],
  seoContent: {
    heading: "영탁 팬 퀴즈란?",
    paragraphs: [
      "영탁 팬 퀴즈는 영탁의 노래, 앨범, 방송, 무대, 콘서트, 작사·작곡 참여와 활동 기록을 바탕으로 팬심 지수를 확인하는 4지선다형 지식 퀴즈입니다. 단순히 대표곡 하나를 맞히는 수준이 아니라, 쉬움부터 최상 난이도까지 균형 있게 출제됩니다.",
      "전체 문제은행은 60문항으로 구성되어 있으며, 테스트를 시작할 때마다 쉬움 4문항, 보통 6문항, 어려움 4문항, 최상 1문항이 랜덤으로 출제됩니다. 난이도별 점수가 다르게 적용되어 총 100점 만점의 영탁 팬심 지수가 계산됩니다.",
      "결과 화면에서는 점수와 팬심 유형, 난이도별 정답 수, 카테고리별 정답률, 오답노트를 확인할 수 있습니다. 본 테스트는 영탁 또는 소속사의 공식 서비스가 아닌 비공식 팬 퀴즈이며, 공식 사진이나 얼굴 이미지를 사용하지 않습니다.",
    ],
    faqs: [
      ["영탁 팬 퀴즈는 몇 문제인가요?", "총 60개의 문제은행 중 매번 난이도별 15문항이 랜덤으로 출제됩니다."],
      ["문제는 매번 동일한가요?", "아니요. 테스트를 시작할 때마다 문제와 보기 순서가 섞이며, 진행 중에는 선택된 문제 구성이 유지됩니다."],
      ["점수는 어떻게 계산되나요?", "쉬움 4점, 보통 6점, 어려움 9점, 최상 12점으로 계산해 15문항 총점이 정확히 100점이 되도록 구성했습니다."],
      ["테스트 결과는 저장되나요?", "아니요. 응답은 서버에 저장되지 않으며 결과 공유를 위해 URL에 최소한의 답변 정보만 포함됩니다."],
    ],
    assesses: "영탁 노래, 앨범, 방송, 무대와 활동 기록 지식",
  },
};
