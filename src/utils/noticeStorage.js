const KEY = "nagabolkka:hiddenNotices";

const today = () => {
  const d = new Date();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${mm}-${dd}`;
};

const loadHidden = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY)) ?? {};
  } catch {
    return {};
  }
};

// 오늘 하루 보지 않기
export const hideNoticeToday = (noticeId) => {
  const hidden = loadHidden();
  localStorage.setItem(KEY, JSON.stringify({ ...hidden, [noticeId]: today() }));
};

// 오늘 숨긴 공지인지
export const isNoticeHiddenToday = (noticeId) => loadHidden()[noticeId] === today();