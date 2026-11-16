import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProfileCard from "../../components/MyPage/ProfileCard";
import MyGoalChips from "../../components/MyPage/MyGoalChips";
import PlusCard from "../../components/MyPage/PlusCard";
import PlusSheet from "../../components/MyPage/PlusSheet";
import MenuList from "../../components/MyPage/MenuList";
import AccountActions from "../../components/MyPage/AccountActions";
import ConfirmModal from "../../components/common/ConfirmModal/ConfimModal";
import { clearAllRecords } from "../../utils/userStorage";
import { logout } from "../../api/auth";
import { clearTokens } from "../../api/api";
import { deleteMe, getMyInfo, updateMyGoal } from "../../api/users";
import { savePlusInterest } from "../../api/plus";

export default function MyPage() {
  const navigate = useNavigate();
  const [modal, setModal] = useState(null);
  const [isPlusOpen, setIsPlusOpen] = useState(false);
  const [toast, setToast] = useState("");

  // 서버에서 받은 내 정보 -> 처음엔 null 이고 받아오면 채워짐
  const [me, setMe] = useState(null);
  const [isChanging, setIsChanging] = useState(false);

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

  // 내 목표 칩 → 목표 변경
  const handleGoalClick = async (goalId) => {
    if (isChanging || me?.goal?.goalId === goalId) return; // 같은 칩 · 연속 클릭 무시
    setIsChanging(true);
    try {
      const updated = await updateMyGoal(goalId);
      setMe(updated);
      showToast("목표를 바꿨어요. 체크한 단계는 그대로 남아 있어요.");
    } catch {
      showToast("목표를 바꾸지 못했어요. 잠시 후 다시 시도해 주세요.");
    } finally {
      setIsChanging(false);
    }
  };

  // 플러스 설문 → 서버 저장 · 첫 응답이면 첫 발견 조각
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
          ? `${rewardPiece.name}을 받았어요! 도감에서 볼 수 있어요.`
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
    await logout();
    navigate("/", { replace: true });
  };

  // 내 기록 모두 삭제 = 탈퇴 : 서버 삭제 성공 → 토큰 · 로컬 기록 삭제 → 처음 화면
  const handleDeleteAll = async () => {
    if (isDeleting) return; // 연속 클릭 무시
    setIsDeleting(true);
    try {
      await deleteMe();
      clearTokens();
      clearAllRecords();
      navigate("/", { replace: true });
    } catch (e) {
      // 401 (이미 탈퇴 · 토큰 만료) 은 api.js 가 로그인 화면으로 보냄
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

  // 불러오는 중
  if (!me) {
    return (
      <div className="flex flex-col gap-4 px-4 pt-[33px]">
        {toast && (
          <div className="fixed w-[300px] px-6 bottom-24 left-1/2 z-50 -translate-x-1/2 rounded-full bg-[#15121F]/90 py-2 text-xs text-[#F4EAD5]">
            {toast}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 px-4 pt-[33px]">
      <ProfileCard me={me} />
      <MyGoalChips goalId={me.goal?.goalId} onChange={handleGoalClick} />
      <PlusCard onClick={() => setIsPlusOpen(true)} />
      <MenuList />

      <div className="mt-30">
        <AccountActions
          onLogout={() => setModal("logout")}
          onDeleteAll={() => setModal("delete")}
        />
      </div>

      {modal === "logout" && (
        <ConfirmModal
          title="로그아웃 할까요?"
          description={
            "모든 조각과 기록은 그대로 저장돼요. 다음에\n'카카오로 이어하기'로 바로 돌아올 수 있어요."
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
            "모든 조각, 복원도, 기분 · 회고 기록이 모두 삭제되고\n처음 화면으로 돌아가요. 되돌릴 수 없어요."
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

      {toast && (
        <div className="fixed w-[300px] px-6 bottom-24 left-1/2 z-50 -translate-x-1/2 rounded-full bg-[#15121F]/90 py-2 text-xs text-[#F4EAD5]">
          {toast}
        </div>
      )}
    </div>
  );
}
