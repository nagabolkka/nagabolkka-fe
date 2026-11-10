import { NEAR_DISTANCE_M } from "../../constants/placeCategory";

export default function PlaceTags({ place }) {
  const tags = [
    place.isFree ? "무료" : "유료",
    place.soloOk && "혼자 참여 가능",
    place.distanceM <= NEAR_DISTANCE_M && "1km 이내",
  ].filter(Boolean);

  return (
    <ul className="flex flex-wrap gap-1.5">
      {tags.map((tag) => (
        <li
          key={tag}
          className="rounded-full border-[1.5px] border-[#4A4370] px-2.5 py-1 text-xs text-[#F4EAD5]"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}
