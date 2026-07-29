import type {
  ArsenalFanGradeProfile,
  ArsenalQuestionCategory,
  ArsenalQuestionDifficulty,
  ArsenalQuizQuestion,
  TestDefinition,
} from "@/lib/types";

export const ARSENAL_FAN_QUIZ_SIZE = 15;
export const ARSENAL_FAN_MAX_RAW_SCORE = 29;
export const ARSENAL_VERIFIED_AT = "2026-07-10";

const sourceUrls = {
  arsenalHistory: "https://www.arsenal.com/history",
  arsenalHonours: "https://www.arsenal.com/men/honours",
  arsenalRecords: "https://www.arsenal.com/the-club/club-records",
  premierLeagueArsenal: "https://www.premierleague.com/en/clubs/3/arsenal/overview",
  premierLeagueArchive: "https://www.premierleague.com/en/tables",
  uefaFinal2006: "https://www.uefa.com/uefachampionsleague/history/seasons/2005/matches/1108503/",
  uefaArsenal: "https://www.uefa.com/uefachampionsleague/clubs/52280--arsenal/",
  faCup: "https://www.thefa.com/competitions/thefacup",
} as const;

const q = (
  id: string,
  category: ArsenalQuestionCategory,
  difficulty: ArsenalQuestionDifficulty,
  question: string,
  options: string[],
  correctAnswer: number,
  explanation: string,
  sourceName: string,
  sourceUrl: string,
  isTimeSensitive = false,
  referenceSeason?: string,
  kind: ArsenalQuizQuestion["kind"] = "standard",
): ArsenalQuizQuestion => ({
  id,
  category,
  difficulty,
  question,
  options,
  correctAnswer,
  explanation,
  sourceName,
  sourceUrl,
  verifiedAt: ARSENAL_VERIFIED_AT,
  isTimeSensitive,
  referenceSeason,
  kind,
});

