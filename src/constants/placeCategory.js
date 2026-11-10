export const PLACE_CATEGORY = {
  LIBRARY: { label: "도서관", color: "#7FCDE6" },
  PROGRAM: { label: "프로그램", color: "#F2A7C3" },
  YOUTH_CENTER: { label: "청년센터", color: "#BFB2F2" },
  VOLUNTEER: { label: "봉사", color: "#9DD49A" },
};

export const CATEGORY_TABS = [
  { value: "ALL", label: "전체" },
  { value: "LIBRARY", label: "도서관" },
  { value: "PROGRAM", label: "프로그램" },
  { value: "YOUTH_CENTER", label: "청년센터" },
  { value: "VOLUNTEER", label: "봉사" },
];

export const PLACE_FILTERS = [
  { key: "free", label: "무료만" },
  { key: "solo", label: "혼자 참여 가능" },
  { key: "near", label: "1km 이내" },
];

export const NEAR_DISTANCE_M = 1000;

export const getCategory = (category) =>
  PLACE_CATEGORY[category] ?? { label: "", color: "#B9B0D0" };
