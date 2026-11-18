// 현재 위치 (선택) — 거부 · 실패 · 시간 초과면 null → 서버가 내 구 중심으로
const TIMEOUT_MS = 3000;
const PROMPT_LIMIT_MS = 5000; // 권한 창을 안 누르고 있어도 화면이 멈추지 않게
const MAX_AGE_MS = 10 * 60 * 1000; // 10분 안에 잰 위치는 다시 안 잼 (바로 돌아옴)

// 마지막으로 위치를 물었을 때 결과 : "ok" | "denied" | "unavailable" | "prompt" | "unsupported" | null (아직 안 물음)
let lastStatus = null;

export const getLocationStatus = () => lastStatus;

// 소수 4자리 (약 10m) — 필요 이상으로 정확한 좌표를 보내지 않음
const round = (value) => Math.round(value * 10000) / 10000;

export const getLocation = () => {
  if (!navigator.geolocation) {
    lastStatus = "unsupported";
    return Promise.resolve(null);
  }

  return new Promise((resolve) => {
    let done = false;
    // 위치 · 실패 · 5초 중 먼저 온 것 하나만
    const finish = (status, value) => {
      if (done) return;
      done = true;
      lastStatus = status;
      resolve(value);
    };

    navigator.geolocation.getCurrentPosition(
      ({ coords }) =>
        finish("ok", { lat: round(coords.latitude), lng: round(coords.longitude) }),
      (error) =>
        // 1 = 권한 거부 / 2 = 위치 못 잡음 (위치 서비스 꺼짐 등) / 3 = 시간 초과
        finish(error.code === error.PERMISSION_DENIED ? "denied" : "unavailable", null),
      { enableHighAccuracy: false, timeout: TIMEOUT_MS, maximumAge: MAX_AGE_MS },
    );
    setTimeout(() => finish("prompt", null), PROMPT_LIMIT_MS); // 권한 창을 아직 안 누름
  });
};