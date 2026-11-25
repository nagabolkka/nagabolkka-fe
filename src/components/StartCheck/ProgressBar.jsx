// 출국 심사 진행 바
export default function ProgressBar({ step, total, onBack }) {
  return (
    <div className="flex items-center gap-2 pt-5 px-3 mb-4">
      <button
        type="button"
        onClick={onBack}
        aria-label="뒤로"
        className="shrink-0 w-10 h-10 flex items-center justify-center text-[28px] leading-none text-navy cursor-pointer"
      >
        ‹
      </button>

      <div className="flex-1">
        <p className="label-en text-[10px] text-mute">
          DEPARTURE CHECK {step} / {total}
        </p>
        <div className="mt-1 h-1.5 w-full rounded-full bg-line overflow-hidden">
          <div
            className="h-full rounded-full bg-navy transition-all duration-300"
            style={{ width: `${(step / total) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}