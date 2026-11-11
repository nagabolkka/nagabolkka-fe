import api from "./api";

// 내 정보 조회
export async function getMyInfo() {
  const { data } = await api.get("/api/users/me");
  return data;
}

// 목표 변경
export async function updateMyGoal(goalId) {
  const { data } = await api.patch("/api/users/me", { goalId });
  return data;
}