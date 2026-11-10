import { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import GoalsHeader from "../../components/Goals/GoalsHeader";
import GoalCard from "../../components/Goals/GoalCard";
import HopePieceCard from "../../components/Goals/HopePieceCard";
import GoalEmpty from "../../components/Goals/GoalEmpty";
import LumiMessage from "../../components/common/LumiMessage/LumiMessage";
import { getMyGoal } from "../../mocks/goals";
import { toggleGoalStep } from "../../utils/goalStorage";

export default function Goals() {
  const navigate = useNavigate();
  const [, refresh] = useReducer((x) => x + 1, 0);
  const [toast, setToast] = useState("");
  const goal = getMyGoal();

  const handleToggle = (stepNo) => {
    const gotHopePiece = toggleGoalStep(goal.goalId, stepNo, goal.total);
    refresh();

    if (gotHopePiece) {
      setToast("희망 조각을 찾았어요! 도감에 기록됐어요.");
      setTimeout(() => setToast(""), 2000);
    }
  };

  return (
    <div className="relative flex flex-1 flex-col bg-bg-page pb-8 pt-[27px]">
      <div className="px-4">
        <GoalsHeader onBack={() => navigate(-1)} />
      </div>

      {goal ? (
        <>
          <LumiMessage message="목표를 4단계로 나눠봤어. 하나씩 체크해봐!" />

          <div className="mt-4 flex flex-col gap-4 px-4">
            <GoalCard goal={goal} onToggle={handleToggle} />
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