export const arsenalFanQuestions: ArsenalQuizQuestion[] = [
  q("arsenal_001", "history", "easy", "아스날 FC가 창단된 연도는?", ["1886년", "1892년", "1904년", "1913년"], 0, "아스날은 1886년 런던 남동부 울위치의 Royal Arsenal 노동자들을 중심으로 시작되었습니다.", "Premier League Official", sourceUrls.premierLeagueArsenal),
  q("arsenal_002", "stadium", "easy", "2024/25시즌 기준 아스날의 홈구장은 어디인가요?", ["에미레이츠 스타디움", "하이버리", "웸블리 스타디움", "화이트 하트 레인"], 0, "아스날은 2006/07시즌부터 에미레이츠 스타디움을 홈으로 사용하고 있습니다.", "Premier League Official", sourceUrls.premierLeagueArsenal, true, "2024/25", "current-season"),
  q("arsenal_003", "rivalry", "easy", "아스날의 북런던 더비 최대 라이벌은 어느 팀인가요?", ["토트넘 홋스퍼", "첼시", "웨스트햄 유나이티드", "풀럼"], 0, "아스날과 토트넘의 경기는 북런던 더비로 불리며 가장 대표적인 지역 라이벌전입니다.", "Arsenal Official", sourceUrls.arsenalHistory),
  q("arsenal_004", "honours", "easy", "아스날이 프리미어리그 무패 우승을 달성한 시즌은?", ["2003/04시즌", "1997/98시즌", "2001/02시즌", "2004/05시즌"], 0, "아스날은 2003/04 프리미어리그에서 26승 12무 0패로 우승하며 ‘인빈서블스’로 불렸습니다.", "Premier League Official", sourceUrls.premierLeagueArchive),
  q("arsenal_005", "manager", "easy", "아스날의 2003/04 무패 우승을 이끈 감독은?", ["아르센 벵거", "조지 그레이엄", "허버트 채프먼", "미켈 아르테타"], 0, "2003/04 인빈서블스 시즌의 감독은 아르센 벵거였습니다.", "Arsenal Official", sourceUrls.arsenalHistory),
  q("arsenal_006", "player", "easy", "아스날 통산 최다 득점자로 널리 기록되는 선수는?", ["티에리 앙리", "이안 라이트", "로빈 판페르시", "데니스 베르캄프"], 0, "티에리 앙리는 아스날 공식 경기 통산 228골로 구단 최다 득점자로 기록됩니다.", "Arsenal Official", sourceUrls.arsenalRecords),
  q("arsenal_007", "stadium", "easy", "에미레이츠 스타디움 이전 아스날의 대표 홈구장은?", ["하이버리", "스탬퍼드 브리지", "메인 로드", "셀허스트 파크"], 0, "하이버리는 1913년부터 2006년까지 아스날의 상징적인 홈구장이었습니다.", "Arsenal Official", sourceUrls.arsenalHistory),
  q("arsenal_008", "culture", "easy", "아스날의 대표 애칭인 ‘The Gunners’는 무엇과 관련이 깊나요?", ["대포와 군수공장", "철도 기관차", "항구 노동자", "사자 문양"], 0, "아스날은 Royal Arsenal 군수공장 노동자들이 만든 팀에서 출발했고, 대포는 구단 상징이 되었습니다.", "Arsenal Official", sourceUrls.arsenalHistory),
  q("arsenal_009", "history", "easy", "아스날의 전신으로 알려진 첫 구단명은?", ["Dial Square", "Woolwich Town", "North London FC", "Highbury United"], 0, "1886년 창단 당시 팀은 Dial Square로 시작했고 곧 Royal Arsenal로 이름을 바꿨습니다.", "Arsenal Official", sourceUrls.arsenalHistory),
  q("arsenal_010", "europe", "easy", "2006 UEFA 챔피언스리그 결승에서 아스날이 맞붙은 팀은?", ["FC 바르셀로나", "AC 밀란", "레알 마드리드", "바이에른 뮌헨"], 0, "아스날은 2006년 파리에서 열린 UEFA 챔피언스리그 결승에서 바르셀로나와 만났고 1-2로 패했습니다.", "UEFA Official", sourceUrls.uefaFinal2006),
  q("arsenal_011", "honours", "easy", "2024/25시즌 종료 기준 아스날의 잉글랜드 1부 리그 우승 횟수는?", ["13회", "10회", "15회", "18회"], 0, "아스날은 First Division과 Premier League를 합쳐 13번 잉글랜드 최상위 리그를 제패했습니다.", "Arsenal Official", sourceUrls.arsenalHonours, true, "2024/25", "current-season"),
  q("arsenal_012", "honours", "easy", "2024/25시즌 종료 기준 아스날의 FA컵 우승 횟수는?", ["14회", "11회", "12회", "16회"], 0, "아스날은 FA컵을 14회 우승해 대회 최다 우승 구단으로 기록되어 있습니다.", "The FA Official", sourceUrls.faCup, true, "2024/25", "current-season"),
  q("arsenal_013", "culture", "easy", "아스날 팬을 부르는 표현으로 널리 쓰이는 말은?", ["구너(Gooner)", "콥(Kopite)", "시티즌(Citizen)", "토피(Toffee)"], 0, "아스날 팬은 구단 애칭 The Gunners에서 파생된 Gooner라는 표현으로 자주 불립니다.", "Arsenal Official", sourceUrls.arsenalHistory),
  q("arsenal_014", "manager", "easy", "아스날 역사상 가장 오래 재임한 감독으로 기록되는 인물은?", ["아르센 벵거", "조지 그레이엄", "허버트 채프먼", "테리 닐"], 0, "아르센 벵거는 1996년부터 2018년까지 아스날을 이끌며 구단 최장수 감독으로 남았습니다.", "Arsenal Official", sourceUrls.arsenalRecords),
  q("arsenal_015", "stadium", "easy", "아스날이 에미레이츠 스타디움으로 옮긴 뒤 처음 맞은 시즌은?", ["2006/07시즌", "2004/05시즌", "2005/06시즌", "2007/08시즌"], 0, "아스날은 2005/06시즌을 끝으로 하이버리를 떠나 2006/07시즌부터 에미레이츠 스타디움을 사용했습니다.", "Arsenal Official", sourceUrls.arsenalHistory),
  q("arsenal_016", "player", "easy", "‘논 플라잉 더치맨’으로 불린 아스날 레전드는?", ["데니스 베르캄프", "로베르 피레스", "프레디 융베리", "산티 카솔라"], 0, "데니스 베르캄프는 네덜란드 출신 아스날 레전드로, 별명과 뛰어난 기술로 유명합니다.", "Arsenal Official", sourceUrls.arsenalHistory),
  q("arsenal_017", "player", "easy", "아스날과 잉글랜드 대표팀에서 ‘Mr Arsenal’ 이미지로 유명한 수비수는?", ["토니 애덤스", "솔 캠벨", "마틴 키언", "애슐리 콜"], 0, "토니 애덤스는 원클럽맨이자 오랜 주장으로 아스날의 상징적인 수비수입니다.", "Arsenal Official", sourceUrls.arsenalHistory),
  q("arsenal_018", "culture", "easy", "아스날의 전통 홈 유니폼을 가장 잘 설명한 것은?", ["붉은 몸판과 흰 소매", "푸른 몸판과 흰 소매", "검은 몸판과 붉은 소매", "노란 몸판과 검은 소매"], 0, "아스날의 전통 홈 유니폼은 붉은색 몸판과 흰 소매 조합으로 잘 알려져 있습니다.", "Arsenal Official", sourceUrls.arsenalHistory),

  q("arsenal_019", "history", "medium", "아스날의 초창기 뿌리가 있는 런던 남동부 지역은?", ["울위치", "하이버리", "해머스미스", "이즐링턴"], 0, "아스날은 북런던으로 옮기기 전 울위치의 Royal Arsenal과 깊은 관련이 있었습니다.", "Arsenal Official", sourceUrls.arsenalHistory),
  q("arsenal_020", "history", "medium", "Royal Arsenal이 프로 구단화와 함께 사용한 이름은?", ["Woolwich Arsenal", "Highbury Arsenal", "London Arsenal", "Dial Square United"], 0, "Royal Arsenal은 프로 구단이 된 뒤 Woolwich Arsenal이라는 이름으로 풋볼리그에 참가했습니다.", "Arsenal Official", sourceUrls.arsenalHistory),
  q("arsenal_021", "stadium", "medium", "아스날이 하이버리로 연고지를 옮긴 해는?", ["1913년", "1906년", "1925년", "1930년"], 0, "울위치 아스날은 1913년 북런던 하이버리로 이동했습니다.", "Arsenal Official", sourceUrls.arsenalHistory),
  q("arsenal_022", "history", "medium", "구단명이 최종적으로 ‘Arsenal’로 정착한 시기로 맞는 것은?", ["1919년", "1893년", "1930년", "1971년"], 0, "구단명은 Woolwich Arsenal, The Arsenal을 거쳐 1919년 Arsenal로 정착했습니다.", "Arsenal Official", sourceUrls.arsenalHistory),
  q("arsenal_023", "manager", "medium", "1920~30년대 아스날의 현대적 성공 기반을 만든 감독은?", ["허버트 채프먼", "버티 미", "조지 앨리슨", "톰 휘태커"], 0, "허버트 채프먼은 1925년 아스날 감독으로 부임해 구단의 1930년대 전성기 기반을 만들었습니다.", "Arsenal Official", sourceUrls.arsenalHistory),
  q("arsenal_024", "honours", "medium", "아스날이 처음으로 획득한 주요 전국 대회 우승은?", ["1930년 FA컵", "1931년 리그 우승", "1970년 인터시티스 페어스컵", "1987년 리그컵"], 0, "아스날의 첫 주요 전국 대회 우승은 1930년 FA컵 우승입니다.", "Arsenal Official", sourceUrls.arsenalHonours),
  q("arsenal_025", "honours", "medium", "아스날의 첫 잉글랜드 1부 리그 우승 시즌은?", ["1930/31시즌", "1929/30시즌", "1934/35시즌", "1947/48시즌"], 0, "아스날은 1930/31시즌에 처음으로 잉글랜드 1부 리그 정상에 올랐습니다.", "Arsenal Official", sourceUrls.arsenalHonours),
  q("arsenal_026", "europe", "medium", "아스날의 첫 유럽 대회 우승으로 기록되는 1969/70시즌 대회는?", ["인터시티스 페어스컵", "UEFA 컵위너스컵", "UEFA컵", "유러피언컵"], 0, "아스날은 1969/70 인터시티스 페어스컵에서 구단 첫 유럽 트로피를 들어 올렸습니다.", "Arsenal Official", sourceUrls.arsenalHonours),
  q("arsenal_027", "honours", "medium", "아스날이 첫 리그·FA컵 더블을 달성한 시즌은?", ["1970/71시즌", "1988/89시즌", "1997/98시즌", "2001/02시즌"], 0, "버티 미 감독의 아스날은 1970/71시즌 리그와 FA컵을 모두 우승했습니다.", "Arsenal Official", sourceUrls.arsenalHonours),
  q("arsenal_028", "match", "medium", "1988/89시즌 안필드에서 리그 우승을 확정한 상대는?", ["리버풀", "에버턴", "맨체스터 유나이티드", "토트넘 홋스퍼"], 0, "아스날은 1989년 안필드에서 리버풀을 2-0으로 꺾고 극적으로 리그 우승을 차지했습니다.", "Arsenal Official", sourceUrls.arsenalHistory, false, undefined, "match-score"),
  q("arsenal_029", "match", "medium", "1989년 안필드 우승 결정전에서 종료 직전 두 번째 골을 넣은 선수는?", ["마이클 토머스", "앨런 스미스", "폴 머슨", "데이비드 로캐슬"], 0, "마이클 토머스의 막판 골은 아스날 역사상 가장 극적인 우승 장면 중 하나로 남았습니다.", "Arsenal Official", sourceUrls.arsenalHistory),
  q("arsenal_030", "manager", "medium", "1988/89시즌 리그 우승 당시 아스날 감독은?", ["조지 그레이엄", "테리 닐", "돈 하우", "아르센 벵거"], 0, "조지 그레이엄은 아스날을 1988/89시즌 리그 우승으로 이끌었습니다.", "Arsenal Official", sourceUrls.arsenalHistory),
  q("arsenal_031", "honours", "medium", "아스날이 처음 리그컵을 우승한 시즌은?", ["1986/87시즌", "1978/79시즌", "1992/93시즌", "2006/07시즌"], 0, "아스날의 첫 리그컵 우승은 1986/87시즌으로, 결승에서 리버풀을 이겼습니다.", "Arsenal Official", sourceUrls.arsenalHonours),
  q("arsenal_032", "europe", "medium", "1993/94 UEFA 컵위너스컵 결승에서 아스날이 꺾은 팀은?", ["파르마", "레알 사라고사", "발렌시아", "갈라타사라이"], 0, "아스날은 1994년 코펜하겐에서 파르마를 1-0으로 꺾고 컵위너스컵을 우승했습니다.", "UEFA Official", sourceUrls.uefaArsenal),
  q("arsenal_033", "europe", "medium", "1993/94 UEFA 컵위너스컵 결승의 결승골을 넣은 선수는?", ["앨런 스미스", "이안 라이트", "폴 머슨", "케빈 캠벨"], 0, "파르마와의 결승에서 앨런 스미스가 넣은 골이 아스날의 우승을 결정했습니다.", "UEFA Official", sourceUrls.uefaArsenal),
  q("arsenal_034", "europe", "medium", "아스날이 2000 UEFA컵 결승에서 맞붙은 팀은?", ["갈라타사라이", "파르마", "발렌시아", "페예노르트"], 0, "아스날은 2000 UEFA컵 결승에서 갈라타사라이와 0-0으로 비긴 뒤 승부차기에서 패했습니다.", "UEFA Official", sourceUrls.uefaArsenal),
  q("arsenal_035", "honours", "medium", "아스날이 2005 FA컵 결승에서 승부차기로 이긴 상대는?", ["맨체스터 유나이티드", "첼시", "리버풀", "뉴캐슬 유나이티드"], 0, "2005 FA컵 결승에서 아스날은 맨체스터 유나이티드를 승부차기로 꺾었습니다.", "The FA Official", sourceUrls.faCup),
  q("arsenal_036", "honours", "medium", "아스날이 2014 FA컵 결승에서 꺾고 긴 무관을 끝낸 상대는?", ["헐 시티", "애스턴 빌라", "위건 애슬레틱", "스토크 시티"], 0, "아스날은 2014 FA컵 결승에서 헐 시티를 연장 끝 3-2로 꺾고 트로피를 들어 올렸습니다.", "The FA Official", sourceUrls.faCup, false, undefined, "match-score"),
  q("arsenal_037", "honours", "medium", "2017 FA컵 결승에서 아스날이 2-1로 이긴 상대는?", ["첼시", "맨체스터 시티", "토트넘 홋스퍼", "리버풀"], 0, "아스날은 2017 FA컵 결승에서 첼시를 2-1로 꺾었습니다.", "The FA Official", sourceUrls.faCup, false, undefined, "match-score"),
  q("arsenal_038", "honours", "medium", "2020 FA컵 결승에서 아스날의 두 골을 모두 넣은 선수는?", ["피에르에메릭 오바메양", "알렉상드르 라카제트", "니콜라 페페", "부카요 사카"], 0, "오바메양은 2020 FA컵 결승 첼시전에서 두 골을 넣어 아스날의 2-1 승리를 이끌었습니다.", "The FA Official", sourceUrls.faCup, false, "2019/20", "match-score"),
  q("arsenal_039", "europe", "medium", "2006 UEFA 챔피언스리그 결승에서 아스날의 득점자는?", ["솔 캠벨", "티에리 앙리", "프레디 융베리", "세스크 파브레가스"], 0, "솔 캠벨은 2006 챔피언스리그 결승에서 아스날의 선제골을 넣었습니다.", "UEFA Official", sourceUrls.uefaFinal2006),

  q("arsenal_040", "history", "hard", "Dial Square가 1886년 첫 경기에서 상대했던 팀은?", ["Eastern Wanderers", "Nottingham Forest", "Royal Engineers", "Woolwich Union"], 0, "Dial Square는 1886년 12월 Eastern Wanderers와 첫 경기를 치렀고 6-0으로 이긴 것으로 기록됩니다.", "Arsenal Official", sourceUrls.arsenalHistory, false, undefined, "match-score"),
  q("arsenal_041", "manager", "hard", "아스날의 첫 전임 감독으로 기록되는 인물은?", ["토머스 미첼", "허버트 채프먼", "조지 모렐", "필 켈소"], 0, "토머스 미첼은 1897년 아스날의 첫 전임 감독으로 부임한 인물로 기록됩니다.", "Arsenal Official", sourceUrls.arsenalRecords),
  q("arsenal_042", "player", "hard", "아스날 공식 경기 최다 출전 기록을 가진 선수는?", ["데이비드 오리어리", "토니 애덤스", "조지 암스트롱", "리 패트릭 딕슨"], 0, "데이비드 오리어리는 아스날에서 공식전 722경기에 출전한 구단 최다 출전 기록 보유자입니다.", "Arsenal Official", sourceUrls.arsenalRecords),
  q("arsenal_043", "player", "hard", "1935년 애스턴 빌라전에서 아스날 선수 한 경기 최다 득점 기록인 7골을 넣은 선수는?", ["테드 드레이크", "클리프 배스틴", "데이비드 잭", "조 헐미"], 0, "테드 드레이크는 1935년 애스턴 빌라전에서 7골을 넣어 구단 한 경기 최다 득점 기록을 세웠습니다.", "Arsenal Official", sourceUrls.arsenalRecords),
  q("arsenal_044", "honours", "hard", "아스날이 리그 한 시즌 최다 득점 127골을 기록한 시즌은?", ["1930/31시즌", "1934/35시즌", "1970/71시즌", "2003/04시즌"], 0, "아스날은 1930/31시즌 1부 리그에서 127골을 기록하며 구단 리그 시즌 최다 득점 기록을 남겼습니다.", "Arsenal Official", sourceUrls.arsenalRecords),
  q("arsenal_045", "honours", "hard", "1990/91시즌 조지 그레이엄의 아스날은 리그에서 몇 패를 기록했나요?", ["1패", "0패", "2패", "4패"], 0, "아스날은 1990/91시즌 리그에서 단 1패만 기록하고 우승했습니다.", "Arsenal Official", sourceUrls.arsenalHonours),
  q("arsenal_046", "honours", "hard", "2003/04 인빈서블스의 리그 기록으로 맞는 것은?", ["26승 12무 0패", "24승 14무 0패", "28승 8무 2패", "25승 10무 3패"], 0, "2003/04 아스날은 프리미어리그 38경기에서 26승 12무 0패, 승점 90점을 기록했습니다.", "Premier League Official", sourceUrls.premierLeagueArchive),
  q("arsenal_047", "match", "hard", "아스날의 49경기 리그 무패 행진을 2004년 10월 끝낸 팀은?", ["맨체스터 유나이티드", "첼시", "리버풀", "볼턴 원더러스"], 0, "아스날의 49경기 무패 행진은 2004년 10월 올드 트래퍼드에서 맨체스터 유나이티드에 패하며 끝났습니다.", "Premier League Official", sourceUrls.premierLeagueArchive, false, undefined, "match-score"),
  q("arsenal_048", "europe", "hard", "아스날이 1980 UEFA 컵위너스컵 결승에서 승부차기 끝에 패한 상대는?", ["발렌시아", "파르마", "안데를레흐트", "레알 사라고사"], 0, "아스날은 1980 컵위너스컵 결승에서 발렌시아와 0-0으로 비긴 뒤 승부차기에서 패했습니다.", "UEFA Official", sourceUrls.uefaArsenal),
  q("arsenal_049", "europe", "hard", "1995 UEFA 컵위너스컵 결승에서 아스날을 이긴 팀은?", ["레알 사라고사", "파르마", "갈라타사라이", "벤피카"], 0, "아스날은 1995 컵위너스컵 결승에서 레알 사라고사에 패해 준우승했습니다.", "UEFA Official", sourceUrls.uefaArsenal),
  q("arsenal_050", "europe", "hard", "2006 UEFA 챔피언스리그 결승에서 전반에 퇴장당한 아스날 골키퍼는?", ["옌스 레만", "마누엘 알무니아", "데이비드 시먼", "보이치에흐 슈체스니"], 0, "옌스 레만은 2006 챔피언스리그 결승 전반에 퇴장당했고, 아스날은 수적 열세에서 경기를 이어갔습니다.", "UEFA Official", sourceUrls.uefaFinal2006),
  q("arsenal_051", "honours", "hard", "1930 FA컵 결승에서 아스날이 꺾은 상대는?", ["허더즈필드 타운", "더비 카운티", "웨스트 브로미치 앨비언", "셰필드 웬즈데이"], 0, "아스날은 1930 FA컵 결승에서 허더즈필드 타운을 2-0으로 이기며 첫 주요 전국 트로피를 획득했습니다.", "The FA Official", sourceUrls.faCup, false, undefined, "match-score"),
];

