export const HOTLINES = [
  {
    key: "suicide",
    label: "자살예방 상담전화 · 24시간",
    number: "109",
    primary: true,
  },
  {
    key: "crisis",
    label: "정신건강 위기상담",
    number: "1577-0199",
    primary: false,
  },
];

// 가까운 센터를 못 찾았을 때 → 카카오맵에서 직접 찾기
export const CENTER_SEARCH_URL = `https://map.kakao.com/?q=${encodeURIComponent("정신건강복지센터")}`;

// 진입 경로별 안내 (?from=), 없으면 default
export const HELP_NOTICE = {
  practice:
    "연습 대화를 잠시 멈췄어요. 많이 힘든 마음이 느껴져요.\n지금은 사람과 직접 이야기하는 게 가장 좋아요.",
  reflection:
    "남겨준 이야기에서 많이 힘든 마음이 느껴졌어요.\n지금은 사람과 직접 이야기하는 게 가장 좋아요.",
  default:
    "힘든 마음이 들 땐 언제든 여기로 와도 괜찮아요.\n지금 이야기할 수 있는 곳을 모아뒀어요.",
};
