import api from "./api";

// 조각 도감 : 5지역 × 5칸 · 복원도 · 보너스 조각
export async function getCollection() {
  const { data } = await api.get("/api/collection");
  return data;
}