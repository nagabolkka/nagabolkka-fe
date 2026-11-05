import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../../components/Admin/AdminHeader";
import AdminTabs from "../../components/Admin/AdminTabs";
import UserSummary from "../../components/Admin/UserSummary";
import UserCard from "../../components/Admin/UserCard";
import NoticeItem from "../../components/Admin/NoticeItem";
import NoticeForm from "../../components/Admin/NoticeForm";
import NoticePopup from "../../components/Home/NoticePopup";
import { ADMIN_USERS } from "../../mocks/adminUsers";
import {
  addNotice,
  deleteNotice,
  loadNotices,
  updateNoticeStatus,
} from "../../utils/noticeStorage";

export default function Admin() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("users");
  const [notices, setNotices] = useState(loadNotices);
  const [preview, setPreview] = useState(null);

  const refresh = () => setNotices(loadNotices());

  const handleToggle = ({ noticeId, status }) => {
    updateNoticeStatus(noticeId, status === "ACTIVE" ? "STOPPED" : "ACTIVE");
    refresh();
  };

  const handleDelete = (noticeId) => {
    deleteNotice(noticeId);
    refresh();
  };

  const handleSubmit = (form) => {
    addNotice(form);
    refresh();
  };

  return (
    <div className="relative min-h-screen px-[17px] pb-4">
      <AdminHeader onLogout={() => navigate("/", { replace: true })} />
      <AdminTabs activeTab={tab} onChange={setTab} />

      {tab === "users" ? (
        <div className="mt-5">
          <UserSummary summary={ADMIN_USERS.summary} />
          <ul className="mt-4 flex flex-col gap-3">
            {ADMIN_USERS.users.map((user, i) => (
              <UserCard key={i} user={user} />
            ))}
          </ul>
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
    </div>
  );
}
