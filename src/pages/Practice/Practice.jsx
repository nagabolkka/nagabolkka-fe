import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import PracticeHeader from "../../components/Practice/PracticeHeader";
import ScenarioCard from "../../components/Practice/ScenarioCard";
import LumiMessage from "../../components/common/LumiMessage/LumiMessage";
import PageLoading from "../../components/common/PageLoading/PageLoading";
import { getRegion } from "../../mocks/regions";
import { getPracticeLumiMessage } from "../../constants/practice";
import { getPracticeScenarios, startPractice } from "../../api/practice";

const START_ERROR_TOAST = {
  PRACTICE_DAILY_LIMIT: "오늘 연습은 여기까지예요. 내일 또 해요!",
  PRACTICE_PLUS_ONLY: "루미 플러스에서 열리는 연습이에요.",
};

export default function Practice() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [starting, setStarting] = useState(false);
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
    getPracticeScenarios()
      .then((res) => {
        if (!ignore) setData(res);
      })
      .catch((e) => {
        if (ignore) return;
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

  const handleStart = async (scenario) => {
    if (starting) return; // 연속 클릭 → 횟수 2번 차감 방지
    setStarting(true);
    try {
      const session = await startPractice(scenario.scenarioId);
      navigate(`/practice/${scenario.code}`, {
        replace: true,
        state: {
          session,
          scenario: { title: scenario.title, partnerRole: scenario.partnerRole },
        },
      });
    } catch (e) {
      setStarting(false);
      if (!e.response || e.response.status >= 500) {
        navigate("/maintenance", { replace: true });
        return;
      }
      const code = e.response.data?.code;
      if (code === "ONBOARDING_REQUIRED") {
        navigate("/start-check", { replace: true });
        return;
      }
      if (code === "PRACTICE_DAILY_LIMIT") {
        setData((prev) => ({ ...prev, remainingToday: 0 }));
      }
      showToast(START_ERROR_TOAST[code] ?? "잠시 후 다시 시도해 주세요.");
    }
  };

  if (!data) return <PageLoading error={error} />;

  const { remainingToday, scenarios } = data;

  return (
    <div className="relative flex flex-1 flex-col bg-bg-page pb-8 pt-[27px]">
      <div className="px-4">
        <PracticeHeader title="연습실" onBack={() => navigate(-1)} />
      </div>

      <LumiMessage message={getPracticeLumiMessage(remainingToday)} />

      <ul className="mt-4 flex flex-col gap-3 px-4">
        {scenarios.map((scenario) => (
          <li key={scenario.code}>
            <ScenarioCard
              scenario={scenario}
              pieceName={scenario.rewardPieceName}
              pieceColor={scenario.rewardStageNo ? getRegion(scenario.rewardStageNo)?.color : undefined}
              disabled={remainingToday === 0 || starting}
              onClick={() => handleStart(scenario)}
            />
          </li>
        ))}
      </ul>

      {toast && (
        <div className="fixed bottom-10 left-1/2 z-50 w-[300px] -translate-x-1/2 rounded-full bg-[#15121F]/90 px-6 py-2 text-center text-xs text-[#F4EAD5]">
          {toast}
        </div>
      )}
    </div>
  );
}