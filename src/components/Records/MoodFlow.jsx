import { MOODS } from "../../constants/moods";
import { MOOD_INK } from "../../constants/islands";

// 기분 잉크 범례 + 이번 주 가장 많은 기분
export default function MoodFlow({ days }) {
  const counts = days.reduce((acc, { mood }) => (mood ? { ...acc, [mood]: (acc[mood] ?? 0) + 1 } : acc), {});
  const top = Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0];
  const topLabel = MOODS.find((m) => String(m.value) === top)?.label;

  return (
    <section className="rounded-2xl border border-line bg-ticket px-4 py-3">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-[15px] font-bold text-navy">기분 잉크</h2>
        {topLabel && (
          <span className="flex items-center gap-1.5 text-xs font-bold text-navy">
            이번 주 가장 많은 기분
            <span className="h-3 w-3 rounded-full" style={{ backgroundColor: MOOD_INK[top] }} />
            {topLabel}
          </span>
        )}
      </div>
      <ul className="mt-2.5 grid grid-cols-5 gap-1">
        {MOODS.map(({ value, label }) => (
          <li key={value} className="flex flex-col items-center gap-1">
            <span className="h-4 w-4 rounded-full" style={{ backgroundColor: MOOD_INK[value] }} />
            <span className="text-[10px] text-mute whitespace-nowrap">{label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}