export const WEEKDAYS = ["월", "화", "수", "목", "금", "토", "일"];

// Date → "2026-11-05" (로컬 기준)
export const toDateString = (date) => {
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${mm}-${dd}`;
};

export const todayString = () => toDateString(new Date());

// 이번 달 "2026-11"
export const currentMonth = () => todayString().slice(0, 7);

// "2026-11" → +1 / -1 달 이동
export const shiftMonth = (month, diff) => {
  const [y, m] = month.split("-").map(Number);
  return toDateString(new Date(y, m - 1 + diff, 1)).slice(0, 7);
};

// "2026-11" → "2026년 11월"
export const formatMonth = (month) => {
  const [y, m] = month.split("-").map(Number);
  return `${y}년 ${m}월`;
};

// 월요일 시작 달력 칸 배열 (앞쪽 빈칸은 null)
export const getCalendarDays = (month) => {
  const [y, m] = month.split("-").map(Number);
  const first = new Date(y, m - 1, 1);
  const lastDate = new Date(y, m, 0).getDate();
  const blank = (first.getDay() + 6) % 7; // 월=0 ... 일=6

  const days = Array.from({ length: lastDate }, (_, i) =>
    toDateString(new Date(y, m - 1, i + 1)),
  );
  return [...Array(blank).fill(null), ...days];
};

// 이번 주 월~일 날짜 7개
export const getThisWeekDates = () => {
  const now = new Date();
  const monday = new Date(now);
  monday.setDate(now.getDate() - ((now.getDay() + 6) % 7));

  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return toDateString(d);
  });
};

export const isFuture = (date) => date > todayString();
