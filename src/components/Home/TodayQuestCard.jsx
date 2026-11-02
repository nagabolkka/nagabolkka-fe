import Badge from "../common/Badge/Badge";
import Button from "../common/Button/Button";
import { DIFFICULTY } from "../../constants/difficulty";
import {
  formatQuestDate,
  formatDistance,
  formatMinutes,
} from "../../utils/format";

export default function TodayQuestCard({
  mission,
  region,
  status = "ASSIGNED", // ASSIGNED · COMPLETED · SKIPPED
  date = new Date(),
  onClick,
}) {
  const isCompleted = status === "COMPLETED";
  const isSkipped = status === "SKIPPED";
  const isDone = isCompleted || isSkipped; // 오늘 퀘스트 끝남
  const difficulty = DIFFICULTY[mission.difficulty];

  const meta = [
    mission.placeName,
    mission.distanceM != null && formatDistance(mission.distanceM),
    mission.estMinutes != null && formatMinutes(mission.estMinutes),
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <div className="mx-3 mt-[23px] bg-[#F4EAD5] rounded-[10px] border-3 border-[#E6D6B0] p-[14px]">
      {/* 날짜 + 난이도 (끝난 뒤에는 난이도 숨김) */}
      <div className="flex justify-between items-center">
        <p className="text-[#6B5E4A] text-xs font-normal font-pixel">
          오늘의 퀘스트 · {formatQuestDate(date)}
        </p>
        {!isDone && (
          <Badge bgColor={difficulty.bgColor} textColor={difficulty.textColor}>
            {difficulty.label}
          </Badge>
        )}
      </div>

      {isCompleted && (
        /* 완료 : 획득한 조각 */
        <div className="mt-3 flex items-center gap-4">
          <div className="shrink-0 w-12 h-12 flex items-center justify-center">
            <div
              className="w-[34px] h-[34px] rotate-45 border-[3px] border-[#2B2340]"
              style={{ backgroundColor: region.color }}
            />
          </div>
          <div>
            <p className="text-black text-xl font-normal font-pixel">
              {mission.reward.name} 획득
            </p>
            <p className="mt-0.5 text-[#6B5E4A] text-sm font-medium font-sans">
              {mission.title}
            </p>
          </div>
        </div>
      )}

      {isSkipped && (
        /* 건너뜀 : 쉬어가는 날 */
        <div className="mt-4">
          <p className="text-black text-xl font-normal font-pixel">
            오늘은 쉬어가는 날
          </p>
          <p className="mt-1 text-[#6B5E4A] text-sm font-medium font-sans break-keep">
            잃은 건 없어요. 내일은 조금 더 가벼운 퀘스트로 준비할게요.
          </p>
        </div>
      )}

      {!isDone && (
        /* 진행 전 : 미션 정보 */
        <>
          <h1 className="text-black text-xl font-bold font-pixel mt-[6px]">
            {mission.title}
          </h1>
          <p className="text-[#6B5E4A] text-sm font-medium font-sans mt-[6px]">
            {meta}
          </p>
          <div className="mt-4 flex items-center gap-[7.5px] pl-[11.5px] w-full h-[29.2px] bg-[#EAD9B4]/70 rounded-[10px]">
            <div
              className="w-3 h-3 rotate-45 border-2 border-[#2B2340]"
              style={{ backgroundColor: region.color }}
            />
            <p className="text-black text-sm font-medium">
              보상 <span className="font-semibold">{mission.reward.name}</span>
            </p>
          </div>
        </>
      )}

      <div className="flex justify-center mt-3">
        {isDone ? (
          <Button title="내일 새 조각이 떨어져요" />
        ) : (
          <Button title="퀘스트 확인하기" onClick={onClick} />
        )}
      </div>
    </div>
  );
}
