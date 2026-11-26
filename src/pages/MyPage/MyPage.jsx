import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProfileCard from "../../components/MyPage/ProfileCard";
import PlusCard from "../../components/MyPage/PlusCard";
import PlusSheet from "../../components/MyPage/PlusSheet";
import MenuList from "../../components/MyPage/MenuList";
import AccountActions from "../../components/MyPage/AccountActions";
import ConfirmModal from "../../components/common/ConfirmModal/ConfimModal";
import Toast from "../../components/common/Toast/Toast";
import { clearAllRecords } from "../../utils/userStorage";
import { logout } from "../../api/auth";
import { clearTokens } from "../../api/api";
import { deleteMe, getMyInfo } from "../../api/users";
import { savePlusInterest } from "../../api/plus";
import { clearPushOnDevice, disablePush } from "../../utils/push";
import NotificationToggle from "../../components/MyPage/NotificationToggle";

const GOAL_TIP_KEY = "nagabolkka:goalTipHidden";

export default function MyPage() {
  const navigate = useNavigate();
  const [modal, setModal] = useState(null);
  const [isPlusOpen, setIsPlusOpen] = useState(false);
  const [toast, setToast] = useState("");

  // 서버에서 받은 내 정보 -> 처음엔 null 이고 받아오면 채워짐
  const [me, setMe] = useState(null);
  // 꿈(목표)이 비어 있을 때 첫 진입 안내 (닫으면 다시 안 뜸)
  const [goalTipHidden, setGoalTipHidden] = useState(() => {
    try {
      return localStorage.getItem(GOAL_TIP_KEY) === "1";
    } catch {
      return false;
    }
  });

  const [isDeleting, setIsDeleting] = useState(false);

  const [isPlusSaving, setIsPlusSaving] = useState(false);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 2000);
  };

  useEffect(() => {
    getMyInfo()
      .then(setMe)
      .catch(() =>
        showToast("내 정보를 불러오지 못했어요. 잠시 후 다시 시도해 주세요."),
      );
  }, []);

  // 플러스 설문 → 서버 저장 · 첫 응답이면 첫 발견 도장
  const handlePlusSubmit = async (answer) => {
    if (isPlusSaving) return; // 연속 클릭 무시
    setIsPlusSaving(true);
    try {
      const { plusInterest, rewardPiece } = await savePlusInterest(answer);
      setMe((prev) => ({
        ...prev,
        plusInterest,
        pieceCount: rewardPiece ? prev.pieceCount + 1 : prev.pieceCount,
      }));
      setIsPlusOpen(false);
      showToast(
        rewardPiece
          ? `${rewardPiece.name} 도장을 받았어요! 도장 탭에서 볼 수 있어요.`
          : "응답을 바꿨어요.",
      );
    } catch (e) {
      const code = e.response?.data?.code;
      showToast(
        code === "PLUS_CUSTOM_PRICE_REQUIRED"
          ? "원하는 가격을 0 ~ 50,000원 사이로 적어 주세요."
          : "저장하지 못했어요. 잠시 후 다시 시도해 주세요.",
      );
    } finally {
      setIsPlusSaving(false);
    }
  };

  const handleLogout = async () => {
    await disablePush({ forLogout: true }).catch(() => {}); // 토큰은 지우고, 다시 로그인하면 자동으로 켬
    await logout();
    navigate("/", { replace: true });
  };

  // 내 기록 모두 삭제 = 탈퇴 : 서버 삭제 성공 → 토큰 · 알림 · 로컬 기록 삭제 → 처음 화면
  const handleDeleteAll = async () => {
    if (isDeleting) return; // 연속 클릭 무시
    setIsDeleting(true);
    try {
      await deleteMe();
      await clearPushOnDevice().catch(() => {}); // 서버 토큰은 탈퇴로 이미 삭제 → 기기만 정리
      clearTokens();
      clearAllRecords();
      navigate("/", { replace: true });
    } catch (e) {
      // 401 은 로그인 화면으로 보냄
      setIsDeleting(false);
      setModal(null);
      if (e.response?.status === 403) {
        showToast("관리자 계정은 여기서 삭제할 수 없어요.");
        return;
      }
      showToast(
        "삭제하지 못했어요. 기록은 그대로예요. 잠시 후 다시 시도해 주세요.",
      );
    }
  };

  const hideGoalTip = () => {
    try {
      localStorage.setItem(GOAL_TIP_KEY, "1");
    } catch {
      // 저장 못 해도 이번 화면에선 닫힘
    }
    setGoalTipHidden(true);
  };

  // 불러오는 중
  if (!me) {
    return (
      <div className="flex flex-col bg-sky-paper min-h-full">
        <div className="h-14 bg-navy" />
        <Toast message={toast} />
      </div>
    );
  }

  const showGoalTip = !me.goal && !goalTipHidden;

  return (
    <div className="flex flex-col bg-sky-paper min-h-full">
      <header className="flex h-14 items-center bg-navy px-5">
        <h1 className="font-serif text-[17px] font-bold text-brass">
          여권 소지인
        </h1>
      </header>

      <div className="flex flex-col gap-3 px-4 pt-4 pb-6">
        <ProfileCard me={me} />

        {showGoalTip && (
          <div>
            <div className="flex items-start gap-3 rounded-2xl bg-navy px-4 py-3 shadow-[0_6px_14px_rgba(14,22,56,0.3)]">
              <span aria-hidden className="text-xl text-lamp">
                ★
              </span>
              <button
                type="button"
                onClick={() => navigate("/goals")}
                className="flex-1 text-left cursor-pointer"
              >
                <p className="text-[15px] font-bold text-white">
                  여기서 꿈을 설정할 수 있어요
                </p>
                <p className="mt-0.5 text-xs leading-5 text-mute-on-navy break-keep">
                  해보고 싶은 것 하나를 정해두면, 단계마다 체크하며 준비할 수
                  있어요.
                </p>
              </button>
              <button
                type="button"
                onClick={hideGoalTip}
                className="shrink-0 text-xs text-mute-on-navy cursor-pointer"
              >
                닫기 ✕
              </button>
            </div>
            <span
              aria-hidden
              className="ml-8 block h-0 w-0 border-x-[9px] border-t-[10px] border-x-transparent border-t-navy"
            />
          </div>
        )}
        <MenuList goal={me.goal} />

        <NotificationToggle onToast={showToast} />
        <PlusCard onClick={() => setIsPlusOpen(true)} />

        <AccountActions
          onLogout={() => setModal("logout")}
          onDeleteAll={() => setModal("delete")}
        />
      </div>

      {modal === "logout" && (
        <ConfirmModal
          title="로그아웃 할까요?"
          description={
            "모든 도장과 기록은 그대로 저장돼요. 다음에\n'카카오로 이어하기'로 바로 돌아올 수 있어요."
          }
          confirmText="로그아웃"
          onCancel={() => setModal(null)}
          onConfirm={handleLogout}
        />
      )}

      {modal === "delete" && (
        <ConfirmModal
          title="기록을 모두 지울까요?"
          description={
            "모든 도장, 섬 불빛, 기분 · 메모 기록이 모두 삭제되고\n처음 화면으로 돌아가요. 되돌릴 수 없어요."
          }
          confirmText={isDeleting ? "삭제하는 중..." : "모두 삭제"}
          variant="danger"
          onCancel={() => setModal(null)}
          onConfirm={handleDeleteAll}
        />
      )}

      {isPlusOpen && (
        <PlusSheet
          plusInterest={me.plusInterest}
          submitting={isPlusSaving}
          onClose={() => setIsPlusOpen(false)}
          onSubmit={handlePlusSubmit}
        />
      )}

      <Toast message={toast} />
    </div>
  );
}
