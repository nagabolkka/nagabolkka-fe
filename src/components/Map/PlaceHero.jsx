import { useEffect, useRef, useState } from "react";
import backButton from "../../assets/images/backButton.svg";
import { loadKakaoMap } from "../../utils/kakaoMap";

// 장소 상세 상단 : 그 장소 위치 지도 (실패하면 카테고리 색 마름모)
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

        // 핀(카테고리 색 물방울) + 이름표 — 핀 끝이 장소 위치
        const marker = document.createElement("div");
        marker.className = "flex flex-col items-center";

        const label = document.createElement("div");
        label.className =
          "mb-1 max-w-[160px] truncate rounded-full bg-[#15121F]/85 px-2 py-0.5 text-[11px] text-[#F4EAD5] shadow";
        label.textContent = place.name;

        const pin = document.createElement("div");
        pin.className =
          "flex h-7 w-7 items-center justify-center border-2 border-white shadow-[0_2px_6px_rgba(0,0,0,0.35)]";
        pin.style.backgroundColor = color;
        pin.style.borderRadius = "50% 50% 50% 0";
        pin.style.transform = "rotate(-45deg)";

        const dot = document.createElement("div");
        dot.className = "h-2.5 w-2.5 rounded-full bg-white";
        pin.appendChild(dot);

        marker.append(label, pin);
        new kakao.maps.CustomOverlay({ map, position, content: marker, yAnchor: 1 }); // 아래 끝 = 장소
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
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(180deg, ${color}80 0%, ${color}26 100%)` }}
        >
          <div
            className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rotate-45 border-[3px] border-[#15121F]"
            style={{ backgroundColor: color, boxShadow: `0 0 28px ${color}99` }}
          />
        </div>
      ) : (
        <>
          <div ref={containerRef} className="absolute inset-0" />
          {/* 밝은 지도를 앱 톤으로 살짝 */}
          <div className="pointer-events-none absolute inset-0 z-[5] bg-[#2B2340]/15" />
          {/* 아래쪽을 페이지 배경으로 자연스럽게 */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-10 bg-gradient-to-t from-bg-page to-transparent" />
          <a
            href={routeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-3 right-3 z-20 rounded-full border-2 border-[#15121F] bg-[#2B2340] px-3 py-1 text-xs text-[#F2C14E]"
          >
            길찾기
          </a>
        </>
      )}

      <button
        type="button"
        onClick={onBack}
        className="absolute left-4 top-6 z-20 cursor-pointer rounded-full bg-[#15121F]/60 p-1"
        aria-label="뒤로가기"
      >
        <img src={backButton} className="h-[25px] w-[25px]" />
      </button>
    </div>
  );
}