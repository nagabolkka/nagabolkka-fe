const KEY = "nagabolkka:adventure";
export const MAX_CHANGE = 2; // 바꾸기 하루 2회

const today = () => {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`; // KST 기준 날짜
};

export const loadAdventure = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY)) ?? {};
  } catch {
    return {};
  }
};

export const saveAdventure = (next) => {
  localStorage.setItem(KEY, JSON.stringify({ ...loadAdventure(), ...next }));
};

// 시작 체크 결과 저장 (새로 시작 → 진행 상태 초기화)
export const startAdventure = ({ stageNo, goalId }) => {
  localStorage.setItem(
    KEY,
    JSON.stringify({
      stageNo,
      goalId,
      restoration: 0,
      pieceCount: 0,
      foundPieceIds: [], // 받은 조각 (미션 번호 기준)
      todayQuest: null,
    }),
  );
};

const updateTodayQuest = (defaultMissionId, changes) => {
  saveAdventure({
    todayQuest: { ...getTodayQuest(defaultMissionId), ...changes },
  });
};

// 수락 → 진행 중
export const acceptTodayQuest = (defaultMissionId) =>
  updateTodayQuest(defaultMissionId, { status: "IN_PROGRESS" });

// 쪼개기 (수락 포함) — 체크 초기화
export const splitTodayQuest = (defaultMissionId) =>
  updateTodayQuest(defaultMissionId, {
    status: "IN_PROGRESS",
    isSplit: true,
    doneSteps: [],
  }); // ★

// ★ 쪼갠 단계 체크 / 해제
export const toggleSplitStep = (defaultMissionId, index) => {
  const { doneSteps } = getTodayQuest(defaultMissionId);
  const next = doneSteps.includes(index)
    ? doneSteps.filter((i) => i !== index)
    : [...doneSteps, index];
  updateTodayQuest(defaultMissionId, { doneSteps: next });
};

// 바꾸기 → 새 미션 · 횟수 +1 · 상태 · 쪼개기 · 체크 초기화
export const changeTodayQuest = (defaultMissionId, newMissionId) => {
  const { changeCount } = getTodayQuest(defaultMissionId);
  if (changeCount >= MAX_CHANGE) return false;
  updateTodayQuest(defaultMissionId, {
    missionId: newMissionId,
    source: null,
    placeId: null,
    status: "ASSIGNED",
    isSplit: false,
    doneSteps: [],
    changeCount: changeCount + 1,
  });
  return true;
};

// 건너뛰기 → 복원도 · 조각 그대로
export const skipTodayQuest = (defaultMissionId) =>
  updateTodayQuest(defaultMissionId, { status: "SKIPPED" });


// 다음 지역 열기 → 단계 +1 · 복원도 0
export const openNextRegion = (nextStageNo) => {
  saveAdventure({ stageNo: nextStageNo, restoration: 0 });
};

// 오늘 퀘스트 조회 — 오늘 기록이 없으면 (어제 담아둔 장소 > 기본 미션) 으로 새로 배정
export const getTodayQuest = (defaultMissionId) => {
  const { todayQuest, waitingPlace } = loadAdventure();
  if (todayQuest?.date === today()) return { doneSteps: [], ...todayQuest }; // ★ 예전 저장값에도 doneSteps 보장

  const base = {
    date: today(),
    status: "ASSIGNED",
    changeCount: 0,
    isSplit: false,
    doneSteps: [], // ★ 쪼갠 단계 중 체크한 번호 (0 · 1 · 2)
  };

  // 어제 이전에 담아둔 장소 → 오늘 퀘스트로 배정하고 대기 해제
  if (waitingPlace && waitingPlace.savedDate < today()) {
    const placeQuest = {
      ...base,
      missionId: waitingPlace.slotMissionId,
      placeId: waitingPlace.placeId,
      source: "SAVED_PLACE",
    };
    saveAdventure({ todayQuest: placeQuest, waitingPlace: null });
    return placeQuest;
  }

  return { ...base, missionId: defaultMissionId };
};

// 오늘 퀘스트 배정됨 · 진행 중 → 즉시 교체 (바꾸기 횟수 차감 없음) : "REPLACED_TODAY"
// 오늘 이미 완료 · 건너뜀 → 내일 배정 예약 (대기는 항상 1개) : "RESERVED_TOMORROW"
export const savePlaceQuest = (defaultMissionId, { placeId, slotMissionId }) => {
  const { status } = getTodayQuest(defaultMissionId);

  if (status === "COMPLETED" || status === "SKIPPED") {
    saveAdventure({ waitingPlace: { placeId, slotMissionId, savedDate: today() } });
    return "RESERVED_TOMORROW";
  }

  updateTodayQuest(defaultMissionId, {
    missionId: slotMissionId,
    placeId,
    source: "SAVED_PLACE",
    status: "ASSIGNED",
    isSplit: false,
    doneSteps: [],
  });
  saveAdventure({ waitingPlace: null });
  return "REPLACED_TODAY";
};