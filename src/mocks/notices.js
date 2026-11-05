export const NOTICES = [
  {
    noticeId: 1,
    title: "서버 점검 안내",
    content: "10월 28일 목요일 14:00-16:00 서버를 점검할 예정입니다.",
    status: "PUBLISHED",
  },
];

export const getActiveNotice = () =>
  NOTICES.find((notice) => notice.status === "PUBLISHED") ?? null;
