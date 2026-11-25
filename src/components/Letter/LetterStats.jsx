export default function LetterStats({ stats }) {
  const items = [
    { label: "이번 주 출국", value: `${stats.outingCount}번` },
    { label: "작게 나눠 가기", value: `${stats.splitCount}번` },
    { label: "받은 도장", value: `${stats.pieceCount}개` },
    { label: "도장 면", value: stats.collection },
  ];

  return (
    <ul className="grid grid-cols-2 gap-2">
      {items.map(({ label, value }) => (
        <li key={label} className="rounded-xl bg-paper px-3 py-2">
          <p className="text-[11px] text-mute">{label}</p>
          <p className="mt-0.5 text-base font-bold text-navy">{value}</p>
        </li>
      ))}
    </ul>
  );
}