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

// 못 찾은 조각 : 어떻게 얻는지 
export const PIECE_HOW_TO = {
  EASY: "이 챕터의 쉬운 퀘스트를 완료하면 얻어요",
  NORMAL: "이 챕터의 보통 퀘스트를 완료하면 얻어요",
  CHALLENGE: "이 챕터의 도전 퀘스트를 완료하면 얻어요",
  RAINY: "비 오는 날, 이 챕터의 비 오는 날 퀘스트를 완료하면 얻어요",
  REFLECTION: "시작의 방 퀘스트를 마치고 한 줄 회고를 남기면 얻어요",
  SAVED_PLACE: "동네 지도에서 담은 장소를 다녀오면 얻어요",
  PRACTICE: "연습실에서 연습을 마치고 이어지는 미션을 완료하면 얻어요",
  GOAL: "내 목표 준비 단계를 모두 마치면 얻어요",
};

export const getPieceHowTo = (type) => PIECE_HOW_TO[type] ?? "";