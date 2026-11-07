import { useSearchParams } from "react-router-dom";
import { getRegion } from "../mocks/regions";
import { getMission, getTodayMission } from "../mocks/missions";
import { loadAdventure, getTodayQuest } from "../utils/adventureStorage";

// 오늘의 퀘스트 · 지역 상태 (홈 · 퀘스트 상세 공통)
// 🔧 확인용 주소창 값 > 저장된 진행 상태 > 기본값
export default function useTodayQuest() {
  const [params] = useSearchParams();
  const saved = loadAdventure();

  const stageNo = Number(params.get("stage") ?? saved.stageNo ?? 1);
  const restoration = Number(params.get("restoration") ?? saved.restoration ?? 0);
  const pieceCount = saved.pieceCount ?? 0;
  const isRainy = params.get("rain") === "1";

  const region = getRegion(stageNo);
  const defaultMission = getTodayMission(stageNo, isRainy);
  const todayQuest = getTodayQuest(defaultMission.missionId);
  const mission = getMission(todayQuest.missionId) ?? defaultMission;
  const questStatus = (params.get("quest") ?? todayQuest.status).toUpperCase();

  return {
    saved,
    stageNo,
    restoration,
    pieceCount,
    isRainy,
    region,
    mission,
    defaultMissionId: defaultMission.missionId,
    todayQuest,
    questStatus,
  };
}