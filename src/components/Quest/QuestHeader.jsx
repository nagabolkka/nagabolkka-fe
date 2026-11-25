import BackHeader from "../common/BackHeader/BackHeader";
import { todayFlight } from "../../constants/islands";

// 비행 중 상단 : 뒤로 · 편명 · 기내 지도 (ROOM ✈ 목적지, progress 0~1)
export default function QuestHeader({ region, mission, progress = 0.35, onBack }) {
  const pct = Math.max(0.08, Math.min(0.92, progress)) * 100;

  return (
    <section>
      <BackHeader title="비행 중" label={`IN FLIGHT · ${todayFlight()}`} onBack={onBack} />

      <div className="mx-4 mt-1 rounded-2xl bg-navy px-4 py-3">
        <div className="flex items-start justify-between">
          <div>
            <p className="label-en text-[13px] text-white">ROOM</p>
            <p className="text-[10px] text-mute-on-navy">내 방</p>
          </div>
          <div className="text-right min-w-0 max-w-[55%]">
            <p className="label-en text-[13px] text-brass">{region.code}</p>
            <p className="text-[10px] text-mute-on-navy truncate">{mission.placeName}</p>
          </div>
        </div>
        <div className="relative mt-2 h-4" aria-hidden>
          <div className="absolute inset-x-1 top-1/2 border-t-[3px] border-dashed border-[#3A4878]" />
          <div className="absolute left-1 top-1/2 h-[3px] -translate-y-1/2 bg-brass" style={{ width: `calc(${pct}% - 4px)` }} />
          <span className="absolute left-0 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-brass" />
          <span className="absolute right-0 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full border-2 border-brass" />
          <span className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 text-[15px] text-white" style={{ left: `${pct}%` }}>
            ✈
          </span>
        </div>
        <h1 className="mt-2 font-serif text-[17px] font-bold leading-6 text-white break-keep">
          {mission.title}
        </h1>
      </div>
    </section>
  );
}