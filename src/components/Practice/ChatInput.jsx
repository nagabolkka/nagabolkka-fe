import { useState } from "react";
import { PRACTICE_MESSAGE_MAX } from "../../constants/practice";
import MicButton from "./MicButton";
import useVoiceRecorder, {
  isVoiceSupported,
} from "../../hooks/useVoiceRecorder";
import { transcribePractice } from "../../api/practice";

const PLACEHOLDER = {
  idle: "직접 말해봐도 좋아요.",
  recording: "● 듣고 있어요… 다 말하면 ■ 를 눌러 주세요",
  transcribing: "말한 내용을 글자로 바꾸고 있어요…",
};

// 위 줄 : 추천 답변 칩 (renderTop) + 마이크 · 아래 줄 : 입력창 + 보내기 (마이크 = 보내기 바로 위)
export default function ChatInput({
  sessionId,
  onSend,
  onToast,
  onError,
  renderTop,
  disabled = false,
}) {
  const [value, setValue] = useState("");
  const [status, setStatus] = useState("idle"); // idle · recording · transcribing
  const [fromVoice, setFromVoice] = useState(false); // 「말한 내용이에요」 안내
  const recorder = useVoiceRecorder();
  const voiceOn = isVoiceSupported(); // 녹음 안 되는 브라우저는 마이크 숨김
  const voiceBusy = status !== "idle";
  const canSend = value.trim().length > 0 && !disabled && !voiceBusy;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canSend) return;
    onSend(value);
    setValue("");
    setFromVoice(false);
  };

  // 녹음 → 글자 → 입력창에 채움 (보내기는 사용자가 확인하고 직접)
  const toText = async (blob) => {
    if (!blob) {
      setStatus("idle");
      onToast?.("조금 더 길게 말해 주세요.");
      return;
    }
    setStatus("transcribing");
    try {
      const { text } = await transcribePractice(sessionId, blob);
      if (text) {
        setValue(text.slice(0, PRACTICE_MESSAGE_MAX));
        setFromVoice(true);
      } else {
        onToast?.("잘 못 알아들었어요. 다시 말하거나 직접 적어 주세요.");
      }
    } catch (e) {
      onError?.(e); // 404 · 409 · 5xx 는 대화 보내기와 같은 처리
    } finally {
      setStatus("idle");
    }
  };

  const handleMic = async () => {
    if (status === "transcribing") return;
    if (status === "recording") {
      toText(await recorder.stop());
      return;
    }
    try {
      await recorder.start(toText); // 30초면 자동으로 toText
      setStatus("recording");
    } catch (e) {
      setStatus("idle");
      onToast?.(
        e?.name === "NotAllowedError"
          ? "마이크 권한이 꺼져 있어요. 설정에서 허용해 주세요."
          : "마이크를 쓸 수 없어요. 직접 적어 주세요.",
      );
    }
  };

  return (
    <div className="mt-3 flex flex-col gap-2">
      <div className="flex items-end gap-2">
        <div className="min-w-0 flex-1 pb-3">{renderTop?.(voiceBusy)}</div>
        {voiceOn && (
          <MicButton
            status={status}
            seconds={recorder.seconds}
            onClick={handleMic}
            disabled={disabled}
          />
        )}
      </div>

      {fromVoice && (
        <p className="flex items-center gap-1.5 text-[12px] text-[#F2C14E]">
          <span aria-hidden="true">🎤</span>
          <span>말한 내용이에요 · 고쳐서 보낼 수 있어요</span>
        </p>
      )}

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          maxLength={PRACTICE_MESSAGE_MAX}
          disabled={disabled || voiceBusy}
          placeholder={
            disabled ? "답을 기다리는 중이에요..." : PLACEHOLDER[status]
          }
          className={`min-w-0 flex-1 rounded-md border-2 bg-[#1E1A2E] px-3 py-2 text-base text-[#F4EAD5] outline-none placeholder:text-[#8E88A8] focus:border-[#E8C06A] disabled:opacity-60 ${
            status === "recording" ? "border-[#D9604C]" : "border-[#3A3358]"
          }`}
        />
        <button
          type="submit"
          disabled={!canSend}
          className="h-11 w-[62px] shrink-0 cursor-pointer rounded-md border-2 border-[#E8C06A] bg-[#E8C06A] font-pixel text-xs text-[#15121F] disabled:cursor-not-allowed disabled:opacity-40"
        >
          보내기
        </button>
      </form>
    </div>
  );
}
