import { loadAdventure } from "../utils/adventureStorage";
import { loadUser } from "../utils/userStorage";
import { getRegion } from "./regions";
import { GOALS } from "../constants/goals";

const TOTAL_PIECES = 25;

export const getMe = () => {
  const { stageNo = 1, goalId = null, pieceCount = 0, foundPieceIds = [] } = loadAdventure();
  const { nickname, plusInterest } = loadUser();
  const region = getRegion(stageNo);
  const goal = GOALS.find((g) => g.goalId === goalId) ?? null;

  return {
    nickname,
    currentRegion: { stageNo, realLabel: region.realLabel },
    pieceCount,
    collection: `${foundPieceIds.length}/${TOTAL_PIECES}`,
    goal: goal && { goalId: goal.goalId, name: goal.name },
    districtId: 1,
    shareWithAgency: false,
    plusInterest,
    role: "USER",
  };
};