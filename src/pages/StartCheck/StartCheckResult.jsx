import { useState } from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import RegionCard from "../../components/StartCheck/RegionCard";
import LumiBubble from "../../components/StartCheck/LumiBubble";
import GoalChips from "../../components/StartCheck/GoalChips";
import Button from "../../components/common/Button/Button";
import { getStartRegion } from "../../utils/startCheckScore";
import { startAdventure } from "../../utils/adventureStorage";
import { submitStartCheck } from "../../api/onboarding";

const SEONGBUK_DISTRICT_ID = 1;

export default function StartCheckResult() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [goal, setGoal] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const answers = state?.answers;
  if (!answers) return <Navigate to="/start-check" replace />;

  const { score, region } = getStartRegion(answers);

  const handleStart = async () => {
    if (submitting) return;
    setSubmitting(true);
    try {
      const data = await submitStartCheck({
        answers,
        districtId: SEONGBUK_DISTRICT_ID,
        goalId: goal,
      });

      startAdventure({
        stageNo: data.region.stageNo,
        goalId: data.goal.goalId,
      });
      navigate("/home", { replace: true });
    } catch (error) {
      const code = error.response?.data?.code;
      if (code === "ONBOARDING_ALREADY_DONE") {
        // 이미 시작 체크를 마친 계정은 홈으로 이동
        navigate("/home", { replace: true });
        return;
      }
      alert("저장하지 못했어요. 잠시 후 다시 시도해 주세요.");
      setSubmitting(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-radial-[at_50%_28%] from-bg-glow to-bg-page to-75%">
      <div className="flex flex-col items-center">
        <p className="text-[#F2C14E] text-xs font-normal font-pixel tracking-wide mt-[39px]">
          출발 지역이 정해졌어요
        </p>
        <RegionCard region={region} score={score} />
        <LumiBubble region={region} />
      </div>
      <div className="flex flex-col pl-[21px] mt-[18px]">
        <p className="text-sm font-normal font-pixel text-[#F4EAD5] mb-2">
          언젠가 닿고 싶은 곳
        </p>
        <GoalChips selected={goal} onSelect={setGoal} />
        <p className="text-[#B9B0D0] text-xs font-normal font-sans mt-4">
          마이페이지에서 언제든 바꿀 수 있어요.
        </p>
      </div>
      <div className="flex justify-center mt-[282px]">
        <Button
          title="모험 시작하기"
          disabled={!goal || submitting}
          onClick={handleStart}
        />
      </div>
    </div>
  );
}
