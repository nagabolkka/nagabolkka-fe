import api from "./api";

// 오늘 퀘스트 (없으면 서버가 이때 배정)
export async function getTodayQuest() {
  const { data } = await api.get("/api/quests/today");
  return data;
}

// 오늘 퀘스트 동작 : ACCEPT · SPLIT · CHANGE · SKIP → 바뀐 오늘 퀘스트
export async function actTodayQuest(type) {
  const { data } = await api.post("/api/quests/today/actions", { type });
  return data;
}

// 오늘 퀘스트 완료 · 기록 → 조각 · 복원도 · 루미 한마디 (위기면 crisisDetected 만)
export async function completeQuest({ mood, reflection, doneSteps }) {
  const { data } = await api.post("/api/quests/today/complete", {
    mood,
    reflection: reflection.trim() || null,
    doneSteps,
  });
  return data;
}