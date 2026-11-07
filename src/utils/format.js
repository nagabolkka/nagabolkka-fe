export const formatQuestDate = (date) => {
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  return `${date.getMonth() + 1}월 ${date.getDate()}일 (${days[date.getDay()]})`;
};

export const formatDistance = (m) =>
  m >= 1000 ? `${(m / 1000).toFixed(1).replace(/\.0$/, "")}km` : `${m}m`;

export const formatMinutes = (min) => {
  if (min < 60) return `${min}분`;
  const h = Math.floor(min / 60);
  const rest = min % 60;
  return rest ? `${h}시간 ${rest}분` : `${h}시간`;
};