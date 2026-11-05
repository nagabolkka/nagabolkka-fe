import { MOOD_COLORS } from "../../constants/moods";
import { WEEKDAYS } from "../../utils/calendar";

export default function MoodFlow({ days }) {
  return (
    <section className="flex h-[99px] flex-col rounded-lg border-2 border-[#15121F] bg-[#2B2340] px-4 py-3">
      <h2 className="font-pixel text-xs text-[#F4EAD5]">이번 주 기분 흐름</h2>

      <div className="mt-2 grid flex-1 grid-cols-7 gap-3">
        {days.map(({ date, mood }, i) => (
          <div key={date} className="flex flex-col items-center gap-1">
            <div className="flex w-full flex-1 items-end">
              <div
                className="w-full"
                style={
                  mood
                    ? { height: `${mood * 20}%`, backgroundColor: MOOD_COLORS[mood] }
                    : { height: "5px", backgroundColor: "#15121F" }
                }
              />
            </div>
            <span className="text-xs leading-none text-[#F4EAD5]/70">{WEEKDAYS[i]}</span>
          </div>
        ))}
      </div>
    </section>
  );
}