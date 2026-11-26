import { getIsland } from "../../constants/islands";

const formatDate = (date) => {
  const [, m, d] = date.split("-");
  return `${Number(m)}월 ${Number(d)}일`;
};

// 탑승객 명단 한 줄 : 섬 색 띠 · 편명 칩 · 도착률 막대
export default function UserCard({ user }) {
  const { label, stageNo, assigned, completed, skipped, achievementRate, lastActiveAt } = user;
  const island = stageNo ? getIsland(stageNo) : null;

  return (
    <li className="flex overflow-hidden rounded-2xl bg-ticket">
      <span className="w-1.5 shrink-0" style={{ backgroundColor: island?.color ?? "#B8BFD6" }} aria-hidden />
      <div className="min-w-0 flex-1 px-3.5 py-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2">
            <span className="text-[15px] font-bold text-navy">{label}</span>
            {island ? (
              <span
                className="truncate rounded-full px-2 py-0.5 text-[10px] font-bold"
                style={{ backgroundColor: island.light, color: island.dark }}
              >
                {island.flight} · {island.name}
              </span>
            ) : (
              <span className="rounded-full bg-[#E6E9F2] px-2 py-0.5 text-[10px] font-bold text-mute">
                출국 심사 전
              </span>
            )}
          </div>
          <span className="flex shrink-0 items-baseline gap-0.5">
            <span className={`font-serif text-xl font-bold ${island ? "text-navy" : "text-[#B8BFD6]"}`}>
              {achievementRate}
            </span>
            <span className="text-[11px] text-mute">%</span>
          </span>
        </div>

        <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#E6E9F2]">
          <div className="h-full rounded-full bg-brass" style={{ width: `${achievementRate}%` }} />
        </div>

        <div className="mt-2 flex justify-between gap-2 text-[11px] text-mute">
          <span>
            탑승권 {assigned} · 도장 {completed} · 쉬어 감 {skipped}
          </span>
          <span className="shrink-0">최근 탑승 {lastActiveAt ? formatDate(lastActiveAt) : "-"}</span>
        </div>
      </div>
    </li>
  );
}