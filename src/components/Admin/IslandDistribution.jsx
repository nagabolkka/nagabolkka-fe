import { ISLANDS } from "../../constants/islands";

const BEFORE = { key: "before", short: "출국 전", color: "#4A5A93" };

export default function IslandDistribution({ users }) {
  const rows = [
    ...ISLANDS.map((island) => ({
      key: island.key,
      short: island.name.replace("의 섬", ""),
      color: island.color,
      count: users.filter((u) => u.stageNo === island.stageNo).length,
    })),
    { ...BEFORE, count: users.filter((u) => !u.stageNo).length },
  ];

  return (
    <section className="rounded-2xl bg-navy px-3.5 py-3.5">
      <div className="flex items-center justify-between">
        <h2 className="text-[13px] font-bold text-white">섬별 탑승객</h2>
        <span className="label-en text-[9px] text-mute-on-navy">ROUTE MAP</span>
      </div>

      <div className="mt-2.5 flex h-2.5 gap-[3px]" aria-hidden>
        {users.length === 0 ? (
          <span className="flex-1 rounded-full bg-navy-2" />
        ) : (
          rows
            .filter((r) => r.count > 0)
            .map((r) => (
              <span key={r.key} className="rounded-full" style={{ flexGrow: r.count, backgroundColor: r.color }} />
            ))
        )}
      </div>

      <ul className="mt-2.5 flex flex-wrap gap-x-3 gap-y-1.5">
        {rows.map((r) => (
          <li key={r.key} className={`flex items-center gap-1.5 text-[11px] ${r.count ? "text-mute-on-navy" : "text-mute-on-navy/50"}`}>
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: r.color }} />
            {r.short} {r.count}
          </li>
        ))}
      </ul>
    </section>
  );
}