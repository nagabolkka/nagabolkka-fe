import { getRegion } from "../../mocks/regions";

export default function HopePieceCard({ isReceived }) {
  const color = getRegion(5).color; // 새로운 세상 색

  return (
    <div className="flex items-center gap-3 rounded-lg border-2 border-[#15121F] bg-[#2B2340] px-4 py-3">
      <div
        className="ml-1 h-3.5 w-3.5 shrink-0 rotate-45 border-2 border-[#15121F]"
        style={{ backgroundColor: isReceived ? color : "#1E1A2E" }}
      />
      <p className="text-xs leading-5 text-[#F4EAD5] break-keep">
        {isReceived
          ? "희망 조각을 찾았어요! 새로운 세상에 아침이 밝았어요."
          : "4단계를 모두 마치면 새로운 세상의 희망 조각을 찾을 수 있어요."}
      </p>
    </div>
  );
}
