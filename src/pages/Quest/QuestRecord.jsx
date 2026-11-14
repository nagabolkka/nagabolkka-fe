import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import MoodSelector from "../../components/Quest/MoodSelector";
import ReflectionInput from "../../components/Quest/ReflectionInput";
import Button from "../../components/common/Button/Button";
import PageLoading from "../../components/common/PageLoading/PageLoading";
import backButton from "../../assets/images/backButton.svg";
import useQuest from "../../hooks/useQuest";
import { completeQuest } from "../../api/quests";
import { loadSplitSteps } from "../../utils/splitStepStorage";

// 쉼의 조각 : 시작의 방(1계단) 미션에서 처음 한 줄을 남기면
const REST_PIECE_STAGE = 1;

export default function QuestRecord() {
  const navigate = useNavigate();
  const { quest, mission, error } = useQuest();
  const [mood, setMood] = useState(null);
  const [reflection, setReflection] = useState("");
  const [submitting, setSubmitting] = useState(false);
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

  const handleSubmit = async () => {
    if (submitting) return; // 연속 클릭 무시
    setSubmitting(true);
    try {
      const result = await completeQuest({
        mood,
        reflection,
        doneSteps: quest.isSplit ? loadSplitSteps(quest.questId).length : 0,
      });

      // 위기 감지 → 연출 없이 도움 받기
      if (result.crisisDetected) {
        navigate("/help?from=reflection", { replace: true });
        return;
      }
      // 뒤로가기로 기록 화면에 다시 안 오도록 replace · 기분은 다음 난이도 안내용
      navigate("/quest/result", { replace: true, state: { ...result, mood } });
    } catch (e) {
      const code = e.response?.data?.code;
      if (code === "QUEST_ALREADY_DONE") {
        navigate("/home", { replace: true });
        return;
      }
      if (code === "ONBOARDING_REQUIRED") {
        navigate("/start-check", { replace: true });
        return;
      }
      // 응답 없음 (서버 꺼짐 · 15초 초과) · 500번대 → 점검 화면
      if (!e.response || e.response.status >= 500) {
        navigate("/maintenance", { replace: true });
        return;
      }
      showToast(e.response.data?.message ?? "잠시 후 다시 시도해 주세요.");
      setSubmitting(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* 상단 */}
      <header className="mt-6 flex items-center gap-2 pl-2.5">
        <img
          src={backButton}
          onClick={() => navigate(-1)}
          className="cursor-pointer"
        />
        <p className="text-[#F4EAD5] text-sm font-normal font-pixel">
          모험 기록
        </p>
      </header>

      <section className="flex flex-col mt-2.5 pl-[22px]">
        <p className="text-[#F2C14E] text-xs font-normal leading-8 font-pixel">
          {mission.title}
        </p>
        <h1 className="text-[#F4EAD5] text-xl font-normal leading-8 font-pixel">
          다녀와서 기분이 어땠어?
        </h1>
      </section>

      <div className="pl-[22px] pr-[26px]">
        <MoodSelector selected={mood} onSelect={setMood} />
      </div>

      <ReflectionInput
        value={reflection}
        onChange={setReflection}
        showRestPieceGuide={quest.region.stageNo === REST_PIECE_STAGE}
      />

      {/* 하단 버튼 */}
      <div className="mt-auto pt-6 pb-8 flex justify-center">
        <Button
          title={submitting ? "루미가 듣는 중…" : "기록하고 조각 받기"}
          disabled={!mood || submitting}
          onClick={handleSubmit}
        />
      </div>

      {toast && (
        <div className="fixed bottom-10 left-1/2 z-50 w-[300px] -translate-x-1/2 rounded-full bg-[#15121F]/90 px-6 py-2 text-center text-xs text-[#F4EAD5]">
          {toast}
        </div>
      )}
    </div>
  );
}