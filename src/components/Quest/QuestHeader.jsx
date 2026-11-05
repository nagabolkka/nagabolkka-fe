import Badge from "../common/Badge/Badge";
import backButton from "../../assets/images/back_button.png";
import { DIFFICULTY } from "../../constants/difficulty";

export default function QuestHeader({ region, mission, isRainy, status, onBack }) {
  const difficulty = DIFFICULTY[mission.difficulty];

  return (
    <section className="relative w-full h-[150px]">
      {/* 지역 이미지 */}
      <img
        src={isRainy ? region.rainyImageUrl : region.imageUrl}
        className="absolute inset-0 w-full h-full object-cover object-bottom"
      />

      {/* 상단 : 뒤로가기 · 오늘의 퀘스트 / 진행 중인 퀘스트 */}
      <div className="absolute top-3 inset-x-3 flex items-center justify-between">
        <img src={backButton} onClick={onBack} className="cursor-pointer" />
        <Badge>{status === "IN_PROGRESS" ? "진행 중인 퀘스트" : "오늘의 퀘스트"}</Badge>
      </div>

      {/* 하단 : 난이도 · 지역 뱃지 + 제목 */}
      <div className="absolute inset-x-3 bottom-3">
        <div className="flex gap-[9px]">
          <Badge
            size="sm"
            bgColor={difficulty.bgColor}
            textColor={difficulty.textColor}
          >
            {difficulty.label}
          </Badge>
          <Badge size="sm" bgColor="#F4EAD5" textColor="#000000">
            {region.name}
          </Badge>
        </div>
        <h1 className="mt-[11px] text-black text-xl font-bold font-pixel break-keep">
          {mission.title}
        </h1>
      </div>
    </section>
  );
}