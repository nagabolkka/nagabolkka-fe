export default function RewardCard({ reward, color }) {
  return (
    <section className="w-[351px] h-[68px] px-[14px] py-[11px] mx-6 mt-[21px] flex items-center gap-[14px] rounded-[10px] border-2 border-[#E6D6B0] bg-[#F4EAD5]">
      <div className="shrink-0 w-10 h-10 flex items-center justify-center">
        <div
          className="w-[25px] h-[25px] rotate-45 border-[3px] border-[#2B2340]"
          style={{ backgroundColor: color }}
        />
      </div>

      <div>
        <p className="text-[#6B5E4A] text-xs font-normal font-pixel">
          퀘스트 보상
        </p>
        <p className="text-[#2B2340] text-base font-normal font-pixel leading-5">
          {reward.name}
        </p>
      </div>
    </section>
  );
}
