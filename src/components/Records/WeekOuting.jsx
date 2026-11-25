import { MOOD_INK } from "../../constants/islands";
import { WEEKDAYS, todayString } from "../../utils/calendar";

// 이번 주 도장 (잉크 = 기분 · 쉰 날 = 회색 점선)
export default function WeekOuting({ days }) {
  const today = todayString();

  return (
    <section className="grid grid-cols-7 rounded-2xl border border-line bg-ticket px-2 py-3">
      {days.map(({ date, status, mood }, i) => {
        const isToday = date === today;
        const ink = MOOD_INK[mood] ?? "#D2B36B";
        return (
          <div key={date} className="flex flex-col items-center gap-1.5">
            <span className={`text-xs font-bold ${isToday ? "text-stamp-red" : "text-mute"}`}>
              {WEEKDAYS[i]}
            </span>
            {status === "COMPLETED" ? (
              <span className="h-8 w-8 rounded-full border-[3px] flex items-center justify-center" style={{ borderColor: ink }}>
                <span className="h-5 w-5 rounded-full" style={{ backgroundColor: ink }} />
              </span>
            ) : status === "SKIPPED" ? (
              <span className="h-8 w-8 rounded-full border-2 border-dashed border-line flex items-center justify-center text-[9px] font-bold text-mute">
                쉼
              </span>
            ) : isToday ? (
              <span className="h-8 w-8 rounded-full border-2 border-dashed border-navy flex items-center justify-center text-[9px] font-bold text-navy">
                오늘
              </span>
            ) : (
              <span className="h-8 w-8 flex items-center justify-center">
                <span className="h-2 w-2 rounded-full bg-line" />
              </span>
            )}
          </div>
        );
      })}
    </section>
  );
}