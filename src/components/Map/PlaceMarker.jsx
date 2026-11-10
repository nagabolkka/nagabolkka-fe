import { getCategory } from "../../constants/placeCategory";

export default function PlaceMarker({ category, x, y }) {
  return (
    <div
      className="absolute h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rotate-45 border-2 border-[#15121F]"
      style={{ left: `${x}%`, top: `${y}%`, backgroundColor: getCategory(category).color }}
    />
  );
}