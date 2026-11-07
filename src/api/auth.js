import api, { REFRESH_KEY, clearTokens } from "./api";

// 카카오 로그인 및 가입  POST /api/auth/kakao
export async function kakaoLogin({ code, redirectUri, consents }) {
  const { data } = await api.post("/api/auth/kakao", {
    code,
    redirectUri,
    consents,
  });
  return data;
}

// 로그아웃  POST /api/auth/logout → 204 (서버 응답과 상관없이 저장된 토큰은 지운다)
export async function logout() {
  const refreshToken = localStorage.getItem(REFRESH_KEY);
  try {
    if (refreshToken) {
      await api.post("/api/auth/logout", { refreshToken });
    }
  } finally {
    clearTokens();
  }
}