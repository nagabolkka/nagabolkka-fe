import PieceDiamond from "./PieceDiamond";
import { getPieceTypeLabel } from "../../constants/pieceType";

export default function PieceSlot({ slot, color, highlight = false, onClick }) {
  const { found, name, count, type } = slot;
  const label = found
    ? `${name.replace(" 조각", "")}${count > 1 ? ` x${count}` : ""}`
    : getPieceTypeLabel(type);

  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex aspect-square w-full cursor-pointer flex-col bg-[#221E3A] items-center justify-center gap-2.5 overflow-hidden rounded-md border-2 px-0.5 ${
        found
          ? "border-[#15121F]"
          : `border-dashed ${highlight ? "" : "border-[#3A3358]"}`
      }`}
      style={!found && highlight ? { borderColor: color } : undefined}
    >
      <PieceDiamond color={color} found={found} />
      <span
        className={`whitespace-nowrap text-[9px] leading-none tracking-tight ${
          found || highlight ? "text-[#F4EAD5]" : "text-[#8E88A8]"
        }`}
      >
        {label}
      </span>
    </button>
  );
}
