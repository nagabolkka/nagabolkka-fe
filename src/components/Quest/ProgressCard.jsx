import LumiMessage from "../common/LumiMessage/LumiMessage";

export default function ProgressCard({ mission, color, onSplit }) {
  return (
    <section className="mt-[19px]">
      <p className="text-[#F2C14E] text-sm font-normal font-pixel pl-[14px]">
        진행 중 · 한 번에 하나의 퀘스트
      </p>

      {/* 진행 중 카드 */}
      <div className="w-[364px] h-[66px] mt-2.5 mx-[14px] px-[14px] py-2.5 flex items-center gap-[14px] rounded-[10px] border-2 border-[#E6D6B0] bg-[#F4EAD5]">
        <div className="shrink-0 w-8 h-8 flex items-center justify-center">
          <div
            className="w-5 h-5 rotate-45 border-[3px] border-[#2B2340]"
            style={{ backgroundColor: color }}
          />
        </div>
        <div className="min-w-0">
          <p className="text-[#2B2340] text-base font-normal font-pixel leading-5 break-keep">
            {mission.title}
          </p>
          <p className="mt-0.5 text-[#6B5E4A] text-xs font-medium font-sans">
            다녀오면 아래 버튼을 눌러 기록해줘.
          </p>
        </div>
      </div>

      <div className="mt-2.5">
        <LumiMessage message="천천히 다녀와. 여기서 기다릴게." />
      </div>

      <button
        type="button"
        onClick={onSplit}
        className="mt-[18px] text-[#B9B0D0] text-xs font-medium font-sans underline cursor-pointer pl-[21px]"
      >
        역시 어려워요? 퀘스트 쪼개기
      </button>
    </section>
  );
}
