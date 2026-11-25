export const ISLANDS = [
  {
    stageNo: 1,
    key: "rest",
    name: "쉼의 섬",
    code: "REST",
    flight: "NG 001",
    power: "나를 돌보는 힘",
    color: "#F2B94A",
    light: "#FCE7B8",
    dark: "#C98714",
  },
  {
    stageNo: 2,
    key: "brave",
    name: "용기의 섬",
    code: "BRAVE",
    flight: "NG 002",
    power: "문을 여는 힘",
    color: "#F0805D",
    light: "#FBD3C4",
    dark: "#C9502C",
  },
  {
    stageNo: 3,
    key: "find",
    name: "발견의 섬",
    code: "SEEK",
    flight: "NG 003",
    power: "알아차리는 힘",
    color: "#3FAED6",
    light: "#C6E8F5",
    dark: "#1F7FA6",
  },
  {
    stageNo: 4,
    key: "link",
    name: "연결의 섬",
    code: "LINK",
    flight: "NG 004",
    power: "사람과 닿는 힘",
    color: "#E77FB0",
    light: "#F8D3E4",
    dark: "#B9467F",
  },
  {
    stageNo: 5,
    key: "dream",
    name: "꿈의 섬",
    code: "DREAM",
    flight: "NG 005",
    power: "내일로 가는 힘",
    color: "#8C7BE0",
    light: "#DCD5F7",
    dark: "#5D4FB0",
  },
];

export const getIsland = (stageNo) =>
  ISLANDS.find((island) => island.stageNo === stageNo) ?? ISLANDS[0];

// 섬 불빛 5개 : 복원도(0~100) → 켜진 불빛 수
export const litCount = (restoration = 0) =>
  Math.max(0, Math.min(5, Math.floor(restoration / 20)));

// 기분(1~5) → 도장 잉크 색
export const MOOD_INK = {
  1: "#7E8BC4",
  2: "#5FA8C9",
  3: "#5DB884",
  4: "#E3A43A",
  5: "#E0566B",
};

// 난이도 → 탑승권 좌석 (장식)
export const SEAT_BY_DIFFICULTY = {
  EASY: "1A",
  NORMAL: "2B",
  CHALLENGE: "3C",
};

// 오늘 편명 : NG MMDD
export const todayFlight = (date = new Date()) =>
  `NG ${String(date.getMonth() + 1).padStart(2, "0")}${String(
    date.getDate(),
  ).padStart(2, "0")}`;