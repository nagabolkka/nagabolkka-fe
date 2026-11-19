import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../../components/Admin/AdminHeader";
import AdminTabs from "../../components/Admin/AdminTabs";
import UserSummary from "../../components/Admin/UserSummary";
import UserCard from "../../components/Admin/UserCard";
import NoticeItem from "../../components/Admin/NoticeItem";
import NoticeForm from "../../components/Admin/NoticeForm";
import NoticePopup from "../../components/Home/NoticePopup";
import PageLoading from "../../components/common/PageLoading/PageLoading";
import { logout } from "../../api/auth";
import {
  createNotice,
  deleteNotice,
  getAdminNotices,
  getAdminUsers,
  updateNotice,
} from "../../api/admin";

export default function Admin() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("users");
  const [usersData, setUsersData] = useState(null); // { summary, users }
  const [notices, setNotices] = useState(null);
  const [error, setError] = useState(false);
  const [busy, setBusy] = useState(false); // 공지 저장 중 (연속 클릭 막기)
  const [preview, setPreview] = useState(null);
  const [toast, setToast] = useState("");
  const toastTimer = useRef(null);

  const showToast = (message) => {
    clearTimeout(toastTimer.current);
    setToast(message);
    toastTimer.current = setTimeout(() => setToast(""), 2000);
  };

  useEffect(() => () => clearTimeout(toastTimer.current), []);

  // 서버 꺼짐 · 5xx → 점검 화면 / 관리자 아님 (403) → 홈. 처리했으면 true
  const handleCommonError = useCallback(
    (e) => {
      if (!e.response || e.response.status >= 500) {
        navigate("/maintenance", { replace: true });
        return true;
      }
      if (e.response.status === 403) {
        navigate("/home", { replace: true });
        return true;
      }
      return false;
    },
    [navigate],
  );

  useEffect(() => {
    let ignore = false;
    Promise.all([getAdminUsers(), getAdminNotices()])
      .then(([users, noticeList]) => {
        if (ignore) return;
        setUsersData(users);
        setNotices(noticeList);
      })
      .catch((e) => {
        if (ignore) return;
        if (!handleCommonError(e)) setError(true);
      });
    return () => {
      ignore = true;
    };
  }, [handleCommonError]);

  // 공지 동작 → 성공하면 목록 다시 받기
  const runNoticeAction = async (action, doneMessage) => {
    if (busy) return;
    setBusy(true);
    try {
      await action();
      setNotices(await getAdminNotices());
      if (doneMessage) showToast(doneMessage);
    } catch (e) {
      if (handleCommonError(e)) return;
      if (e.response?.status === 404) {
        setNotices(await getAdminNotices().catch(() => notices));
        showToast("이미 삭제된 공지예요.");
        return;
      }
      showToast("저장하지 못했어요. 다시 시도해 주세요.");
    } finally {
      setBusy(false);
    }
  };

  const handleToggle = ({ noticeId, status }) =>
    runNoticeAction(() =>
      updateNotice(noticeId, {
        status: status === "ACTIVE" ? "STOPPED" : "ACTIVE",
      }),
    );

  const handleDelete = (noticeId) =>
    runNoticeAction(() => deleteNotice(noticeId), "공지를 삭제했어요.");

  const handleSubmit = (form) =>
    runNoticeAction(() => createNotice(form), "공지를 등록했어요.");

  // 토큰까지 지우는 진짜 로그아웃
  const handleLogout = async () => {
    await logout();
    navigate("/", { replace: true });
  };

  if (!usersData || !notices) return <PageLoading error={error} />;

  return (
    <div className="relative min-h-dvh px-[17px] pb-4">
      <AdminHeader onLogout={handleLogout} />
      <AdminTabs activeTab={tab} onChange={setTab} />

      {tab === "users" ? (
        <div className="mt-5">
          <UserSummary summary={usersData.summary} />
          {usersData.users.length === 0 ? (
            <p className="mt-4 rounded-lg border border-dashed border-[#F4EAD5]/20 py-8 text-center text-sm text-[#F4EAD5]/50">
              아직 가입한 사용자가 없어요.
            </p>
          ) : (
            <ul className="mt-4 flex flex-col gap-3">
              {usersData.users.map((user, i) => (
                <UserCard key={i} user={user} />
              ))}
            </ul>
          )}
        </div>
      ) : (
        <div className="mt-5 flex flex-col gap-6">
          {notices.length === 0 ? (
            <p className="rounded-lg border border-dashed border-[#F4EAD5]/20 py-8 text-center text-sm text-[#F4EAD5]/50">
              등록된 공지가 없어요.
            </p>
          ) : (
            <ul className="flex flex-col gap-3">
              {notices.map((notice) => (
                <NoticeItem
                  key={notice.noticeId}
                  notice={notice}
                  onToggle={() => handleToggle(notice)}
                  onPreview={() => setPreview(notice)}
                  onDelete={() => handleDelete(notice.noticeId)}
                />
              ))}
            </ul>
          )}
          <NoticeForm onSubmit={handleSubmit} />
        </div>
      )}

      {preview && (
        <NoticePopup
          notice={preview}
          onClose={() => setPreview(null)}
          onHideToday={() => setPreview(null)}
        />
      )}

      {toast && (
        <div className="fixed bottom-10 left-1/2 z-50 w-[300px] -translate-x-1/2 rounded-full bg-[#15121F]/90 px-6 py-2 text-center text-xs text-[#F4EAD5]">
          {toast}
        </div>
      )}
    </div>
  );
}
