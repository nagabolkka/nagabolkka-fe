import LumiMessage from "../common/LumiMessage/LumiMessage";

// 기내 안내 : 작게 나눈 단계 체크
export default function SplitSteps({ steps, doneSteps, onToggle }) {
  const nextIndex = steps.findIndex((_, i) => !doneSteps.includes(i));

  return (
    <section className="mt-4">
      <LumiMessage message="하나만 해도 오늘의 한 걸음이에요." pose="passenger" />

      <h2 className="mt-4 px-5 font-serif text-base font-bold text-navy">
        기내 안내 · 작게 나눈 {steps.length}단계
      </h2>

      <ol className="mx-4 mt-2 overflow-hidden rounded-2xl border border-line bg-ticket">
        {steps.map((step, i) => {
          const isDone = doneSteps.includes(i);
          const tag = isDone ? "완료" : i === nextIndex ? "지금" : "다음";
          return (
            <li key={step} className={i ? "border-t border-line" : ""}>
              <button
                type="button"
                onClick={() => onToggle(i)}
                aria-pressed={isDone}
                className="w-full min-h-[64px] px-4 py-3 flex items-center gap-3 text-left cursor-pointer"
              >
                <span
                  className={`shrink-0 w-8 h-8 rounded-full border-2 border-navy flex items-center justify-center text-[13px] font-bold ${
                    isDone ? "bg-navy text-brass" : "bg-white text-navy"
                  }`}
                >
                  {isDone ? "✓" : i + 1}
                </span>
                <span
                  className={`flex-1 text-[15px] font-bold break-keep ${
                    isDone ? "text-mute line-through" : "text-navy"
                  }`}
                >
                  {step}
                </span>
                <span
                  className={`label-en text-[10px] ${tag === "지금" ? "text-stamp-red" : "text-mute"}`}
                >
                  {tag}
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      <p className="mt-3 text-center text-[13px] text-mute">
        하나만 해도 도장을 받을 수 있어요.
      </p>
    </section>
  );
}