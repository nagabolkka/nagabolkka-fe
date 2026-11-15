import api from "./api";

// 홈 화면 전체 (location : { lat, lng } 또는 null → 내 구 중심)
export async function getHome(location) {
  const { data } = await api.get("/api/home", { params: location ?? undefined });
  return data;
}