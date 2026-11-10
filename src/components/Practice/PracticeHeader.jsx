import backButton from "../../assets/images/backButton.svg";

export default function PracticeHeader({
  title,
  subtitle,
  turn,
  maxTurns,
  onBack,
}) {
  return (
    <header className="flex items-start gap-3">
      <button
        type="button"
        onClick={onBack}
        className="cursor-pointer"
        aria-label="뒤로가기"
      >
        <img src={backButton} alt="" className="h-[22px] w-[22px]" />
      </button>
      <div className="min-w-0 flex-1">
        <h1 className="font-pixel text-base font-normal text-[#F4EAD5]">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-0.5 text-[10px] text-[#B9B0D0]">{subtitle}</p>
        )}
      </div>
      {maxTurns != null && (
        <span className="font-pixel text-xs text-[#B9B0D0]">
          {turn}/{maxTurns}
        </span>
      )}
    </header>
  );
}
