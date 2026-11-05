import { getThisWeekDates, isFuture, toDateString } from "../utils/calendar";

// 날짜로 고정된 가짜 기록 (오늘 이후는 기록 없음)
const mockDay = (date) => {
  if (isFuture(date)) return { date, status: null, mood: null };

  const d = Number(date.slice(-2));
  if (d % 5 === 0) return { date, status: null, mood: null };
  if (d % 4 === 0) return { date, status: "SKIPPED", mood: null };
  return { date, status: "COMPLETED", mood: ((d * 7) % 5) + 1 };
};

export const getRecords = (month) => {
  const [y, m] = month.split("-").map(Number);
  const lastDate = new Date(y, m, 0).getDate();

  const monthDays = Array.from({ length: lastDate }, (_, i) =>
    mockDay(toDateString(new Date(y, m - 1, i + 1))),
  );

  const weekDays = getThisWeekDates().map(mockDay);

  return {
    thisWeek: {
      outingCount: weekDays.filter((day) => day.status === "COMPLETED").length,
      days: weekDays,
    },
    month: monthDays,
    restoration: [
      { stageNo: 1, name: "시작의 방", restoration: 100 },
      { stageNo: 2, name: "바람의 숲", restoration: 40 },
      { stageNo: 3, name: "발견의 마을", restoration: 0 },
      { stageNo: 4, name: "만남의 정원", restoration: 0 },
      { stageNo: 5, name: "새로운 세상", restoration: 0 },
    ],
    hasLetter: true,
  };
};
