import api from "./api";

// 가장 최근 편지 → 없으면 (204) null
export async function getLatestLetter() {
  const { data, status } = await api.get("/api/letters/latest");
  return status === 204 || !data ? null : data;
}