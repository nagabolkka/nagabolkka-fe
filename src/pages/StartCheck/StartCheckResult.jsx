import { useState } from "react";
import RegionCard from "../../components/StartCheck/RegionCard";
import { getStartRegion } from "../../utils/startCheckScore";
import LumiBubble from "../../components/StartCheck/LumiBubble";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import GoalChips from "../../components/StartCheck/GoalChips";
import Button from "../../components/common/Button/Button";

export default function StartCheckResult() {
  const { state } = useLocation();
  const answers = state?.answers;
  const navigate = useNavigate();

  if (!answers) return <Navigate to="/start-check" replace />;

  const { score, region } = getStartRegion(answers);

  const [goal, setGoal] = useState(null);

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
          onClick={() => navigate("/home", { replace: true })}
        />
      </div>
    </div>
  );
}
