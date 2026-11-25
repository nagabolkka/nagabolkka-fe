export default function PassportCover({ className = "" }) {
  return (
    <div
      className={`relative w-[220px] h-[310px] rounded-[14px] bg-navy-2 shadow-[0_20px_40px_rgba(0,0,0,0.45)] border border-navy-deep flex flex-col items-center ${className}`}
    >
      <div aria-hidden className="absolute inset-y-0 left-0 w-3 rounded-l-[14px] bg-navy-deep/60" />
      <svg width="96" height="96" viewBox="0 0 80 80" aria-hidden className="mt-14">
        <g fill="none" stroke="#D2B36B" strokeWidth="2.4">
          <circle cx="40" cy="40" r="36" />
          <circle cx="40" cy="40" r="28" strokeWidth="1.4" />
          <path d="M40 8 L45 35 L72 40 L45 45 L40 72 L35 45 L8 40 L35 35 Z" fill="#D2B36B" fillOpacity="0.25" />
          <path d="M40 30 q-9 -12 0 -20 q9 8 0 20" fill="#D2B36B" />
          <circle cx="40" cy="40" r="4" fill="#D2B36B" />
        </g>
      </svg>
      <p className="mt-6 font-serif text-lg font-bold text-brass">나가볼까 여권</p>
      <p className="label-en mt-1 text-[10px] text-brass/80 tracking-[0.3em]">NAGABOLKKA PASSPORT</p>
      <svg width="34" height="22" viewBox="0 0 34 22" aria-hidden className="mt-auto mb-8">
        <rect x="1" y="1" width="32" height="20" rx="3" fill="none" stroke="#D2B36B" strokeWidth="1.6" />
        <circle cx="17" cy="11" r="5" fill="none" stroke="#D2B36B" strokeWidth="1.6" />
        <path d="M1 11 h11 M22 11 h11" stroke="#D2B36B" strokeWidth="1.6" />
      </svg>
    </div>
  );
}