import { useNavigate } from "react-router-dom";
import PracticeHeader from "../../components/Practice/PracticeHeader";
import ScenarioCard from "../../components/Practice/ScenarioCard";
import LumiMessage from "../../components/common/LumiMessage/LumiMessage";
import { PRACTICE_SCENARIOS } from "../../mocks/practiceScenarios";
import { getMission } from "../../mocks/missions";
import { getRegion } from "../../mocks/regions";
import {
  PRACTICE_PIECE_MISSION_ID,
  getPracticeLumiMessage,
} from "../../constants/practice";
import {
  getRemainingToday,
  startPracticeSession,
} from "../../utils/practiceStorage";

export default function Practice() {
  const navigate = useNavigate();
  const remaining = getRemainingToday();
  const piece = getMission(PRACTICE_PIECE_MISSION_ID);
  const pieceColor = getRegion(piece.stageNo).color;

  const handleStart = (code) => {
    if (!startPracticeSession()) return;
    navigate(`/practice/${code}`, { replace: true, state: { started: true } });
  };

  return (
    <div className="flex flex-1 flex-col bg-bg-page pb-8 pt-[27px]">
      <div className="px-4">
        <PracticeHeader title="연습실" onBack={() => navigate(-1)} />
      </div>

      <LumiMessage message={getPracticeLumiMessage(remaining)} />

      <ul className="mt-4 flex flex-col gap-3 px-4">
        {PRACTICE_SCENARIOS.map((scenario) => (
          <li key={scenario.code}>
            <ScenarioCard
              scenario={scenario}
              pieceName={piece.reward.name}
              pieceColor={pieceColor}
              disabled={remaining === 0}
              onClick={() => handleStart(scenario.code)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
