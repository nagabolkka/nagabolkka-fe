import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../../components/Admin/AdminHeader";
import AdminTabs from "../../components/Admin/AdminTabs";
import AdminSectionTitle from "../../components/Admin/AdminSectionTitle";
import AdminEmpty from "../../components/Admin/AdminEmpty";
import UserSummary from "../../components/Admin/UserSummary";
import IslandDistribution from "../../components/Admin/IslandDistribution";
import UserCard from "../../components/Admin/UserCard";
import NoticeItem from "../../components/Admin/NoticeItem";
import NoticeForm from "../../components/Admin/NoticeForm";
import PlusDemand from "../../components/Admin/PlusDemand";
import NoticePopup from "../../components/Home/NoticePopup";
import PageLoading from "../../components/common/PageLoading/PageLoading";
import ConfirmModal from "../../components/common/ConfirmModal/ConfimModal";
import Toast from "../../components/common/Toast/Toast";
import { logout } from "../../api/auth";
import {
  createNotice,
  deleteNotice,
  getAdminNotices,
  getAdminUsers,
  updateNotice,
  pushNotice,
} from "../../api/admin";

// 관리자 = 마음 군도 관제탑 : 탑승객 (사용자 현황) · 기내 방송 (공지) · 플러스 수요
export default function Admin() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("users");
  const [usersData, setUsersData] = useState(null); // { summary, users }
  const [notices, setNotices] = useState(null);
  const [error, setError] = useState(false);
  const [busy, setBusy] = useState(false); // 방송 저장 · 알림 중 (연속 클릭 막기)
  const [composing, setComposing] = useState(false); // 새 방송 작성 화면
  const [preview, setPreview] = useState(null);
  const [pushTarget, setPushTarget] = useState(null); // 알림 보낼 방송 (확인 모달)
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

  // 방송 동작 → 성공하면 목록 다시 받기 · 성공 여부 반환
  const runNoticeAction = async (action, doneMessage) => {
    if (busy) return false;
    setBusy(true);
    try {
      await action();
      setNotices(await getAdminNotices());
      if (doneMessage) showToast(doneMessage);
      return true;
    } catch (e) {
      if (handleCommonError(e)) return false;
      if (e.response?.status === 404) {
        setNotices(await getAdminNotices().catch(() => notices));
        showToast("이미 삭제된 방송이에요.");
        return false;
      }
      showToast("저장하지 못했어요. 다시 시도해 주세요.");
      return false;
    } finally {
      setBusy(false);
    }
  };

  const handleToggle = ({ noticeId, status }) =>
    runNoticeAction(
      () => updateNotice(noticeId, { status: status === "ACTIVE" ? "STOPPED" : "ACTIVE" }),
      status === "ACTIVE" ? "방송을 멈췄어요." : "다시 방송해요.",
    );

  const handleDelete = (noticeId) => runNoticeAction(() => deleteNotice(noticeId), "방송을 삭제했어요.");

  const handleSubmit = async (form) => {
    const ok = await runNoticeAction(() => createNotice(form), "방송을 등록했어요. 홈 팝업으로 보여요.");
    if (ok) setComposing(false);
  };

  // 방송 → 알림 보내기 (서버 점검 등)
  const handlePush = async () => {
    if (busy || !pushTarget) return;
    const { noticeId } = pushTarget;
    setPushTarget(null);
    setBusy(true);
    try {
      const { sent } = await pushNotice(noticeId);
      showToast(sent > 0 ? `📣 ${sent}명에게 알림을 보냈어요` : "알림을 켠 탑승객이 없어요.");
    } catch (e) {
      if (handleCommonError(e)) return;
      const status = e.response?.status;
      if (status === 409) showToast("이미 알림을 보낸 방송이에요.");
      else if (status === 404) showToast("이미 삭제된 방송이에요.");
      else showToast("알림을 보내지 못했어요. 다시 시도해 주세요.");
    } finally {
      setNotices(await getAdminNotices().catch(() => notices)); // 보낸 시각 반영
      setBusy(false);
    }
  };

  const handleTab = (key) => {
    setTab(key);
    setComposing(false);
  };

  // 토큰까지 지우는 진짜 로그아웃
  const handleLogout = async () => {
    await logout();
    navigate("/", { replace: true });
  };

  if (!usersData || !notices) return <PageLoading error={error} />;

  return (
    <div className="relative min-h-dvh overflow-hidden bg-navy-deep px-5 pb-10">
      <Radar />
      <AdminHeader onLogout={handleLogout} />
      <AdminTabs activeTab={tab} onChange={handleTab} />

      <div className="relative mt-4 flex flex-col gap-3.5">
        {tab === "users" && (
          <>
            <UserSummary summary={usersData.summary} />
            <IslandDistribution users={usersData.users} />
            <p className="text-[10.5px] leading-4 text-mute-on-navy/80">
              도착률 = 도장 받은 날 ÷ 탑승권이 나온 날
              <br />
              기분 · 회고 · 연습 기록은 관제탑에서 볼 수 없어요.
            </p>
            <AdminSectionTitle en="PASSENGER MANIFEST" title="탑승객 명단" />
            {usersData.users.length === 0 ? (
              <AdminEmpty
                title="아직 탑승객이 없어요"
                description={"첫 탑승객이 출국 심사를 마치면\n여기에 명단이 보여요."}
              />
            ) : (
              <ul className="flex flex-col gap-2.5">
                {usersData.users.map((user, i) => (
                  <UserCard key={i} user={user} />
                ))}
              </ul>
            )}
          </>
        )}

        {tab === "notices" &&
          (composing ? (
            <>
              <div className="flex items-end justify-between">
                <AdminSectionTitle en="NEW ANNOUNCEMENT" title="새 기내 방송" />
                <button
                  type="button"
                  onClick={() => setComposing(false)}
                  className="text-xs font-bold text-mute-on-navy cursor-pointer"
                >
                  ← 목록으로
                </button>
              </div>
              <NoticeForm submitting={busy} onSubmit={handleSubmit} />
              <p className="text-[11px] leading-4 text-mute-on-navy">
                제목과 내용을 모두 적으면 버튼이 켜져요. 등록하면 바로 홈 팝업으로 방송돼요.
              </p>
            </>
          ) : (
            <>
              <div className="flex items-end justify-between">
                <AdminSectionTitle en="CABIN ANNOUNCEMENT" title="기내 방송 (공지)" />
                <button
                  type="button"
                  onClick={() => setComposing(true)}
                  className="rounded-full bg-brass px-3 py-2 text-xs font-bold text-navy cursor-pointer"
                >
                  ＋ 새 방송
                </button>
              </div>
              {notices.length === 0 ? (
                <AdminEmpty title="등록된 방송이 없어요" description="「＋ 새 방송」으로 첫 공지를 띄워 보세요." />
              ) : (
                <ul className="flex flex-col gap-3">
                  {notices.map((notice) => (
                    <NoticeItem
                      key={notice.noticeId}
                      notice={notice}
                      disabled={busy}
                      onToggle={() => handleToggle(notice)}
                      onPreview={() => setPreview(notice)}
                      onDelete={() => handleDelete(notice.noticeId)}
                      onPush={() => setPushTarget(notice)}
                    />
                  ))}
                </ul>
              )}
            </>
          ))}

        {tab === "plus" && <PlusDemand plusInterest={usersData.summary.plusInterest} />}
      </div>

      {preview && (
        <NoticePopup notice={preview} onClose={() => setPreview(null)} onHideToday={() => setPreview(null)} />
      )}

      {pushTarget && (
        <ConfirmModal
          title="탑승객 전원에게 알림을 보낼까요?"
          description={`알림을 켠 모든 탑승객에게\n「${pushTarget.title}」 알림이 가요.\n방송 하나에 한 번만 보낼 수 있어요.`}
          confirmText="📣 보내기"
          onCancel={() => setPushTarget(null)}
          onConfirm={handlePush}
        />
      )}

      <Toast message={toast} bottom="bottom-10" />
    </div>
  );
}

// 배경 : 오른쪽 위 레이더 (동심원 + 스캔선 + 불빛 하나)
function Radar() {
  return (
    <svg
      aria-hidden
      width="420"
      height="420"
      viewBox="0 0 420 420"
      className="pointer-events-none absolute -right-[140px] -top-[250px]"
    >
      {Array.from({ length: 7 }, (_, i) => (
        <circle key={i} cx="210" cy="210" r={(i + 1) * 29} fill="none" stroke="#FFFFFF" strokeOpacity="0.06" />
      ))}
      <line x1="210" y1="210" x2="374" y2="325" stroke="#D2B36B" strokeOpacity="0.35" strokeWidth="1.5" />
      <circle cx="304" cy="272" r="4" fill="#FFE07A" />
    </svg>
  );
}