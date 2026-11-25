import { getIsland, litCount } from "../../constants/islands";

// 섬 불빛 (복원도)
export default function RegionRestoration({ regions }) {
  return (
    <section className="rounded-2xl border border-line bg-ticket p-4">
      <h2 className="font-serif text-[15px] font-bold text-navy">섬 불빛</h2>

      <ul className="mt-3 flex flex-col gap-2.5">
        {regions.map(({ stageNo, restoration }) => {
          const island = getIsland(stageNo);
          const lit = litCount(restoration);
          return (
            <li key={stageNo} className="grid grid-cols-[5rem_1fr_2.6rem] items-center gap-2">
              <span className="text-[13px] font-bold text-navy">{island.name}</span>
              <div className="flex gap-1.5" aria-label={`불빛 ${lit} / 5`}>
                {Array.from({ length: 5 }, (_, i) => (
                  <span
                    key={i}
                    className="h-3.5 flex-1 rounded-full"
                    style={{ backgroundColor: i < lit ? island.color : "#E3E7F2" }}
                  />
                ))}
              </div>
              <span className="text-right text-xs font-semibold text-mute">{restoration}%</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}