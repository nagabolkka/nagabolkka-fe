import api from "./api";

// 오늘 퀘스트 (없으면 서버가 이때 배정 · 근처 실제 장소)
export async function getTodayQuest(location) {
  const { data } = await api.get("/api/quests/today", { params: location ?? undefined });
  return data;
}

// 오늘 퀘스트 동작 : ACCEPT · SPLIT · CHANGE · SKIP · REVISIT(stageNo) → 바뀐 오늘 퀘스트
export async function actTodayQuest(type, location, extra = {}) {
  const { data } = await api.post(
    "/api/quests/today/actions",
    { type, ...extra },
    { params: location ?? undefined },
  );
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