import backButton from "../../assets/images/back_button.png";

export default function ProgressBar({ step, total, onBack }) {
  // step: 현재 단계 (1부터 시작)
  const getColor = (i) => {
    const n = i + 1;
    if (n < step) return "bg-[#F2C14E]";   // 지나온 단계
    if (n === step) return "bg-[#8A7A3A]"; // 현재 단계
    return "bg-[#2C2745]";                 // 아직 안 간 단계
  };

  return (
    <div className="flex items-center gap-2 pt-[23px] pl-[9px] pr-4 mb-[18px]">
      <button type="button" onClick={onBack} className="shrink-0 cursor-pointer">
        <img src={backButton} />
      </button>

      <div className="flex flex-1 gap-1.5">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={`h-2.5 flex-1 rounded-xs border border-black transition-colors duration-200 ${getColor(i)}`}
          />
        ))}
      </div>

      <span className="shrink-0 font-pixel text-xs font-normal text-[#F2C14E]">
        {step}/{total}
      </span>
    </div>
  );
}