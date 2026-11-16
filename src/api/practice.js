import api from "./api";

// 시나리오 3개 + 오늘 남은 횟수
export async function getPracticeScenarios() {
  const { data } = await api.get("/api/practice/scenarios");
  return data;
}

// 연습 시작 (하루 1회 차감) → { sessionId, opening, choices, maxTurns }
export async function startPractice(scenarioId) {
  const { data } = await api.post("/api/practice/sessions", { scenarioId });
  return data;
}

// 내 말 + 지금까지의 대화 → { crisisDetected, reply, turn, choices, finished }
export async function sendPracticeTurn(sessionId, message, history) {
  const { data } = await api.post(`/api/practice/sessions/${sessionId}/turns`, { message, history });
  return data;
}

// 대화 전체 → { feedback, piece, followMission }
export async function finishPractice(sessionId, history) {
  const { data } = await api.post(`/api/practice/sessions/${sessionId}/finish`, { history });
  return data;
}