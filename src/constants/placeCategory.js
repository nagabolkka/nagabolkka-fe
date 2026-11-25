export const PLACE_CATEGORY = {
  PARK: { label: "공원", color: "#5DB884" },
  LIBRARY: { label: "도서관", color: "#3FAED6" },
  COMMUNITY: { label: "주민 공간", color: "#F0805D" },
  YOUTH_CENTER: { label: "청년 공간", color: "#E77FB0" },
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
  PLACE_CATEGORY[category] ?? { label: "", color: "#8FA0D0" };