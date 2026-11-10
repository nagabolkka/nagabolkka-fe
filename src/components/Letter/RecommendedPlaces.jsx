import { getCategory } from "../../constants/placeCategory";
import { formatDistance } from "../../utils/format";

export default function RecommendedPlaces({ places, onSelect }) {
  if (places.length === 0) return null;

  return (
    <section>
      <h3 className="text-xs font-semibold font-sans text-black">
        다음 주엔 이런 곳은 어때?
      </h3>
      <ul className="mt-2 flex flex-col gap-2">
        {places.map(({ placeId, name, category, distanceM }) => (
          <li key={placeId}>
            <button
              type="button"
              onClick={() => onSelect(placeId)}
              className="flex w-full cursor-pointer items-center justify-between rounded-md border border-[#2B2340] px-3 py-2 text-left"
            >
              <div className="min-w-0">
                <p className="text-xs font-semibold font-sans text-black">
                  {name}
                </p>
                <p className="mt-0.5 text-[10px] font-normal text-[#B0AAAA]">
                  {formatDistance(distanceM)} · {getCategory(category).label}
                </p>
              </div>
              <span className="text-[10px] text-[#484848]">▶</span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
