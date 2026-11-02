import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import RegionHeader from "../../components/Home/RegionHeader";
import LumiMessage from "../../components/common/LumiMessage/LumiMessage";
import NextRegionCard from "../../components/Home/NextRegionCard";
import TodayQuestCard from "../../components/Home/TodayQuestCard";
import AdventurePath from "../../components/Home/AdventurePath";
import ShortcutCard from "../../components/Home/ShortcutCard";
import { getRegion, getPathRegions } from "../../mocks/regions";
import { getTodayMission } from "../../mocks/missions";
import { loadAdventure, saveAdventure } from "../../utils/adventureStorage";
import { getGoal } from "../../constants/goals";
import { getHomeLumiMessage } from "../../constants/lumiMessages";

export default function Home() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const saved = loadAdventure(); // 시작 체크 결과 (단계 · 목표)
  const [stayed, setStayed] = useState(false); // "지금이 좋아요" 누름


  const stageNo = Number(params.get("stage") ?? saved.stageNo ?? 1);
  const restoration = Number(params.get("restoration") ?? 0);
  const isRainy = params.get("rain") === "1";
  const questStatus = (params.get("quest") ?? "assigned").toUpperCase(); // ASSIGNED · COMPLETED · SKIPPED

  const region = getRegion(stageNo);
  const nextRegion = stageNo < 5 ? getRegion(stageNo + 1) : null;
  const mission = getTodayMission(stageNo, isRainy);

  // 다음 지역 제안 : 복원도 100% + 다음 지역이 있음 + 이번에 머물기를 고르지 않음
  const showNextRegion = restoration === 100 && nextRegion && !stayed;

  const lumiMessage = getHomeLumiMessage({
    questStatus,
    isRainy,
    pieceName: mission.reward.name,
    regionName: region.name,
  });

  const goal = {
    name: getGoal(saved.goalId)?.name ?? "목표 없음",
    checked: 0, // 시작 직후라 0
    total: 4,
  };

  // "열어볼게요" → 다음 지역으로 이동 (복원도 0 부터)
  const handleOpenNext = () => {
    saveAdventure({ ...saved, stageNo: nextRegion.stageNo });
    navigate("/home", { replace: true }); 
  };

  return (
    <div className="flex flex-col pb-3">
      <RegionHeader
        region={region}
        restoration={restoration}
        isRainy={isRainy}
        pieceCount={2}
      />
      <LumiMessage message={lumiMessage} />
      {showNextRegion && (
        <NextRegionCard
          region={region}
          nextRegion={nextRegion}
          onStay={() => setStayed(true)}
          onOpen={handleOpenNext}
        />
      )}
      <TodayQuestCard mission={mission} region={region} status={questStatus} />
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