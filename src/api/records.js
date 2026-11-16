import api from "./api";

// 모험 일지 : 이번 주 · 고른 달 (yyyy-MM) · 지역 복원도
export async function getRecords(month) {
  const { data } = await api.get("/api/records", { params: { month } });
  return data;
}