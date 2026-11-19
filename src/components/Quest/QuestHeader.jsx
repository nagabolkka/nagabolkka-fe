import Badge from "../common/Badge/Badge";
import backButton from "../../assets/images/backButton.svg";
import { DIFFICULTY } from "../../constants/difficulty";

export default function QuestHeader({ region, mission, isRainy, status, onBack }) {
  const difficulty = DIFFICULTY[mission.difficulty];

  return (
    <section className="relative w-full h-[170px]">
      {/* 지역 이미지 (선명하게 그대로) */}
      <img
        src={isRainy ? region.rainyImageUrl : region.imageUrl}
        className="absolute inset-0 w-full h-full object-cover object-bottom"
      />

      {/* 위 : 뒤로가기 · 뱃지가 보이게 옅게 / 아래 : 제목이 보이게 페이지 색으로 */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#15121F]/50 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[110px] bg-gradient-to-t from-bg-page via-bg-page/80 to-transparent" />

      {/* 상단 : 뒤로가기 · 오늘의 퀘스트 / 진행 중인 퀘스트 */}
      <div className="absolute top-3 inset-x-3 flex items-center justify-between">
        <img src={backButton} onClick={onBack} className="cursor-pointer" />
        <Badge>{status === "IN_PROGRESS" ? "진행 중인 퀘스트" : "오늘의 퀘스트"}</Badge>
      </div>

      {/* 하단 : 난이도 · 지역 뱃지 + 제목 */}
      <div className="absolute inset-x-3 bottom-2">
        <div className="flex gap-[9px]">
          <Badge size="sm" bgColor={difficulty.bgColor} textColor={difficulty.textColor}>
            {difficulty.label}
          </Badge>
          <Badge size="sm" bgColor="#F4EAD5" textColor="#000000">
            {region.name}
          </Badge>
        </div>
        <h1 className="mt-2 text-[#F4EAD5] text-xl font-bold font-pixel break-keep [text-shadow:_0_2px_0_#15121F]">
          {mission.title}
        </h1>
      </div>
    </section>
  );
}