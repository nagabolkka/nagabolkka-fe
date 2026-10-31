import lumi from "../../assets/icons/lumi_start_check.png";

export default function QuestionHeader({ step, question }) {
  return (
    <div className="flex items-center pl-3 mb-[23px] gap-[10px]">
      <img
        src={lumi}
        className="w-10 h-10 shrink-0 rounded-full drop-shadow-[0_0_16px_rgba(255,214,120,0.45)]"
      />
      <div className="flex flex-col gap-1 min-w-0">
        <p className="text-[10px] font-pixel leading-4 text-[#B9B0D0]">
          시작 체크 · 질문 {step}
        </p>
        <p className="text-xl font-pixel leading-7 text-[#F4EAD5] break-keep">
          {question}
        </p>
      </div>
    </div>
  );
}
