import LumiMessage from "../common/LumiMessage/LumiMessage";

export default function SplitSteps({ steps, doneSteps, onToggle }) {
  return (
    <section className="mt-5">
      <p className="text-[#E8C06A] text-xs font-normal font-pixel pl-[14px]">루미가 쪼갠 퀘스트</p>

      <div className="mt-2">
        <LumiMessage message="하나만 해도 오늘의 한 걸음이야." />
      </div>

      <ol className="mt-3 flex flex-col gap-2.5 pl-[14px]">
        {steps.map((step, i) => {
          const isDone = doneSteps.includes(i);
          return (
            <li key={step}>
              <button
                type="button"
                onClick={() => onToggle(i)}
                className={`w-[360px] h-[61px] px-4 py-3 flex items-center gap-[13px] text-left rounded-xl border-[3px] border-[#E6D6B0] cursor-pointer transition-colors ${
                  isDone ? "bg-[#E8D9B0]" : "bg-[#F4EAD5]"
                }`}
              >
                {/* 체크박스 */}
                <span
                  className={`shrink-0 w-6 h-6 rounded-[5px] border-2 border-[#15121F] flex items-center justify-center ${
                    isDone ? "bg-[#E8C06A]" : "bg-white"
                  }`}
                >
                  {isDone && (
                    <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                      <path d="M1 5L4.5 8.5L11 1.5" stroke="#F4EAD5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </span>

                <span>
                  <span className="block text-[#A09480] text-[11px] font-normal font-sans">조각 {i + 1}</span>
                  <span
                    className={`block text-[#15121F] text-sm font-normal font-pixel ${
                      isDone ? "line-through decoration-[#6B5E4A]" : ""
                    }`}
                  >
                    {step}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      <p className="mt-[13px] text-center text-[#B0AAAA] text-sm font-medium font-sans">
        조각을 하나라도 해내면 기록할 수 있어요.
      </p>
    </section>
  );
}