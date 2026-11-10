import { useSearchParams } from "react-router-dom";
import { getRegion } from "../mocks/regions";
import { getMission, getTodayMission } from "../mocks/missions";
import { loadAdventure, getTodayQuest } from "../utils/adventureStorage";
import { getPlace, toPlaceMission } from "../mocks/places";

// 오늘의 퀘스트 · 지역 상태 (홈 · 퀘스트 상세 공통)
export default function useTodayQuest() {
  const [params] = useSearchParams();
  const saved = loadAdventure();

  const stageNo = Number(params.get("stage") ?? saved.stageNo ?? 1);
  const restoration = Number(
    params.get("restoration") ?? saved.restoration ?? 0,
  );
  const pieceCount = saved.pieceCount ?? 0;
  const isRainy = params.get("rain") === "1";

  const region = getRegion(stageNo);
  const defaultMission = getTodayMission(stageNo, isRainy);
  const todayQuest = getTodayQuest(defaultMission.missionId);
  const baseMission = getMission(todayQuest.missionId) ?? defaultMission;
  const place =
    todayQuest.source === "SAVED_PLACE" ? getPlace(todayQuest.placeId) : null;
  const mission = place ? toPlaceMission(place, baseMission) : baseMission;
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
    isSavedPlace: Boolean(place),
  };
}
