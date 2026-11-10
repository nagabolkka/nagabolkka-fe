import { loadAdventure, saveAdventure } from "./adventureStorage";
import { todayString } from "./calendar";
import {
  PRACTICE_DAILY_LIMIT,
  PRACTICE_PIECE_MISSION_ID,
} from "../constants/practice";

// 오늘 사용한 연습 횟수 (날짜가 바뀌면 0)
const getUsedToday = () => {
  const { practiceUsage } = loadAdventure();
  return practiceUsage?.date === todayString() ? practiceUsage.count : 0;
};

export const getRemainingToday = () =>
  Math.max(0, PRACTICE_DAILY_LIMIT - getUsedToday());

// 연습 시작 → 1회 차감 (중간에 나가도 돌려주지 않음). 남은 횟수 없으면 false
export const startPracticeSession = () => {
  if (getRemainingToday() <= 0) return false;
  saveAdventure({
    practiceUsage: { date: todayString(), count: getUsedToday() + 1 },
  });
  return true;
};

// 연습 끝 → 연습 조각 지급 (복원도는 그대로) 처음 받는 조각이면 true
export const givePracticePiece = () => {
  const { pieceCount = 0, foundPieceIds = [] } = loadAdventure();
  const isNew = !foundPieceIds.includes(PRACTICE_PIECE_MISSION_ID);

  saveAdventure({
    pieceCount: pieceCount + 1,
    foundPieceIds: isNew
      ? [...foundPieceIds, PRACTICE_PIECE_MISSION_ID]
      : foundPieceIds,
  });
  return isNew;
};
