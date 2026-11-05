const KEY = "nagabolkka:adventure";
export const MAX_CHANGE = 2; // 바꾸기 하루 2회
export const REST_PIECE_MISSION_ID = 5; // 쉼의 조각 (1단계 회고 보너스)

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
      lastResult: null, // 조각 획득 화면용
    }),
  );
};

// 오늘 퀘스트 조회 — 오늘 기록이 없으면 기본 미션으로 새로 배정
export const getTodayQuest = (defaultMissionId) => {
  const { todayQuest } = loadAdventure();
  if (todayQuest?.date === today()) return { doneSteps: [], ...todayQuest }; // ★ 예전 저장값에도 doneSteps 보장
  return {
    date: today(),
    missionId: defaultMissionId,
    status: "ASSIGNED",
    changeCount: 0,
    isSplit: false,
    doneSteps: [], // ★ 쪼갠 단계 중 체크한 번호 (0 · 1 · 2)
  };
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

// 완료 → 복원도 +20 (최대 100) · 조각 지급 · 기록 저장
export const completeTodayQuest = (defaultMissionId, { mood, reflection }) => {
  const saved = loadAdventure();
  const { restoration = 0, pieceCount = 0, foundPieceIds = [] } = saved;
  const { missionId, doneSteps } = getTodayQuest(defaultMissionId);

  // 받을 조각 : 오늘 미션 + (1단계 · 첫 회고면) 쉼의 조각
  const pieceIds = [missionId];
  if (reflection.trim() && canGetRestPiece())
    pieceIds.push(REST_PIECE_MISSION_ID);

  const newPieceIds = pieceIds.filter((id) => !foundPieceIds.includes(id));
  const after = Math.min(restoration + 20, 100);

  saveAdventure({
    restoration: after,
    pieceCount: pieceCount + pieceIds.length,
    foundPieceIds: [...foundPieceIds, ...newPieceIds],
    lastResult: {
      pieceIds,
      newPieceIds,
      before: restoration,
      after,
      mood,
      reflection,
    },
  });
  updateTodayQuest(defaultMissionId, {
    status: "COMPLETED",
    mood,
    reflection,
    doneStepCount: doneSteps.length,
  });
};

// 다음 지역 열기 → 단계 +1 · 복원도 0
export const openNextRegion = (nextStageNo) => {
  saveAdventure({ stageNo: nextStageNo, restoration: 0 });
};

// 쉼의 조각 안내 · 지급 조건 : 1단계 · 아직 안 받음
export const canGetRestPiece = () => {
  const { stageNo, foundPieceIds = [] } = loadAdventure();
  return stageNo === 1 && !foundPieceIds.includes(REST_PIECE_MISSION_ID);
};
