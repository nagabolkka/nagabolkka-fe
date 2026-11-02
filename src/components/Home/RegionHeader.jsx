import { getOverlayOpacity } from "../../constants/restoration";
import Badge from "../common/Badge/Badge";

export default function RegionHeader({
  region,
  restoration,
  isRainy,
  pieceCount,
}) {
  const filledCount = restoration / 20; // 20% 마다 1칸

  return (
    <section className="relative w-full h-[302px] border-b-[2px] border-[#15121F]">
      {/* 지역 이미지 */}
      <img
        src={isRainy ? region.rainyImageUrl : region.imageUrl}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* 복원도 오버레이 — 복원도가 오를수록 옅어짐 */}
      <div
        className="absolute inset-0 bg-black transition-opacity duration-700"
        style={{ opacity: getOverlayOpacity(restoration) }}
      />
      <div className="absolute inset-x-0 bottom-0 h-[110px] bg-gradient-to-t from-bg-page to-transparent" />

      {/* 상단 뱃지 */}
      <div className="absolute top-4 inset-x-4 flex items-center justify-between">
        <Badge>{`계단 ${region.stageNo} · ${region.realLabel}`}</Badge>
        <div className="flex gap-1.5">
          <Badge>◆ {pieceCount}</Badge>
          <Badge>{isRainy ? "비" : "맑음"}</Badge>
        </div>
      </div>

      {/* 하단 지역 이름 · 복원도 */}
      <div className="absolute inset-x-4 bottom-3">
        <p className="text-[#F2C14E] text-xs font-normal font-pixel tracking-widest">
          CHAPTER {region.stageNo}
        </p>
        <div className="flex items-end justify-between">
          <h1 className="text-[#F4EAD5] text-2xl font-normal font-pixel text-shadow:_0px_3px_4px_rgb(0_0_0_/_0.25)">
            {region.name}
          </h1>
          <span className="text-[#F4EAD5] text-xs font-normal font-pixel mb-1">
            복원도 {restoration}%
          </span>
        </div>

        {/* 복원도 5칸 바 */}
        <div className="mt-2 flex gap-1.5">
          {Array.from({ length: 5 }, (_, i) => (
            <div
              key={i}
              className="h-[11px] w-full bg-[#1B1830]/70 border-2 border-[#15121F]"
              style={{
                backgroundColor: i < filledCount ? region.color : "#3A3550",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

