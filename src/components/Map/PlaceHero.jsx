import { useEffect, useRef, useState } from "react";
import { createPlacePin, loadKakaoMap } from "../../utils/kakaoMap";

// 장소 상세 상단 : 그 장소 위치 지도 (실패하면 카테고리 색 핀)
export default function PlaceHero({ place, color, onBack }) {
  const containerRef = useRef(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let ignore = false;
    loadKakaoMap()
      .then((kakao) => {
        if (ignore || !containerRef.current) return;
        const position = new kakao.maps.LatLng(place.lat, place.lng);
        const map = new kakao.maps.Map(containerRef.current, {
          center: position,
          level: 3, // 골목이 보일 만큼 가까이
          draggable: false,
          scrollwheel: false,
          disableDoubleClickZoom: true,
        });
        new kakao.maps.CustomOverlay({
          map,
          position,
          content: createPlacePin(color, place.name),
          yAnchor: 1,
        });
      })
      .catch(() => {
        if (!ignore) setFailed(true); // 키 · 도메인 · 네트워크 문제 → 색 마름모
      });
    return () => {
      ignore = true;
    };
  }, [place.lat, place.lng, place.name, color]);

  const routeUrl = `https://map.kakao.com/link/to/${encodeURIComponent(place.name)},${place.lat},${place.lng}`;

  return (
    <div className="relative h-[190px] w-full overflow-hidden">
      {failed ? (
        <div className="absolute inset-0 bg-[#EAF1F6]">
          <svg
            width="44"
            height="56"
            viewBox="0 0 34 44"
            aria-hidden
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <path d="M17 42 C7 30 3 23 3 16 a14 14 0 0 1 28 0 c0 7 -4 14 -14 26 z" fill={color} stroke="#1C2A5E" strokeWidth="2.5" />
            <circle cx="17" cy="16" r="5.5" fill="#FFFFFF" />
          </svg>
        </div>
      ) : (
        <>
          <div ref={containerRef} className="absolute inset-0" />
          {/* 아래쪽을 페이지 배경으로 자연스럽게 */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-10 bg-gradient-to-t from-paper to-transparent" />
          <a
            href={routeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-3 right-3 z-20 rounded-full bg-navy px-3 py-1 text-xs font-bold text-brass"
          >
            길찾기
          </a>
        </>
      )}

      <button
        type="button"
        onClick={onBack}
        className="absolute left-4 top-5 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-white/90 text-[26px] leading-none text-navy shadow cursor-pointer"
        aria-label="뒤로가기"
      >
        ‹
      </button>
    </div>
  );
}