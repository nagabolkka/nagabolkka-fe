import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import QuestHeader from "../../components/Quest/QuestHeader";
import QuestInfoCards from "../../components/Quest/QuestInfoCards";
import ProgressCard from "../../components/Quest/ProgressCard";
import QuestBottomBar from "../../components/Quest/QuestBottomBar";
import PageLoading from "../../components/common/PageLoading/PageLoading";
import useQuest from "../../hooks/useQuest";
import { actTodayQuest } from "../../api/quests";
import { saveSplitSteps } from "../../utils/splitStepStorage";

export default function QuestProgress() {
  const navigate = useNavigate();
  const { quest, mission, region, error } = useQuest();
  const [busy, setBusy] = useState(false);

  if (!quest) return <PageLoading error={error} />;
  if (quest.status === "COMPLETED" || quest.status === "SKIPPED") {
    return <Navigate to="/home" replace />;
  }
  if (quest.isSplit) return <Navigate to="/quest/split" replace />;

  const handleSplit = async () => {
    if (busy) return;
    setBusy(true);
    try {
      const updated = await actTodayQuest("SPLIT");
      saveSplitSteps(updated.questId, []);
      navigate("/quest/split");
    } catch (e) {
      if (e.response?.data?.code === "QUEST_ALREADY_DONE") {
        navigate("/home", { replace: true });
      }
      setBusy(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-bg-page">
      <QuestHeader
        region={region}
        mission={mission}
        isRainy={false}
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