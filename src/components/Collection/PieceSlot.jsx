import InkStamp from "../common/Stamp/InkStamp";
import { getPieceTypeLabel } from "../../constants/pieceType";

const SHAPES = ["circle", "rect", "star", "circle", "rect"];

// 도장 한 칸 (받음 = 섬 잉크 도장 · 아직 = 점선 빈 자리)
export default function PieceSlot({ slot, color, highlight = false, onClick }) {
  const { found, name, count, type, slotNo } = slot;
  const label = found
    ? `${name.replace(" 조각", "")}${count > 1 ? ` ×${count}` : ""}`
    : getPieceTypeLabel(type);

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={found ? `${name} 도장` : `아직 못 받은 ${label} 도장`}
      className="flex w-full flex-col items-center gap-1 cursor-pointer"
    >
      {found ? (
        <InkStamp
          title={name.replace(" 조각", "")}
          color={color}
          shape={SHAPES[(slotNo - 1) % SHAPES.length]}
          rotate={slotNo % 2 ? -8 : 6}
          size={58}
        />
      ) : (
        <span
          className="flex h-[58px] w-[58px] items-center justify-center rounded-full border-2 border-dashed text-lg font-bold"
          style={{ borderColor: highlight ? color : "#C9C2AE", color: highlight ? color : "#C9C2AE" }}
        >
          ?
        </span>
      )}
      <span className={`max-w-full truncate text-[10px] font-semibold ${found ? "text-navy" : "text-mute"}`}>
        {label}
      </span>
    </button>
  );
}