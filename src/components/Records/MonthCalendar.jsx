import { WEEKDAYS, formatMonth, getCalendarDays, todayString } from "../../utils/calendar";

export default function MonthCalendar({ month, days }) {
  const today = todayString();
  const completed = new Set(days.filter((d) => d.status === "COMPLETED").map((d) => d.date));

  return (
    <section className="flex h-[232px] flex-col rounded-lg border-2 border-[#15121F] bg-[#2B2340] px-4 py-3">
      <h2 className="font-pixel text-sm text-[#F4EAD5]">{formatMonth(month)}</h2>

      <div className="mt-2 grid grid-cols-7 gap-x-2 text-center">
        {WEEKDAYS.map((w) => (
          <span key={w} className="text-xs text-[#F4EAD5]/70">{w}</span>
        ))}
      </div>

      <div className="mt-2 grid flex-1 auto-rows-fr grid-cols-7 gap-x-2 gap-y-1.5">
        {getCalendarDays(month).map((date, i) => {
          if (!date) return <div key={`blank-${i}`} />;
          const isDone = completed.has(date);
          const isToday = date === today;

          return (
            <div
              key={date}
              className={`flex items-center justify-center rounded-sm border-2 text-xs ${
                isDone ? "bg-[#E8C06A] text-[#15121F]" : "bg-[#1E1A2E] text-[#F4EAD5]"
              } ${isToday ? "border-[#E8C06A]" : "border-[#15121F]"}`}
            >
              {Number(date.slice(-2))}
            </div>
          );
        })}
      </div>
    </section>
  );
}