import PieceDiamond from "./PieceDiamond";

export default function PieceSlot({ slot, color, onClick }) {
  const { found, name, count } = slot;
  const label = found
    ? `${name.replace(" 조각", "")}${count > 1 ? ` x${count}` : ""}`
    : "???";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex aspect-square w-full cursor-pointer flex-col bg-[#221E3A] items-center justify-center gap-2.5 overflow-hidden rounded-md border-2 px-0.5 ${
        found
          ? "border-[#15121F]"
          : "border-dashed border-[#3A3358]"
      }`}
    >
      <PieceDiamond color={color} found={found} />
      <span
        className={`whitespace-nowrap text-[9px] leading-none tracking-tight ${
          found ? "text-[#F4EAD5]" : "text-[#8E88A8]"
        }`}
      >
        {label}
      </span>
    </button>
  );
}