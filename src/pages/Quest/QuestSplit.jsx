import { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import QuestHeader from "../../components/Quest/QuestHeader";
import QuestInfoCards from "../../components/Quest/QuestInfoCards";
import SplitSteps from "../../components/Quest/SplitSteps";
import QuestBottomBar from "../../components/Quest/QuestBottomBar";
import useTodayQuest from "../../hooks/useTodayQuest";
import { toggleSplitStep } from "../../utils/adventureStorage";

export default function QuestSplit() {
  const navigate = useNavigate();
  const [, refresh] = useReducer((x) => x + 1, 0);
  const { region, mission, isRainy, todayQuest, defaultMissionId } = useTodayQuest();

  const handleToggle = (index) => {
    toggleSplitStep(defaultMissionId, index);
    refresh();
  };

  return (
    <div className="flex-1 flex flex-col bg-bg-page">
      <QuestHeader
        region={region}
        mission={mission}
        isRainy={isRainy}
        status="IN_PROGRESS"
        onBack={() => navigate("/home")}
      />
      <QuestInfoCards mission={mission} />
      <SplitSteps steps={mission.steps} doneSteps={todayQuest.doneSteps} onToggle={handleToggle} />
      <QuestBottomBar
        canRecord={todayQuest.doneSteps.length > 0}
        onRecord={() => navigate("/quest/record")}
        onBack={() => navigate("/home")}
      />
    </div>
  );
}