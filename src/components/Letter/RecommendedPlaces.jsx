import { getCategory } from "../../constants/placeCategory";
import { formatDistance } from "../../utils/format";

export default function RecommendedPlaces({ places, onSelect }) {
  if (places.length === 0) return null;

  return (
    <section>
      <h3 className="text-[13px] font-bold text-navy">다음 주엔 이런 곳은 어때요?</h3>
      <ul className="mt-2 flex flex-col gap-1.5">
        {places.map(({ placeId, name, category, distanceM }) => {
          const { label, color } = getCategory(category);
          return (
            <li key={placeId}>
              <button
                type="button"
                onClick={() => onSelect(placeId)}
                className="flex w-full items-center gap-2.5 rounded-xl border border-line bg-white px-3 py-2.5 text-left cursor-pointer"
              >
                <span aria-hidden className="h-3 w-3 shrink-0 rounded-full border-2 border-navy" style={{ backgroundColor: color }} />
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-bold text-navy truncate">{name}</p>
                  <p className="mt-0.5 text-[11px] text-mute">
                    {formatDistance(distanceM)} · {label}
                  </p>
                </div>
                <span aria-hidden className="text-mute">›</span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}