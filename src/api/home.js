import api from "./api";

// 홈 화면 전체
export async function getHome() {
  const { data } = await api.get("/api/home");
  return data;
}