import { MISSIONS } from "./missions";
import { REGIONS } from "./regions";

// 찾은 조각 : "stageNo-slotNo" → 모은 개수
const ACQUIRED = {
  "1-0": 1,
  "1-1": 2,
  "2-0": 2,
  "2-1": 2,
};

// 지역 별 복원도 (%)
const RESTORATION = { 1: 60, 2: 80, 3: 0, 4: 0, 5: 0 };

export const getCollection = () => {
  const regions = REGIONS.map(
    ({ stageNo, name, pieceFamily, color, imageUrl }) => {
      const slots = MISSIONS.filter((m) => m.stageNo === stageNo)
        .sort((a, b) => a.slotNo - b.slotNo)
        .map((m) => {
          const count = ACQUIRED[`${stageNo}-${m.slotNo}`] ?? 0;
          const found = count > 0;

          return {
            slotNo: m.slotNo + 1,
            pieceId: m.missionId,
            name: found ? m.reward.name : null,
            type: m.type,
            found,
            count,
            ...(found
              ? { restoreText: m.reward.restoreText }
              : { hint: m.title }),
          };
        });

      return {
        stageNo,
        name,
        pieceFamily,
        color,
        imageUrl,
        restoration: RESTORATION[stageNo] ?? 0,
        slots,
      };
    },
  );

  const allSlots = regions.flatMap((region) => region.slots);

  return {
    foundCount: allSlots.filter((slot) => slot.found).length,
    total: allSlots.length,
    regions,
    bonusPieces: [],
  };
};
