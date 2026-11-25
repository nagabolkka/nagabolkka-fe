import Lumi from "../common/Lumi/Lumi";
import { getIsland } from "../../constants/islands";

// 여권 소지인 신원 카드
export default function ProfileCard({ me }) {
  const { nickname, currentRegion, pieceCount, collection } = me;
  const island = currentRegion ? getIsland(currentRegion.stageNo) : null; // 시작 체크 전이면 null
  const mrz = `P<NAGA<<${(nickname || "ADVENTURER").toUpperCase().replace(/[^A-Z0-9]/g, "")}`.padEnd(34, "<").slice(0, 34);

  return (
    <section className="w-full rounded-2xl border border-line bg-ticket p-3.5">
      <div className="flex gap-3.5">
        <div className="flex h-[112px] w-[92px] shrink-0 items-center justify-center rounded-lg bg-[#E3E7F2]">
          <Lumi pose="passenger" bust size={74} decorative />
        </div>
        <dl className="min-w-0 flex-1 grid grid-cols-2 gap-x-2 gap-y-2 content-start">
          <div className="col-span-2">
            <dt className="text-[10px] text-mute">이름 / NAME</dt>
            <dd className="font-serif text-[17px] font-bold text-navy truncate">모험가 {nickname}</dd>
          </div>
          <div>
            <dt className="text-[10px] text-mute">지금 머무는 섬</dt>
            <dd className="text-[15px] font-bold text-navy">{island?.name ?? "출국 전"}</dd>
          </div>
          <div>
            <dt className="text-[10px] text-mute">도장</dt>
            <dd className="text-[15px] font-bold text-navy">
              {pieceCount} · {collection}
            </dd>
          </div>
        </dl>
      </div>
      <p className="mt-3 font-mono text-[11px] tracking-[0.15em] text-[#3B4A80] truncate" aria-hidden>
        {mrz}
      </p>
    </section>
  );
}