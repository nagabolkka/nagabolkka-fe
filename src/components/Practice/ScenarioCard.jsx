import { PRACTICE_MAX_TURNS } from "../../constants/practice";

export default function ScenarioCard({
  scenario,
  pieceName,
  pieceColor,
  disabled,
  onClick,
}) {
  const { title, description, partnerRole } = scenario;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="w-full cursor-pointer rounded-[10px] border-[3px] border-[#E6D6B0] bg-[#F4EAD5] px-3.5 py-3 text-left disabled:cursor-not-allowed disabled:opacity-50"
    >
      <div className="flex items-center justify-between">
        <h2 className="font-pixel text-xl font-normal leading-6 text-[#2B2340]">
          {title}
        </h2>
        <span className="font-pixel font-normal text-[10px] text-[#6B5E4A]">
          {PRACTICE_MAX_TURNS}턴
        </span>
      </div>
      <p className="mt-1 text-sm font-medium font-sans leading-6 text-black">
        {description}
      </p>

      <div className="mt-2 flex items-center justify-between">
        <p className="text-xs font-normal font-sans text-[#6B5E4A]">
          상대역 · {partnerRole}
        </p>
        <p className="flex items-center gap-1.5 text-[10px] font-medium font-sans text-[#6B5E4A]">
          <span
            className="h-2.5 w-2.5 rotate-45 border-[1.5px] border-[#2B2340]"
            style={{ backgroundColor: pieceColor }}
          />
          {pieceName}
        </p>
      </div>
    </button>
  );
}
