export const DIFFICULTY = {
  EASY: { label: "쉬움", bgColor: "#CFE8C4", textColor: "#2B2340" },
  NORMAL: { label: "보통", bgColor: "#F6E3A6", textColor: "#2B2340" },
  CHALLENGE: { label: "도전", bgColor: "#F5C6C0", textColor: "#2B2340" },
};

// 홈 난이도 시트 : 단계 순서 (쉬움 1칸 · 보통 2칸 · 도전 3칸 조각)
export const DIFFICULTY_LEVELS = [
  { key: "EASY", level: 1, slotNo: 1 },
  { key: "NORMAL", level: 2, slotNo: 2 },
  { key: "CHALLENGE", level: 3, slotNo: 3 },
];