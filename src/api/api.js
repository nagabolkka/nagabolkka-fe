import axios from "axios";

export const TOKEN_KEY = "accessToken";
export const REFRESH_KEY = "refreshToken";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL,
  timeout: 15000, // 15초 넘으면 점검 화면
});

export function saveTokens({ accessToken, refreshToken }) {
  localStorage.setItem(TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_KEY, refreshToken);
}

export function clearTokens() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_KEY);
}

// 로그인 후에는 요청마다 Authorization: Bearer {토큰} 을 자동으로 붙인다
api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 재발급은 한 번만 : 동시에 여러 요청이 만료되면 같은 Promise 를 기다린다 (Refresh 는 한 번 쓰면 폐기되기 때문)
let refreshPromise = null;

function refreshTokens() {
  if (!refreshPromise) {
    const refreshToken = localStorage.getItem(REFRESH_KEY);
    // api 가 아니라 axios 로 호출 → 이 요청에는 위 인터셉터가 안 붙는다 (무한 반복 방지)
    refreshPromise = axios
      .post(`${baseURL}/api/auth/refresh`, { refreshToken }, { timeout: 15000 })
      .then(({ data }) => {
        saveTokens(data);
        return data.accessToken;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }
  return refreshPromise;
}

function goLogin() {
  clearTokens();
  window.location.replace("/");
}

const LOGIN_REQUIRED_CODES = [
  "AUTH_TOKEN_EXPIRED",
  "AUTH_INVALID_TOKEN",
  "UNAUTHORIZED",
];

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error;
    const code = response?.data?.code;

    // Access 만료 → 재발급 후 원래 요청 다시 (한 요청당 한 번만)
    if (
      code === "AUTH_TOKEN_EXPIRED" &&
      !config._retry &&
      localStorage.getItem(REFRESH_KEY)
    ) {
      config._retry = true;
      try {
        const accessToken = await refreshTokens();
        config.headers.Authorization = `Bearer ${accessToken}`;
        return api(config);
      } catch {
        goLogin(); // AUTH_REFRESH_EXPIRED · 네트워크 오류
        return Promise.reject(error);
      }
    }

    // 위조 · 탈퇴 · 재발급 불가 → 로그인 화면 (KAKAO_LOGIN_FAILED 는 여기 안 걸림)
    if (LOGIN_REQUIRED_CODES.includes(code)) {
      goLogin();
    }
    return Promise.reject(error);
  },
);

export default api;