const LOCKED_BORDER = "#15121F";
const LOCKED_FILL = "#2C2745";
const ACTIVE_FILL = "#3A3550";
const LOCKED_TEXT = "#F4EAD5";
const LINE_COLOR = "#4A4370";

// 색칠 : 완료 · 지나온 곳 · 복원도 100% 인 현재 지역
const isFilled = (region) =>
  region.status === "COMPLETED" ||
  region.status === "PASSED" ||
  (region.isCurrent && region.restoration === 100);

export default function AdventurePath({ regions, onSelectPassed }) {
  return (
    <section className="px-2 mt-4">
      <h2 className="px-1.5 text-[#B9B0D0] text-base font-normal font-pixel">
        모험의 길
      </h2>

      <ol className="mt-1 flex">
        {regions.map((region, i) => {
          const isLocked = region.status === "LOCKED";
          const isCompleted = isFilled(region);
          const isCurrent = region.isCurrent;

          // 지나온 계단 (현재 지역 제외) → 누르면 그 계단 미션 안내
          const isPassed =
            !isCurrent &&
            (region.status === "PASSED" || region.status === "COMPLETED");

          const isFirst = i === 0;
          const isLast = i === regions.length - 1;

          const prev = regions[i - 1];
          const leftColor = prev && isFilled(prev) ? prev.color : LINE_COLOR;
          const rightColor = isCompleted ? region.color : LINE_COLOR;

          return (
            <li
              key={region.stageNo}
              className={`flex-1 flex flex-col items-center ${isPassed ? "cursor-pointer" : ""}`}
              onClick={isPassed ? () => onSelectPassed?.(region) : undefined}
              role={isPassed ? "button" : undefined}
              aria-label={isPassed ? `${region.name} 미션 도전하기` : undefined}
            >
              <div className="w-full h-[52px] flex items-center">
                <Line color={leftColor} hidden={isFirst} side="left" />

                {/* 크기 : 현재 지역만 크게 / 색 : 잠김 · 진행 중 · 완료(지나온 곳 포함) */}
                <div
                  className={`shrink-0 flex items-center justify-center ${isCurrent ? "w-12" : "w-10"}`}
                >
                  <div
                    className={`rotate-45 border-[3px] transition-all duration-500 ${
                      isCurrent ? "w-[34px] h-[34px]" : "w-7 h-7"
                    }`}
                    style={{
                      borderColor: isLocked ? LOCKED_BORDER : region.color,
                      backgroundColor: isCompleted
                        ? region.color
                        : isCurrent
                          ? ACTIVE_FILL
                          : LOCKED_FILL,
                    }}
                  />
                </div>

                <Line color={rightColor} hidden={isLast} side="right" />
              </div>

              <p
                className="mt-1.5 text-xs font-normal font-pixel whitespace-nowrap"
                style={{ color: isLocked ? LOCKED_TEXT : region.color }}
              >
                {region.name}
              </p>

              {/* 지나온 계단 → 누를 수 있다는 표시 */}
              {isPassed && (
                <p className="mt-0.5 text-[10px] text-[#B9B0D0] font-sans">
                  도전 가능
                </p>
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}

function Line({ color, hidden, side }) {
  return (
    <div
      className={`flex-1 h-[3px] transition-colors duration-500 ${
        side === "left" ? "rounded-l-full" : "rounded-r-full"
      }`}
      style={{ backgroundColor: hidden ? "transparent" : color }}
    />
  );
}
