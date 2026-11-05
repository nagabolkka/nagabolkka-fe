import { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import QuestHeader from "../../components/Quest/QuestHeader";
import QuestInfoCards from "../../components/Quest/QuestInfoCards";
import QuestMap from "../../components/Quest/QuestMap";
import RewardCard from "../../components/Quest/RewardCard";
import QuestActions from "../../components/Quest/QuestActions";
import useTodayQuest from "../../hooks/useTodayQuest";
import { getChangeMission } from "../../mocks/missions";
import {
  MAX_CHANGE,
  acceptTodayQuest,
  splitTodayQuest,
  changeTodayQuest,
  skipTodayQuest,
} from "../../utils/adventureStorage";

export default function QuestDetail() {
  const navigate = useNavigate();
  const [, refresh] = useReducer((x) => x + 1, 0);
  const { region, mission, isRainy, todayQuest, defaultMissionId } = useTodayQuest();

  const handleAccept = () => {
    acceptTodayQuest(defaultMissionId);
    navigate("/quest/progress");
  };

  const handleSplit = () => {
    splitTodayQuest(defaultMissionId);
    navigate("/quest/split");
  };

  const handleChange = () => {
    changeTodayQuest(defaultMissionId, getChangeMission(mission).missionId);
    refresh(); // 같은 화면에서 미션만 바뀜
  };

  const handleSkip = () => {
    skipTodayQuest(defaultMissionId);
    navigate("/home");
  };

  return (
    <div className="flex-1 flex flex-col bg-bg-page">
      <QuestHeader region={region} mission={mission} isRainy={isRainy} onBack={() => navigate("/home")} />
      <QuestInfoCards mission={mission} />
      <QuestMap mission={mission} />
      <p className="mx-4 mt-4 text-[#F4EAD5] text-sm font-normal font-pixel leading-6 break-keep">
        {mission.description}
      </p>
      <RewardCard reward={mission.reward} color={region.color} />
      <QuestActions
        changeRemaining={MAX_CHANGE - todayQuest.changeCount}
        onAccept={handleAccept}
        onSplit={handleSplit}
        onChange={handleChange}
        onSkip={handleSkip}
      />
    </div>
  );
}