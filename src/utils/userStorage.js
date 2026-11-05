import { loadAdventure, saveAdventure } from "./adventureStorage";

const USER_KEY = "nagabolkka:user";
const ADVENTURE_KEY = "nagabolkka:adventure";

const DEFAULT_USER = {
  nickname: "윤지",
  plusInterest: null, 
};

export const loadUser = () => {
  try {
    return { ...DEFAULT_USER, ...JSON.parse(localStorage.getItem(USER_KEY)) };
  } catch {
    return DEFAULT_USER;
  }
};

const saveUser = (data) => {
  localStorage.setItem(USER_KEY, JSON.stringify({ ...loadUser(), ...data }));
};

// 목표 변경
export const changeGoal = (goalId) => saveAdventure({ goalId });

// 플러스 설문 응답 
export const savePlusInterest = ({ priceOption, customPrice = null }) => {
  const isFirst = !loadUser().plusInterest;
  saveUser({
    plusInterest: {
      priceOption,
      customPrice: priceOption === "CUSTOM" ? customPrice : null,
      respondedAt: new Date().toISOString(),
    },
  });
  return isFirst;
};

// 내 기록 모두 삭제 
export const clearAllRecords = () => {
  localStorage.removeItem(ADVENTURE_KEY);
  localStorage.removeItem(USER_KEY);
};

// 현재 목표 id (시작 체크에서 고른 값)
export const getCurrentGoalId = () => loadAdventure().goalId ?? null;