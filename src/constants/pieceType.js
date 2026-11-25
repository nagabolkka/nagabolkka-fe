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

// 못 받은 도장 : 어떻게 받는지
export const PIECE_HOW_TO = {
  EASY: "이 섬의 쉬움 등급 탑승권을 다녀오면 받아요",
  NORMAL: "이 섬의 보통 등급 탑승권을 다녀오면 받아요",
  CHALLENGE: "이 섬의 도전 등급 탑승권을 다녀오면 받아요",
  RAINY: "비 오는 날, 이 섬의 비 오는 날 탑승권을 다녀오면 받아요",
  REFLECTION: "쉼의 섬 탑승권을 마치고 여행 메모 한 줄을 남기면 받아요",
  SAVED_PLACE: "동네에서 비자로 담은 장소를 다녀오면 받아요",
  PRACTICE: "연습실에서 연습을 마치고 이어지는 탑승권을 다녀오면 받아요",
  GOAL: "나의 꿈 준비 단계를 모두 마치면 받아요",
};

export const getPieceHowTo = (type) => PIECE_HOW_TO[type] ?? "";