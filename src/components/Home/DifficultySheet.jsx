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
      className="fixed inset-0 z-50 flex items-end bg-navy-deep/55"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="오늘 탑승권 등급"
        className="w-full rounded-t-[22px] bg-ticket px-5 pb-7 pt-3"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto h-1 w-10 rounded-full bg-line" />

        <h2 className="mt-4 font-serif text-xl font-bold text-navy">비자 등급 바꾸기</h2>
        <p className="mt-1 break-keep text-[13px] text-mute">
          {canChange
            ? "오늘 컨디션에 맞춰 한 단계씩 · 하루 1번"
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
                className={`flex flex-col items-center gap-1 rounded-xl px-2 py-3 ${
                  isCurrent
                    ? "border-[2.5px] border-navy"
                    : isNext
                      ? "border-[1.5px] border-dashed border-navy bg-white"
                      : "border-[1.5px] border-line bg-white"
                }`}
                style={isCurrent ? { backgroundColor: difficulty.bgColor } : undefined}
              >
                <span className={`font-serif text-xl font-bold text-navy ${dim ? "opacity-40" : ""}`}>
                  {["Ⅰ", "Ⅱ", "Ⅲ"][i]}
                </span>
                <p className={`text-[15px] font-bold text-navy ${dim ? "opacity-45" : ""}`}>
                  {difficulty.label}
                </p>
                <p className="h-4 text-[11px] font-bold">
                  {isCurrent ? (
                    <span className="text-mute">지금</span>
                  ) : isNext ? (
                    <span className="text-stamp-red">{i < index ? "▼ 다음" : "▲ 다음"}</span>
                  ) : null}
                </p>
                <p className={`text-[11px] text-mute ${dim ? "opacity-60" : ""}`}>
                  {level.slotNo}칸 도장
                </p>
              </li>
            );
          })}
        </ul>

        {/* 오늘 남은 횟수 */}
        <div className="mt-3.5 flex items-center justify-between rounded-xl bg-paper px-3.5 py-2.5">
          <p className="text-[13px] text-navy">오늘 바꿀 수 있는 횟수</p>
          <p className="text-sm font-bold text-navy">{remaining} / 1</p>
        </div>

        <p className="mt-3 break-keep text-[11px] leading-relaxed text-mute">
          {canChange ? (
            <>
              · 바꾸면 이 섬의 다른 퀘스트가 새로 정해지고, 받을 도장도 달라져요.
              <br />· 탑승하기 전까지만 바꿀 수 있어요. 다른 편 바꾸기(2번)는 그대로예요.
            </>
          ) : (
            "· 받은 도장과 기록은 그대로예요. 지금 탑승권으로 천천히 다녀와요."
          )}
        </p>

        {/* 버튼 */}
        <div className="mt-4 grid grid-cols-2 gap-2.5">
          <button
            type="button"
            disabled={!canEasier || submitting}
            onClick={() => onChange("EASIER")}
            className="flex flex-col items-center rounded-xl border-[1.5px] border-navy bg-white py-2.5 text-navy cursor-pointer disabled:opacity-40 disabled:cursor-default"
          >
            <span className="text-[15px] font-bold">▼ 더 쉽게</span>
            <span className="text-[10px] text-mute">
              {index === 0 ? "가장 쉬운 단계예요" : `${labelOf(index - 1)}으로`}
            </span>
          </button>
          <button
            type="button"
            disabled={!canHarder || submitting}
            onClick={() => onChange("HARDER")}
            className="flex flex-col items-center rounded-xl bg-navy py-2.5 text-brass cursor-pointer disabled:opacity-40 disabled:cursor-default"
          >
            <span className="text-[15px] font-bold">▲ 더 어렵게</span>
            <span className="text-[10px] text-mute-on-navy">
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
          className="mx-auto mt-4 block text-[13px] font-bold text-mute cursor-pointer"
        >
          {canChange ? "그대로 할게요" : "확인"}
        </button>
      </div>
    </div>
  );
}