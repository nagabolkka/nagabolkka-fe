// 현재 위치 (선택) — 거부 · 실패 · 시간 초과면 null → 서버가 내 구 중심으로
const TIMEOUT_MS = 3000;
const PROMPT_LIMIT_MS = 5000; // 권한 창을 안 누르고 있어도 화면이 멈추지 않게
const MAX_AGE_MS = 10 * 60 * 1000; // 10분 안에 잰 위치는 다시 안 잼 (바로 돌아옴)

// 소수 4자리 (약 10m) — 필요 이상으로 정확한 좌표를 보내지 않음
const round = (value) => Math.round(value * 10000) / 10000;

export const getLocation = () => {
  if (!navigator.geolocation) return Promise.resolve(null);

  const location = new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => resolve({ lat: round(coords.latitude), lng: round(coords.longitude) }),
      () => resolve(null),
      { enableHighAccuracy: false, timeout: TIMEOUT_MS, maximumAge: MAX_AGE_MS },
    );
  });
  const limit = new Promise((resolve) => setTimeout(() => resolve(null), PROMPT_LIMIT_MS));

  return Promise.race([location, limit]);
};