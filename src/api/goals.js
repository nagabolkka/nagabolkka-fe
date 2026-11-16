import api from "./api";

// 내 목표 : 4단계 · 체크 상태 · 이 목표로 희망 조각을 받았는지
export async function getMyGoal() {
  const { data } = await api.get("/api/goals/me");
  return data;
}

// 단계 체크 / 해제 → { checked, total, hopePiece }
export async function checkGoalStep(stepId, checked) {
  const { data } = await api.put(`/api/goals/me/steps/${stepId}`, { checked });
  return data;
}