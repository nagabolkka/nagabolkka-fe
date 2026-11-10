import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import FeedbackPieceCard from "../../components/Practice/FeedbackPieceCard";
import FeedbackSection from "../../components/Practice/FeedbackSection";
import Button from "../../components/common/Button/Button";
import { getScenario } from "../../mocks/practiceScenarios";
import { getMission } from "../../mocks/missions";
import { getRegion } from "../../mocks/regions";
import { PRACTICE_PIECE_MISSION_ID } from "../../constants/practice";

export default function PracticeFeedback() {
  const navigate = useNavigate();
  const { code } = useParams();
  const { state } = useLocation();
  const scenario = getScenario(code);

  // 새로고침 등으로 피드백 정보가 없으면 연습실로
  if (!scenario || !state?.feedback) return <Navigate to="/practice" replace />;

  const piece = getMission(PRACTICE_PIECE_MISSION_ID);
  const region = getRegion(piece.stageNo);
  const { feedback, isNew } = state;

  return (
    <div className="flex flex-1 flex-col bg-bg-page px-4 pb-8 pt-10">
      <p className="font-pixel text-xs text-[#E8C06A]">
        {scenario.title} · 연습 완료
      </p>
      <h1 className="mt-1 font-pixel text-2xl text-[#F4EAD5]">
        끝까지 해냈어!
      </h1>

      <div className="mt-5">
        <FeedbackPieceCard
          name={piece.reward.name}
          regionName={region.name}
          color={region.color}
          isNew={isNew}
        />
      </div>

      <div className="mt-4 flex flex-col gap-3">
        <FeedbackSection title="잘한 점" items={feedback.good} />
        <FeedbackSection
          title="다음에 해볼 말"
          items={feedback.next.map((line) => `"${line}"`)}
        />
      </div>

      <div className="mt-auto flex flex-col items-center gap-3 pt-10">
        <button
          type="button"
          onClick={() => navigate("/practice", { replace: true })}
          className="h-[50px] w-[351px] cursor-pointer rounded-[10px] border-2 border-[#15121F] bg-[#2C2745] font-pixel text-base text-[#F4EAD5]"
        >
          다른 연습 해보기
        </button>
        <Button title="모험 지도로" onClick={() => navigate("/home")} />
      </div>
    </div>
  );
}
