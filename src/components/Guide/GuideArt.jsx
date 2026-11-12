import { REGIONS } from "../../constants/regions";

// 조각 다이아몬드
function Diamond({ color, size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <path
        d="M14 2 26 14 14 26 2 14Z"
        fill={color}
        stroke="#2B2340"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Chip({ label, active = false }) {
  return (
    <span
      className={`rounded-[5px] border-[1.5px] border-bg-deep px-[9px] py-1 font-pixel text-xs ${
        active ? "bg-gold text-bg-base" : "bg-[#2C2745] text-cream"
      }`}
    >
      {label}
    </span>
  );
}

// 1. 모험의 길 : 5개 지역
function PathArt() {
  return (
    <>
      <p className="text-center font-pixel text-[10px] text-[#6B5E4A]">
        CHAPTER 1 → 5
      </p>
      <div className="relative mt-4 flex justify-between px-1">
        <span className="absolute left-[34px] right-[34px] top-[15px] h-0.5 bg-[#B9A882]" />
        {REGIONS.map((r) => (
          <div
            key={r.stageNo}
            className="relative flex w-[60px] flex-col items-center gap-2"
          >
            <Diamond color={r.color} />
            <span className="font-pixel text-[10px] text-bg-base">
              {r.realLabel}
            </span>
          </div>
        ))}
      </div>
      <p className="mt-3 text-center font-sans text-xs text-[#6B5E4A]">
        {REGIONS.map((r) => r.name).join(" · ")}
      </p>
    </>
  );
}

// 2. 오늘의 퀘스트 : 퀘스트 예시 + 동작 버튼
function QuestArt() {
  return (
    <>
      <p className="font-pixel text-[10px] text-[#6B5E4A]">
        오늘의 퀘스트 · EASY · 실내
      </p>
      <p className="mt-1.5 font-pixel text-base font-bold text-bg-base">
        창문 열고 바깥 공기 3분 마시기
      </p>
      <p className="mt-1 font-sans text-xs text-[#6B5E4A]">
        내 방 창가 · 약 3분
      </p>
      <div className="mt-6 flex gap-1.5">
        <Chip label="수락" active />
        <Chip label="쪼개기" />
        <Chip label="바꾸기 2/2" />
        <Chip label="오늘은 쉬기" />
      </div>
    </>
  );
}

// 3. 조각과 복원 : 조각 + 복원도 칸
function RestoreArt() {
  const filled = 2; // 예시 : 5칸 중 2칸 = 40%
  return (
    <>
      <div className="flex items-center gap-4 pl-1.5">
        <Diamond color={REGIONS[0].color} size={44} />
        <div>
          <p className="font-pixel text-base font-bold text-bg-base">
            햇살 조각을 찾았어요
          </p>
          <p className="mt-1 font-sans text-xs text-[#6B5E4A]">
            하늘에 색이 돌아왔어
          </p>
        </div>
      </div>
      <p className="mt-4 font-pixel text-xs text-bg-base">
        {REGIONS[0].name} 복원도 {filled * 20}%
      </p>
      <div className="mt-2 flex gap-1.5">
        {Array.from({ length: 5 }, (_, i) => (
          <span
            key={i}
            className="h-3.5 flex-1 rounded-[3px] border-[1.5px] border-bg-base"
            style={{
              backgroundColor: i < filled ? REGIONS[0].color : "#E6D6B0",
            }}
          />
        ))}
      </div>
    </>
  );
}

// 4. 함께 쓰는 곳 : 바로가기 3개
function ShortcutArt() {
  const tiles = [
    ["연습실", "루미와 말 연습"],
    ["목표 준비", "취업 · 1/4"],
    ["루미의 편지", "이번 주 이야기"],
  ];
  return (
    <div className="mt-3 grid grid-cols-3 gap-2">
      {tiles.map(([title, desc]) => (
        <div
          key={title}
          className="h-[94px] rounded-[10px] border-[1.5px] border-bg-deep bg-[#2C2745] px-3 py-4"
        >
          <p className="font-pixel text-sm text-cream">{title}</p>
          <p className="mt-1.5 font-sans text-xs text-sub">{desc}</p>
        </div>
      ))}
    </div>
  );
}

// 5. 힘들 때는 : 상담 번호
function HelpArt() {
  return (
    <>
      <p className="font-sans text-xs text-bg-base">자살예방 상담전화 · 24시간</p>
      <div className="flex items-center justify-between">
        <p className="font-pixel text-[35px] font-bold leading-[47px] text-bg-base">
          109
        </p>
        <span className="rounded-[5px] bg-bg-base px-2.5 py-1.5 font-pixel text-xs text-cream">
          전화 걸기
        </span>
      </div>
      <hr className="my-2.5 border-[#E6D6B0]" />
      <p className="font-sans text-xs text-bg-base">정신건강 위기상담 · 24시간</p>
      <p className="mt-0.5 font-pixel text-base font-bold text-bg-base">
        1577-0199
      </p>
    </>
  );
}

const ARTS = [PathArt, QuestArt, RestoreArt, ShortcutArt, HelpArt];

export default function GuideArt({ index }) {
  const Art = ARTS[index];
  return (
    <div className="h-[150px] rounded-[10px] border-2 border-[#E6D6B0] bg-cream px-4 py-4">
      <Art />
    </div>
  );
}