// 마이크 버튼 (보내기 바로 위) · status : idle · recording · transcribing
const STYLE = {
  idle: "border-[#F2C14E] bg-[#1B1830] text-[#F2C14E]",
  recording: "border-[#2B2340] bg-[#D9604C] text-[#F4EAD5]",
  transcribing: "border-[#2B2340] bg-[#3A3358] text-[#F4EAD5]",
};

const LABEL = {
  idle: "말로 입력하기",
  recording: "녹음 멈추기",
  transcribing: "글자로 바꾸는 중",
};

const formatTime = (seconds) =>
  `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;

function MicIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19 10v2a7 7 0 0 1-14 0v-2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 19v3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function MicButton({
  status,
  seconds,
  onClick,
  disabled = false,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={LABEL[status]}
      aria-busy={status === "transcribing"}
      className={`flex h-11 w-[62px] shrink-0 cursor-pointer items-center justify-center gap-1 rounded-md border-2 ${STYLE[status]} disabled:cursor-not-allowed disabled:opacity-40`}
    >
      {status === "recording" && (
        <>
          <span className="size-2.5 rounded-[2px] bg-[#F4EAD5]" />
          <span className="font-pixel text-[11px]">{formatTime(seconds)}</span>
        </>
      )}
      {status === "transcribing" && (
        <span className="font-pixel text-sm tracking-widest">···</span>
      )}
      {status === "idle" && <MicIcon />}
    </button>
  );
}
