const LOCKED_BORDER = "#15121F";
const LOCKED_FILL = "#2C2745";
const ACTIVE_FILL = "#3A3550";
const LOCKED_TEXT = "#F4EAD5";
const LINE_COLOR = "#4A4370";

export default function AdventurePath({ regions }) {
  return (
    <section className="px-2 mt-4">
      <h2 className="px-1.5 text-[#B9B0D0] text-base font-normal font-pixel">
        모험의 길
      </h2>

      <ol className="mt-1 flex">
        {regions.map((region, i) => {
          const isLocked = region.status === "LOCKED";
          const isCompleted = region.status === "COMPLETED";
          const isCurrent = region.isCurrent;

          const isFirst = i === 0;
          const isLast = i === regions.length - 1;

          const prev = regions[i - 1];
          const leftColor = prev?.status === "COMPLETED" ? prev.color : LINE_COLOR;
          const rightColor = isCompleted ? region.color : LINE_COLOR;

          return (
            <li key={region.stageNo} className="flex-1 flex flex-col items-center">
              <div className="w-full h-[52px] flex items-center">
                <Line color={leftColor} hidden={isFirst} side="left" />

                {/* 크기 : 현재 지역만 크게 / 색 : 잠김 · 진행 중 · 완료 */}
                <div className={`shrink-0 flex items-center justify-center ${isCurrent ? "w-12" : "w-10"}`}>
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