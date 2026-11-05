import { Navigate, useNavigate } from "react-router-dom";
import useTodayQuest from "../../hooks/useTodayQuest";
import { loadAdventure } from "../../utils/adventureStorage";
import { getMission } from "../../mocks/missions";
import { NEXT_DIFFICULTY_MESSAGE } from "../../constants/moods";
import PieceFound from "../../components/Quest/PieceFound";
import RestorationCard from "../../components/Quest/RestorationCard";
import Button from "../../components/common/Button/Button";

export default function QuestResult() {
  const navigate = useNavigate();
  const { region } = useTodayQuest();
  const { lastResult } = loadAdventure();

  if (!lastResult) return <Navigate to="/home" replace />;

  const {
    pieceIds,
    newPieceIds = [],
    before,
    after,
    mood,
    reflection,
  } = lastResult;

  const pieces = pieceIds.map((id) => ({
    id,
    name: getMission(id).reward.name,
    isNew: newPieceIds.includes(id),
  }));

  const main = getMission(pieceIds[0]).reward;
  const thanks = `네가 가져온 ${main.name} 덕분에 ${main.restoreText}!`;
  const lumiMessage = reflection?.trim()
    ? `"${reflection.trim()}" ㅡ 그 말 오래 기억할게. ${thanks}`
    : thanks;

  return (
    <div className="flex min-h-screen flex-col gap-6 px-5 pb-8">
      <PieceFound pieces={pieces} color={region.color} />
      <div className="relative mt-4">
        <span className="absolute -top-3 left-4 rounded-md bg-[#E8C06A] px-2.5 py-0.5 font-pixel text-xs text-[#2B2118]">
          루미
        </span>
        <p className="rounded-xl border border-[#E8C06A]/40 bg-[#F4EAD5]/10 px-4 pb-4 pt-5 text-sm leading-relaxed text-[#F4EAD5]">
          {lumiMessage}
        </p>
      </div>
      <RestorationCard
        regionName={region.name}
        before={before}
        after={after}
        color={region.color}
        nextMessage={NEXT_DIFFICULTY_MESSAGE[mood]}
      />
      <div className="mt-[126px]">
        <Button
          title="모험 지도에서 확인하기"
          onClick={() => navigate("/home")}
        />
      </div>
    </div>
  );
}
