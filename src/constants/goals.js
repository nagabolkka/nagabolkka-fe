// 사회 연결 목표 5종 · 준비 4단계 (프론트 고정값, goalId 는 DB goals.id 와 같게)
export const GOALS = [
  {
    goalId: 5,
    code: "SCHOOL",
    name: "학업 복귀",
    steps: [
      "다니던 학교 학사 일정 확인하기",
      "휴학 · 복학 상담 전화 연습하기",
      "학교 도서관 한 번 가보기",
      "복학 신청서 내기",
    ],
  },
  {
    goalId: 4,
    code: "VOLUNTEER",
    name: "봉사",
    steps: [
      "관심 있는 봉사 분야 고르기",
      "1365 봉사 사이트 둘러보기",
      "2시간짜리 봉사 신청하기",
      "첫 봉사 다녀오기",
    ],
  },
  {
    goalId: 3,
    code: "MEETUP",
    name: "모임",
    steps: [
      "관심사 하나 정하기",
      "동네 소모임 목록 보기",
      "구경만 하는 날 정하기",
      "첫 모임에 참석하기",
    ],
  },
  {
    goalId: 2,
    code: "PART_TIME",
    name: "알바",
    steps: [
      "원하는 근무 시간 정하기",
      "공고 3개 저장하기",
      "문의 전화 연습하기",
      "지원서 1곳 보내기",
    ],
  },
  {
    goalId: 1,
    code: "JOB",
    name: "취업",
    steps: [
      "하고 싶은 일 3가지 적기",
      "이력서 초안 쓰기",
      "모의 면접 연습하기",
      "청년센터 취업 상담 받기",
    ],
  },
];

export const getGoal = (goalId) => GOALS.find((g) => g.goalId === goalId);