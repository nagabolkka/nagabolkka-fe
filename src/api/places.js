import api from "./api";

// 동네 장소 목록 (거리순) — location : { lat, lng } 또는 null → 내 구 중심
export async function getPlaces(location) {
  const { data } = await api.get("/api/places", { params: location ?? undefined });
  return data.places;
}