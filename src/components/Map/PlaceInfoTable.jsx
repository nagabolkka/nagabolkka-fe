import { formatTravel } from "../../utils/format";

export default function PlaceInfoTable({ place }) {
  const rows = [
    { label: "이용 시간", value: place.openHours ?? "방문 전 확인해 주세요" },
    { label: "주소", value: place.address },
    { label: "거리", value: formatTravel(place.distanceM, place.walkMinutes) },
    { label: "비용", value: place.isFree ? "무료" : "유료" },
  ];

  return (
    <dl className="rounded-2xl border border-line bg-ticket px-4 py-1">
      {rows.map(({ label, value }, i) => (
        <div
          key={label}
          className={`grid grid-cols-[4.2rem_1fr] items-center py-3 ${
            i < rows.length - 1 ? "border-b border-line" : ""
          }`}
        >
          <dt className="text-[13px] text-mute">{label}</dt>
          <dd className="text-sm font-semibold text-navy break-keep">{value}</dd>
        </div>
      ))}
    </dl>
  );
}