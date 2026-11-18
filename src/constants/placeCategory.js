export const PLACE_CATEGORY = {
  PARK: { label: "공원", color: "#9DD49A" },
  LIBRARY: { label: "도서관", color: "#7FCDE6" },
  COMMUNITY: { label: "주민 공간", color: "#F2A7C3" },
  YOUTH_CENTER: { label: "청년 공간", color: "#BFB2F2" },
};

export const CATEGORY_TABS = [
  { value: "ALL", label: "전체" },
  { value: "PARK", label: "공원" },
  { value: "LIBRARY", label: "도서관" },
  { value: "COMMUNITY", label: "주민 공간" },
  { value: "YOUTH_CENTER", label: "청년 공간" },
];

export const PLACE_FILTERS = [
  { key: "free", label: "무료만" },
  { key: "solo", label: "혼자 가기 좋은" },
  { key: "near", label: "1km 이내" },
];

export const NEAR_DISTANCE_M = 1000;

export const getCategory = (category) =>
  PLACE_CATEGORY[category] ?? { label: "", color: "#B9B0D0" };