function Port({ caption, code, label, align = "left", accent }) {
  const right = align === "right";
  return (
    <div className={`flex flex-col ${right ? "items-end text-right" : "items-start"}`}>
      <span className="label-en text-[10px] text-mute">{caption}</span>
      <span
        className="mt-1 text-[30px] leading-none font-bold tracking-tight"
        style={{ color: accent ?? "var(--color-navy)" }}
      >
        {code}
      </span>
      <span className="mt-1 text-[12px] font-bold text-navy">{label}</span>
    </div>
  );
}

function PlanePath() {
  return (
    <svg width="76" height="30" viewBox="0 0 110 40" aria-hidden className="mt-5 shrink-0">
      <path d="M4 30 Q55 -6 106 30" stroke="#1C2A5E" strokeWidth="1.6" strokeDasharray="3 4" fill="none" />
      <g transform="translate(66 2) rotate(-12) scale(-0.5 0.5)">
        <path d="M0 14 L36 8 L44 0 L48 4 L42 12 L50 30 L44 32 L34 16 L20 20 L18 28 L12 28 L12 20 L0 18 Z" fill="#1C2A5E" />
      </g>
    </svg>
  );
}

export function Perforation({ notch = "#1C2A5E" }) {
  return (
    <div className="relative h-6 bg-ticket" aria-hidden>
      <span className="absolute -left-3 top-0 w-6 h-6 rounded-full" style={{ backgroundColor: notch }} />
      <span className="absolute -right-3 top-0 w-6 h-6 rounded-full" style={{ backgroundColor: notch }} />
      <span className="absolute left-[18px] right-[18px] top-1/2 border-t-2 border-dashed border-line" />
    </div>
  );
}

export default function Ticket({
  color, // 섬 색 (띠)
  accent, // TO 코드 색 (섬 진한 색)
  flight,
  badge = "NAGABOLKKA AIR",
  from, // { code, label }
  to, // { code, label }
  children,
  stub,
  notch = "#1C2A5E",
  className = "",
}) {
  return (
    <div className={`relative ${className}`}>
      <div className={`bg-ticket overflow-hidden ${stub ? "rounded-t-2xl" : "rounded-2xl"}`}>
        <div className="h-11 px-4 flex items-center justify-between" style={{ backgroundColor: color }}>
          <span className="label-en text-[12px] text-navy">{badge}</span>
          <span className="label-en text-[12px] text-navy">{flight}</span>
        </div>
        <div className="px-[18px] pt-3 pb-4">
          {from && to && (
            <div className="flex items-start justify-between">
              <Port caption="FROM" {...from} />
              <PlanePath />
              <Port caption="TO" align="right" accent={accent} {...to} />
            </div>
          )}
          {children}
        </div>
      </div>
      {stub && (
        <>
          <Perforation notch={notch} />
          <div className="bg-ticket rounded-b-2xl px-[18px] pt-1 pb-4">{stub}</div>
        </>
      )}
    </div>
  );
}