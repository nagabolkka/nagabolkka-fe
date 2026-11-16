import api from "./api";

// 도움 받기를 직접 열었을 때 열린 시각만 기록 (원문 · 위치 없음)
// 실패해도 화면은 그대로 → 로그인 이동 안 함 · 5초만 기다림
export async function recordHelpOpened() {
  await api.post(
    "/api/safety/events",
    { source: "MANUAL" },
    { silentAuth: true, timeout: 5000 }
  );
}