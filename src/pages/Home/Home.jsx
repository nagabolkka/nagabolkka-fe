import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RegionHeader from "../../components/Home/RegionHeader";
import LumiMessage from "../../components/common/LumiMessage/LumiMessage";
import NextRegionCard from "../../components/Home/NextRegionCard";
import TodayQuestCard from "../../components/Home/TodayQuestCard";
import AdventurePath from "../../components/Home/AdventurePath";
import ShortcutCard from "../../components/Home/ShortcutCard";
import { getRegion, getPathRegions } from "../../mocks/regions";
import { openNextRegion } from "../../utils/adventureStorage";
import { getMyGoal } from "../../mocks/goals";
import { getHomeLumiMessage } from "../../constants/lumiMessages";
import useTodayQuest from "../../hooks/useTodayQuest";
import NoticePopup from "../../components/Home/NoticePopup";
import {
  hideNoticeToday,
  isNoticeHiddenToday,
  getActiveNotice,
} from "../../utils/noticeStorage";

export default function Home() {
  const navigate = useNavigate();
  const [stayed, setStayed] = useState(false); // "지금이 좋아요" 누름
  const {
    saved,
    stageNo,
    restoration,
    pieceCount,
    isRainy,
    region,
    mission,
    todayQuest,
    questStatus,
    isSavedPlace,
  } = useTodayQuest();

  const nextRegion = stageNo < 5 ? getRegion(stageNo + 1) : null;
  const showNextRegion = restoration === 100 && nextRegion && !stayed;

  const lumiMessage = getHomeLumiMessage({
    questStatus,
    isRainy,
    pieceName: mission.reward.name,
    regionName: region.name,
    isSavedPlace,
  });

  const myGoal = getMyGoal();
  const goal = {
    name: myGoal?.name ?? "목표 없음",
    checked: myGoal?.checked ?? 0,
    total: myGoal?.total ?? 4,
  };

  // 진행 중이면 진행 화면으로, 아니면 상세로
  const questPath =
    questStatus === "IN_PROGRESS"
      ? todayQuest.isSplit
        ? "/quest/split"
        : "/quest/progress"
      : "/quest";

  const handleOpenNext = () => {
    openNextRegion(nextRegion.stageNo);
    navigate("/home", { replace: true });
  };

  const [notice, setNotice] = useState(() => {
    const active = getActiveNotice();
    return active && !isNoticeHiddenToday(active.noticeId) ? active : null;
  });

  const handleHideToday = () => {
    hideNoticeToday(notice.noticeId);
    setNotice(null);
  };

  return (
    <div className="relative flex flex-col pb-3">
      <RegionHeader
        region={region}
        restoration={restoration}
        isRainy={isRainy}
        pieceCount={pieceCount}
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
      <TodayQuestCard
        mission={mission}
        region={region}
        status={questStatus}
        onClick={() => navigate(questPath)}
        isSavedPlace={isSavedPlace}
      />
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
          onClick={() => navigate("/goals")}
        />
        <ShortcutCard
          title="루미의 편지"
          description="이번 주 이야기"
          onClick={() => navigate("/letter")}
        />
      </div>
      {notice && (
        <NoticePopup
          notice={notice}
          onClose={() => setNotice(null)}
          onHideToday={handleHideToday}
        />
      )}
    </div>
  );
}
