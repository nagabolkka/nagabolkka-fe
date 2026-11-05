import { WEEKDAYS, todayString } from "../../utils/calendar";

export default function WeekOuting({ days }) {
  const today = todayString();

  return (
    <section className="grid grid-cols-7 rounded-lg border-2 border-[#15121F] bg-[#2B2340] px-3 py-4">
      {days.map(({ date, status }, i) => (
        <div key={date} className="flex flex-col items-center gap-2">
          <span className={`text-xs ${date === today ? "text-[#E8C06A]" : "text-[#F4EAD5]/70"}`}>
            {WEEKDAYS[i]}
          </span>
          <div
            className={`h-4 w-4 rotate-45 border-2 border-[#15121F] ${
              status === "COMPLETED" ? "bg-[#E8C06A]" : "bg-[#1E1A2E]"
            }`}
          />
        </div>
      ))}
    </section>
  );
}