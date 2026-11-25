import { getCategory } from "../../constants/placeCategory";
import { formatDistance } from "../../utils/format";

export default function PlaceCard({ place, onClick }) {
  const { category, name, distanceM, isFree, soloOk } = place;
  const { label, color } = getCategory(category);

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded-2xl border border-line bg-ticket px-4 py-3 text-left cursor-pointer active:bg-white"
    >
      <span aria-hidden className="h-4 w-4 shrink-0 rounded-full border-[2.5px] border-navy" style={{ backgroundColor: color }} />
      <div className="min-w-0 flex-1">
        <p className="text-xs text-mute">
          {label} · {formatDistance(distanceM)}
        </p>
        <p className="mt-0.5 font-serif text-[17px] font-bold leading-6 text-navy truncate">{name}</p>
        <div className="mt-1 flex gap-1.5">
          <span className="rounded-full bg-[#E6F2DA] px-2 py-0.5 text-[11px] font-bold text-navy">
            {isFree ? "무료" : "유료"}
          </span>
          <span className="rounded-full bg-[#E3EEFF] px-2 py-0.5 text-[11px] font-bold text-navy">
            {soloOk ? "혼자 OK" : "함께 신청"}
          </span>
        </div>
      </div>
      <span aria-hidden className="text-lg text-mute">›</span>
    </button>
  );
}