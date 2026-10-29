import axios from "axios";

export const TOKEN_KEY = "accessToken";


const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 15000, 
});

// 로그인 후에는 요청마다 Authorization: Bearer {토큰} 을 자동으로 붙인다
api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;