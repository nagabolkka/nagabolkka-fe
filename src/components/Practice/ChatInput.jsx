import { useState } from "react";
import { PRACTICE_MESSAGE_MAX } from "../../constants/practice";

export default function ChatInput({ onSend, disabled = false }) {
  const [value, setValue] = useState("");
  const canSend = value.trim().length > 0 && !disabled;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canSend) return;
    onSend(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit} className="mt-3 flex gap-2">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        maxLength={PRACTICE_MESSAGE_MAX}
        disabled={disabled}
        placeholder={disabled ? "답을 기다리는 중이에요..." : "직접 말해봐도 좋아요."}
        className="min-w-0 flex-1 rounded-md border-2 border-[#3A3358] bg-[#1E1A2E] px-3 py-2 text-xs text-[#F4EAD5] outline-none placeholder:text-[#8E88A8] focus:border-[#E8C06A] disabled:opacity-60"
      />
      <button
        type="submit"
        disabled={!canSend}
        className="shrink-0 cursor-pointer rounded-md border-2 border-[#15121F] bg-[#E8C06A] px-4 font-pixel text-xs text-[#15121F] disabled:cursor-not-allowed disabled:opacity-40"
      >
        보내기
      </button>
    </form>
  );
}