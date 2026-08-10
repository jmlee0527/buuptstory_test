export const articleCategories = [
  { slug: "personality-psychology", name: "성격·심리", englishName: "Personality & Psychology" },
  { slug: "love-relationships", name: "연애·관계", englishName: "Love & Relationships" },
  { slug: "work-lifestyle", name: "직장·생활", englishName: "Work & Lifestyle" },
  { slug: "fan-trends", name: "팬·트렌드", englishName: "Fan & Trends" },
] as const;

export type ArticleCategorySlug = (typeof articleCategories)[number]["slug"];

export type ArticleBlock =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "blockquote"; text: string }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "faq"; items: { question: string; answer: string }[] }
  | { type: "sources"; items: { title: string; publisher: string; url: string; accessedAt: string }[] }
  | { type: "cta"; title: string; description: string; label: string; href: string };

export type Article = {
  title: string;
  slug: string;
  description: string;
  category: ArticleCategorySlug;
  publishedAt: string;
  updatedAt: string;
  author: string;
  thumbnail: string;
  keywords: string[];
  content: ArticleBlock[];
  relatedTests: string[];
  relatedArticles: string[];
};

export const articles: Article[] = [
  {
    title: "애착유형 4가지 특징과 차이",
    slug: "four-attachment-styles",
    description: "안정형·불안형·회피형·불안회피형의 차이를 관계 속 행동과 대화 방식 중심으로 알아봅니다.",
    category: "love-relationships",
    publishedAt: "2026-08-10",
    updatedAt: "2026-08-10",
    author: "미미테스트 편집팀",
    thumbnail: "/tests/attachment-style.jpg",
    keywords: ["애착유형", "안정형 애착", "불안형 애착", "회피형 애착", "불안회피형"],
    relatedTests: ["attachment-style-test", "relationship-satisfaction-test"],
    relatedArticles: ["mbti-in-relationships"],
    content: [
      { type: "paragraph", text: "애착유형은 가까운 사람과 친밀감을 만들고 불안을 조절하는 방식의 경향을 설명하는 틀입니다. 한 사람을 영원히 고정된 유형으로 분류하는 진단이 아니라, 관계와 시기마다 달라질 수 있는 반복 패턴을 살펴보는 참고 개념에 가깝습니다." },
      { type: "h2", text: "두 가지 축으로 이해하면 쉬워요" },
      { type: "paragraph", text: "성인 애착은 보통 관계가 멀어질까 걱정하는 ‘애착 불안’과 친밀감이나 의존을 불편하게 느끼는 ‘애착 회피’의 두 축으로 설명합니다. 두 경향의 높고 낮음을 조합하면 네 가지 유형을 이해할 수 있습니다." },
      { type: "table", headers: ["유형", "애착 불안", "애착 회피", "관계에서 보일 수 있는 모습"], rows: [["안정형", "낮음", "낮음", "가까움과 독립성을 비교적 편안하게 조절"], ["불안형", "높음", "낮음", "상대의 반응 변화에 민감하고 확인을 자주 원함"], ["회피형", "낮음", "높음", "갈등이나 감정 대화에서 거리를 두려는 경향"], ["불안회피형", "높음", "높음", "가까워지고 싶지만 상처를 피하려 동시에 물러남"]] },
      { type: "h2", text: "유형보다 반복되는 장면을 보세요" },
      { type: "list", items: ["답장이 늦을 때 어떤 해석을 먼저 하는지", "서운함을 직접 말하는지, 확인하거나 피하는지", "갈등 뒤 다시 연결되는 데 무엇이 필요한지", "혼자 있는 시간과 함께 있는 시간을 어떻게 조율하는지"] },
      { type: "blockquote", text: "‘나는 불안형이니까 어쩔 수 없어’보다 ‘불안할 때 확인을 반복하는 패턴이 있구나’라고 표현하면 바꿀 수 있는 행동이 보입니다." },
      { type: "h2", text: "관계를 더 안정적으로 만드는 작은 연습" },
      { type: "paragraph", text: "감정과 사실을 분리해 말하고, 상대가 추측하지 않도록 필요한 행동을 구체적으로 요청해 보세요. 예를 들어 ‘연락이 없으면 날 싫어한다고 느껴’ 대신 ‘바쁜 날에는 늦는다고 한마디 알려주면 안심될 것 같아’라고 말할 수 있습니다. 반복되는 갈등으로 일상이 힘들다면 테스트 결과에 의존하기보다 상담 등 적절한 도움을 고려하는 편이 좋습니다." },
      { type: "cta", title: "내 관계 패턴 살펴보기", description: "현재 관계에서 나타나는 불안과 회피 경향을 가볍게 점검해 보세요.", label: "애착유형 테스트하기", href: "/tests/attachment-style-test" },
      { type: "faq", items: [{ question: "애착유형은 평생 바뀌지 않나요?", answer: "아닙니다. 관계 경험과 환경, 연습에 따라 패턴은 달라질 수 있으며 관계마다 다르게 나타나기도 합니다." }, { question: "두 유형이 동시에 나타날 수 있나요?", answer: "네. 애착은 네 개의 상자보다 불안과 회피의 연속선으로 이해하는 편이 자연스럽습니다." }] },
    ],
  },
  {
    title: "내향형과 외향형의 차이, 조용함만으로 나눌 수 없는 이유",
    slug: "introvert-vs-extrovert",
    description: "말수나 사교성보다 에너지를 얻고 회복하는 방식에서 내향성과 외향성의 차이를 살펴봅니다.",
    category: "personality-psychology",
    publishedAt: "2026-08-10",
    updatedAt: "2026-08-10",
    author: "미미테스트 편집팀",
    thumbnail: "/tests/mbti.jpg",
    keywords: ["내향형", "외향형", "내향성", "외향성", "성격 차이"],
    relatedTests: ["mbti", "big-five"],
    relatedArticles: ["mbti-in-relationships"],
    content: [
      { type: "paragraph", text: "내향형은 말이 없고 외향형은 사람을 좋아한다는 설명은 너무 단순합니다. 실제로는 자극을 선호하는 정도, 생각을 정리하는 순서, 사회적 활동 뒤 회복하는 방식이 함께 작용합니다." },
      { type: "h2", text: "핵심은 에너지와 자극의 조절 방식" },
      { type: "paragraph", text: "내향성이 높은 사람은 혼자 있거나 자극이 적은 환경에서 생각과 에너지를 정리하는 편입니다. 외향성이 높은 사람은 대화와 활동을 통해 생각이 선명해지고 활력을 얻는 경우가 많습니다. 어느 쪽이 더 사회적이거나 유능하다는 뜻은 아닙니다." },
      { type: "table", headers: ["상황", "내향성이 높을 때", "외향성이 높을 때"], rows: [["회의", "생각할 시간을 가진 뒤 발언", "말하면서 아이디어를 발전"], ["휴식", "조용한 개인 시간 선호", "사람이나 활동이 있는 휴식 선호"], ["새 모임", "소수와 깊게 대화", "여러 사람과 빠르게 연결"]] },
      { type: "h2", text: "상황에 따라 달라지는 것이 자연스러워요" },
      { type: "paragraph", text: "친한 사람 앞에서는 활발하지만 낯선 모임 뒤에는 오래 쉬어야 할 수 있습니다. 업무에서는 발표를 즐기면서도 주말에는 혼자 회복할 수도 있습니다. 자신을 한 단어에 맞추기보다 어떤 환경에서 집중하고 지치는지를 기록하면 생활 조절에 더 도움이 됩니다." },
      { type: "h3", text: "나에게 맞는 환경을 찾는 질문" },
      { type: "list", items: ["긴 모임 뒤 혼자 쉬고 싶은가, 다른 활동을 이어가고 싶은가?", "즉석 답변과 미리 준비한 답변 중 어느 쪽이 편한가?", "넓은 관계와 깊은 관계 중 어디에 에너지를 더 쓰는가?"] },
      { type: "cta", title: "성격 선호를 더 구체적으로 보기", description: "한 번의 결과보다 각 지표의 비율과 실제 생활 장면을 함께 살펴보세요.", label: "MBTI 테스트하기", href: "/tests/mbti" },
      { type: "faq", items: [{ question: "내향형도 발표를 잘할 수 있나요?", answer: "물론입니다. 내향성은 능력이나 자신감이 아니라 자극과 에너지를 조절하는 경향에 가깝습니다." }] },
    ],
  },
  {
    title: "MBTI를 연애에서 참고할 때 알아둘 점",
    slug: "mbti-in-relationships",
    description: "MBTI 궁합을 정답처럼 쓰지 않고 서로의 대화와 갈등 방식을 이해하는 질문으로 활용하는 방법을 안내합니다.",
    category: "love-relationships",
    publishedAt: "2026-08-10",
    updatedAt: "2026-08-10",
    author: "미미테스트 편집팀",
    thumbnail: "/tests/love-mbti.jpg",
    keywords: ["MBTI 연애", "MBTI 궁합", "연애 성격", "관계 대화"],
    relatedTests: ["love-mbti-test", "mbti", "attachment-style-test"],
    relatedArticles: ["four-attachment-styles", "introvert-vs-extrovert"],
    content: [
      { type: "paragraph", text: "MBTI는 서로 다른 선호를 이야기할 때 편리한 공통 언어가 될 수 있습니다. 다만 네 글자로 관계의 성공과 실패를 예측하거나 상대 행동을 단정하면 오히려 중요한 개인차를 놓치기 쉽습니다." },
      { type: "h2", text: "궁합표보다 대화 질문으로 활용하세요" },
      { type: "list", items: ["혼자 회복하는 시간과 함께 보내는 시간은 각각 얼마나 필요한가?", "갈등이 생기면 바로 이야기할까, 생각을 정리한 뒤 이야기할까?", "위로가 필요할 때 공감과 해결책 중 무엇을 먼저 원하는가?", "약속과 계획은 어느 정도까지 정해두는 것이 편한가?"] },
      { type: "h2", text: "같은 유형도 관계에서는 다르게 행동해요" },
      { type: "paragraph", text: "성격 선호 외에도 애착 경험, 갈등을 배운 방식, 현재의 스트레스, 관계의 안전감이 행동에 영향을 줍니다. 같은 유형인 두 사람도 한 명은 감정을 바로 말하고 다른 한 명은 시간을 필요로 할 수 있습니다." },
      { type: "blockquote", text: "‘T라서 공감을 못 해’가 아니라 ‘지금은 해결책보다 내 감정을 먼저 들어주면 좋겠어’처럼 필요한 행동을 말하는 편이 관계에 도움이 됩니다." },
      { type: "h2", text: "결과가 다르게 나왔다면" },
      { type: "paragraph", text: "검사할 때 떠올린 상황과 최근의 역할에 따라 응답은 달라질 수 있습니다. 결과가 바뀌었다고 거짓으로 답한 것은 아닙니다. 어느 설명이 실제 행동과 맞는지, 파트너가 관찰한 모습은 어떤지를 함께 이야기해 보세요." },
      { type: "cta", title: "나의 연애 소통 방식 확인하기", description: "유형의 우열보다 감정 표현과 관계 주도성 등 구체적인 경향을 확인해 보세요.", label: "연애 MBTI 테스트하기", href: "/tests/love-mbti-test" },
      { type: "faq", items: [{ question: "MBTI가 같은 커플이 더 잘 맞나요?", answer: "유형의 같고 다름만으로 관계 만족도를 판단할 수 없습니다. 차이를 조율하는 대화와 신뢰가 더 직접적인 요소입니다." }, { question: "MBTI 궁합표를 믿어도 되나요?", answer: "재미있는 대화의 출발점으로는 쓸 수 있지만 중요한 관계 결정을 대신하는 근거로 삼지는 않는 편이 좋습니다." }] },
    ],
  },
  {
    title: "2026년 AI 시대, 성격 테스트 결과를 현명하게 활용하는 법",
    slug: "personality-tests-in-ai-era-2026",
    description: "AI가 일상적인 조언 도구가 된 2026년, 성격 테스트와 AI 해석을 자기이해에 안전하게 활용하는 기준을 정리합니다.",
    category: "personality-psychology", publishedAt: "2026-08-10", updatedAt: "2026-08-10", author: "미미테스트 편집팀", thumbnail: "/tests/big-five.jpg",
    keywords: ["2026 성격 테스트", "AI 성격 분석", "성격 테스트 활용법", "MBTI 해석", "AI 자기계발"],
    relatedTests: ["big-five", "mbti", "enneagram"], relatedArticles: ["introvert-vs-extrovert", "ai-chatbot-emotional-support-boundaries"],
    content: [
      { type: "paragraph", text: "2025년 구글 검색 흐름에서는 AI 도구가 검색·번역·글쓰기·이미지 제작 등 일상적인 문제 해결 수단으로 자리 잡았습니다. 2026년에는 성격 테스트 결과를 AI에게 붙여 넣고 진로나 관계 조언을 받는 일도 자연스러워졌지만, 편리함과 정확성은 같은 말이 아닙니다." },
      { type: "h2", text: "성격 결과는 결론이 아니라 질문의 시작입니다" },
      { type: "paragraph", text: "한 번의 응답은 최근 기분, 떠올린 관계와 맡고 있는 역할의 영향을 받습니다. 유형명보다 각 지표에서 실제로 반복되는 행동을 찾으세요. ‘나는 내향형’이라는 결론보다 ‘회의에서는 미리 생각할 시간이 있을 때 의견을 잘 낸다’는 관찰이 생활과 업무에 더 유용합니다." },
      { type: "table", headers: ["활용 방식", "도움이 되는 질문", "피해야 할 단정"], rows: [["자기이해", "어떤 상황에서 이 경향이 나타났나?", "나는 원래 이런 사람이야"], ["관계", "서로 편한 대화 방식은 무엇인가?", "이 유형끼리는 안 맞아"], ["진로", "어떤 환경에서 강점을 쓰기 쉬운가?", "이 직업만 정답이야"]] },
      { type: "h2", text: "AI에게 물을 때 개인정보와 한계를 함께 생각하세요" },
      { type: "list", items: ["이름, 회사, 건강 기록 등 식별 가능한 정보는 빼고 질문하기", "AI 답변을 심리 진단이나 채용 판단으로 사용하지 않기", "근거가 필요한 조언에는 출처와 불확실성을 함께 요청하기", "중요한 결정은 실제 경험과 사람의 조언을 함께 비교하기"] },
      { type: "blockquote", text: "좋은 활용법은 AI에게 ‘나는 어떤 사람인가’를 결정해 달라고 맡기는 것이 아니라, 내가 놓친 관점을 찾는 데 도움받는 것입니다." },
      { type: "cta", title: "유형보다 지표를 살펴보세요", description: "다섯 가지 성격 차원을 점수로 확인하고 실제 생활 장면과 비교해 보세요.", label: "빅파이브 테스트하기", href: "/tests/big-five" },
      { type: "faq", items: [{ question: "AI가 성격을 정확하게 분석할 수 있나요?", answer: "대화나 입력 내용에서 패턴을 요약할 수는 있지만, 그것만으로 개인의 성격을 객관적으로 확정하거나 진단할 수는 없습니다." }, { question: "성격 테스트 결과가 매번 달라도 괜찮나요?", answer: "네. 상황과 응답 기준이 달라질 수 있습니다. 반복해서 일치하는 경향과 달라진 이유를 함께 살펴보는 편이 좋습니다." }] },
      { type: "sources", items: [{ title: "검색어로 돌아본 대한민국의 2025년", publisher: "Google Korea Blog", url: "https://blog.google/intl/ko-kr/products/explore-get-answers/year-in-search-2025-kr/", accessedAt: "2026-08-10" }, { title: "Health advisory: Generative AI chatbots and wellness applications", publisher: "American Psychological Association", url: "https://www.apa.org/topics/artificial-intelligence-machine-learning/health-advisory-chatbots-wellness-apps", accessedAt: "2026-08-10" }] },
    ],
  },
  {
    title: "도파민 디톡스보다 현실적인 디지털 휴식 방법 7가지",
    slug: "realistic-digital-rest-guide",
    description: "숏폼과 알림에 지쳤을 때 극단적으로 휴대폰을 끊지 않고도 집중력과 생활 리듬을 회복하는 실천법을 안내합니다.",
    category: "personality-psychology", publishedAt: "2026-08-10", updatedAt: "2026-08-10", author: "미미테스트 편집팀", thumbnail: "/tests/stress.jpg",
    keywords: ["도파민 디톡스", "디지털 디톡스", "숏폼 중독", "스마트폰 줄이기", "집중력 회복"],
    relatedTests: ["stress-test", "reaction-time-test", "self-esteem-test"], relatedArticles: ["personality-tests-in-ai-era-2026", "healthy-fandom-shortform-guide"],
    content: [
      { type: "paragraph", text: "‘도파민 디톡스’라는 표현은 인기 있지만 도파민 자체를 없애거나 재설정하는 의학적 절차는 아닙니다. 목표는 즐거움을 끊는 것이 아니라, 목적 없이 화면을 여는 자동 행동을 줄이고 내가 선택한 활동에 주의를 돌리는 것입니다." },
      { type: "h2", text: "의지보다 환경을 먼저 바꾸세요" },
      { type: "list", items: ["첫 화면에서 숏폼·SNS 앱을 폴더 안으로 옮기기", "식사와 취침 전 30분을 화면 없는 구간으로 정하기", "업무 알림과 사람의 연락 알림을 구분하기", "앱을 열기 전 ‘무엇을 하려고 켰지?’를 한 번 묻기", "10분 타이머를 켜고 끝나면 계속 볼지 다시 선택하기", "휴대폰 대신 바로 할 수 있는 짧은 대체 행동 준비하기", "사용 시간보다 사용 뒤 기분과 수면 변화를 기록하기"] },
      { type: "h2", text: "완벽한 차단보다 돌아오는 경로가 중요해요" },
      { type: "paragraph", text: "한 번 오래 봤다고 계획 전체를 포기할 필요는 없습니다. 다음 식사, 다음 업무 시작, 잠들기 전처럼 하루에 여러 번 다시 시작할 지점을 정하면 실패감이 줄어듭니다. 업무나 관계에 필요한 앱까지 모두 끊기보다 피로를 만드는 사용 장면을 구체적으로 구분하세요." },
      { type: "table", headers: ["신호", "점검할 질문", "작은 조정"], rows: [["잠들기 늦어짐", "침대에서 자동 재생을 켜는가?", "충전 위치를 침대 밖으로"], ["집중 중 반복 확인", "필요한 알림인가?", "25분간 방해 금지"], ["사용 뒤 공허함", "보고 싶어서 봤나, 습관이었나?", "산책·음악 등 대체 행동"]] },
      { type: "cta", title: "최근 스트레스 흐름 점검하기", description: "지난 한 달의 예측불가능감과 과부하감을 참고용으로 확인해 보세요.", label: "스트레스 테스트하기", href: "/tests/stress-test" },
      { type: "faq", items: [{ question: "SNS를 완전히 삭제해야 효과가 있나요?", answer: "반드시 그렇지는 않습니다. 사용 목적과 시간대를 정하고 자동 접근을 어렵게 만드는 것부터 시작할 수 있습니다." }, { question: "며칠 만에 집중력이 돌아오나요?", answer: "개인과 생활환경에 따라 다릅니다. 특정 기간을 약속하기보다 수면, 기분, 업무 완료 정도의 변화를 1~2주 관찰해 보세요." }] },
      { type: "sources", items: [{ title: "Work is reaching a boiling point", publisher: "American Psychological Association", url: "https://www.apa.org/monitor/2025/01/trends-workplace-tensions.html", accessedAt: "2026-08-10" }, { title: "Health advisory: Generative AI chatbots and wellness applications", publisher: "American Psychological Association", url: "https://www.apa.org/topics/artificial-intelligence-machine-learning/health-advisory-chatbots-wellness-apps", accessedAt: "2026-08-10" }] },
    ],
  },
  {
    title: "AI 챗봇에 고민 상담할 때 지켜야 할 6가지 경계",
    slug: "ai-chatbot-emotional-support-boundaries",
    description: "AI에게 연애·감정 고민을 털어놓기 전 알아야 할 개인정보, 의존, 위기 대응과 답변 검증 기준을 정리합니다.",
    category: "personality-psychology", publishedAt: "2026-08-10", updatedAt: "2026-08-10", author: "미미테스트 편집팀", thumbnail: "/tests/ego-resilience.jpg",
    keywords: ["AI 고민 상담", "AI 심리 상담", "챗봇 상담", "AI 의존", "AI 개인정보"],
    relatedTests: ["ego-resilience-test", "interpersonal-ability-test", "self-esteem-test"], relatedArticles: ["personality-tests-in-ai-era-2026", "healthy-relationship-boundaries"],
    content: [
      { type: "paragraph", text: "2025년에는 감정적 지지와 관계 조언이 생성형 AI의 흔한 사용 목적 중 하나로 꼽혔습니다. AI는 생각을 정리하거나 대화 문장을 연습하는 보조 도구가 될 수 있지만, 사람처럼 공감하는 의식이나 책임을 가진 상담자가 아니며 전문적인 치료를 대신하지 않습니다." },
      { type: "h2", text: "입력하기 전에 여섯 가지를 확인하세요" },
      { type: "list", items: ["실명, 연락처, 회사, 학교와 구체적인 의료정보는 제거하기", "상대방의 사적인 대화 전문이나 사진을 동의 없이 올리지 않기", "AI의 확신 있는 문장도 사실이나 진단으로 받아들이지 않기", "내 생각과 다른 관점도 제시해 달라고 요청하기", "중요한 관계 결정을 AI 답변 하나로 내리지 않기", "위기·폭력·자해 위험은 AI가 아니라 즉시 사람과 전문기관에 알리기"] },
      { type: "h2", text: "도움이 되는 용도와 위험한 용도를 구분하세요" },
      { type: "table", headers: ["상대적으로 유용한 보조", "주의가 필요한 사용"], rows: [["감정을 문장으로 정리", "상대의 의도를 단정"], ["대화 초안 만들기", "질환이나 성격장애 진단"], ["선택지의 장단점 펼치기", "위기 상황의 유일한 도움으로 의존"]] },
      { type: "blockquote", text: "AI가 늘 내 편처럼 답하더라도 좋은 조언이라는 보장은 없습니다. 듣기 편한 답과 실제로 필요한 답은 다를 수 있습니다." },
      { type: "cta", title: "내 회복 자원 확인하기", description: "AI 답변보다 먼저 내가 활용할 수 있는 감정·관계 자원을 살펴보세요.", label: "자아탄력성 테스트하기", href: "/tests/ego-resilience-test" },
      { type: "faq", items: [{ question: "AI와 대화하면 외로움 해소에 도움이 되나요?", answer: "일시적으로 생각을 정리하는 데 도움될 수 있지만 인간관계와 전문 지원을 대체하지 않도록 사용 시간과 목적을 정하는 편이 좋습니다." }, { question: "AI가 위험 신호를 알아서 발견해 주나요?", answer: "놓치거나 부정확하게 반응할 수 있습니다. 즉각적인 위험이 있다면 112·119 또는 가까운 응급실과 신뢰할 수 있는 사람에게 바로 도움을 요청하세요." }] },
      { type: "sources", items: [{ title: "Health advisory: Use of generative AI chatbots and wellness applications for mental health", publisher: "American Psychological Association", url: "https://www.apa.org/topics/artificial-intelligence-machine-learning/health-advisory-chatbots-wellness-apps", accessedAt: "2026-08-10" }] },
    ],
  },
  {
    title: "연락 빈도 차이로 서운할 때 대화하는 법",
    slug: "different-texting-frequency-in-relationships",
    description: "연락 횟수를 사랑의 크기로 단정하지 않고 서로의 기대와 생활 리듬을 조율하는 대화 순서를 소개합니다.",
    category: "love-relationships", publishedAt: "2026-08-10", updatedAt: "2026-08-10", author: "미미테스트 편집팀", thumbnail: "/tests/relationship-satisfaction/cover.png",
    keywords: ["연애 연락 빈도", "연락 문제", "카톡 답장", "연애 서운함", "커플 대화법"],
    relatedTests: ["relationship-satisfaction-test", "attachment-style-test", "jealousy-test"], relatedArticles: ["four-attachment-styles", "healthy-relationship-boundaries"],
    content: [
      { type: "paragraph", text: "한 사람에게 연락은 연결감을 확인하는 행동이고, 다른 사람에게는 집중이 끝난 뒤 여유가 생겼을 때 하는 행동일 수 있습니다. 횟수만 비교하면 ‘나를 덜 좋아한다’와 ‘나를 통제한다’는 해석이 충돌하기 쉽습니다." },
      { type: "h2", text: "사실, 해석, 요청을 나눠 말하세요" },
      { type: "table", headers: ["단계", "예시"], rows: [["사실", "이번 주에는 퇴근 뒤 답장이 세 시간쯤 없었던 날이 세 번 있었어"], ["해석·감정", "무슨 일이 생겼거나 내가 중요하지 않은가 싶어 불안했어"], ["구체적 요청", "바쁜 날에는 늦는다고 짧게 알려줄 수 있을까?"]] },
      { type: "h2", text: "합의에는 예외 상황도 포함하세요" },
      { type: "list", items: ["업무·수업 중에는 어느 정도 답장이 늦을 수 있는지", "급한 상황은 어떤 방식으로 알릴지", "혼자 쉬는 시간에는 연락을 어떻게 할지", "합의가 부담스러워졌을 때 언제 다시 조정할지"] },
      { type: "paragraph", text: "좋은 합의는 한쪽이 계속 참는 규칙이 아니라 두 사람이 실제로 지킬 수 있는 범위입니다. 답장 속도를 감시하거나 비밀번호를 요구하는 방식은 안정감을 오래 만들기 어렵습니다. 합의를 반복해서 무시하거나 연락 문제로 일상이 크게 흔들린다면 관계 전체의 신뢰와 존중을 함께 점검해야 합니다." },
      { type: "cta", title: "현재 관계의 연결감 살펴보기", description: "연락 횟수뿐 아니라 친밀감, 신뢰, 갈등 회복과 상호성을 함께 확인해 보세요.", label: "관계 만족도 테스트하기", href: "/tests/relationship-satisfaction-test" },
      { type: "faq", items: [{ question: "연인은 하루에 몇 번 연락하는 게 정상인가요?", answer: "모든 커플에게 맞는 횟수는 없습니다. 두 사람의 생활 리듬과 연결 욕구를 구체적으로 합의하는 것이 중요합니다." }, { question: "답장이 늦으면 회피형인가요?", answer: "한 행동만으로 애착유형을 판단할 수 없습니다. 업무 상황, 연락 습관과 관계 전반의 반복 패턴을 함께 봐야 합니다." }] },
      { type: "sources", items: [{ title: "Stress in America 2025: A crisis of connection", publisher: "American Psychological Association", url: "https://www.apa.org/pubs/reports/stress-in-america/2025", accessedAt: "2026-08-10" }] },
    ],
  },
  {
    title: "건강한 관계의 경계선 세우기: 거절과 통제의 차이",
    slug: "healthy-relationship-boundaries",
    description: "연애와 가까운 관계에서 경계선을 이기적인 거절이나 상대 통제로 만들지 않고 표현하는 방법을 알아봅니다.",
    category: "love-relationships", publishedAt: "2026-08-10", updatedAt: "2026-08-10", author: "미미테스트 편집팀", thumbnail: "/tests/interpersonal-ability/cover.png",
    keywords: ["관계 경계선", "바운더리", "건강한 연애", "거절하는 법", "관계 통제"],
    relatedTests: ["interpersonal-ability-test", "relationship-satisfaction-test", "jealousy-test"], relatedArticles: ["different-texting-frequency-in-relationships", "four-attachment-styles"],
    content: [
      { type: "paragraph", text: "경계선은 상대를 바꾸는 명령이 아니라 내가 무엇을 편안하게 느끼고 어떤 상황에서 어떻게 행동할지를 알리는 기준입니다. ‘너는 친구를 만나면 안 돼’는 통제에 가깝고, ‘욕설이 이어지면 대화를 멈추고 진정된 뒤 다시 이야기하겠다’는 경계에 가깝습니다." },
      { type: "h2", text: "경계와 통제를 구분하는 세 가지 기준" },
      { type: "table", headers: ["경계", "통제"], rows: [["나의 필요와 행동을 설명", "상대의 인간관계·복장·기기를 지시"], ["상대가 선택할 여지를 인정", "불이익과 불안을 이용해 복종 요구"], ["서로 조정 가능한 대화", "한쪽 기준만 반복 적용"]] },
      { type: "h2", text: "짧고 구체적인 문장으로 말하세요" },
      { type: "list", items: ["지금은 생각을 정리할 30분이 필요해. 그 뒤에 다시 이야기할게.", "내 메시지를 다른 사람에게 보여주기 전에는 먼저 물어봐 줬으면 해.", "갑작스러운 방문은 부담스러워. 오기 전에 연락해 줘.", "비꼬거나 소리를 지르는 대화에는 참여하지 않을게."] },
      { type: "paragraph", text: "상대가 서운해할 수 있다는 이유만으로 경계가 잘못된 것은 아닙니다. 반대로 ‘내 경계’라는 말로 상대를 벌주거나 모든 협의를 거부해서도 안 됩니다. 안전을 위협하는 행동, 감시, 협박이 있다면 둘만의 대화로 해결하려 하지 말고 신뢰할 수 있는 사람과 전문기관에 도움을 요청하세요." },
      { type: "cta", title: "내 관계 소통 방식 점검하기", description: "자기표현과 갈등 회복, 관계의 상호성을 상황형 문항으로 살펴보세요.", label: "대인관계 능력 테스트하기", href: "/tests/interpersonal-ability-test" },
      { type: "faq", items: [{ question: "경계선을 말하면 이기적인 사람인가요?", answer: "상대의 권리를 침해하지 않으면서 자신의 필요와 한계를 알리는 것은 건강한 관계 조율의 일부입니다." }, { question: "상대가 경계를 계속 무시하면 어떻게 하나요?", answer: "같은 요청을 더 명확히 말하고 실제로 취할 행동을 정하세요. 위협이나 폭력이 있다면 안전 확보와 외부 도움을 우선해야 합니다." }] },
      { type: "sources", items: [{ title: "Stress in America 2025: A crisis of connection", publisher: "American Psychological Association", url: "https://www.apa.org/pubs/reports/stress-in-america/2025", accessedAt: "2026-08-10" }] },
    ],
  },
  {
    title: "2026년 직장 AI 불안, 막연한 걱정을 준비 행동으로 바꾸는 법",
    slug: "workplace-ai-anxiety-2026",
    description: "AI로 인한 직무 변화와 고용 불안이 커질 때 통제 가능한 준비와 확인해야 할 조직 기준을 나눠 설명합니다.",
    category: "work-lifestyle", publishedAt: "2026-08-10", updatedAt: "2026-08-10", author: "미미테스트 편집팀", thumbnail: "/tests/turnover-intention.svg",
    keywords: ["2026 AI 일자리", "AI 고용 불안", "직장 AI", "직무 변화", "커리어 불안"],
    relatedTests: ["turnover-intention", "job-stress", "work-persona-16"], relatedArticles: ["burnout-vs-tiredness", "psychological-detachment-after-work"],
    content: [
      { type: "paragraph", text: "APA가 소개한 2026년 직장 트렌드는 AI가 업무를 간소화하는 동시에 해고, 진로 변경과 미래 불안을 키울 수 있다고 짚습니다. 불확실성을 없앨 수는 없지만 ‘AI가 내 일을 뺏을까’라는 큰 질문을 정보 확인과 준비 행동으로 나누면 대응 가능성이 보입니다." },
      { type: "h2", text: "사실과 예상부터 분리하세요" },
      { type: "table", headers: ["구분", "확인할 내용"], rows: [["이미 일어난 변화", "자동화된 업무, 바뀐 평가 기준, 공식 조직 공지"], ["가능성이 있는 변화", "팀에서 시험 중인 도구와 필요한 검토 역할"], ["막연한 예상", "근거 없이 모든 직무가 곧 사라질 것이라는 생각"]] },
      { type: "h2", text: "90일 준비 목록을 만드세요" },
      { type: "list", items: ["내 업무를 반복 작업·판단·관계 조율·책임 영역으로 나누기", "AI가 보조할 일과 사람이 최종 확인할 일을 구분하기", "성과 사례와 문제 해결 과정을 짧게 기록하기", "회사에서 허용한 AI 도구와 데이터 입력 기준 확인하기", "인접 직무 한 개를 정해 필요한 역량과 채용 공고 살펴보기"] },
      { type: "paragraph", text: "회사 정책이 불명확한데 고객정보나 내부 문서를 임의로 외부 AI에 입력해서는 안 됩니다. 생산성 압박이 커졌다면 개인의 학습만 강조하기보다 도구 사용 기준, 교육 시간, 평가 방식과 책임 소재를 조직에 구체적으로 질문할 필요가 있습니다." },
      { type: "cta", title: "이직 생각의 원인을 나눠보기", description: "성장 가능성, 보상, 관계, 업무 부담 등 현재 이직 의향을 만드는 요인을 점검하세요.", label: "이직 의향 테스트하기", href: "/tests/turnover-intention" },
      { type: "faq", items: [{ question: "AI를 잘 못 쓰면 당장 이직해야 하나요?", answer: "도구 숙련도 하나만으로 결정하기보다 현재 직무의 변화, 조직 지원, 학습 가능성과 다른 스트레스 요인을 함께 비교하세요." }, { question: "어떤 AI 역량부터 배워야 하나요?", answer: "특정 제품보다 문제를 명확히 정의하고 결과를 검토하며 민감한 데이터를 구분하는 기본 역량부터 시작하는 편이 오래 활용하기 좋습니다." }] },
      { type: "sources", items: [{ title: "Workers are facing an age of uncertainty", publisher: "American Psychological Association", url: "https://www.apa.org/monitor/2026/01-02/trends-work-uncertainty.html", accessedAt: "2026-08-10" }, { title: "More than half of U.S. workers say job insecurity causing stress", publisher: "American Psychological Association", url: "https://www.apa.org/news/press/releases/2025/05/job-insecurity-causing-stress", accessedAt: "2026-08-10" }] },
    ],
  },
  {
    title: "번아웃과 단순 피로의 차이: 쉬어도 회복되지 않을 때 볼 신호",
    slug: "burnout-vs-tiredness",
    description: "번아웃을 유행어처럼 단정하지 않고 업무 맥락, 소진, 거리감과 효능감 저하를 중심으로 점검합니다.",
    category: "work-lifestyle", publishedAt: "2026-08-10", updatedAt: "2026-08-10", author: "미미테스트 편집팀", thumbnail: "/tests/burnout.jpg",
    keywords: ["번아웃 증상", "번아웃 피로 차이", "직장인 소진", "쉬어도 피곤", "번아웃 회복"],
    relatedTests: ["burnout-risk-test", "workaholic", "job-stress"], relatedArticles: ["workplace-ai-anxiety-2026", "psychological-detachment-after-work"],
    content: [
      { type: "paragraph", text: "번아웃은 바쁜 하루 뒤의 피곤함과 같은 말이 아닙니다. 세계보건기구의 ICD-11은 번아웃을 제대로 관리되지 않은 만성적인 직장 스트레스에서 비롯되는 직업 관련 현상으로 설명하며 질병 자체로 분류하지 않습니다." },
      { type: "h2", text: "세 가지 영역을 함께 살펴보세요" },
      { type: "list", items: ["에너지 고갈: 출근 전부터 소진되고 쉬어도 업무를 시작하기 어려움", "업무와의 심리적 거리: 냉소, 무관심 또는 사람을 피하려는 경향이 커짐", "직업적 효능감 저하: 이전에 하던 일도 의미 없거나 해낼 수 없다고 느낌"] },
      { type: "table", headers: ["단순 피로에 가까운 신호", "지속적인 소진을 점검할 신호"], rows: [["바쁜 일정 뒤 피곤함", "업무 생각만으로도 장기간 강한 소진"], ["충분히 쉬면 완화", "휴식 뒤에도 냉소와 무력감이 반복"], ["특정 하루·업무의 영향", "업무 구조 전반과 연결된 부담"]] },
      { type: "h2", text: "회복을 개인의 의지에만 맡기지 마세요" },
      { type: "paragraph", text: "수면과 휴식은 중요하지만 업무량, 역할 충돌, 통제권 부족, 불공정과 지원 부족이 원인이라면 일정·우선순위·책임 범위의 조정이 필요합니다. 소진이 일상 전반으로 퍼지거나 우울, 불안, 수면 문제가 지속된다면 자가 테스트로 판단하지 말고 의료기관이나 정신건강 전문가와 상의하세요." },
      { type: "cta", title: "현재 소진 위험 참고하기", description: "의료 진단이 아닌 자기점검용 문항으로 에너지와 회복 신호를 살펴보세요.", label: "번아웃 위험도 테스트하기", href: "/tests/burnout-risk-test" },
      { type: "faq", items: [{ question: "주말에 쉬면 괜찮아지면 번아웃이 아닌가요?", answer: "한 가지 기준만으로 판단할 수 없습니다. 소진·거리감·효능감 저하가 얼마나 오래, 어떤 업무 조건에서 반복되는지 함께 보세요." }, { question: "번아웃 테스트로 진단할 수 있나요?", answer: "아닙니다. 온라인 테스트는 참고용입니다. 증상이 지속되거나 일상 기능이 떨어진다면 전문가의 평가를 받으세요." }] },
      { type: "sources", items: [{ title: "Burn-out an occupational phenomenon: International Classification of Diseases", publisher: "World Health Organization", url: "https://www.who.int/news/item/28-05-2019-burn-out-an-occupational-phenomenon-international-classification-of-diseases", accessedAt: "2026-08-10" }] },
    ],
  },
  {
    title: "퇴근 후에도 일 생각이 날 때, 심리적 퇴근을 돕는 방법",
    slug: "psychological-detachment-after-work",
    description: "퇴근 뒤 반복되는 업무 생각을 억지로 없애기보다 미완료 업무를 정리하고 회복 시간을 만드는 방법을 안내합니다.",
    category: "work-lifestyle", publishedAt: "2026-08-10", updatedAt: "2026-08-10", author: "미미테스트 편집팀", thumbnail: "/tests/workaholic.jpg",
    keywords: ["퇴근 후 일 생각", "심리적 퇴근", "워라밸", "업무 과몰입", "퇴근 루틴"],
    relatedTests: ["workaholic", "job-stress", "burnout-risk-test"], relatedArticles: ["burnout-vs-tiredness", "workplace-ai-anxiety-2026"],
    content: [
      { type: "paragraph", text: "업무가 끝나도 머릿속에서 대화와 할 일이 반복되는 것은 단순히 의지가 약해서가 아닙니다. 미완료 업무, 언제 올지 모르는 연락, 높은 책임감과 성과 불안이 뇌에 ‘아직 끝나지 않았다’는 신호를 줄 수 있습니다." },
      { type: "h2", text: "퇴근 전 10분 종료 의식을 만드세요" },
      { type: "list", items: ["오늘 완료한 일 세 가지를 적기", "남은 일을 머릿속 대신 목록에 옮기기", "내일 첫 행동을 동사로 한 줄 적기", "급한 연락의 기준과 연락 채널을 구분하기", "업무 앱과 메신저를 닫고 책상을 정리하기"] },
      { type: "h2", text: "생각을 없애려 하지 말고 보류하세요" },
      { type: "paragraph", text: "일 생각이 떠오르면 ‘생각하지 말자’고 싸우기보다 메모 한 줄로 외부에 저장하고 내일 확인할 시간을 정하세요. 업무 알림을 끌 수 없는 직무라면 모든 알림을 보는 대신 정말 긴급한 사람·채널만 남기는 방식으로 경계를 만들 수 있습니다." },
      { type: "table", headers: ["상황", "종료 문장"], rows: [["미완료 업무", "다음 행동은 내일 오전 9시에 확인한다"], ["실수 걱정", "지금 확인 가능한 것과 내일 확인할 것을 나눴다"], ["연락 불안", "긴급 기준에 해당하지 않으면 다음 근무시간에 답한다"]] },
      { type: "cta", title: "업무 몰입과 경계 점검하기", description: "일을 좋아하는 몰입과 멈추기 어려운 과몰입을 구분해 보세요.", label: "워커홀릭 테스트하기", href: "/tests/workaholic" },
      { type: "faq", items: [{ question: "퇴근 후 업무 연락은 모두 무시해야 하나요?", answer: "직무 특성과 합의된 긴급 기준에 따라 다릅니다. 핵심은 항상 대기하는 상태가 아니라 응답이 필요한 조건을 명확히 하는 것입니다." }, { question: "취미가 없으면 어떻게 쉬어야 하나요?", answer: "거창한 취미보다 산책, 샤워, 식사처럼 업무와 다른 감각을 쓰는 짧은 전환 활동부터 정해 보세요." }] },
      { type: "sources", items: [{ title: "Work is reaching a boiling point", publisher: "American Psychological Association", url: "https://www.apa.org/monitor/2025/01/trends-workplace-tensions.html", accessedAt: "2026-08-10" }] },
    ],
  },
  {
    title: "콘서트 티켓 중고거래 사기 예방 체크리스트 2026",
    slug: "concert-ticket-scam-prevention-2026",
    description: "공연 티켓을 양도받기 전 확인할 판매자 정보, 안전결제, 재입금 요구와 피해 발생 후 신고 절차를 정리합니다.",
    category: "fan-trends", publishedAt: "2026-08-10", updatedAt: "2026-08-10", author: "미미테스트 편집팀", thumbnail: "/tests/bts-fan.jpg",
    keywords: ["콘서트 티켓 사기", "티켓 양도 사기", "중고거래 사기", "공연 티켓 안전거래", "2026 콘서트"],
    relatedTests: ["bts-fan-test", "seventeen-true-fan", "nct-dream-true-fan-test"], relatedArticles: ["healthy-fandom-shortform-guide"],
    content: [
      { type: "paragraph", text: "인기 공연일수록 ‘지금 바로 입금하지 않으면 다른 사람에게 판다’는 압박이 커집니다. 예매 내역 캡처, 신분증 사진과 SNS 활동 기록은 조작되거나 도용될 수 있으므로 한 가지 자료만으로 판매자를 신뢰해서는 안 됩니다." },
      { type: "h2", text: "입금 전 확인할 일곱 가지" },
      { type: "list", items: ["공식 예매처의 양도·본인확인 규정 먼저 확인하기", "공식 리세일 또는 플랫폼 안전결제가 있다면 우선 이용하기", "판매자의 전화번호·계좌번호 신고 이력을 경찰민원24에서 조회하기", "시세보다 지나치게 싼 가격과 즉시 입금 압박 경계하기", "예매번호 전체와 신분증 전체 사진을 요구하거나 보내지 않기", "추가 수수료·사업자 계좌 등을 이유로 재입금을 요구하면 중단하기", "대화, 게시글, 계좌정보와 이체 내역을 거래 완료 전까지 보관하기"] },
      { type: "h2", text: "안전해 보이는 자료도 단독 증거는 아니에요" },
      { type: "table", headers: ["판매자가 보내는 자료", "남는 위험"], rows: [["예매 화면 캡처", "편집하거나 다른 사람의 화면을 도용할 수 있음"], ["신분증 사진", "도용된 신분증일 수 있고 개인정보 유출 위험"], ["SNS 오래된 계정", "계정 자체가 탈취·대여됐을 수 있음"]] },
      { type: "h2", text: "피해를 알게 됐다면 증거부터 보관하세요" },
      { type: "paragraph", text: "상대방과의 대화, 판매 게시글 주소, 계좌번호, 이체확인증과 프로필 화면을 저장하세요. 은행에 지급정지 가능 여부를 문의하고 경찰청 사이버범죄 신고시스템(ECRM) 또는 가까운 경찰서를 통해 신고할 수 있습니다. 피해금을 돌려주겠다며 정부기관을 사칭한 링크로 다시 유도하는 2차 피싱도 주의해야 합니다." },
      { type: "faq", items: [{ question: "신분증과 예매 내역을 받으면 안전한가요?", answer: "아닙니다. 모두 조작·도용될 수 있습니다. 공식 거래 경로와 안전결제를 우선하고 재입금 요구를 경계하세요." }, { question: "사기를 당하면 어디에 신고하나요?", answer: "대화와 이체 자료를 보관한 뒤 경찰청 사이버범죄 신고시스템(ECRM)이나 가까운 경찰서를 이용할 수 있습니다." }] },
      { type: "sources", items: [{ title: "사이버 사기 피해신고 이력조회 및 예방 5계명", publisher: "경찰민원24", url: "https://minwon24.police.go.kr/cvlcpt/cvlcptGdInfo.do?cvlcptId=MW-806", accessedAt: "2026-08-10" }, { title: "사이버범죄 신고시스템", publisher: "경찰청", url: "https://ecrm.police.go.kr/minwon/main", accessedAt: "2026-08-10" }, { title: "정부기관 사칭 사기 피해 구제 피싱사이트 주의", publisher: "한국인터넷진흥원", url: "https://risc.kisa.or.kr/inform/secInfoDetail.do?pageIndex=2&scrtyInfoId=SCR_0000000000000054&searchCondition=&searchKeyword=", accessedAt: "2026-08-10" }] },
    ],
  },
  {
    title: "2026 팬덤 문화, 숏폼과 챌린지를 건강하게 즐기는 법",
    slug: "healthy-fandom-shortform-guide",
    description: "참여와 공유가 커진 K-팝 팬덤에서 숏폼 피로, 비교, 소비 압박을 줄이며 오래 즐기는 방법을 안내합니다.",
    category: "fan-trends", publishedAt: "2026-08-10", updatedAt: "2026-08-10", author: "미미테스트 편집팀", thumbnail: "/tests/young-old.svg",
    keywords: ["2026 팬덤 문화", "K팝 팬덤", "숏폼 챌린지", "덕질 스트레스", "건강한 팬 활동"],
    relatedTests: ["young-old", "bts-fan-test", "girls-generation-true-fan-test"], relatedArticles: ["concert-ticket-scam-prevention-2026", "realistic-digital-rest-guide"],
    content: [
      { type: "paragraph", text: "2025년 한국 검색 트렌드에서는 K-팝을 음원 감상에 그치지 않고 안무 영상, 챌린지와 글로벌 팬덤 공유로 즐기는 흐름이 두드러졌습니다. 2026년 7월 문화체육관광부도 팬덤을 중심으로 한 대규모 K-컬처 축제 계획을 소개했습니다. 팬 활동의 범위가 넓어진 만큼 즐거움과 피로의 경계를 스스로 정하는 일이 중요해졌습니다." },
      { type: "h2", text: "팬심을 시간과 돈의 총량으로 증명하지 마세요" },
      { type: "list", items: ["모든 실시간 일정과 알림을 따라가야 한다는 압박 내려놓기", "앨범·굿즈·공연 예산을 월 단위로 먼저 정하기", "조회수와 순위 참여를 자발적인 선택으로 남겨두기", "팬들 사이의 소비량·정보량 비교에서 잠시 거리 두기", "아티스트와 다른 팬의 사생활·경계를 존중하기"] },
      { type: "h2", text: "숏폼은 목적을 정하고 들어가세요" },
      { type: "paragraph", text: "챌린지 하나를 보러 들어갔다가 추천 영상만 한 시간 보는 일이 반복된다면 앱을 열기 전 목적과 종료 시점을 정해 보세요. 공식 계정과 믿을 만한 번역·정보 계정을 구분하고, 날짜나 출처가 없는 활동 정보는 공유하기 전에 공식 공지를 확인하는 습관도 필요합니다." },
      { type: "table", headers: ["즐거운 참여", "피로 신호"], rows: [["보고 싶은 콘텐츠를 선택", "놓치면 팬이 아닌 것 같은 불안"], ["예산 안에서 소비", "빚·생활비를 줄여 경쟁적 구매"], ["팬들과 정보와 감상 공유", "순위·의견 차이로 반복적인 갈등"]] },
      { type: "blockquote", text: "오래 지속되는 팬 활동은 모든 것을 놓치지 않는 일이 아니라, 내 생활과 함께 즐길 수 있는 방식을 찾는 일에 가깝습니다." },
      { type: "cta", title: "최신 밈 감각 가볍게 확인하기", description: "검증된 밈 문제를 통해 지금의 트렌드 감각을 재미로 살펴보세요.", label: "영크크·늙크크 테스트하기", href: "/tests/young-old" },
      { type: "faq", items: [{ question: "스트리밍이나 투표를 쉬면 팬이 아닌가요?", answer: "팬 활동 방식은 사람마다 다릅니다. 자발적으로 감당할 수 있는 범위에서 참여하는 것이 중요합니다." }, { question: "팬 계정의 정보를 어떻게 확인하나요?", answer: "날짜, 원문 링크와 공식 계정 공지를 확인하세요. 출처가 없거나 지나치게 긴급성을 강조하는 정보는 공유 전 재확인하는 편이 좋습니다." }] },
      { type: "sources", items: [{ title: "검색어로 돌아본 대한민국의 2025년", publisher: "Google Korea Blog", url: "https://blog.google/intl/ko-kr/products/explore-get-answers/year-in-search-2025-kr/", accessedAt: "2026-08-10" }, { title: "K-컬처 축제 패노메논 내년 개최", publisher: "문화체육관광부", url: "https://www.mcst.go.kr/site/s_notice/tv/tvView.jsp?pMenuCD=0307010000&pSeq=2653", accessedAt: "2026-08-10" }] },
    ],
  },
];

export const getArticle = (slug: string) => articles.find((article) => article.slug === slug);
export const getArticleCategory = (slug: string) => articleCategories.find((category) => category.slug === slug);
export const getArticlesByCategory = (slug: string) => articles.filter((article) => article.category === slug);
export const getArticlesForTest = (testSlug: string) => articles.filter((article) => article.relatedTests.includes(testSlug));
