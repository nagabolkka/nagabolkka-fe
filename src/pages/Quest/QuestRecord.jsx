import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import MoodSelector from "../../components/Quest/MoodSelector";
import ReflectionInput from "../../components/Quest/ReflectionInput";
import Button from "../../components/common/Button/Button";
import PageLoading from "../../components/common/PageLoading/PageLoading";
import BackHeader from "../../components/common/BackHeader/BackHeader";
import Lumi from "../../components/common/Lumi/Lumi";
import InkStamp from "../../components/common/Stamp/InkStamp";
import Toast from "../../components/common/Toast/Toast";
import { MOOD_INK, todayFlight } from "../../constants/islands";
import useQuest from "../../hooks/useQuest";
import { completeQuest } from "../../api/quests";
import { loadSplitSteps } from "../../utils/splitStepStorage";

export default function QuestRecord() {
  const navigate = useNavigate();
  const { quest, mission, region, error } = useQuest();
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
    <div className="flex-1 flex flex-col bg-navy">
      <BackHeader dark title="입국 심사" label={`ARRIVAL · ${region.name}`} onBack={() => navigate(-1)} />

      {/* 심사관 루미 */}
      <section className="mx-4 flex items-start gap-2">
        <div className="flex-1 rounded-2xl bg-white px-3.5 py-2.5">
          <p className="text-[13px] font-bold leading-5 text-navy">
            어서 와요! 여행은 어땠어요?
            <br />
            <span className="font-medium text-mute">고른 기분이 도장 잉크가 돼요</span>
          </p>
        </div>
        <Lumi pose="stamp" size={92} className="-mt-3 shrink-0" />
      </section>

      {/* 탑승권 스텁 : 도장 미리보기 */}
      <section className="mx-4 mt-1 overflow-hidden rounded-2xl bg-ticket">
        <div className="h-2" style={{ backgroundColor: region.color }} />
        <div className="flex items-center justify-between gap-3 px-4 py-3">
          <div className="min-w-0">
            <p className="label-en text-[11px] text-navy">
              {todayFlight()} · ROOM → {region.code}
            </p>
            <p className="mt-1 text-sm font-bold text-navy break-keep line-clamp-2">{mission.title}</p>
            <svg width="150" height="22" aria-hidden className="mt-2">
              {Array.from({ length: 30 }, (_, i) => (
                <rect key={i} x={i * 5} y="0" width={[1, 2, 1, 3, 1, 2][i % 6]} height="22" fill="#1C2A5E" />
              ))}
            </svg>
          </div>
          <InkStamp
            title={mission.reward.name}
            sub={mood ? "미리보기" : "잉크를 골라요"}
            color={mood ? MOOD_INK[mood] : "#C9C2AE"}
            dashed
            size={92}
          />
        </div>
      </section>

      <section className="px-4 mt-5">
        <p className="font-serif text-[15px] font-bold text-white">잉크 고르기 · 오늘 기분</p>
        <MoodSelector selected={mood} onSelect={setMood} />
      </section>

      <ReflectionInput
        value={reflection}
        onChange={setReflection}
        showRestPieceGuide={quest.restPieceAvailable}
      />

      {/* 하단 버튼 */}
      <div className="mt-auto pt-6 pb-8 flex justify-center">
        <Button
          variant="gold"
          title={submitting ? "도장 찍는 중…" : "쾅!  도장 받기"}
          disabled={!mood || submitting}
          onClick={handleSubmit}
        />
      </div>

      <Toast message={toast} bottom="bottom-10" />
    </div>
  );
}