export const arsenalDifficultyWeights: Record<ArsenalQuestionDifficulty, number> = {
  easy: 1,
  medium: 2,
  hard: 3,
};

export const arsenalCategoryLabels: Record<ArsenalQuestionCategory, string> = {
  history: "역사·구단",
  stadium: "역사·구단",
  culture: "역사·구단",
  player: "선수·감독",
  manager: "선수·감독",
  honours: "경기·우승",
  match: "경기·우승",
  europe: "유럽·라이벌",
  rivalry: "유럽·라이벌",
};

export const arsenalFanGradeProfiles: ArsenalFanGradeProfile[] = [
  { slug: "arsenal-rookie", minScore: 0, maxScore: 14, title: "축구장 밖을 서성이는 입문자", subtitle: "아직 에미레이츠 입구를 찾는 중입니다.", description: "아스날에 대해 이제 알아가기 시작한 단계입니다. 유명 선수, 홈구장, 무패 우승 시즌처럼 가장 큰 줄기부터 천천히 익히면 팬 지수가 빠르게 올라갈 수 있습니다. 모든 구너에게도 첫 경기는 있었으니, 오늘 틀린 문제를 오답노트처럼 보면 다음 도전은 훨씬 달라질 거예요.", strengths: ["새로운 지식을 빠르게 흡수할 여지가 큼", "대표 선수와 시즌부터 익히기 좋은 출발점", "재도전 시 점수 상승 폭이 큰 단계"], shareText: "나의 아스날 팬 지수는 {score}점! 축구장 밖을 서성이는 입문자가 나왔어요." },
  { slug: "arsenal-interested", minScore: 15, maxScore: 29, title: "아스날 관심 등록 완료", subtitle: "빨간색과 흰색이 슬슬 눈에 들어오는 단계.", description: "아스날의 대표적인 정보는 일부 알고 있지만, 세부 시즌과 유럽대항전 기록에서는 아직 헷갈릴 수 있습니다. 최근 경기나 하이라이트를 통해 관심이 생긴 팬에게 자주 나오는 구간입니다. 선수와 감독, 주요 우승 시즌을 함께 묶어 보면 지식이 훨씬 안정적으로 연결됩니다.", strengths: ["대표 키워드와 주요 레전드를 일부 알고 있음", "최근 경기 중심의 기억력이 좋을 가능성", "기본 역사 복습만으로 빠른 성장 가능"], shareText: "나의 아스날 팬 지수는 {score}점! 아스날 관심 등록 완료 단계입니다." },
  { slug: "arsenal-weekend-fan", minScore: 30, maxScore: 44, title: "주말 경기를 챙겨 보는 팬", subtitle: "기본 대화에는 충분히 참여할 수 있는 구너.", description: "기본적인 구단 역사와 대표 선수, 굵직한 우승 시즌을 알고 있습니다. 다만 과거 경기의 세부 득점자나 유럽대항전 기록처럼 깊은 문제에서는 흔들릴 수 있습니다. 지금 단계에서는 하이버리 시대와 벵거 초기 우승 기록을 정리하면 한 단계 올라서기 좋습니다.", strengths: ["주요 선수와 홈구장 정보에 익숙함", "대표 시즌과 기본 기록을 이해함", "축구 팬 대화에 자연스럽게 참여 가능"], shareText: "나의 아스날 팬 지수는 {score}점! 주말 경기를 챙겨 보는 팬이 나왔어요." },
  { slug: "arsenal-serious-gooner", minScore: 45, maxScore: 59, title: "제법 진지한 구너", subtitle: "주변에서 아스날 팬으로 인정받을 수준.", description: "선수, 감독, 우승 시즌을 폭넓게 알고 있으며 최근 팬이라기보다 꾸준히 흐름을 따라온 팬에 가깝습니다. 중급 문제에서 좋은 감각을 보였을 가능성이 높고, 몇몇 고급 역사 문제만 보강하면 에미레이츠 단골 수준으로 올라갈 수 있습니다.", strengths: ["주요 감독과 우승 기록에 강함", "최근과 과거 정보를 어느 정도 연결함", "팬 커뮤니티 대화에 무리 없이 참여 가능"], shareText: "나의 아스날 팬 지수는 {score}점! 제법 진지한 구너가 나왔어요." },
  { slug: "arsenal-emirates-regular", minScore: 60, maxScore: 74, title: "에미레이츠 단골 수준", subtitle: "역사와 현재를 균형 있게 아는 팬.", description: "아스날의 역사, 선수, 감독, 유럽대항전 흐름을 꽤 안정적으로 이해하고 있습니다. 단순한 인기 선수 문제가 아니라 난이도 있는 기록에서도 점수를 얻었을 가능성이 큽니다. 오래된 하이버리 기록이나 1930년대 구단사까지 조금 더 파고들면 베테랑 구너 구간이 보입니다.", strengths: ["난이도 가중 문제에서 안정적인 득점", "역사와 현재를 균형 있게 이해", "경기와 선수 이야기를 맥락 있게 설명 가능"], shareText: "나의 아스날 팬 지수는 {score}점! 에미레이츠 단골 수준이 나왔어요." },
  { slug: "arsenal-highbury-veteran", minScore: 75, maxScore: 89, title: "하이버리의 기억을 잇는 베테랑 구너", subtitle: "오래된 기록까지 꽤 깊게 알고 있습니다.", description: "아스날의 대표적인 역사와 기록은 물론, 유럽대항전과 상징적인 경기까지 상당히 넓게 기억하고 있습니다. 고급 문제도 꽤 해결했다면 단순한 팬을 넘어 구단사의 흐름을 설명할 수 있는 수준입니다. 몇몇 세부 숫자와 초기 역사만 보완하면 살아 있는 백과사전에 도전할 수 있습니다.", strengths: ["오래된 경기와 기록에 강함", "고급 문제에서도 높은 정답률", "팬 커뮤니티에서 지식인 역할 가능"], shareText: "나의 아스날 팬 지수는 {score}점! 하이버리의 기억을 잇는 베테랑 구너가 나왔어요." },
  { slug: "arsenal-encyclopedia", minScore: 90, maxScore: 100, title: "살아 있는 아스날 백과사전", subtitle: "당신의 피에는 빨간색과 흰색이 흐르고 있습니다.", description: "구단 역사, 선수, 감독, 우승 기록, 상징적인 경기와 유럽대항전까지 폭넓게 이해하고 있습니다. 고급 문제까지 거의 완벽하게 해결했다면 단순히 경기를 보는 팬을 넘어 아스날 기록을 맥락으로 설명할 수 있는 전문가 수준입니다. 친구들과 퀴즈를 풀면 자연스럽게 해설자가 될 가능성이 높습니다.", strengths: ["구단 역사에 대한 깊은 이해", "주요 선수와 감독 기록에 강함", "상징적인 경기를 정확히 기억함"], shareText: "나의 아스날 팬 지수는 {score}점! 살아 있는 아스날 백과사전이 나왔어요." },
];

