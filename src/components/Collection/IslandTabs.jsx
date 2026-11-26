import IslandStamp from "../common/Island/IslandStamp";
import { getIsland } from "../../constants/islands";
import { chapterState } from "../../utils/collection";

// 도감 위쪽 섬 우표 탭 5개 (한 섬씩 보기)
export default function IslandTabs({ regions, selected, onSelect }) {
  return (
    <div role="tablist" aria-label="섬 고르기" className="grid grid-cols-5 gap-1.5">
      {regions.map((region) => {
        const island = getIsland(region.stageNo);
        const state = chapterState(region.status);
        const on = region.stageNo === selected;
        return (
          <button
            key={region.stageNo}
            type="button"
            role="tab"
            aria-selected={on}
            onClick={() => onSelect(region.stageNo)}
            className={`relative flex flex-col items-center gap-0.5 rounded-xl border-2 pt-1.5 pb-1 cursor-pointer transition md:gap-1.5 md:py-3 ${
              on ? "border-navy bg-ticket" : "border-line/70 bg-white/50"
            }`}
          >
            <IslandStamp
              stageNo={region.stageNo}
              size={36}
              dim={state === "locked"}
              className="h-auto w-9 sm:w-11 md:w-16"
            />
            <span className={`text-[11px] font-bold md:text-sm ${on ? "text-navy" : "text-mute"}`}>
              {island.name.replace("의 섬", "")}
            </span>
            {state === "current" && (
              <span aria-label="지금 여기" className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full border-2 border-white bg-brass" />
            )}
          </button>
        );
      })}
    </div>
  );
}