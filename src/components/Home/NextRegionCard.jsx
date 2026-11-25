import IslandStamp from "../common/Island/IslandStamp";
import { getIsland } from "../../constants/islands";
import { iGa, euro } from "../../utils/josa";

// 다음 섬 열림 = 새 탑승권 발급
export default function NextRegionCard({ region, nextRegion, onStay, onOpen }) {
  const here = getIsland(region.stageNo);
  const next = getIsland(nextRegion.stageNo);

  return (
    <section className="mx-4 mt-4 overflow-hidden rounded-2xl bg-ticket shadow-[0_8px_18px_rgba(122,134,173,0.25)]">
      <div className="h-10 px-4 flex items-center justify-between" style={{ backgroundColor: next.color }}>
        <span className="label-en text-[11px] text-navy">NEW ROUTE OPENED</span>
        <span className="label-en text-[11px] text-navy">{next.flight}</span>
      </div>

      <div className="px-4 pt-3 pb-4">
        <div className="flex items-center gap-3">
          <IslandStamp stageNo={next.stageNo} size={56} />
          <div className="min-w-0">
            <p className="label-en text-[10px] text-mute">
              {here.code} → {next.code}
            </p>
            <h2 className="mt-0.5 font-serif text-[17px] font-bold leading-6 text-navy break-keep">
              {here.name}
              {iGa(here.name)} 환해졌어요. {next.name}
              {euro(next.name)} 가는 탑승권이 나왔어요!
            </h2>
          </div>
        </div>

        <p className="mt-2 text-xs text-mute break-keep">
          지금 섬에 더 머물러도 모은 도장은 그대로예요.
        </p>

        <div className="mt-3 grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={onStay}
            className="h-12 rounded-xl border-[1.5px] border-line bg-white text-sm font-bold text-navy cursor-pointer"
          >
            조금 더 머물래요
          </button>
          <button
            type="button"
            onClick={onOpen}
            className="h-12 rounded-xl bg-navy text-sm font-bold text-brass cursor-pointer"
          >
            ✈ 탑승할게요
          </button>
        </div>
      </div>
    </section>
  );
}