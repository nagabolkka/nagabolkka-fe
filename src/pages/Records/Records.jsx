import { useMemo, useState } from "react";
import WeekOuting from "../../components/Records/WeekOuting";
import MonthCalendar from "../../components/Records/MonthCalendar";
import MoodFlow from "../../components/Records/MoodFlow";
import RegionRestoration from "../../components/Records/RegionRestoration";
import { getRecords } from "../../mocks/records";
import { currentMonth, shiftMonth } from "../../utils/calendar";

export default function Records() {
  const [month, setMonth] = useState(currentMonth);
  const {
    thisWeek,
    month: monthDays,
    restoration,
  } = useMemo(() => getRecords(month), [month]);

  return (
    <div className="flex flex-col gap-4 px-4 pb-24 pt-8">
      <header>
        <p className="font-pixel text-sm text-[#E8C06A]">모험 일지</p>
        <h1 className="mt-1 font-pixel text-2xl text-[#F4EAD5]">
          이번 주 {thisWeek.outingCount}번 다녀왔어요
        </h1>
      </header>

      <WeekOuting days={thisWeek.days} />
      <MonthCalendar
        month={month}
        days={monthDays}
        onPrev={() => setMonth((m) => shiftMonth(m, -1))}
        onNext={() => setMonth((m) => shiftMonth(m, 1))}
      />
      <MoodFlow days={thisWeek.days} />
      <RegionRestoration regions={restoration} />
    </div>
  );
}