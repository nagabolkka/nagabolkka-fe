// 연습 상황 카드
export default function ScenarioCard({ scenario, pieceName, pieceColor, disabled, onClick }) {
  const { title, description, partnerRole, maxTurns } = scenario;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="w-full overflow-hidden rounded-2xl border border-line bg-ticket text-left cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
    >
      <div className="flex items-center justify-between bg-navy px-4 py-2">
        <span className="text-xs font-bold text-brass">상황 · 상대역 {partnerRole}</span>
        <span className="label-en text-[10px] text-mute-on-navy">{maxTurns} TURNS</span>
      </div>
      <div className="px-4 py-3">
        <h2 className="font-serif text-lg font-bold leading-6 text-navy">{title}</h2>
        <p className="mt-1 text-[13px] leading-5 text-mute break-keep">{description}</p>
        {pieceName && (
          <p className="mt-2 flex items-center gap-1.5 text-[11px] font-semibold text-navy">
            <span aria-hidden className="h-2.5 w-2.5 rounded-full border-2 border-navy" style={{ backgroundColor: pieceColor }} />
            보상 · {pieceName} 도장
          </p>
        )}
      </div>
    </button>
  );
}