import { MISSIONS } from "./missions";

// 내 위치 = 성북구 중심 (구청 인근)
export const MY_LOCATION = { lat: 37.5894, lng: 127.0167 };

const RAW_PLACES = [
  {
    placeId: 1,
    category: "LIBRARY",
    name: "아리랑도서관",
    address: "서울 성북구 정릉동",
    openHours: "화~일 09:00-22:00 · 월 휴관",
    description: "조용한 열람실과 무인 대출기가 있어요.",
    isFree: true,
    soloOk: true,
    lat: 37.595,
    lng: 127.015,
    validFrom: null,
    validTo: null,
  },
  {
    placeId: 2,
    category: "PROGRAM",
    name: "토요 북토크 <천천히 읽기>",
    address: "서울 성북구 정릉동 · 아리랑도서관 3층",
    openHours: "매주 토 14:00-15:30",
    description: "뒷자리에서 듣기만 해도 괜찮은 작은 북토크예요.",
    isFree: true,
    soloOk: true,
    lat: 37.5952,
    lng: 127.0153,
    validFrom: "2026-11-01",
    validTo: "2026-12-31",
  },
  {
    placeId: 3,
    category: "VOLUNTEER",
    name: "성북천 화단 가꾸기 봉사",
    address: "서울 성북구 성북천 산책로",
    openHours: "매주 수 10:00-12:00",
    description: "성북천 산책로 화단에 꽃을 심고 물을 줘요.",
    isFree: true,
    soloOk: false,
    lat: 37.587,
    lng: 127.009,
    validFrom: null,
    validTo: null,
  },
  {
    placeId: 4,
    category: "YOUTH_CENTER",
    name: "성북 청년센터 라운지",
    address: "서울 성북구 동선동",
    openHours: "평일 10:00-21:00 · 주말 휴무",
    description: "예약 없이 들러 쉬어갈 수 있는 청년 라운지예요.",
    isFree: true,
    soloOk: true,
    lat: 37.596,
    lng: 127.029,
    validFrom: null,
    validTo: null,
  },
  {
    placeId: 5,
    category: "PROGRAM",
    name: "반려식물 분갈이 원데이 클래스",
    address: "서울 성북구 보문동",
    openHours: "매주 일 15:00-16:30",
    description: "작은 화분 하나를 직접 분갈이해서 가져가요.",
    isFree: false,
    soloOk: true,
    lat: 37.58,
    lng: 127.028,
    validFrom: "2026-11-01",
    validTo: "2026-11-30",
  },
  {
    placeId: 6,
    category: "PROGRAM",
    name: "청년 마음 글쓰기 모임",
    address: "서울 성북구 동선동 · 성북 청년센터",
    openHours: "격주 목 19:00-20:30",
    description: "주제 하나로 짧게 써보고, 원하면 나누는 모임이에요.",
    isFree: true,
    soloOk: true,
    lat: 37.5962,
    lng: 127.0293,
    validFrom: "2026-11-01",
    validTo: "2026-12-31",
  },
  {
    placeId: 7,
    category: "VOLUNTEER",
    name: "보호소 강아지 산책 봉사",
    address: "서울 성북구 종암동",
    openHours: "매주 토 10:00-12:00",
    description: "보호소 강아지와 근처 공원을 함께 걸어요.",
    isFree: true,
    soloOk: true,
    lat: 37.61,
    lng: 127.035,
    validFrom: null,
    validTo: null,
  },
  {
    placeId: 8,
    category: "LIBRARY",
    name: "성북구립도서관",
    address: "서울 성북구 석관동",
    openHours: "화~일 09:00-22:00 · 월 휴관",
    description: "넓은 자료실과 혼자 앉기 좋은 창가 자리가 있어요.",
    isFree: true,
    soloOk: true,
    lat: 37.607,
    lng: 127.056,
    validFrom: null,
    validTo: null,
  },
];

// 두 좌표 사이 거리 (m)
const getDistanceM = (from, to) => {
  const R = 6371000;
  const toRad = (deg) => (deg * Math.PI) / 180;
  const dLat = toRad(to.lat - from.lat);
  const dLng = toRad(to.lng - from.lng);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(from.lat)) *
      Math.cos(toRad(to.lat)) *
      Math.sin(dLng / 2) ** 2;
  return Math.round(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
};

// 거리 · 도보 시간 계산 후 거리순 정렬
export const getPlaces = () =>
  RAW_PLACES.map((place) => {
    const distanceM = getDistanceM(MY_LOCATION, place);
    return {
      ...place,
      distanceM,
      walkMinutes: Math.max(1, Math.round(distanceM / 67)),
    };
  }).sort((a, b) => a.distanceM - b.distanceM);

export const getPlace = (placeId) =>
  getPlaces().find((place) => place.placeId === Number(placeId));

// 담은 장소 퀘스트의 보상 칸 : 1~3계단 담기 칸(SAVED_PLACE) · 4~5계단 도전 칸(CHALLENGE)
export const getSavedPlaceSlotMission = (stageNo) => {
  const type = stageNo <= 3 ? "SAVED_PLACE" : "CHALLENGE";
  return MISSIONS.find((m) => m.stageNo === stageNo && m.type === type);
};

// 장소 → 오늘 퀘스트용 미션 (보상 · 난이도는 칸 미션 그대로)
export const toPlaceMission = (place, slotMission) => ({
  ...slotMission,
  title: `${place.name} 다녀오기`,
  placeName: place.name,
  distanceM: place.distanceM,
  estMinutes: 60,
  isIndoor: false,
  description: place.description,
  steps: [
    "가는 길 한 번 확인하기",
    `${place.name} 입구까지 가기`,
    "안에 들어가 잠깐 머물기",
  ],
});
