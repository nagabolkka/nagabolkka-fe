import api from "./api";

// 이 기기 토큰 등록 · 해제 (같은 토큰은 서버가 덮어씀)
export const saveFcmToken = (token) => api.post("/api/push/tokens", { token });

export const deleteFcmToken = (token) => api.delete("/api/push/tokens", { data: { token } });