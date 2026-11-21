// ACTIVE 지금 머무는 곳 · COMPLETED / PASSED 지나온 곳 · LOCKED 아직 안 열림
const CHAPTER_STATE = {
  ACTIVE: "current",
  COMPLETED: "passed",
  PASSED: "passed",
  LOCKED: "locked",
};

// status 가 없으면 지나온 곳처럼
export const chapterState = (status) => CHAPTER_STATE[status] ?? "passed";

export const missingSlots = (region) => region.slots.filter((slot) => !slot.found);

export const foundSlotCount = (region) => region.slots.filter((slot) => slot.found).length;