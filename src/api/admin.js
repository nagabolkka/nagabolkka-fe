import api from "./api";

// 사용자 현황 : { summary, users }
export async function getAdminUsers() {
  const { data } = await api.get("/api/admin/users");
  return data;
}

// 공지 목록 (최근 순) : { notices }
export async function getAdminNotices() {
  const { data } = await api.get("/api/admin/notices");
  return data.notices;
}

// 공지 등록 → 게시 중
export async function createNotice({ title, content }) {
  const { data } = await api.post("/api/admin/notices", { title, content });
  return data;
}

// 공지 수정 · 게시 중지 / 다시 게시 (보낸 것만)
export async function updateNotice(noticeId, changes) {
  const { data } = await api.patch(`/api/admin/notices/${noticeId}`, changes);
  return data;
}

export async function deleteNotice(noticeId) {
  await api.delete(`/api/admin/notices/${noticeId}`);
}