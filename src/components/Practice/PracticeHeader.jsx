// 연습실 상단 (뒤로 · 제목 · 상대역 · 턴)
export default function PracticeHeader({ title, subtitle, turn, maxTurns, onBack, label = "PRACTICE" }) {
  return (
    <header className="flex items-center gap-2">
      <button
        type="button"
        onClick={onBack}
        aria-label="뒤로가기"
        className="-ml-1 w-10 h-10 flex items-center justify-center text-[28px] leading-none text-navy cursor-pointer"
      >
        ‹
      </button>
      <div className="min-w-0 flex-1">
        <p className="label-en text-[11px] text-mute">{label}</p>
        <h1 className="font-serif text-xl font-bold text-navy truncate">{title}</h1>
        {subtitle && <p className="mt-0.5 text-[11px] text-mute">{subtitle}</p>}
      </div>
      {maxTurns != null && (
        <span className="rounded-full bg-navy px-2.5 py-1 text-xs font-bold text-brass">
          {turn} / {maxTurns}
        </span>
      )}
    </header>
  );
}