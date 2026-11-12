import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import QuestHeader from "../../components/Quest/QuestHeader";
import QuestInfoCards from "../../components/Quest/QuestInfoCards";
import QuestMap from "../../components/Quest/QuestMap";
import RewardCard from "../../components/Quest/RewardCard";
import QuestActions from "../../components/Quest/QuestActions";
import PageLoading from "../../components/common/PageLoading/PageLoading";
import useQuest from "../../hooks/useQuest";
import { actTodayQuest } from "../../api/quests";
import { saveSplitSteps } from "../../utils/splitStepStorage";

export default function QuestDetail() {
  const navigate = useNavigate();
  const { quest, setQuest, mission, region, error } = useQuest();
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState("");

  if (!quest) return <PageLoading error={error} />;

  // 이미 끝난 퀘스트 (완료 · 쉬기) → 홈
  if (quest.status === "COMPLETED" || quest.status === "SKIPPED") {
    return <Navigate to="/home" replace />;
  }

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 2000);
  };

  // 동작 API → 성공하면 응답으로 화면 교체 · 실패하면 null
  const act = async (type) => {
    if (busy) return null; // 연속 클릭 무시
    setBusy(true);
    try {
      const updated = await actTodayQuest(type);
      setQuest(updated);
      return updated;
    } catch (e) {
      const code = e.response?.data?.code;
      if (code === "QUEST_CHANGE_LIMIT") {
        showToast("오늘은 더 바꿀 수 없어요.");
      } else if (code === "QUEST_ALREADY_DONE") {
        navigate("/home", { replace: true });
      } else {
        showToast("잠시 후 다시 시도해 주세요.");
      }
      return null;
    } finally {
      setBusy(false);
    }
  };

  const handleAccept = async () => {
    if (await act("ACCEPT")) navigate("/quest/progress");
  };

  const handleSplit = async () => {
    const updated = await act("SPLIT");
    if (!updated) return;
    saveSplitSteps(updated.questId, []); // 새로 쪼갰으니 체크 초기화
    navigate("/quest/split");
  };

  const handleChange = async () => {
    await act("CHANGE"); // 같은 화면에서 미션만 바뀜
  };

  const handleSkip = async () => {
    if (await act("SKIP")) navigate("/home");
  };

  return (
    <div className="flex-1 flex flex-col bg-bg-page">
      {toast && (
        <div className="fixed w-[300px] px-6 bottom-24 left-1/2 z-50 -translate-x-1/2 rounded-full bg-[#15121F]/90 py-2 text-center text-xs text-[#F4EAD5]">
          {toast}
        </div>
      )}
      <QuestHeader region={region} mission={mission} isRainy={false} onBack={() => navigate("/home")} />
      <QuestInfoCards mission={mission} />
      <QuestMap mission={mission} />
      <p className="mx-4 mt-4 text-[#F4EAD5] text-sm font-normal font-pixel leading-6 break-keep">
        {mission.description}
      </p>
      <RewardCard reward={mission.reward} color={region.color} />
      <QuestActions
        changeRemaining={quest.changeRemaining}
        onAccept={handleAccept}
        onSplit={handleSplit}
        onChange={handleChange}
        onSkip={handleSkip}
      />
    </div>
  );
}