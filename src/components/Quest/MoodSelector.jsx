import { MOODS } from "../../constants/moods";
import { MOOD_INK } from "../../constants/islands";

// 잉크 고르기 : 기분 = 도장 잉크 색 (네이비 화면)
export default function MoodSelector({ selected, onSelect }) {
  return (
    <div role="radiogroup" aria-label="오늘 기분" className="mt-3 grid grid-cols-5 gap-2">
      {MOODS.map(({ value, label }) => {
        const isSelected = selected === value;
        const ink = MOOD_INK[value];
        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={isSelected}
            onClick={() => onSelect(value)}
            className={`h-[92px] flex flex-col items-center justify-center gap-2 rounded-2xl cursor-pointer transition ${
              isSelected ? "bg-white/10" : "border border-[#3A4878]"
            }`}
            style={isSelected ? { boxShadow: `inset 0 0 0 3px ${ink}` } : undefined}
          >
            <svg width="40" height="40" viewBox="0 0 44 44" aria-hidden>
              <ellipse cx="22" cy="38" rx="15" ry="4" fill="#000" opacity="0.2" />
              <path d="M8 14 h28 v18 a6 6 0 0 1 -6 6 h-16 a6 6 0 0 1 -6 -6 z" fill={ink} stroke="#fff" strokeWidth={isSelected ? 2.5 : 1} />
              <rect x="6" y="10" width="32" height="6" rx="3" fill="#fff" opacity="0.9" />
            </svg>
            <span className={`text-[10px] font-bold whitespace-nowrap ${isSelected ? "text-white" : "text-mute-on-navy"}`}>
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}