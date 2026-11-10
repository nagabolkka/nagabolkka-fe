export default function LetterStats({ stats }) {
  const items = [
    { label: "이번 주 외출", value: `${stats.outingCount}번` },
    { label: "쪼개기", value: `${stats.splitCount}번` },
    { label: "모은 조각", value: `${stats.pieceCount}개` },
    { label: "도감", value: stats.collection },
  ];

  return (
    <ul className="grid grid-cols-2 gap-[21px]">
      {items.map(({ label, value }) => (
        <li
          key={label}
          className="rounded-md bg-[#EAD9B4]/80 pt-[9px] pl-[9px]"
        >
          <p className="text-xs font-medium font-sans text-[#484848]">
            {label}
          </p>
          <p className="mt-0.5 font-pixel text-base font-normal text-[#2B2340]">
            {value}
          </p>
        </li>
      ))}
    </ul>
  );
}
