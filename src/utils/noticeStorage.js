const HIDDEN_KEY = "nagabolkka:hiddenNotices";

const today = () => {
  const d = new Date();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${mm}-${dd}`;
};

const read = (key, fallback) => {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
};

// 오늘 하루 보지 않기 (홈) — 공지 목록 · 게시 상태는 서버
export const hideNoticeToday = (noticeId) => {
  localStorage.setItem(HIDDEN_KEY, JSON.stringify({ ...read(HIDDEN_KEY, {}), [noticeId]: today() }));
};

export const isNoticeHiddenToday = (noticeId) => read(HIDDEN_KEY, {})[noticeId] === today();