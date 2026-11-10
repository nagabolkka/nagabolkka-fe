export const PRACTICE_SCENARIOS = [
  {
    scenarioId: 1,
    code: "FIRST_CALL",
    title: "첫 전화",
    description: "도서관에 프로그램 문의하기",
    partnerRole: "도서관 안내 직원",
    opening: "네, OO도서관입니다. 무엇을 도와드릴까요?",
    openingChoices: ["북토크 문의하려고 전화했어요.", "혹시 이번 달 프로그램 신청 되나요?"],
    turns: [
      {
        reply: "네, 이번 주 토요일 오후 2시에 북토크가 있어요. 신청 도와드릴까요?",
        choices: ["네, 신청할게요.", "조금 더 알려주실 수 있나요?"],
      },
      {
        reply: "네, 혹시 도서관 회원증 있으세요? 없어도 괜찮아요.",
        choices: ["네, 있어요.", "아니요, 없어요."],
      },
      {
        reply: "네, 신청해 둘게요. 토요일 2시에 3층으로 오시면 돼요. 감사합니다!",
        choices: [],
      },
    ],
    feedback: {
      good: ["끝까지 전화를 이어갔어요", "필요한 걸 직접 물어봤어요"],
      next: ["몇 명까지 신청할 수 있나요?"],
    },
    followMission: "도서관에 프로그램 문의 전화하기",
  },
  {
    scenarioId: 2,
    code: "FIRST_VISIT",
    title: "첫 방문",
    description: "도서관에서 회원증 만들기",
    partnerRole: "도서관 1층 안내데스크 직원",
    opening: "안녕하세요, 어떻게 오셨어요?",
    openingChoices: ["회원증 만들려고 왔어요.", "저, 처음 와서요. 뭐부터 하면 될까요?"],
    turns: [
      {
        reply: "네, 회원증은 신분증만 있으면 바로 만들어 드려요.",
        choices: ["네, 여기 있어요.", "휴대폰 신분증도 되나요?"],
      },
      {
        reply: "네, 이 신청서 한 장만 써 주세요. 별표 칸만 쓰시면 돼요.",
        choices: ["네, 다 썼어요.", "어디에 쓰면 돼요?"],
      },
      {
        reply: "다 됐어요! 오늘부터 책 빌리실 수 있어요. 좋은 하루 보내세요.",
        choices: [],
      },
    ],
    feedback: {
      good: ["먼저 용건을 말했어요", "모르는 걸 직접 물어봤어요"],
      next: ["책은 어디에서 빌리면 되나요?"],
    },
    followMission: "도서관에 가서 회원증 만들기",
  },
  {
    scenarioId: 3,
    code: "MOCK_INTERVIEW",
    title: "모의 면접",
    description: "동네 카페 아르바이트 면접 보기",
    partnerRole: "동네 카페 점장",
    opening: "안녕하세요, 편하게 앉으세요. 간단하게 자기소개 한번 해 주시겠어요?",
    openingChoices: [
      "안녕하세요, 이 동네에 살고 있어서 지원했습니다.",
      "아직 경험은 없지만 열심히 배우고 싶어서 지원했습니다.",
    ],
    turns: [
      {
        reply: "네, 반가워요. 혹시 주말 오전에 일할 수 있어요?",
        choices: ["네, 가능합니다.", "하루만 가능한데 괜찮을까요?"],
      },
      {
        reply: "좋아요. 마지막으로 궁금한 거 있으면 물어보세요.",
        choices: ["처음에 일은 어떻게 배우나요?", "아니요, 감사합니다."],
      },
      {
        reply: "오늘 와 줘서 고마워요. 결과는 이번 주 안에 문자로 드릴게요.",
        choices: [],
      },
    ],
    feedback: {
      good: ["질문에 끝까지 대답했어요", "정중하게 인사로 마무리했어요"],
      next: ["처음에 일은 어떻게 배우나요?"],
    },
    followMission: "동네 아르바이트 공고 하나 찾아보기",
  },
];

export const getScenario = (code) => PRACTICE_SCENARIOS.find((s) => s.code === code);