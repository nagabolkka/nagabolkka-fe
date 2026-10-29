import api from "./api";

export async function kakaoLogin({ code, redirectUri, consents }) {
  const { data } = await api.post("/api/auth/kakao", {
    code,
    redirectUri,
    consents,
  });
  return data;
}
