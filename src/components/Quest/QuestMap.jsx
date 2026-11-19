import { useEffect, useRef, useState } from "react";
import { WALK_LIMIT_MIN } from "../../utils/format";
import { createPlacePin, loadKakaoMap } from "../../utils/kakaoMap";

// 퀘스트 지도 칸 : 실제 장소를 찾은 바깥 미션이면 카카오맵, 아니면 지역 그림 + 장소 핀
export default function QuestMap({ mission, region, isRainy, color = "#F2C14E" }) {
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
    <section className="relative mx-3 mt-3 h-[145px] rounded-xl border-[3px] border-[#15121F] bg-[#3D3A4E] overflow-hidden">
      {showMap ? (
        <>
          <div ref={containerRef} className="absolute inset-0" />
          {/* 밝은 지도를 앱 톤으로 · 아래 글씨가 잘 보이게 */}
          <div className="pointer-events-none absolute inset-0 z-[5] bg-[#2B2340]/15" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-12 bg-gradient-to-t from-[#15121F]/85 to-transparent" />
        </>
      ) : (
        // 실내 · 장소 모름 · 지도 실패 : 지역 그림 + 장소 핀
        <>
          <img
            src={isRainy ? region.rainyImageUrl : region.imageUrl}
            className="absolute inset-0 w-full h-full object-cover object-center opacity-40"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#15121F]/90 via-[#15121F]/40 to-transparent" />

          {/* 장소 핀 */}
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pb-5">
            <div className="mb-1 max-w-[160px] truncate rounded-full bg-[#15121F]/85 px-2 py-0.5 text-[11px] text-[#F4EAD5] shadow">
              {placeName}
            </div>
            <div
              className="flex h-7 w-7 items-center justify-center border-2 border-white shadow-[0_2px_6px_rgba(0,0,0,0.35)]"
              style={{
                backgroundColor: color,
                borderRadius: "50% 50% 50% 0",
                transform: "rotate(-45deg)",
              }}
            >
              <div className="h-2.5 w-2.5 rounded-full bg-white" />
            </div>
          </div>
        </>
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
      <p className="absolute right-3 bottom-2.5 z-20 text-sm font-medium font-sans text-[#F4EAD5]">
        {guide}
      </p>
    </section>
  );
}