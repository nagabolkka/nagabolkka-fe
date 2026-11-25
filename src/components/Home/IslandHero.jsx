import FloatingIsland from "../common/Island/FloatingIsland";
import { litCount } from "../../constants/islands";

const FAR_SPOTS = [
  [66, 4, 54],
  [70, 120, 70],
  [4, 160, 62],
  [80, 268, 56],
];

export default function IslandHero({ island, regions = [], restoration = 0, isRainy = false, onOpenMap }) {
  const lit = litCount(restoration);
  const others = regions.filter((r) => r.stageNo !== island.stageNo).slice(0, 4);

  return (
    <section className="relative mx-auto mt-1 h-[350px] w-full max-w-[393px]">
      {/* 구름 */}
      <div aria-hidden className="absolute left-4 top-10 h-7 w-24 rounded-full bg-white/90" />
      <div aria-hidden className="absolute right-6 top-48 h-6 w-28 rounded-full bg-white/80" />
      <div aria-hidden className="absolute left-1/2 bottom-4 h-8 w-72 -translate-x-1/2 rounded-full bg-white/70" />

      {/* 먼 섬 */}
      {others.map((r, i) => {
        const [left, top, size] = FAR_SPOTS[i];
        return (
          <div
            key={r.stageNo}
            className="absolute opacity-40"
            style={{ left: `${left}%`, top, transform: "translateX(-10%)" }}
          >
            <FloatingIsland stageNo={r.stageNo} locked={r.status === "LOCKED"} size={size} />
          </div>
        );
      })}

      {/* 지금 섬 */}
      <button
        type="button"
        onClick={onOpenMap}
        aria-label={`${island.name} · 불빛 ${lit} / 5 · 마음 군도 보기`}
        className="absolute left-1/2 top-2 -translate-x-1/2 flex flex-col items-center cursor-pointer"
      >
        <FloatingIsland stageNo={island.stageNo} lit={lit} rainy={isRainy} float size={290} />
        <span className="-mt-3 rounded-full bg-navy px-4 py-2 text-[13px] font-bold text-brass shadow-[0_3px_0_rgba(14,22,56,0.25)]">
          {island.name} · 불빛 {lit} / 5 ›
        </span>
      </button>
    </section>
  );
}