import { getCategory } from "../../constants/placeCategory";
import { formatDistance } from "../../utils/format";

export default function PlaceCard({ place }) {
  const { category, name, distanceM, isFree, soloOk } = place;
  const { label, color } = getCategory(category);

  return (
    <div className="flex items-center gap-[15px] rounded-[10px] border-2 border-[#E6D6B0] bg-[#F4EAD5] px-3.5 py-2.5">
      <div
        className="ml-1 h-5 w-5 shrink-0 rotate-45 border-2 border-black"
        style={{ backgroundColor: color }}
      />
      <div className="min-w-0 flex-1">
        <p className="text-xs text-[#2B2340] font-sans">
          {label} · {formatDistance(distanceM)}
        </p>
        <p className="mt-0.5 font-sans leading-5 text-base font-bold text-[#2B2340]">
          {name}
        </p>
        <p className="mt-0.5 text-xs font-medium font-sans text-[#6B5E4A]">
          {isFree ? "무료" : "유료"} · {soloOk ? "혼자 가능" : "함께 신청"}
        </p>
      </div>
      <span className="text-[10px] text-[#484848]">▶</span>
    </div>
  );
}
