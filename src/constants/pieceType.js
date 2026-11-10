export const PIECE_TYPE_LABEL = {
  EASY: "쉬움",
  NORMAL: "보통",
  CHALLENGE: "도전",
  RAINY: "비 오는 날",
  SAVED_PLACE: "담은 장소",
  PRACTICE: "연습",
  GOAL: "목표",
  REFLECTION: "회고",
  BONUS: "특별",
};

export const getPieceTypeLabel = (type) => PIECE_TYPE_LABEL[type] ?? "";