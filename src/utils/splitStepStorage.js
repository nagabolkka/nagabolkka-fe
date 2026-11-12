// 퀘스트 id 별로 저장 → 다른 날 퀘스트와 섞이지 않음
const key = (questId) => `nagabolkka:splitSteps:${questId}`;

export const loadSplitSteps = (questId) => {
  try {
    return JSON.parse(localStorage.getItem(key(questId))) ?? [];
  } catch {
    return [];
  }
};

export const saveSplitSteps = (questId, doneSteps) => {
  localStorage.setItem(key(questId), JSON.stringify(doneSteps));
};