import api from "./api";

// 게시 중 공지 최근 1개 (로그인 없이) → 없으면 null
export async function getActiveNotice() {
  const { data } = await api.get("/api/notices/active");
  return data.notice;
}