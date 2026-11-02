import Badge from "../common/Badge/Badge";
import Button from "../common/Button/Button";
import { DIFFICULTY } from "../../constants/difficulty";
import { formatQuestDate, formatDistance, formatMinutes } from "../../utils/format";

export default function TodayQuestCard({ mission, region, date = new Date(), onClick }) {
  const difficulty = DIFFICULTY[mission.difficulty];

  // 장소 · 거리 · 시간 (null 이면 숨김)
  const meta = [
    mission.placeName,
    mission.distanceM != null && formatDistance(mission.distanceM),
    mission.estMinutes != null && formatMinutes(mission.estMinutes),
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <div className="mx-3 mt-[23px] bg-[#F4EAD5] rounded-[10px] border-3 border-[#E6D6B0] p-[14px]">
      {/* 날짜 + 난이도 */}
      <div className="flex justify-between items-center">
        <p className="text-[#6B5E4A] text-xs font-normal font-pixel">
          오늘의 퀘스트 · {formatQuestDate(date)}
        </p>
        <Badge bgColor={difficulty.bgColor} textColor={difficulty.textColor}>
          {difficulty.label}
        </Badge>
      </div>

      {/* 미션 제목 */}
      <h1 className="text-black text-xl font-bold font-pixel mt-[6px]">
        {mission.title}
      </h1>

      {/* 장소 · 거리 · 시간 */}
      <p className="text-[#6B5E4A] text-sm font-medium font-sans mt-[6px]">
        {meta}
      </p>

      {/* 보상 조각 — 지역 색 */}
      <div className="mt-4 flex items-center gap-[7.5px] pl-[11.5px] w-full h-[29.2px] bg-[#EAD9B4]/70 rounded-[10px]">
        <div
          className="w-3 h-3 rotate-45 border-2 border-[#2B2340]"
          style={{ backgroundColor: region.color }}
        />
        <p className="text-black text-sm font-medium">
          보상 <span className="font-semibold">{mission.reward.name}</span>
        </p>
      </div>

      {/* 버튼 */}
      <div className="flex justify-center mt-2.5">
        <Button title="퀘스트 확인하기" onClick={onClick} />
      </div>
    </div>
  );
}