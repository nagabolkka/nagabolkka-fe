import IslandStamp from "../common/Island/IslandStamp";
import { getIsland } from "../../constants/islands";
import { getPieceTypeLabel } from "../../constants/pieceType";
import { missingSlots } from "../../utils/collection";

// 지금 섬 : 아직 못 받은 도장 안내
export default function CurrentChapterCard({ region }) {
  const island = getIsland(region.stageNo);
  const missing = missingSlots(region);

  return (
    <section className="flex gap-3 rounded-2xl bg-navy px-4 py-3.5">
      <IslandStamp stageNo={region.stageNo} size={56} className="shrink-0 -rotate-6" />
      <div className="min-w-0">
        <p className="label-en text-[10px] text-brass">NOW · {island.name}</p>
        {missing.length === 0 ? (
          <>
            <p className="mt-1 text-sm font-bold text-white">이 섬 도장을 다 모았어요!</p>
            <p className="mt-0.5 text-[11px] text-mute-on-navy break-keep">
              다음 섬 탑승권이 나오면 새 도장을 모을 수 있어요.
            </p>
          </>
        ) : (
          <>
            <p className="mt-1 text-sm font-bold text-white">
              못 받은 도장 {missing.length}개 · 하나씩 채워 볼까요?
            </p>
            <ul className="mt-1.5 flex flex-wrap gap-1">
              {missing.map((slot) => (
                <li
                  key={slot.slotNo}
                  className="rounded-full border border-dashed border-brass/70 px-2 py-0.5 text-[11px] font-semibold text-paper"
                >
                  {getPieceTypeLabel(slot.type)}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </section>
  );
}