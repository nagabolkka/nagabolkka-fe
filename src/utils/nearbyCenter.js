import { loadKakaoMap } from "./kakaoMap";

const KEYWORD = "정신건강복지센터";
const RADIUS_M = 20000; // 카카오 키워드 검색 최대 반경
const TIMEOUT_MS = 4000; // 위기 화면이라 오래 기다리지 않음

// 내 위치에서 가장 가까운 정신건강복지센터 (이름에 키워드 · 전화번호 있는 곳) · 없으면 null
// 좌표는 카카오 검색에만 쓰고 저장하지 않음
export const findNearbyCenter = async (location) => {
  if (!location) return null;
  const kakao = await loadKakaoMap();
  const { Places, Status, SortBy } = kakao.maps.services;

  const search = new Promise((resolve) => {
    new Places().keywordSearch(
      KEYWORD,
      (data, status) => {
        if (status !== Status.OK) {
          resolve(null);
          return;
        }
        const found = data.find((place) => place.place_name.includes(KEYWORD) && place.phone);
        resolve(
          found
            ? {
                name: found.place_name,
                address: found.road_address_name || found.address_name,
                tel: found.phone,
                distanceM: Number(found.distance),
              }
            : null,
        );
      },
      {
        location: new kakao.maps.LatLng(location.lat, location.lng),
        radius: RADIUS_M,
        sort: SortBy.DISTANCE,
      },
    );
  });
  const timeout = new Promise((resolve) => setTimeout(() => resolve(null), TIMEOUT_MS));
  return Promise.race([search, timeout]);
};