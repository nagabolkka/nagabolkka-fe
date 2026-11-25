import { useEffect } from "react";
import { DIFFICULTY, DIFFICULTY_LEVELS } from "../../constants/difficulty";

// 오늘 퀘스트 난이도 시트 : Lv.1 ~ 3 카드 · 오늘 남은 횟수 · 더 쉽게 / 더 어렵게
// current : 지금 퀘스트 난이도 · remaining : 오늘 남은 난이도 바꾸기 횟수 (0 · 1)
export default function DifficultySheet({
  current,
  remaining = 0,
  submitting = false,
  onClose,
  onChange, // ("EASIER" | "HARDER") => void
}) {
  const index = DIFFICULTY_LEVELS.findIndex((level) => level.key === current);
  const canChange = remaining > 0;
  const canEasier = canChange && index > 0;
  const canHarder = canChange && index < DIFFICULTY_LEVELS.length - 1;

  // 시트가 열려 있는 동안 뒤 화면 스크롤 막기
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const labelOf = (i) => DIFFICULTY[DIFFICULTY_LEVELS[i].key].label;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end bg-black/55"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="오늘 퀘스트 난이도"
        className="w-full rounded-t-[18px] bg-[#F4EAD5] px-5 pb-7 pt-3"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto h-1 w-10 rounded-full bg-[#C9B48E]" />

        <h2 className="mt-4 font-pixel text-lg text-[#15121F]">
          오늘 퀘스트 난이도
        </h2>
        <p className="mt-1 break-keep text-xs text-[#15121F]/65">
          {canChange
            ? "오늘 컨디션에 맞춰 한 단계씩 바꿀 수 있어요."
            : "오늘은 이미 한 번 바꿨어요. 내일 다시 바꿀 수 있어요."}
        </p>

        {/* 단계 카드 */}
        <ul className="mt-4 grid grid-cols-3 gap-2">
          {DIFFICULTY_LEVELS.map((level, i) => {
            const difficulty = DIFFICULTY[level.key];
            const isCurrent = i === index;
            const isNext = canChange && Math.abs(i - index) === 1;
            const dim = !isCurrent && !isNext;
            return (
              <li
                key={level.key}
                className={`flex flex-col items-center gap-1.5 rounded-[10px] px-2 py-3 ${
                  isCurrent
                    ? "border-2 border-[#2B2340]"
                    : isNext
                      ? "border-[1.5px] border-dashed border-[#2B2340] bg-white/55"
                      : "border-[1.5px] border-[#2B2340]/35 bg-white/55"
                }`}
                style={isCurrent ? { backgroundColor: difficulty.bgColor } : undefined}
              >
                <div className="flex items-center gap-1">
                  <span className="text-[10px] font-bold text-[#2B2340]/70">
                    Lv.{level.level}
                  </span>
                  {isCurrent && (
                    <span className="rounded bg-[#2B2340] px-1 text-[9px] font-bold text-[#F4EAD5]">
                      지금
                    </span>
                  )}
                  {isNext && (
                    <span className="rounded border border-[#2B2340] bg-[#F2C14E] px-1 text-[9px] font-bold text-[#2B2340]">
                      {i < index ? "▼" : "▲"}
                    </span>
                  )}
                </div>
                <span
                  className="my-1 h-3.5 w-3.5 rotate-45 border-[1.5px] border-[#2B2340]"
                  style={{ backgroundColor: isCurrent ? "#2B2340" : difficulty.bgColor }}
                />
                <p
                  className={`font-pixel text-[15px] text-[#15121F] ${dim ? "opacity-45" : ""}`}
                >
                  {difficulty.label}
                </p>
                <p
                  className={`text-[10px] text-[#15121F] ${dim ? "opacity-40" : "opacity-70"}`}
                >
                  {level.slotNo}칸 조각
                </p>
              </li>
            );
          })}
        </ul>

        {/* 오늘 남은 횟수 */}
        <div className="mt-3.5 flex items-center justify-between rounded-lg bg-[#E8DCC0] px-3 py-2.5">
          <p className="text-xs text-[#15121F]/80">오늘 바꿀 수 있는 횟수</p>
          <p className="flex items-center gap-1.5 text-[13px] font-bold text-[#15121F]">
            <span
              className={`h-2.5 w-2.5 rotate-45 border-[1.5px] border-[#2B2340] ${
                canChange ? "bg-[#F2C14E]" : ""
              }`}
            />
            {remaining} / 1
          </p>
        </div>

        <p className="mt-3 break-keep text-[11px] leading-relaxed text-[#15121F]/60">
          {canChange ? (
            <>
              · 바꾸면 이 계단의 다른 퀘스트가 새로 정해지고, 받을 조각도
              달라져요.
              <br />· 수락하기 전까지만 바꿀 수 있어요. 바꾸기 횟수(2번)는
              그대로예요.
            </>
          ) : (
            "· 받은 조각과 기록은 그대로예요. 지금 퀘스트를 천천히 해 봐요."
          )}
        </p>

        {/* 버튼 */}
        <div className="mt-4 grid grid-cols-2 gap-2.5">
          <button
            type="button"
            disabled={!canEasier || submitting}
            onClick={() => onChange("EASIER")}
            className="flex flex-col items-center rounded-[10px] border-2 border-[#2B2340] bg-[#E8DCC0] py-2.5 text-[#2B2340] disabled:opacity-40"
          >
            <span className="font-pixel text-[15px]">▼ 더 쉽게</span>
            <span className="text-[10px] opacity-70">
              {index === 0 ? "가장 쉬운 단계예요" : `${labelOf(index - 1)}으로`}
            </span>
          </button>
          <button
            type="button"
            disabled={!canHarder || submitting}
            onClick={() => onChange("HARDER")}
            className="flex flex-col items-center rounded-[10px] border-2 border-[#2B2340] bg-[#F2C14E] py-2.5 text-[#2B2340] shadow-[0_3px_0_#2B2340] active:translate-y-px active:shadow-none disabled:opacity-40 disabled:shadow-none"
          >
            <span className="font-pixel text-[15px]">▲ 더 어렵게</span>
            <span className="text-[10px] opacity-70">
              {submitting
                ? "바꾸는 중..."
                : index === DIFFICULTY_LEVELS.length - 1
                  ? "가장 어려운 단계예요"
                  : `${labelOf(index + 1)}으로`}
            </span>
          </button>
        </div>

        <button
          type="button"
          onClick={onClose}
          disabled={submitting}
          className="mx-auto mt-4 block text-[13px] font-bold text-[#2B2340]/70"
        >
          {canChange ? "그대로 할게요" : "확인"}
        </button>
      </div>
    </div>
  );
}