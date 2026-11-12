import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTodayQuest } from "../api/quests";
import { getRegion } from "../mocks/regions";

export const toMission = (quest) => ({
  title: quest.title,
  description: quest.description,
  difficulty: quest.difficulty,
  isIndoor: quest.isIndoor,
  placeName: quest.place.name,
  distanceM: quest.place.distanceM,
  estMinutes: quest.estMinutes,
  reward: quest.reward,
  steps: quest.steps.map((step) => step.content),
});

// 오늘 퀘스트 — 퀘스트 상세 · 진행 · 쪼개기 화면 공통
export default function useQuest() {
  const navigate = useNavigate();
  const [quest, setQuest] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let ignore = false;
    getTodayQuest()
      .then((data) => {
        if (!ignore) setQuest(data);
      })
      .catch((e) => {
        if (ignore) return;
        const code = e.response?.data?.code;
        if (code === "ONBOARDING_REQUIRED") {
          navigate("/start-check", { replace: true });
          return;
        }
        // 응답 없음 (서버 꺼짐 · 15초 초과) · 500번대 → 점검 화면
        if (!e.response || e.response.status >= 500) {
          navigate("/maintenance", { replace: true });
          return;
        }
        setError(true); 
      });
    return () => {
      ignore = true;
    };
  }, [navigate]);

  return {
    quest,
    setQuest,
    error,
    mission: quest ? toMission(quest) : null,
    region: quest ? getRegion(quest.region.stageNo) : null,
  };
}
