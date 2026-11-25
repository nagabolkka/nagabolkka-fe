import { formatDistance, formatMinutes } from "../../utils/format";

// 탑승구 · 거리 · 소요
export default function QuestInfoCards({ mission }) {
  const items = [
    { label: "GATE / 탑승구", value: mission.placeName, isPlace: true },
    {
      label: "DIST / 거리",
      value: mission.isIndoor
        ? "이동 없음"
        : mission.distanceM != null
          ? formatDistance(mission.distanceM)
          : "-",
    },
    {
      label: "TIME / 소요",
      value: mission.estMinutes != null ? formatMinutes(mission.estMinutes) : "-",
    },
  ];

  return (
    <section className="mx-4 mt-3 grid grid-cols-[1.6fr_1fr_1fr] gap-2">
      {items.map(({ label, value, isPlace }) => (
        <div key={label} className="min-w-0 rounded-xl border border-line bg-ticket px-3 py-2">
          <p className="text-[9px] text-mute">{label}</p>
          <p
            className={`mt-0.5 font-bold text-navy ${
              isPlace ? "text-[13px] leading-[17px] break-all line-clamp-2" : "text-sm truncate"
            }`}
          >
            {value}
          </p>
        </div>
      ))}
    </section>
  );
}