import { getCategory } from "../../constants/placeCategory";

export default function PlaceMarker({ category, x, y }) {
  return (
    <div
      className="absolute h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-[2.5px] border-navy shadow"
      style={{ left: `${x}%`, top: `${y}%`, backgroundColor: getCategory(category).color }}
    />
  );
}