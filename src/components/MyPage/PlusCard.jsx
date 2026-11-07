export default function PlusCard({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-[357px] h-[67px] items-center gap-3 rounded-lg border-2 border-[#15121F] bg-[#3A3060] px-4 py-3.5 text-left"
    >
      <div
        className="ml-1 h-[22px] w-[22px] shrink-0 rotate-45 border-2 border-[#15121F]"
        style={{
          background: "linear-gradient(135deg, #FFFBE6 0%, #E8C06A 60%)",
        }}
      />
      <div className="flex-1">
        <p className="text-sm font-normal font-pixel text-[#F2C14E]">
          루미 플러스
        </p>
        <p className="mt-0.5 text-xs font-normal font-sans text-[#B9B0D0]">
          연습 시나리오 · 월간 리포트 · 꾸미기
        </p>
      </div>
      <span className="text-xs text-[#F4EAD5]/60">▶</span>
    </button>
  );
}
