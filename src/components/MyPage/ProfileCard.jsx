export default function ProfileCard({ me }) {
  const { nickname, currentRegion, pieceCount, collection } = me;

  return (
    <section className="flex w-[357px] h-[84px] p-[15px] items-center gap-[15px] rounded-[10px] border-2 border-[#15121F] bg-[#2C2745]">
      <div className="flex h-[50px] w-[50px] items-center justify-center rounded-lg border-1 border-black bg-[#F2C14E] font-pixel text-xl text-black">
        {nickname.charAt(0)}
      </div>
      <div className="min-w-0">
        <p className="font-pixel font-normal leading-5 text-lg text-[#F4EAD5]">
          탐험가 {nickname}
        </p>
        <p className="mt-0.5 text-xs font-normal font-pixel leading-5 text-[#B9B0D0]">
          계단 {currentRegion.stageNo} · {currentRegion.realLabel} · 조각{" "}
          {pieceCount}개 · 도감 {collection}
        </p>
      </div>
    </section>
  );
}
