import { useEffect, useRef, useState } from "react";
import MockMap from "./MockMap";
import { loadKakaoMap } from "../../utils/kakaoMap";
import { getCategory } from "../../constants/placeCategory";

// 내 위치가 없으면 성북구 중심
const DEFAULT_CENTER = { lat: 37.5894, lng: 127.0167 };
const LEVEL = 5; // 숫자가 작을수록 가까이 (5 ≈ 동네 몇 km)

export default function KakaoMap({ places, center, onSelect }) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const overlaysRef = useRef([]);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  const origin = center ?? DEFAULT_CENTER;

  // 1. 지도 만들기 (한 번)
  useEffect(() => {
    let ignore = false;
    loadKakaoMap()
      .then((kakao) => {
        if (ignore || !containerRef.current) return;
        mapRef.current = new kakao.maps.Map(containerRef.current, {
          center: new kakao.maps.LatLng(DEFAULT_CENTER.lat, DEFAULT_CENTER.lng),
          level: LEVEL,
        });
        setReady(true);
      })
      .catch(() => {
        if (!ignore) setFailed(true); // 키 없음 · 도메인 미등록 · 네트워크 → 가짜 지도
      });
    return () => {
      ignore = true;
    };
  }, []);

  // 2. 가운데 = 내 위치 (위치가 나중에 들어와도)
  useEffect(() => {
    if (!ready) return;
    const { kakao } = window;
    mapRef.current.setCenter(new kakao.maps.LatLng(origin.lat, origin.lng));
  }, [ready, origin.lat, origin.lng]);

  // 3. 마커 : 장소(카테고리 색 동그라미 · 누르면 상세) + 내 위치 — 탭 · 필터가 바뀌면 다시 그림
  useEffect(() => {
    if (!ready) return;
    const { kakao } = window;

    overlaysRef.current.forEach((overlay) => overlay.setMap(null));

    const overlays = places.map((place) => {
      const marker = document.createElement("button");
      marker.type = "button";
      marker.className = "h-5 w-5 rounded-full border-[2.5px] border-[#1C2A5E] shadow cursor-pointer";
      marker.style.backgroundColor = getCategory(place.category).color;
      marker.setAttribute("aria-label", place.name);
      marker.onclick = () => onSelect?.(place.placeId);

      return new kakao.maps.CustomOverlay({
        map: mapRef.current,
        position: new kakao.maps.LatLng(place.lat, place.lng),
        content: marker,
        clickable: true,
      });
    });

    const me = document.createElement("div");
    me.className = "h-4 w-4 rounded-full border-[3px] border-white bg-[#3FAED6] shadow-[0_0_0_6px_rgba(63,174,214,0.25)]";
    overlays.push(
      new kakao.maps.CustomOverlay({
        map: mapRef.current,
        position: new kakao.maps.LatLng(origin.lat, origin.lng),
        content: me,
        zIndex: 3,
      }),
    );

    overlaysRef.current = overlays;
  }, [ready, places, onSelect, origin.lat, origin.lng]);

  if (failed) return <MockMap places={places} center={center} />;

  return <div ref={containerRef} className="h-[260px] w-full" />;
}