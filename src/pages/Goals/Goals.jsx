import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import GoalsHeader from "../../components/Goals/GoalsHeader";
import GoalCard from "../../components/Goals/GoalCard";
import HopePieceCard from "../../components/Goals/HopePieceCard";
import GoalEmpty from "../../components/Goals/GoalEmpty";
import LumiMessage from "../../components/common/LumiMessage/LumiMessage";
import PageLoading from "../../components/common/PageLoading/PageLoading";
import { checkGoalStep, getMyGoal } from "../../api/goals";

export default function Goals() {
  const navigate = useNavigate();
  const [goal, setGoal] = useState(undefined); // undefined 불러오는 중 · null 고른 목표 없음
  const [error, setError] = useState(false);
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
          setGoal(null); // 고른 목표 없음 → 안내 카드
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
            ? "희망 조각을 찾았어요! 도감에 기록됐어요."
            : "희망 조각을 하나 더 찾았어요!"
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

  return (
    <div className="relative flex flex-1 flex-col bg-bg-page pb-8 pt-[27px]">
      <div className="px-4">
        <GoalsHeader onBack={() => navigate(-1)} />
      </div>

      {goal ? (
        <>
          <LumiMessage message="목표를 4단계로 나눠봤어. 하나씩 체크해봐!" />

          <div className="mt-4 flex flex-col gap-4 px-4">
            <GoalCard goal={goal} pendingStepId={pendingStepId} onToggle={handleToggle} />
            <HopePieceCard isReceived={goal.hopePieceReceived} />
          </div>

          <button
            type="button"
            onClick={() => navigate("/mypage")}
            className="mt-6 cursor-pointer self-center text-[11px] text-[#B9B0D0] underline"
          >
            다른 목표로 바꾸려면 마이페이지에서 골라주세요.
          </button>
        </>
      ) : (
        <div className="mt-6 px-4">
          <GoalEmpty onGoMyPage={() => navigate("/mypage")} />
        </div>
      )}

      {toast && (
        <div className="fixed bottom-10 left-1/2 z-50 w-[300px] -translate-x-1/2 rounded-full bg-[#15121F]/90 px-6 py-2 text-center text-xs text-[#F4EAD5]">
          {toast}
        </div>
      )}
    </div>
  );
}