export default function QuestMap({ mission }) {
  const { isIndoor, placeName, walkMinutes, placeLat, placeLng } = mission;

  const guide = isIndoor
    ? "집 안에서 할 수 있어요."
    : walkMinutes != null && walkMinutes <= WALK_LIMIT_MIN
      ? `${placeName}까지 걸어서 약 ${walkMinutes}분`
      : `${placeName}까지 버스·지하철로 다녀와요.`;

  // 실제 장소를 찾았을 때만 카카오맵 길찾기 (새 탭)
  const mapUrl =
    placeLat != null && placeLng != null
      ? `https://map.kakao.com/link/to/${encodeURIComponent(placeName)},${placeLat},${placeLng}`
      : null;

  return (
    <section className="relative mx-3 mt-3 h-[145px] rounded-xl border-[3px] border-[#15121F] bg-[#3D3A4E] overflow-hidden">
      {/* 위치 점 */}
      <div className="absolute left-[30%] top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#5B8FD6]/30 flex items-center justify-center">
        <div className="w-4 h-4 rounded-full bg-[#4A92D0] border-[3px] border-white" />
      </div>

      {mapUrl && (
        <a
          href={mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute right-3 top-2.5 text-[#F2C14E] text-xs font-medium font-sans underline"
        >
          카카오맵 길찾기
        </a>
      )}

      {/* 안내 문구 */}
      <p className="absolute right-3 bottom-2.5 text-[#B9B0D0] text-sm font-medium font-sans">
        {guide}
      </p>
    </section>
  );
}
