export default function RegionCard({ region, score }) {
  return (
    <div className="mt-[21px] rounded-[10px] flex flex-col py-[18px] gap-[7px] justify-center items-center w-[351px] h-[176px] bg-[#F4EAD5] border-2 border-[#E6D6B0]">
      {/* 조각 */}
      <div
        className="w-10 h-10 -rotate-45 border-3 border-[#2B2340] mb-[7px]"
        style={{ backgroundColor: region.color }}
      />
      {/* 챕터 + 라벨 */}
      <p className="text-[10px] font-normal font-pixel text-[#6B5E4A]">
        CHAPTER {region.stageNo} · {region.realLabel}
      </p>
      {/* 챕터 이름 */}
      <p className="text-black text-2xl font-bold font-pixel">{region.name}</p>
      {/* 점수 + 한 마디 */}
      <p className="text-[#6B5E4A] text-[10px] font-normal font-pixel">
        시작 체크 {score}점 · 이곳에서 {region.pieceFamily}을 찾아요
      </p>
    </div>
  );
}