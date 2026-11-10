import { loadAdventure } from "../utils/adventureStorage";
import { getRegion } from "./regions";
import { getPlaces } from "./places";
import { getRecords } from "./records";
import { currentMonth, getThisWeekDates } from "../utils/calendar";

const TOTAL_PIECES = 25;
const RECOMMEND_COUNT = 2;

const getClosingLine = (outingCount) => {
  if (outingCount === 0) return "이번 주는 조용히 쉬어갔구나. 그것도 괜찮아.";
  if (outingCount <= 2) return "한 걸음 한 걸음이 다 소중했어.";
  return "작은 걸음이 모여서 길이 되고 있어.";
};

const buildBody = ({ outingCount, regionName, restoration, foundCount }) =>
  [
    `이번 주엔 ${outingCount}번 바깥에 다녀왔어. ${regionName}에 색이 ${restoration}% 돌아왔고, 도감엔 조각이 ${foundCount}개 모였어.`,
    "무리하지 않고 네 속도로 걸어온 게 느껴져.",
    getClosingLine(outingCount),
  ].join("\n\n");

export const getLatestLetter = () => {
  const saved = loadAdventure();
  if (!saved.stageNo) return null; // 아직 모험 시작 전 → 편지 없음

  const {
    stageNo,
    restoration = 0,
    pieceCount = 0,
    foundPieceIds = [],
    todayQuest,
  } = saved;

  const weekDates = getThisWeekDates();
  const outingCount = getRecords(currentMonth()).thisWeek.outingCount;
  const splitCount =
    todayQuest?.isSplit && weekDates.includes(todayQuest.date) ? 1 : 0;
  const foundCount = foundPieceIds.length;

  const recommendedPlaces = getPlaces()
    .filter((place) => place.soloOk)
    .slice(0, RECOMMEND_COUNT)
    .map(({ placeId, name, category, distanceM }) => ({
      placeId,
      name,
      category,
      distanceM,
    }));

  return {
    weekStart: weekDates[0],
    body: buildBody({
      outingCount,
      regionName: getRegion(stageNo).name,
      restoration,
      foundCount,
    }),
    stats: {
      outingCount,
      pieceCount,
      collection: `${foundCount}/${TOTAL_PIECES}`,
      splitCount,
    },
    recommendedPlaces,
  };
};
