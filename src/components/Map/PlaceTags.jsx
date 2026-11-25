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
        <li key={tag} className="rounded-full bg-[#E3EEFF] px-2.5 py-1 text-xs font-bold text-navy">
          {tag}
        </li>
      ))}
    </ul>
  );
}