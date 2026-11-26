import InkStamp from "../common/Stamp/InkStamp";
import IslandStamp from "../common/Island/IslandStamp";
import { getIsland, MOOD_INK } from "../../constants/islands";
import { MOODS } from "../../constants/moods";
import { getPieceTypeLabel } from "../../constants/pieceType";
import { chapterState, foundSlotCount } from "../../utils/collection";

// 여권 한 페이지에 도장 5칸을 흩어서 찍는 자리 (칸 번호 순)
// 폰 : 세로로 긴 종이 (320 × 346) · 넓은 화면 : 가로로 긴 종이 (900 × 330) 에 옆으로 펼침
// 위치 · 크기를 모두 % 로 → 화면 폭에 맞춰 같은 모양으로 늘고 줄어듦
const PAGES = {
  narrow: {
    w: 320,
    h: 346,
    spots: [
      { shape: "circle", size: 108, x: 10, y: 6, rotate: -8 },
      { shape: "rect", size: 104, x: 192, y: 18, rotate: 8 },
      { shape: "star", size: 118, x: 96, y: 110, rotate: -4 },
      { shape: "triangle", size: 106, x: 198, y: 126, rotate: 0 },
      { shape: "oval", size: 112, x: 16, y: 228, rotate: -6 },
    ],
  },
  wide: {
    w: 900,
    h: 330,
    spots: [
      { shape: "circle", size: 160, x: 20, y: 40, rotate: -8 },
      { shape: "rect", size: 150, x: 200, y: 150, rotate: 8 },
      { shape: "star", size: 175, x: 370, y: 20, rotate: -4 },
      { shape: "triangle", size: 160, x: 560, y: 150, rotate: 0 },
      { shape: "oval", size: 170, x: 715, y: 40, rotate: -6 },
    ],
  },
};
const pct = (value, base) => `${(value / base) * 100}%`;
const EMPTY_INK = "#B5AE98";

const moodLabel = (mood) => MOODS.find((m) => m.value === mood)?.label ?? "";
// "2026-11-20" → "11.20"
const shortDate = (date) => (date ? date.slice(5).replace("-", ".") : "");

// 섬 하나의 도장 면 : 잉크 색 = 처음 받은 날의 기분
export default function StampPage({ region, onSelect }) {
  const island = getIsland(region.stageNo);
  const state = chapterState(region.status);
  const locked = state === "locked";
  const stampProps = { region, island, state, locked, onSelect };

  return (
    <section className="relative rounded-2xl border border-line bg-ticket px-4 pt-3.5 pb-4 md:px-8 md:pt-6 md:pb-8">
      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 pr-20 sm:pr-24 md:pr-32">
        <h2 className="font-serif text-[17px] font-bold text-navy md:text-[22px]">
          {island.name} · {foundSlotCount(region)} / {region.slots.length}
        </h2>
        <span className="text-[11px] text-mute md:text-[13px]">{locked ? "탑승권이 나오면 열려요" : "잉크 색 = 그날 기분"}</span>
      </div>
      <IslandStamp
        stageNo={region.stageNo}
        size={72}
        dim={locked}
        className="absolute -top-5 right-3 h-auto w-[72px] rotate-6 drop-shadow-md sm:w-20 md:-top-7 md:right-5 md:w-28"
      />

      {/* 폰 · 좁은 화면 */}
      <Stamps page={PAGES.narrow} className="md:hidden" {...stampProps} />
      {/* 태블릿 · 노트북 */}
      <Stamps page={PAGES.wide} className="hidden md:block" {...stampProps} />
    </section>
  );
}

// 도장 5칸 (page = 종이 크기 · 자리)
function Stamps({ page, className, region, island, state, locked, onSelect }) {
  return (
    <ul
      className={`relative mt-2 w-full ${locked ? "opacity-60" : ""} ${className}`}
      style={{ aspectRatio: `${page.w} / ${page.h}` }}
    >
      {region.slots.map((slot, i) => {
        const spot = page.spots[i % page.spots.length];
        const color = slot.found ? (MOOD_INK[slot.mood] ?? island.dark) : EMPTY_INK;
        const sub = slot.found
          ? [shortDate(slot.acquiredAt), moodLabel(slot.mood)].filter(Boolean).join(" ")
          : getPieceTypeLabel(slot.type);
        return (
          <li
            key={slot.slotNo}
            className="absolute"
            style={{ left: pct(spot.x, page.w), top: pct(spot.y, page.h), width: pct(spot.size, page.w) }}
          >
            <button
              type="button"
              onClick={() =>
                onSelect({ ...slot, regionName: island.name, stageNo: region.stageNo, color, chapterState: state })
              }
              aria-label={slot.found ? `${slot.name} 도장` : `아직 못 받은 ${getPieceTypeLabel(slot.type)} 도장`}
              className="block w-full cursor-pointer"
            >
              <InkStamp
                title={slot.found ? slot.name.replace(" 조각", "") : "?"}
                sub={sub}
                color={color}
                shape={spot.shape}
                rotate={slot.found ? spot.rotate : 0}
                size="100%"
                className="block h-auto w-full"
              />
              {slot.found && slot.count > 1 && (
                <span className="absolute right-0 top-1 rounded-full bg-navy px-1.5 text-[10px] font-bold text-brass md:text-xs">
                  ×{slot.count}
                </span>
              )}
            </button>
          </li>
        );
      })}
    </ul>
  );
}