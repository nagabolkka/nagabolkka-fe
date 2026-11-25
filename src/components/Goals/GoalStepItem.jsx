export default function GoalStepItem({ step, disabled = false, onToggle }) {
  const { stepNo, content, checked } = step;

  return (
    <button
      type="button"
      onClick={onToggle}
      disabled={disabled}
      aria-pressed={checked}
      className="flex w-full items-center gap-3 px-4 py-3.5 text-left cursor-pointer disabled:cursor-wait disabled:opacity-60"
    >
      <span
        aria-hidden
        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 border-navy ${
          checked ? "bg-brass" : "bg-white"
        }`}
      >
        {checked && <span className="text-xs font-bold leading-none text-navy">✓</span>}
      </span>
      <div className="min-w-0">
        <p className="label-en text-[9px] text-mute">STEP {stepNo}</p>
        <p className={`text-[15px] font-bold break-keep ${checked ? "text-mute line-through" : "text-navy"}`}>
          {content}
        </p>
      </div>
    </button>
  );
}