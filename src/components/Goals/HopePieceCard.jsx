import IslandStamp from "../common/Island/IslandStamp";

// 4단계를 다 마치면 꿈의 섬 특별 도장
export default function HopePieceCard({ isReceived }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-[#FBF5E4] px-4 py-3">
      <IslandStamp stageNo={5} size={44} dim={!isReceived} className="shrink-0" />
      <p className="text-[13px] leading-5 text-[#6B5320] break-keep">
        {isReceived
          ? "희망 도장을 받았어요! 꿈의 섬에 아침이 밝았어요."
          : "4단계를 모두 마치면 꿈의 섬 「희망 도장」을 받아요."}
      </p>
    </div>
  );
}