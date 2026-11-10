import { useEffect, useRef, useState } from "react";
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import PracticeHeader from "../../components/Practice/PracticeHeader";
import ChatList from "../../components/Practice/ChatList";
import ChoiceChips from "../../components/Practice/ChoiceChips";
import ChatInput from "../../components/Practice/ChatInput";
import Button from "../../components/common/Button/Button";
import ConfirmModal from "../../components/common/ConfirmModal/ConfimModal";
import { getScenario } from "../../mocks/practiceScenarios";
import { PRACTICE_MAX_TURNS } from "../../constants/practice";
import { givePracticePiece } from "../../utils/practiceStorage";

const TYPING_DELAY_MS = 1200; // 루미가 답을 쓰는 척 기다리는 시간

export default function PracticeChat() {
  const navigate = useNavigate();
  const { code } = useParams();
  const { state } = useLocation();
  const scenario = getScenario(code);

  // 대화 원문은 저장하지 않고 화면 상태로만 유지
  const [messages, setMessages] = useState(() =>
    scenario ? [{ role: "partner", text: scenario.opening }] : [],
  );
  const [turn, setTurn] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [isExitOpen, setIsExitOpen] = useState(false);
  const timerRef = useRef(null);

  // 화면을 나가면 대기 중인 답변 취소
  useEffect(() => () => clearTimeout(timerRef.current), []);

  // 없는 시나리오 · 연습실을 거치지 않고 들어온 경우
  if (!scenario || !state?.started) return <Navigate to="/practice" replace />;

  const isFinished = turn >= PRACTICE_MAX_TURNS;
  const choices = isFinished
    ? []
    : turn === 0
      ? scenario.openingChoices
      : scenario.turns[turn - 1].choices;

  const handleSend = (text) => {
    const trimmed = text.trim();
    if (!trimmed || isFinished || isTyping) return;

    const { reply } = scenario.turns[turn];

    // 1) 내 말 먼저 표시 → 2) 입력 중 표시 → 3) 잠시 뒤 루미 답변
    setMessages((prev) => [...prev, { role: "user", text: trimmed }]);
    setIsTyping(true);

    timerRef.current = setTimeout(() => {
      setMessages((prev) => [...prev, { role: "partner", text: reply }]);
      setTurn((prev) => prev + 1);
      setIsTyping(false);
    }, TYPING_DELAY_MS);
  };

  const handleFinish = () => {
    const isNew = givePracticePiece();
    navigate(`/practice/${code}/feedback`, {
      replace: true,
      state: { feedback: scenario.feedback, isNew },
    });
  };

  return (
    <div className="relative flex h-dvh flex-col bg-bg-page">
      <div className="border-b-2 border-[#2C2745] px-4 pb-3 pt-[27px]">
        <PracticeHeader
          title={scenario.title}
          subtitle={`루미가 ${scenario.partnerRole} 역할을 해요.`}
          turn={turn}
          maxTurns={PRACTICE_MAX_TURNS}
          onBack={() => setIsExitOpen(true)}
        />
      </div>

      <ChatList messages={messages} isTyping={isTyping} />

      <div className="border-t-[3px] border-[#2C2745] bg-[#15121F] px-4 pb-6 pt-3">
        {isFinished ? (
          <div className="flex justify-center">
            <Button title="연습 끝! 피드백 보기" onClick={handleFinish} />
          </div>
        ) : (
          <>
            <ChoiceChips choices={choices} onSelect={handleSend} disabled={isTyping} />
            <ChatInput onSend={handleSend} disabled={isTyping} />
          </>
        )}
      </div>

      {isExitOpen && (
        <ConfirmModal
          title="연습을 그만할까요?"
          description={"지금 나가면 오늘 연습 횟수는\n1회 사용한 걸로 남아요."}
          confirmText="나가기"
          onCancel={() => setIsExitOpen(false)}
          onConfirm={() => navigate("/practice", { replace: true })}
        />
      )}
    </div>
  );
}