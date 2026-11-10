import { loadAdventure, saveAdventure } from "./adventureStorage";

export const HOPE_PIECE_MISSION_ID = 25; // 5계단 GOAL 칸 · 희망 조각

export const getGoalChecks = (goalId) => loadAdventure().goalChecks?.[goalId] ?? [];

// 이 목표로 희망 조각을 이미 받았는지
export const isHopePieceReceived = (goalId) =>
  (loadAdventure().hopePieceGoalIds ?? []).includes(goalId);

// 해당 목표를 처음 4/4 완성했을 때만 희망 조각 지급 → true 반환
// 해제해도 받은 조각은 회수하지 않음
export const toggleGoalStep = (goalId, stepNo, total = 4) => {
  const saved = loadAdventure();
  const goalChecks = saved.goalChecks ?? {};
  const hopePieceGoalIds = saved.hopePieceGoalIds ?? [];
  const current = goalChecks[goalId] ?? [];

  const next = current.includes(stepNo)
    ? current.filter((n) => n !== stepNo)
    : [...current, stepNo].sort((a, b) => a - b);

  const isFirstComplete = next.length === total && !hopePieceGoalIds.includes(goalId);
  const changes = { goalChecks: { ...goalChecks, [goalId]: next } };

  if (isFirstComplete) {
    const { pieceCount = 0, foundPieceIds = [] } = saved;
    changes.hopePieceGoalIds = [...hopePieceGoalIds, goalId];
    changes.pieceCount = pieceCount + 1;
    changes.foundPieceIds = foundPieceIds.includes(HOPE_PIECE_MISSION_ID)
      ? foundPieceIds
      : [...foundPieceIds, HOPE_PIECE_MISSION_ID];
  }

  saveAdventure(changes);
  return isFirstComplete;
};