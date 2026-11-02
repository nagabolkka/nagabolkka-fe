import { useNavigate, useSearchParams } from "react-router-dom";
import RegionHeader from "../../components/Home/RegionHeader";
import LumiMessage from "../../components/common/LumiMessage/LumiMessage";
import TodayQuestCard from "../../components/Home/TodayQuestCard";
import AdventurePath from "../../components/Home/AdventurePath";
import ShortcutCard from "../../components/Home/ShortcutCard";
import { getRegion, getPathRegions } from "../../mocks/regions";
import { getTodayMission } from "../../mocks/missions";
import { loadAdventure } from "../../utils/adventureStorage";
import { getGoal } from "../../constants/goals";

export default function Home() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const saved = loadAdventure(); 

  const stageNo = Number(params.get("stage") ?? saved.stageNo ?? 1);
  const restoration = Number(params.get("restoration") ?? 0);
  const isRainy = params.get("rain") === "1";

  const region = getRegion(stageNo);
  const mission = getTodayMission(stageNo);

  const goal = {
    name: getGoal(saved.goalId)?.name ?? "목표 없음",
    checked: 0, // 시작 직후라 0
    total: 4,
  };

  return (
    <div className="flex flex-col pb-3">
      <RegionHeader
        region={region}
        restoration={restoration}
        isRainy={isRainy}
        pieceCount={2}
      />
      <LumiMessage message="오늘도 조각이 떨어졌대. 같이 보러 갈래?" />
      <TodayQuestCard mission={mission} region={region} />
      <AdventurePath regions={getPathRegions(stageNo, restoration)} />
      <div className="flex gap-[17px] pl-3 mt-2.5">
        <ShortcutCard
          title="연습실"
          description="루미와 말 연습"
          onClick={() => navigate("/practice")}
        />
        <ShortcutCard
          title="목표 준비"
          description={`${goal.name} · ${goal.checked}/${goal.total}`}
          onClick={() => navigate("/target")}
        />
        <ShortcutCard
          title="루미의 편지"
          description="이번 주 이야기"
          onClick={() => navigate("/lumi-letter")}
        />
      </div>
    </div>
  );
}