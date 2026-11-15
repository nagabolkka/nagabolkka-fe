// 홈에서 받은 날씨 → 퀘스트 화면 배경 (탭을 닫으면 비워짐)
const KEY = "nagabolkka:weather";

export const saveWeather = (weather) => {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(weather));
  } catch {
    // 저장 못 하면 퀘스트 화면은 맑음
  }
};

export const loadWeather = () => {
  try {
    return JSON.parse(sessionStorage.getItem(KEY)) ?? { sky: "CLEAR", isRainy: false };
  } catch {
    return { sky: "CLEAR", isRainy: false };
  }
};