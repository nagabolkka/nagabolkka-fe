import api from "./api";

// 시작 체크 : 목표는 선택 (나 탭에서 나중에 고름)
export async function submitStartCheck({ answers, districtId, goalId = null }) {
  const { data } = await api.post("/api/onboarding/start-check", {
    answers,
    districtId,
    ...(goalId != null && { goalId }),
  });
  return data;
}