const KEY = "nagabolkka:adventure";

// 시작 체크 결과 저장 (API 연동 전 임시)
export const saveAdventure = ({ stageNo, goalId }) => {
  localStorage.setItem(KEY, JSON.stringify({ stageNo, goalId }));
};

export const loadAdventure = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY)) ?? {};
  } catch {
    return {};
  }
};
