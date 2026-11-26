import { useState } from "react";

// 도장 면 밖 특별 도장 (받은 것만 · 없으면 안 그림) · 누르면 받은 날까지 펼침
export default function BonusPieces({ pieces }) {
  const [open, setOpen] = useState(false);
  if (!pieces?.length) return null;

  const names = pieces.map((piece) => piece.name.replace(" 조각", "")).join(" · ");

  return (
    <section className="rounded-2xl bg-navy">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center gap-3 px-4 py-3.5 text-left cursor-pointer"
      >
        <svg width="44" height="44" viewBox="0 0 80 80" aria-hidden className="shrink-0">
          <g fill="none" stroke="#D2B36B">
            <circle cx="40" cy="40" r="34" strokeWidth="3" />
            <circle cx="40" cy="40" r="26" strokeWidth="1.5" />
            <path d="M40 10 L46 40 L40 70 L34 40 Z" fill="#D2B36B" strokeWidth="1" />
            <path d="M10 40 L40 34 L70 40 L40 46 Z" strokeWidth="1.5" />
          </g>
        </svg>
        <div className="min-w-0 flex-1">
          <p className="font-serif text-base font-bold text-brass">특별 도장 {pieces.length}</p>
          <p className="truncate text-xs text-white/85">{names}</p>
        </div>
        <span className={`text-mute-on-navy transition ${open ? "rotate-180" : ""}`} aria-hidden>
          ⌄
        </span>
      </button>

      {open && (
        <ul className="flex flex-col gap-1.5 px-4 pb-4">
          {pieces.map((piece) => (
            <li key={piece.pieceId} className="flex items-center justify-between rounded-xl bg-navy-2 px-3 py-2">
              <span className="text-sm font-bold text-white">{piece.name}</span>
              <span className="text-[11px] text-mute-on-navy">
                {piece.acquiredAt?.slice(0, 10).replaceAll("-", ".")} 받음
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}