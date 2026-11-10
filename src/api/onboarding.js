import api from "./api";

export async function submitStartCheck({ answers, districtId, goalId }) {
  const { data } = await api.post("/api/onboarding/start-check", {
    answers,
    districtId,
    goalId,
  });
  return data; 
}