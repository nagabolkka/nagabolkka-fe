import PieceSlot from "./PieceSlot";
import IslandStamp from "../common/Island/IslandStamp";
import { getIsland } from "../../constants/islands";
import { chapterState, foundSlotCount } from "../../utils/collection";

// 섬 하나의 도장 면
export default function RegionPieces({ region, onlyMissing = false, onSelect }) {
  const { stageNo, restoration, status, slots } = region;
  const island = getIsland(stageNo);
  const state = chapterState(status); // current · passed · locked
  const visibleSlots = onlyMissing ? slots.filter((slot) => !slot.found) : slots;

  return (
    <section
      className={`rounded-2xl border bg-ticket p-3.5 ${state === "locked" ? "opacity-55" : ""}`}
      style={{ borderColor: state === "current" ? island.color : "#C9D0E6" }}
    >
      <div className="flex items-center gap-2.5">
        <IslandStamp stageNo={stageNo} size={36} dim={state === "locked"} />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h2 className="font-serif text-base font-bold text-navy">{island.name}</h2>
            {state === "current" && (
              <span className="rounded-full bg-navy px-2 py-0.5 text-[10px] font-bold text-brass">
                지금 여기
              </span>
            )}
          </div>
          <p className="text-[11px] text-mute">
            {state === "locked"
              ? "탑승권이 나오면 열려요"
              : `${foundSlotCount(region)} / ${slots.length} · 불빛 ${restoration}%`}
          </p>
        </div>
      </div>

      <ul className="mt-3 grid grid-cols-5 gap-1">
        {visibleSlots.map((slot) => (
          <li key={slot.slotNo}>
            <PieceSlot
              slot={slot}
              color={island.dark}
              highlight={state === "current"}
              onClick={() =>
                onSelect({
                  ...slot,
                  regionName: island.name,
                  stageNo,
                  color: island.dark,
                  chapterState: state,
                })
              }
            />
          </li>
        ))}
      </ul>
    </section>
  );
}