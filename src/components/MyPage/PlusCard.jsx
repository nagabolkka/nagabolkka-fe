export default function PlusCard({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded-2xl bg-navy px-4 py-3.5 text-left cursor-pointer"
    >
      <svg width="30" height="30" viewBox="0 0 80 80" aria-hidden className="shrink-0">
        <g fill="none" stroke="#D2B36B" strokeWidth="4">
          <circle cx="40" cy="40" r="34" />
          <path d="M40 8 L45 35 L72 40 L45 45 L40 72 L35 45 L8 40 L35 35 Z" fill="#D2B36B" fillOpacity="0.3" />
        </g>
      </svg>
      <div className="flex-1">
        <p className="text-[15px] font-bold text-brass">루미 플러스 · 비즈니스석</p>
        <p className="mt-0.5 text-xs text-mute-on-navy">연습 시나리오 · 월간 리포트 · 꾸미기</p>
      </div>
      <span aria-hidden className="text-lg text-mute-on-navy">›</span>
    </button>
  );
}