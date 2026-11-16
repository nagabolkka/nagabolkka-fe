import { formatTravel } from "../../utils/format";

export default function PlaceInfoTable({ place }) {
  const rows = [
    { label: "일시", value: place.openHours ?? "방문 전 확인해 주세요" },
    { label: "주소", value: place.address },
    { label: "거리", value: formatTravel(place.distanceM, place.walkMinutes) },
    { label: "비용", value: place.isFree ? "무료" : "유료" },
  ];

  return (
    <dl className="rounded-lg border-2 border-[#15121F] bg-[#2B2340] px-4 py-1">
      {rows.map(({ label, value }, i) => (
        <div
          key={label}
          className={`grid grid-cols-[4rem_1fr] items-center py-3 ${
            i < rows.length - 1 ? "border-b border-[#3A3358]" : ""
          }`}
        >
          <dt className="text-sm text-[#B9B0D0]">{label}</dt>
          <dd className="text-sm font-semibold text-[#F4EAD5] break-keep">
            {value}
          </dd>
        </div>
      ))}
    </dl>
  );
}