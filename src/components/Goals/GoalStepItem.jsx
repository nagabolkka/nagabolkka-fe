export default function GoalStepItem({ step, onToggle }) {
  const { stepNo, content, checked } = step;

  return (
    <button
      type="button"
      onClick={onToggle}
      className="flex w-full cursor-pointer items-center gap-3 rounded-md border-[1.5px] border-[#2B2340] px-3 py-2 text-left"
    >
      <span
        className={`flex h-4 w-4 shrink-0 items-center justify-center border-2 border-[#2B2340] ${
          checked ? "bg-[#2B2340]" : "bg-white"
        }`}
      >
        {checked && (
          <span className="text-[10px] leading-none text-[#F4EAD5]">✓</span>
        )}
      </span>
      <div>
        <p className="font-pixel text-[10px] text-[#9C9081]">STEP {stepNo}</p>
        <p className="mt-0.5 text-sm text-[#15121F]">{content}</p>
      </div>
    </button>
  );
}
