import { useEffect, useRef, useState } from "react";
import { WALK_LIMIT_MIN } from "../../utils/format";
import { createPlacePin, loadKakaoMap } from "../../utils/kakaoMap";
import FloatingIsland from "../common/Island/FloatingIsland";

// 퀘스트 지도 칸 : 실제 장소를 찾은 바깥 미션이면 카카오맵, 아니면 섬 그림 + 장소 이름
export default function QuestMap({ mission, region, isRainy, color = "#D2B36B" }) {
  const { isIndoor, placeName, walkMinutes, placeLat, placeLng } = mission;
  const hasPlace = !isIndoor && placeLat != null && placeLng != null;

  const containerRef = useRef(null);
  const [failed, setFailed] = useState(false);

  const guide = isIndoor
    ? "이동 없이 할 수 있어요."
    : !hasPlace
      ? "가까운 곳이면 어디든 괜찮아요."
      : walkMinutes != null && walkMinutes <= WALK_LIMIT_MIN
        ? `${placeName}까지 걸어서 약 ${walkMinutes}분`
        : `${placeName}까지 버스 · 지하철로 다녀와요.`;

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
        if (!ignore) setFailed(true); // 지도 실패 → 지역 그림 + 장소 핀
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
    <section className="relative mt-3 h-[140px] rounded-xl border border-line bg-[#E6F2F9] overflow-hidden">
      {showMap ? (
        <>
          <div ref={containerRef} className="absolute inset-0" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-12 bg-gradient-to-t from-navy/80 to-transparent" />
        </>
      ) : (
        // 실내 · 장소 모름 · 지도 실패 : 섬 그림 + 장소 이름
        <>
          <div className="absolute inset-0 flex items-center justify-center pb-6">
            <FloatingIsland stageNo={region.stageNo} rainy={isRainy} size={118} />
          </div>
          <div className="absolute left-1/2 top-2.5 z-10 -translate-x-1/2 max-w-[180px] truncate rounded-full bg-navy px-3 py-1 text-[11px] font-bold text-brass">
            {placeName}
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-12 bg-gradient-to-t from-navy/80 to-transparent" />
        </>
      )}

      {mapUrl && (
        <a
          href={mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute right-2.5 top-2.5 z-20 rounded-full bg-navy px-3 py-1 text-xs font-bold text-brass"
        >
          길찾기
        </a>
      )}

      {/* 안내 문구 */}
      <p className="absolute left-3 right-3 bottom-2.5 z-20 text-right text-[13px] font-semibold text-white truncate">
        {guide}
      </p>
    </section>
  );
}