export function getArsenalFanGrade(score: number) {
  return arsenalFanGradeProfiles.find((profile) => score >= profile.minScore && score <= profile.maxScore) ?? arsenalFanGradeProfiles[0];
}

export function getArsenalQuestion(id: string) {
  return arsenalFanQuestions.find((question) => question.id === id);
}

export function getArsenalFanGradeProfile(slug: string) {
  return arsenalFanGradeProfiles.find((profile) => profile.slug === slug);
}

export function validateArsenalQuestionBank() {
  const counts = { easy: 0, medium: 0, hard: 0 } as Record<ArsenalQuestionDifficulty, number>;
  const ids = new Set<string>();
  const questionTexts = new Set<string>();
  for (const question of arsenalFanQuestions) {
    counts[question.difficulty] += 1;
    if (ids.has(question.id)) throw new Error(`Duplicated Arsenal question id: ${question.id}`);
    ids.add(question.id);
    if (questionTexts.has(question.question)) throw new Error(`Duplicated Arsenal question text: ${question.question}`);
    questionTexts.add(question.question);
    if (question.options.length !== 4) throw new Error(`${question.id} must have exactly four options.`);
    if (new Set(question.options).size !== 4) throw new Error(`${question.id} has duplicated options.`);
    if (!Number.isInteger(question.correctAnswer) || question.correctAnswer < 0 || question.correctAnswer > 3) throw new Error(`${question.id} has invalid correctAnswer.`);
    if (!question.explanation || question.explanation.length < 12) throw new Error(`${question.id} must have an explanation.`);
    if (!question.sourceName || !question.sourceUrl || !question.verifiedAt) throw new Error(`${question.id} must keep verification metadata.`);
    if (question.isTimeSensitive && !question.referenceSeason) throw new Error(`${question.id} is time-sensitive but has no referenceSeason.`);
  }
  if (arsenalFanQuestions.length < 50) throw new Error("Arsenal question bank must include at least 50 questions.");
  if (counts.easy < 18 || counts.medium < 20 || counts.hard < 12) throw new Error(`Insufficient Arsenal question difficulty counts: ${JSON.stringify(counts)}`);
  return { total: arsenalFanQuestions.length, counts };
}

