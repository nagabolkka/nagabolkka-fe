import { NOTICES } from "../mocks/notices";

const LIST_KEY = "nagabolkka:notices";
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

// 공지 목록 (관리자) 

export const loadNotices = () => read(LIST_KEY, NOTICES);

const saveNotices = (notices) => localStorage.setItem(LIST_KEY, JSON.stringify(notices));

// 공지 등록 → ACTIVE
export const addNotice = ({ title, content }) => {
  const notices = loadNotices();
  const nextId = Math.max(0, ...notices.map((n) => n.noticeId)) + 1;
  const notice = { noticeId: nextId, title, content, status: "ACTIVE", createdAt: new Date().toISOString() };
  saveNotices([notice, ...notices]);
  return notice;
};

// 게시 중지 or 다시 게시
export const updateNoticeStatus = (noticeId, status) => {
  saveNotices(loadNotices().map((n) => (n.noticeId === noticeId ? { ...n, status } : n)));
};

export const deleteNotice = (noticeId) => {
  saveNotices(loadNotices().filter((n) => n.noticeId !== noticeId));
};

// 홈 팝업용 : 게시 중 공지 중 가장 최근 1개
export const getActiveNotice = () =>
  loadNotices()
    .filter((n) => n.status === "ACTIVE")
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))[0] ?? null;

// 오늘 하루 보지 않기 (홈) 
export const hideNoticeToday = (noticeId) => {
  localStorage.setItem(HIDDEN_KEY, JSON.stringify({ ...read(HIDDEN_KEY, {}), [noticeId]: today() }));
};

export const isNoticeHiddenToday = (noticeId) => read(HIDDEN_KEY, {})[noticeId] === today();