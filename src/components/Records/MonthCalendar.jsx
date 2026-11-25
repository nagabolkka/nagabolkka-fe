import { MOOD_INK } from "../../constants/islands";
import {
  WEEKDAYS,
  currentMonth,
  formatMonth,
  getCalendarDays,
  todayString,
} from "../../utils/calendar";

// 한 달 여행 일지 : 다녀온 날 = 그날 기분 잉크 도장
export default function MonthCalendar({ month, days, onPrev, onNext }) {
  const today = todayString();
  const byDate = new Map(days.map((d) => [d.date, d]));
  const canNext = month < currentMonth();

  return (
    <section className="rounded-2xl border border-line bg-ticket px-3 py-3">
      <div className="flex items-center justify-between px-1">
        <h2 className="font-serif text-base font-bold text-navy">{formatMonth(month)}</h2>
        <div className="flex gap-1">
          <button type="button" onClick={onPrev} aria-label="이전 달" className="w-8 h-8 text-lg text-navy cursor-pointer">
            ‹
          </button>
          <button
            type="button"
            onClick={onNext}
            disabled={!canNext}
            aria-label="다음 달"
            className="w-8 h-8 text-lg text-navy cursor-pointer disabled:opacity-20 disabled:cursor-default"
          >
            ›
          </button>
        </div>
      </div>

      <div className="mt-1 grid grid-cols-7 text-center">
        {WEEKDAYS.map((w) => (
          <span key={w} className="text-[11px] font-bold text-mute">
            {w}
          </span>
        ))}
      </div>

      <div className="mt-1.5 grid grid-cols-7 gap-y-1.5">
        {getCalendarDays(month).map((date, i) => {
          if (!date) return <div key={`blank-${i}`} />;
          const day = byDate.get(date);
          const isDone = day?.status === "COMPLETED";
          const isSkipped = day?.status === "SKIPPED";
          const isToday = date === today;
          const ink = MOOD_INK[day?.mood] ?? "#D2B36B";
          const num = Number(date.slice(-2));

          return (
            <div key={date} className="flex items-center justify-center">
              <span
                className={`relative h-9 w-9 flex items-center justify-center rounded-full text-xs font-bold ${
                  isDone ? "text-white" : isToday ? "text-stamp-red" : "text-navy"
                } ${isSkipped ? "border-2 border-dashed border-line" : ""}`}
                style={isDone ? { backgroundColor: ink, boxShadow: `0 0 0 2px #FFFDF6, 0 0 0 4px ${ink}` } : undefined}
              >
                {num}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}