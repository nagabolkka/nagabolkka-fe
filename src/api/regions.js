import api from "./api";

// 다음 지역 제안 응답 : true 열어볼게요 · false 지금이 좋아요 → 응답 후 지금 머무는 지역
export async function respondNextRegion(accept) {
  const { data } = await api.post("/api/regions/next", { accept });
  return data;
}