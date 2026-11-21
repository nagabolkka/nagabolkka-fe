import PieceSlot from "./PieceSlot";
import { chapterState, foundSlotCount } from "../../utils/collection";

export default function RegionPieces({ region, onlyMissing = false, onSelect }) {
  const { stageNo, name, pieceFamily, color, restoration, status, slots } = region;
  const state = chapterState(status); // current · passed · locked
  const visibleSlots = onlyMissing ? slots.filter((slot) => !slot.found) : slots;

  return (
    <section
      className={`rounded-[10px] border-2 bg-[#2C2745] p-3 shadow-[0px_4px_0px_0px_rgba(21,18,31,0.25)] ${
        state === "locked" ? "opacity-55" : ""
      }`}
      style={{ borderColor: state === "current" ? color : "#15121F" }}
    >
      <div className="flex items-center gap-2">
        <span className="font-pixel text-[10px] text-[#B9B0D0]">
          CHAPTER {stageNo}
        </span>
        {state === "current" && (
          <span
            className="rounded px-1.5 font-pixel text-[10px] text-[#15121F]"
            style={{ backgroundColor: color }}
          >
            지금 여기
          </span>
        )}
      </div>

      <div className="mt-1 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className="h-2.5 w-2.5 rotate-45"
            style={{ backgroundColor: color }}
          />
          <h2 className="font-pixel font-normal text-sm text-[#F4EAD5]">
            {name}
          </h2>
          <span className="text-xs font-medium font-sans text-[#B9B0D0]">
            {pieceFamily}
          </span>
        </div>
        <span className="font-pixel text-xs font-normal text-[#B9B0D0]">
          {state === "locked"
            ? "도착하면 열려요"
            : `${foundSlotCount(region)}/${slots.length} · 복원 ${restoration}%`}
        </span>
      </div>

      <ul className="mt-3 grid grid-cols-5 gap-[13px]">
        {visibleSlots.map((slot) => (
          <li key={slot.slotNo}>
            <PieceSlot
              slot={slot}
              color={color}
              highlight={state === "current"}
              onClick={() =>
                onSelect({ ...slot, regionName: name, stageNo, color, chapterState: state })
              }
            />
          </li>
        ))}
      </ul>
    </section>
  );
}