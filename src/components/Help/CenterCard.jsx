import { formatDistance } from "../../utils/format";

export default function CenterCard({ center }) {
  const { name, tel, openHours, distanceM } = center;

  return (
    <a
      href={`tel:${tel.replaceAll("-", "")}`}
      className="rounded-[10px] border-2 border-[#15121F] bg-[#2C2F45] px-4 py-[11px]"
    >
      <p className="text-xs text-[#C3C6DA] font-normal font-sans">
        가까운 기관
      </p>
      <p className="mt-1 text-base font-bold text-[#F4EAD5] font-sans">
        {name}
      </p>
      <p className="mt-1 text-xs text-[#C3C6DA] font-normal font-sans">
        {openHours} · {formatDistance(distanceM)}
      </p>
    </a>
  );
}
