import { useEffect, useRef, useState } from "react";
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import PracticeHeader from "../../components/Practice/PracticeHeader";
import ChatList from "../../components/Practice/ChatList";
import ChoiceChips from "../../components/Practice/ChoiceChips";
import ChatInput from "../../components/Practice/ChatInput";
import Button from "../../components/common/Button/Button";
import ConfirmModal from "../../components/common/ConfirmModal/ConfimModal";
import { finishPractice, sendPracticeTurn } from "../../api/practice";

// 세션이 끝났거나 멈춤 · 턴 초과 · 남의 세션 → 연습실로
const CLOSED_CODES = ["PRACTICE_SESSION_CLOSED", "PRACTICE_TURN_LIMIT", "NOT_FOUND"];

export default function PracticeChat() {
  const navigate = useNavigate();
  const { code } = useParams();
  const { state } = useLocation();
  const session = state?.session;
  const scenario = state?.scenario;

  // 대화 원문은 저장하지 않고 화면 상태로만 유지 (서버에는 매번 같이 보냄)
  const [messages, setMessages] = useState(() =>
    session ? [{ role: "partner", text: session.opening }] : [],
  );
  const [choices, setChoices] = useState(() => session?.choices ?? []);
  const [turn, setTurn] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isFinishing, setIsFinishing] = useState(false);
  const [isExitOpen, setIsExitOpen] = useState(false);
  const [toast, setToast] = useState("");
  const toastTimer = useRef(null);
  const aliveRef = useRef(true); // 응답 오기 전에 화면을 나가면 이동 · 상태 변경 안 함

  useEffect(() => {
    aliveRef.current = true; // StrictMode 이중 실행에도 다시 true
    return () => {
      aliveRef.current = false;
      clearTimeout(toastTimer.current);
    };
  }, []);

  // 연습실에서 시작하지 않고 들어옴 · 새로고침 (세션 정보 없음)
  if (!session || !scenario) return <Navigate to="/practice" replace />;

  const showToast = (message) => {
    clearTimeout(toastTimer.current);
    setToast(message);
    toastTimer.current = setTimeout(() => setToast(""), 2000);
  };

  const handleError = (e) => {
    if (!e.response || e.response.status >= 500) {
      navigate("/maintenance", { replace: true });
      return;
    }
    if (CLOSED_CODES.includes(e.response.data?.code)) {
      navigate("/practice", { replace: true });
      return;
    }
    showToast("보내지 못했어요. 다시 시도해 주세요.");
  };

  const handleSend = async (text) => {
    const message = text.trim();
    if (!message || isFinished || isTyping) return;

    const history = messages; // 이번 말 전까지의 대화
    setMessages([...history, { role: "user", text: message }]);
    setIsTyping(true);

    try {
      const res = await sendPracticeTurn(session.sessionId, message, history);
      if (!aliveRef.current) return;

      // 위기 감지 → 연출 없이 도움 받기 (서버가 이미 기록 · 세션 멈춤)
      if (res.crisisDetected) {
        navigate("/help?from=practice", { replace: true });
        return;
      }
      setMessages((prev) => [...prev, { role: "partner", text: res.reply }]);
      setTurn(res.turn);
      setChoices(res.choices ?? []);
      setIsFinished(res.finished);
    } catch (e) {
      if (!aliveRef.current) return;
      setMessages(history); // 보낸 말 되돌리기
      handleError(e);
    } finally {
      if (aliveRef.current) setIsTyping(false);
    }
  };

  const handleFinish = async () => {
    if (isFinishing) return;
    setIsFinishing(true);
    try {
      const result = await finishPractice(session.sessionId, messages);
      navigate(`/practice/${code}/feedback`, {
        replace: true,
        state: { title: scenario.title, ...result },
      });
    } catch (e) {
      if (!aliveRef.current) return;
      setIsFinishing(false);
      handleError(e);
    }
  };

  return (
    <div className="relative flex h-dvh flex-col bg-bg-page">
      <div className="border-b-2 border-[#2C2745] px-4 pb-3 pt-[27px]">
        <PracticeHeader
          title={scenario.title}
          subtitle={`루미가 ${scenario.partnerRole} 역할을 해요.`}
          turn={turn}
          maxTurns={session.maxTurns}
          onBack={() => setIsExitOpen(true)}
        />
      </div>

      <ChatList messages={messages} isTyping={isTyping} />

      <div className="border-t-[3px] border-[#2C2745] bg-[#15121F] px-4 pb-6 pt-3">
        {isFinished ? (
          <div className="flex justify-center">
            <Button
              title={isFinishing ? "피드백 만드는 중..." : "연습 끝! 피드백 보기"}
              onClick={handleFinish}
              disabled={isFinishing}
            />
          </div>
        ) : (
          // 추천 답변 칩 · 마이크는 ChatInput 안 위 줄 (마이크 = 보내기 바로 위)
          <ChatInput
            sessionId={session.sessionId}
            onSend={handleSend}
            onToast={showToast}
            onError={handleError}
            disabled={isTyping}
            renderTop={(voiceBusy) => (
              <ChoiceChips
                choices={choices}
                onSelect={handleSend}
                disabled={isTyping || voiceBusy}
              />
            )}
          />
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

      {toast && (
        <div className="fixed bottom-28 left-1/2 z-50 w-[300px] -translate-x-1/2 rounded-full bg-[#15121F]/90 px-6 py-2 text-center text-xs text-[#F4EAD5]">
          {toast}
        </div>
      )}
    </div>
  );
}