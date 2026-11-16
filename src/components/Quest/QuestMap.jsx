import { useEffect, useRef, useState } from "react";
import { WALK_LIMIT_MIN } from "../../utils/format";
import { createPlacePin, loadKakaoMap } from "../../utils/kakaoMap";

// 퀘스트 지도 칸 : 실제 장소를 찾은 바깥 미션이면 카카오맵, 아니면 안내만
export default function QuestMap({ mission, color = "#F2C14E" }) {
  const { isIndoor, placeName, walkMinutes, placeLat, placeLng } = mission;
  const hasPlace = !isIndoor && placeLat != null && placeLng != null;

  const containerRef = useRef(null);
  const [failed, setFailed] = useState(false);

  const guide = isIndoor
    ? "집 안에서 할 수 있어요."
    : walkMinutes != null && walkMinutes <= WALK_LIMIT_MIN
      ? `${placeName}까지 걸어서 약 ${walkMinutes}분`
      : `${placeName}까지 버스·지하철로 다녀와요.`;

  useEffect(() => {
    if (!hasPlace) return;
    let ignore = false;
    loadKakaoMap()
      .then((kakao) => {
        if (ignore || !containerRef.current) return;
        const position = new kakao.maps.LatLng(placeLat, placeLng);
        const map = new kakao.maps.Map(containerRef.current, {
          center: position,
          level: 4,
          draggable: false,
          scrollwheel: false,
          disableDoubleClickZoom: true,
        });
        new kakao.maps.CustomOverlay({
          map,
          position,
          content: createPlacePin(color, placeName),
          yAnchor: 1, // 핀 끝 = 장소
        });
      })
      .catch(() => {
        if (!ignore) setFailed(true); // 지도 실패 → 안내만
      });
    return () => {
      ignore = true;
    };
  }, [hasPlace, placeLat, placeLng, placeName, color]);

  const showMap = hasPlace && !failed;
  const mapUrl = hasPlace
    ? `https://map.kakao.com/link/to/${encodeURIComponent(placeName)},${placeLat},${placeLng}`
    : null;

  return (
    <section className="relative mx-3 mt-3 h-[145px] rounded-xl border-[3px] border-[#15121F] bg-[#3D3A4E] overflow-hidden">
      {showMap ? (
        <>
          <div ref={containerRef} className="absolute inset-0" />
          {/* 밝은 지도를 앱 톤으로 · 아래 글씨가 잘 보이게 */}
          <div className="pointer-events-none absolute inset-0 z-[5] bg-[#2B2340]/15" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-12 bg-gradient-to-t from-[#15121F]/85 to-transparent" />
        </>
      ) : (
        // 실내 · 장소 모름 · 지도 실패 : 예전 모양
        <div className="absolute left-[30%] top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#5B8FD6]/30 flex items-center justify-center">
          <div className="w-4 h-4 rounded-full bg-[#4A92D0] border-[3px] border-white" />
        </div>
      )}

      {mapUrl && (
        <a
          href={mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute right-2.5 top-2.5 z-20 rounded-full border-2 border-[#15121F] bg-[#2B2340] px-3 py-1 text-xs text-[#F2C14E]"
        >
          길찾기
        </a>
      )}

      {/* 안내 문구 */}
      <p
        className={`absolute right-3 bottom-2.5 z-20 text-sm font-medium font-sans ${
          showMap ? "text-[#F4EAD5]" : "text-[#B9B0D0]"
        }`}
      >
        {guide}
      </p>
    </section>
  );
}