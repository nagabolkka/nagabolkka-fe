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

// 음성 → 글자 (녹음 파일은 서버에 저장 안 함) → { text } · 못 알아들으면 text null
export async function transcribePractice(sessionId, blob) {
  const form = new FormData();
  form.append("audio", blob, blob.type.includes("mp4") ? "voice.mp4" : "voice.webm");
  const { data } = await api.post(`/api/practice/sessions/${sessionId}/transcribe`, form);
  return data;
}