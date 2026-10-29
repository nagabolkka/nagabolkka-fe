// 카카오 로그인 페이지로 보내기

export const KAKAO_REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;
const CONSENTS_KEY = "kakaoConsents";

export function goKakaoLogin(consents = null) {
  if (consents) {
    sessionStorage.setItem(CONSENTS_KEY, JSON.stringify(consents));
  } else {
    sessionStorage.removeItem(CONSENTS_KEY); // "이미 모험가라면" → 기존 회원 로그인
  }

  const params = new URLSearchParams({
    client_id: import.meta.env.VITE_KAKAO_REST_API_KEY,
    redirect_uri: KAKAO_REDIRECT_URI,
    response_type: "code",
  });
  window.location.href = `https://kauth.kakao.com/oauth/authorize?${params}`;
}

export function takeConsents() {
  const saved = sessionStorage.getItem(CONSENTS_KEY);
  sessionStorage.removeItem(CONSENTS_KEY);
  return saved ? JSON.parse(saved) : null;
}