validateArsenalQuestionBank();

export const arsenalFanTest: TestDefinition = {
  type: "quiz",
  slug: "arsenal-fan-test",
  title: "아스날 팬 퀴즈",
  shortTitle: "아스날 팬 퀴즈",
  cardTitle: "아스날 팬 퀴즈",
  description: "15개의 아스날 퀴즈로 역사, 선수, 감독, 우승 기록과 상징적인 경기를 얼마나 알고 있는지 확인해보세요.",
  category: "팬 퀴즈",
  duration: "약 3분",
  icon: "🔴",
  thumbnail: "/tests/arsenal-fan.jpg",
  participants: 1537,
  accent: "orange",
  fanTheme: "red-backstage",
  isNew: true,
  itemCount: ARSENAL_FAN_QUIZ_SIZE,
  questions: [],
  resultSlugs: [],
  seoTitle: "아스날 팬 퀴즈 - 나의 아스날 팬 지수는? | 미미테스트",
  seoDescription: "15개의 아스날 퀴즈로 나의 아스날 팬 지수를 확인해 보세요. 선수, 감독, 우승 기록, 역사적인 경기까지 난이도별 문제에 도전할 수 있습니다.",
  keywords: ["아스날 팬 테스트", "아스날 퀴즈", "아스날 팬 지수", "아스날 테스트", "아스날 축구 퀴즈", "아스날 선수 퀴즈", "아스날 역사 퀴즈", "구너 테스트", "축구 팬 테스트", "프리미어리그 퀴즈"],
  seoContent: {
    heading: "아스날 팬 퀴즈란?",
    paragraphs: [
      "아스날 팬 퀴즈는 아스날 FC의 역사, 선수, 감독, 우승 기록, 홈구장, 라이벌 관계와 유럽대항전을 얼마나 알고 있는지 확인하는 4지선다형 축구 퀴즈입니다. 문제은행에는 50개 이상의 문항이 준비되어 있고, 테스트를 시작할 때마다 난이도별로 15문항만 무작위 출제됩니다.",
      "출제 비율은 초급 5문항, 중급 6문항, 고급 4문항이며, 고급 문제일수록 더 높은 가중치가 적용됩니다. 단순 정답 개수가 아니라 난이도별 원점수를 100점으로 환산해 아스날 팬 지수를 계산하므로 오래된 구단사와 세부 기록을 아는 팬일수록 높은 점수를 받을 수 있습니다.",
      "결과 화면에서는 아스날 팬 지수, 15문제 중 정답 수, 난이도별 정답 수, 분야별 정답률과 오답노트를 확인할 수 있습니다. 본 테스트는 아스날 FC 또는 프리미어리그의 공식 서비스가 아닌 비공식 팬 퀴즈이며, 공식 로고나 선수 사진을 사용하지 않습니다.",
    ],
    faqs: [
      ["아스날 팬 퀴즈는 어떻게 진행되나요?", "문제은행에서 초급 5개, 중급 6개, 고급 4개를 뽑아 총 15개의 4지선다 문제를 풉니다."],
      ["문제는 매번 동일하게 나오나요?", "아니요. 테스트를 시작할 때마다 문제와 보기 순서가 무작위로 섞이며, 최근에 풀었던 문제와 겹칠 가능성을 낮추도록 구성했습니다."],
      ["아스날 팬 지수는 어떻게 계산되나요?", "초급 정답 1점, 중급 정답 2점, 고급 정답 3점을 부여해 최대 29점의 원점수를 100점 만점으로 환산합니다."],
      ["총 몇 개의 문제가 준비되어 있나요?", "현재 문제은행에는 51문항이 준비되어 있으며, 앞으로 공식 기록 기준으로 계속 추가할 수 있습니다."],
      ["최신 아스날 기록도 문제에 포함되나요?", "최근 정보는 전체 문항의 일부로 제한하고, 시즌 기준이 필요한 문항에는 2024/25시즌처럼 기준 시점을 명시했습니다."],
      ["이 테스트는 아스날 공식 테스트인가요?", "아닙니다. 미미테스트에서 제공하는 비공식 팬 퀴즈이며 아스날 FC, 프리미어리그, UEFA와 제휴된 공식 서비스가 아닙니다."],
    ],
    assesses: "아스날 FC 역사, 선수, 감독, 우승 기록과 경기 지식",
  },
};
