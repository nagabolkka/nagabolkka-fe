import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import GoalsHeader from "../../components/Goals/GoalsHeader";
import GoalCard from "../../components/Goals/GoalCard";
import HopePieceCard from "../../components/Goals/HopePieceCard";
import GoalEmpty from "../../components/Goals/GoalEmpty";
import GoalPicker from "../../components/Goals/GoalPicker";
import LumiMessage from "../../components/common/LumiMessage/LumiMessage";
import PageLoading from "../../components/common/PageLoading/PageLoading";
import Toast from "../../components/common/Toast/Toast";
import { checkGoalStep, getMyGoal } from "../../api/goals";
import { updateMyGoal } from "../../api/users";

// 나의 꿈 준비 : 목표 없음 → 입국 신고서로 고르기 / 있으면 4단계 체크 · 바꾸기
export default function Goals() {
  const navigate = useNavigate();
  const [goal, setGoal] = useState(undefined); // undefined 불러오는 중 · null 고른 목표 없음
  const [error, setError] = useState(false);
  const [picking, setPicking] = useState(false); // 입국 신고서 화면
  const [saving, setSaving] = useState(false);
  const [pendingStepId, setPendingStepId] = useState(null);
  const [toast, setToast] = useState("");
  const toastTimer = useRef(null);

  const showToast = (message) => {
    clearTimeout(toastTimer.current);
    setToast(message);
    toastTimer.current = setTimeout(() => setToast(""), 2000);
  };

  useEffect(() => () => clearTimeout(toastTimer.current), []);

  useEffect(() => {
    let ignore = false;
    getMyGoal()
      .then((data) => {
        if (!ignore) setGoal(data);
      })
      .catch((e) => {
        if (ignore) return;
        const code = e.response?.data?.code;
        if (code === "ONBOARDING_REQUIRED") {
          navigate("/start-check", { replace: true });
          return;
        }
        if (code === "NOT_FOUND") {
          setGoal(null); // 고른 목표 없음 → 빈 상태
          return;
        }
        // 응답 없음 (서버 꺼짐 · 15초 초과) · 500번대 → 점검 화면
        if (!e.response || e.response.status >= 500) {
          navigate("/maintenance", { replace: true });
          return;
        }
        setError(true);
      });
    return () => {
      ignore = true;
    };
  }, [navigate]);

  // 신고서 저장 → 목표 변경 (처음 고를 때도 같은 API) → 내 목표 다시 불러오기
  const handlePick = async (goalId) => {
    if (saving) return;
    if (goal?.goalId === goalId) {
      setPicking(false);
      return;
    }
    setSaving(true);
    try {
      await updateMyGoal(goalId);
      setGoal(await getMyGoal());
      setPicking(false);
      showToast(goal ? "꿈을 바꿨어요. 체크한 단계는 그대로 남아 있어요." : "입국 도장 쾅! 꿈을 정했어요.");
    } catch (e) {
      if (!e.response || e.response.status >= 500) {
        navigate("/maintenance", { replace: true });
        return;
      }
      showToast("저장하지 못했어요. 잠시 후 다시 시도해 주세요.");
    } finally {
      setSaving(false);
    }
  };

  const handleToggle = async (step) => {
    if (pendingStepId) return; // 응답 오기 전 연속 클릭 무시
    setPendingStepId(step.stepId);

    try {
      const next = !step.checked;
      const { checked, total, hopePiece } = await checkGoalStep(step.stepId, next);

      setGoal((prev) => ({
        ...prev,
        steps: prev.steps.map((s) => (s.stepId === step.stepId ? { ...s, checked: next } : s)),
        checked,
        total,
        hopePieceReceived: prev.hopePieceReceived || Boolean(hopePiece),
      }));

      if (hopePiece) {
        showToast(
          hopePiece.isNew
            ? "희망 도장을 받았어요! 도장 탭에 찍혔어요."
            : "희망 도장을 한 번 더 받았어요!",
        );
      }
    } catch (e) {
      if (!e.response || e.response.status >= 500) {
        navigate("/maintenance", { replace: true });
        return;
      }
      // 404 : 다른 탭에서 목표를 바꾼 경우 등
      showToast("저장하지 못했어요. 다시 시도해 주세요.");
    } finally {
      setPendingStepId(null);
    }
  };

  if (goal === undefined) return <PageLoading error={error} />;

  const handleBack = () => (picking ? setPicking(false) : navigate(-1));

  return (
    <div className="relative flex flex-1 flex-col bg-sky-paper pb-10">
      <GoalsHeader
        onBack={handleBack}
        title={picking ? "꿈의 섬 입국 신고서" : "나의 꿈 준비"}
        label={picking ? "ARRIVAL CARD" : "DREAM · 꿈의 섬"}
      />

      {picking ? (
        <GoalPicker currentGoalId={goal?.goalId} submitting={saving} onSubmit={handlePick} />
      ) : goal ? (
        <>
          <LumiMessage message="꿈을 4단계로 나눠봤어요. 하나씩 체크해 봐요!" pose="passenger" />
          <div className="mt-4 flex flex-col gap-3 px-4">
            <GoalCard
              goal={goal}
              pendingStepId={pendingStepId}
              onToggle={handleToggle}
              onChange={() => setPicking(true)}
            />
            <HopePieceCard isReceived={goal.hopePieceReceived} />
          </div>
        </>
      ) : (
        // 헤더 높이만큼 아래 여백을 줘서 화면 정가운데에 오게
        <div className="flex flex-1 flex-col justify-center pb-12">
          <GoalEmpty onPick={() => setPicking(true)} />
        </div>
      )}

      <Toast message={toast} bottom="bottom-10" />
    </div>
  );
}