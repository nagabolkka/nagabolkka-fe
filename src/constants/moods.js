// 기분 1~5 (입국 심사 · 기록) — 잉크 색은 constants/islands.js 의 MOOD_INK
export const MOODS = [
  { value: 1, label: "힘들었어요" },
  { value: 2, label: "그저 그래요" },
  { value: 3, label: "보통이에요" },
  { value: 4, label: "괜찮았어요" },
  { value: 5, label: "좋았어요" },
];

// 기분 별 다음 난이도 안내
export const NEXT_DIFFICULTY_MESSAGE = {
  1: "다음엔 조금 더 가벼운 탑승권으로 준비할게요.",
  2: "다음엔 부담 없는 탑승권으로 준비할게요.",
  3: "다음에도 지금처럼 편안한 등급으로 준비할게요.",
  4: "다음에도 지금처럼 편안한 등급으로 준비할게요.",
  5: "다음엔 살짝 도전해볼 만한 탑승권도 준비해볼게요.",
};