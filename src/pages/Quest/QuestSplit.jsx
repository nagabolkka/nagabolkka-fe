import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import QuestHeader from "../../components/Quest/QuestHeader";
import QuestInfoCards from "../../components/Quest/QuestInfoCards";
import SplitSteps from "../../components/Quest/SplitSteps";
import QuestBottomBar from "../../components/Quest/QuestBottomBar";
import PageLoading from "../../components/common/PageLoading/PageLoading";
import useQuest from "../../hooks/useQuest";
import {
  loadSplitSteps,
  saveSplitSteps,
} from "../../utils/splitStepStorage";

export default function QuestSplit() {
  const { quest, mission, region, error } = useQuest();

  if (!quest) return <PageLoading error={error} />;
  if (quest.status === "COMPLETED" || quest.status === "SKIPPED") {
    return <Navigate to="/home" replace />;
  }
  if (!quest.isSplit) return <Navigate to="/quest" replace />;

  return <SplitBody quest={quest} mission={mission} region={region} />;
}

// 퀘스트를 받은 뒤에 그려서 저장된 체크를 처음 값으로 바로 읽는다
function SplitBody({ quest, mission, region }) {
  const navigate = useNavigate();
  const [doneSteps, setDoneSteps] = useState(() =>
    loadSplitSteps(quest.questId),
  );

  const handleToggle = (index) => {
    const next = doneSteps.includes(index)
      ? doneSteps.filter((i) => i !== index)
      : [...doneSteps, index];
    setDoneSteps(next);
    saveSplitSteps(quest.questId, next);
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
      <SplitSteps steps={mission.steps} doneSteps={doneSteps} onToggle={handleToggle} />
      <QuestBottomBar
        canRecord={doneSteps.length > 0}
        onRecord={() => navigate("/quest/record")}
        onBack={() => navigate("/home")}
      />
    </div>
  );
}