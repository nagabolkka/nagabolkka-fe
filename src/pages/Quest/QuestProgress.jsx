import { useNavigate } from "react-router-dom";
import QuestHeader from "../../components/Quest/QuestHeader";
import QuestInfoCards from "../../components/Quest/QuestInfoCards";
import ProgressCard from "../../components/Quest/ProgressCard";
import QuestBottomBar from "../../components/Quest/QuestBottomBar";
import useTodayQuest from "../../hooks/useTodayQuest";
import { splitTodayQuest } from "../../utils/adventureStorage";

export default function QuestProgress() {
  const navigate = useNavigate();
  const { region, mission, isRainy, defaultMissionId } = useTodayQuest();

  const handleSplit = () => {
    splitTodayQuest(defaultMissionId);
    navigate("/quest/split");
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
      <ProgressCard mission={mission} color={region.color} onSplit={handleSplit} />
      <QuestBottomBar
        canRecord
        onRecord={() => navigate("/quest/record")}
        onBack={() => navigate("/home")}
      />
    </div>
  );
}