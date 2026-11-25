// 도감 25칸 밖 특별 도장 (받은 것만 · 없으면 안 그림)
export default function BonusPieces({ pieces }) {
  if (!pieces?.length) return null;

  return (
    <section className="rounded-2xl bg-navy p-4">
      <div className="flex items-center gap-2">
        <svg width="22" height="22" viewBox="0 0 80 80" aria-hidden>
          <g fill="none" stroke="#D2B36B" strokeWidth="5">
            <circle cx="40" cy="40" r="34" />
            <path d="M40 30 q-9 -12 0 -20 q9 8 0 20" fill="#D2B36B" />
          </g>
        </svg>
        <h2 className="font-serif text-base font-bold text-brass">특별 도장</h2>
        <span className="text-[11px] text-mute-on-navy">도장 면 밖</span>
      </div>

      <ul className="mt-3 flex flex-col gap-1.5">
        {pieces.map((piece) => (
          <li key={piece.pieceId} className="flex items-center gap-3 rounded-xl bg-navy-2 px-3 py-2">
            <span aria-hidden className="h-4 w-4 shrink-0 rounded-full border-2 border-brass bg-brass/30" />
            <div>
              <p className="text-sm font-bold text-white">{piece.name}</p>
              <p className="text-[10px] text-mute-on-navy">
                {piece.acquiredAt?.slice(0, 10).replaceAll("-", ".")} 받음
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}