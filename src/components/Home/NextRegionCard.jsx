import { iGa, euro } from "../../utils/josa";

export default function NextRegionCard({ region, nextRegion, onStay, onOpen }) {
  return (
    <section className="mx-3 mt-4 p-[14px] rounded-[10px] border-[3px] border-[#E8C06A] bg-gradient-to-b from-[#3A3360] to-[#2C2745]">
      <p className="text-[#E8C06A] text-xs font-normal font-pixel">새로운 길이 보여요</p>

      <h2 className="mt-1.5 text-[#F4EAD5] text-lg font-normal font-pixel leading-6 break-keep">
        {region.name}
        {iGa(region.name)} 다시 살아났어요. {nextRegion.name}
        {euro(nextRegion.name)} 가는 길을 열어볼까요?
      </h2>

      <p className="mt-1.5 text-[#B9B0D0] text-xs font-normal font-sans">
        지금 지역에 더 머물러도 모은 조각은 그대로예요.
      </p>

      <div className="mt-3 flex gap-2.5">
        <button
          type="button"
          onClick={onStay}
          className="flex-1 h-[52px] rounded-[10px] border-[3px] border-[#15121F] bg-[#2C2745] text-[#F4EAD5] text-base font-bold font-pixel cursor-pointer"
        >
          지금이 좋아요
        </button>
        <button
          type="button"
          onClick={onOpen}
          className="flex-1 h-[52px] rounded-[10px] border-[3px] border-[#15121F] bg-[#E8C06A] text-[#2B2340] text-base font-bold font-pixel cursor-pointer"
        >
          열어볼게요
        </button>
      </div>
    </section>
  );
}