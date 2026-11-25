import FloatingIsland from "../common/Island/FloatingIsland";
import InkStamp from "../common/Stamp/InkStamp";
import { ISLANDS, MOOD_INK } from "../../constants/islands";

// 1. 마음 군도 : 섬 5개
function IslandsArt() {
  return (
    <div className="flex h-full items-end justify-between">
      {ISLANDS.map((island, i) => (
        <div key={island.stageNo} className="flex flex-col items-center">
          <FloatingIsland stageNo={island.stageNo} locked={i > 0} size={58} />
          <span className="mt-0.5 text-[10px] font-bold text-navy">{island.name.replace("의 섬", "")}</span>
        </div>
      ))}
    </div>
  );
}

// 2. 오늘의 탑승권
function TicketArt() {
  return (
    <div className="h-full overflow-hidden rounded-xl bg-white border border-line">
      <div className="h-7 px-3 flex items-center justify-between" style={{ backgroundColor: ISLANDS[0].color }}>
        <span className="label-en text-[10px] text-navy">TODAY'S FLIGHT</span>
        <span className="label-en text-[10px] text-navy">NG 001</span>
      </div>
      <div className="px-3 pt-2">
        <p className="text-[11px] font-bold text-navy">내 방 ✈ 창가</p>
        <p className="mt-1 font-serif text-[15px] font-bold text-navy">창문 열고 바깥 공기 3분 마시기</p>
        <div className="mt-2 flex gap-1.5 text-[10px] font-bold">
          <span className="rounded-full bg-navy px-2 py-0.5 text-brass">탑승</span>
          <span className="rounded-full border border-navy px-2 py-0.5 text-navy">작게 나눠 가기</span>
          <span className="rounded-full border border-line px-2 py-0.5 text-mute">다른 편 2/2</span>
        </div>
      </div>
    </div>
  );
}

// 3. 도장과 불빛
function StampArt() {
  return (
    <div className="flex h-full items-center gap-3">
      <InkStamp title="햇살" sub="괜찮았어요" color={MOOD_INK[4]} size={96} />
      <div>
        <p className="text-xs font-bold text-navy">쉼의 섬 불빛 2 / 5</p>
        <div className="mt-2 flex gap-2">
          {Array.from({ length: 5 }, (_, i) => (
            <span key={i} className={`h-4 w-4 rounded-full border border-navy ${i < 2 ? "bg-lamp" : "bg-[#E3E7F2]"}`} />
          ))}
        </div>
        <div className="mt-2 flex gap-1">
          {[1, 2, 3, 4, 5].map((m) => (
            <span key={m} className="h-3 w-3 rounded-full" style={{ backgroundColor: MOOD_INK[m] }} />
          ))}
        </div>
        <p className="mt-1 text-[10px] text-mute">잉크 = 그날 기분</p>
      </div>
    </div>
  );
}

// 4. 나 탭 메뉴
function MenuArt() {
  const rows = ["입국 심사 연습실", "나의 꿈 준비", "루미의 엽서함"];
  return (
    <ul className="h-full overflow-hidden rounded-xl border border-line bg-white">
      {rows.map((row, i) => (
        <li key={row} className={`flex items-center justify-between px-3 py-2.5 text-[13px] font-bold text-navy ${i ? "border-t border-line" : ""}`}>
          {row}
          <span className="text-mute">›</span>
        </li>
      ))}
    </ul>
  );
}

// 5. 힘들 때는
function HelpArt() {
  return (
    <div className="h-full">
      <div className="flex items-center justify-between rounded-xl bg-navy px-3 py-2">
        <div>
          <p className="text-[10px] text-mute-on-navy">자살예방 상담전화 · 24시간</p>
          <p className="font-serif text-2xl font-bold text-white">109</p>
        </div>
        <span className="rounded-full bg-brass px-3 py-1 text-xs font-bold text-navy">전화</span>
      </div>
      <div className="mt-2 flex items-center justify-between rounded-xl border border-line bg-white px-3 py-2">
        <p className="text-[10px] text-mute">정신건강 위기상담 · 24시간</p>
        <p className="font-serif text-base font-bold text-navy">1577-0199</p>
      </div>
    </div>
  );
}

const ARTS = [IslandsArt, TicketArt, StampArt, MenuArt, HelpArt];

export default function GuideArt({ index }) {
  const Art = ARTS[index] ?? IslandsArt;
  return (
    <div className="h-[150px] rounded-2xl bg-[#E6F2F9] px-3 py-3">
      <Art />
    </div>
  );
}