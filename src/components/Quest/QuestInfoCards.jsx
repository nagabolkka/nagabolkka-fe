import { formatDistance, formatMinutes } from "../../utils/format";

export default function QuestInfoCards({ mission }) {
  const items = [
    { label: "장소", value: mission.placeName, isPlace: true },
    {
      label: "거리",
      value:
        mission.distanceM != null ? formatDistance(mission.distanceM) : "-",
    },
    {
      label: "예상시간",
      value:
        mission.estMinutes != null ? formatMinutes(mission.estMinutes) : "-",
    },
  ];

  return (
    // 장소 칸을 더 넓게 (1.6 : 1 : 1)
    <section className="mx-3 mt-4 grid grid-cols-[1.6fr_1fr_1fr] gap-2">
      {items.map(({ label, value, isPlace }) => (
        <div
          key={label}
          className="min-w-0 flex flex-col justify-center px-3 py-[5px] rounded-[10px] border-2 border-[#15121F] bg-[#2C2745]"
        >
          <p className="text-[#B9B0D0] text-xs font-normal font-sans">
            {label}
          </p>
          <p
            className={`mt-0.5 text-[#F4EAD5] text-sm font-normal font-pixel ${
              isPlace
                ? "text-[13px] leading-[17px] break-keep line-clamp-2"
                : "text-sm truncate"
            }`}
          >
            {value}
          </p>
        </div>
      ))}
    </section>
  );
}
