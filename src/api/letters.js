import api from "./api";

// 가장 최근 편지 → 없으면 (204) null
// location : { lat, lng } 또는 null → 있으면 추천 장소가 지금 위치 근처
export async function getLatestLetter(location) {
  const { data, status } = await api.get("/api/letters/latest", {
    params: location ?? undefined,
  });
  return status === 204 || !data ? null : data;
}