import { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileCard from "../../components/MyPage/ProfileCard";
import MyGoalChips from "../../components/MyPage/MyGoalChips";
import PlusCard from "../../components/MyPage/PlusCard";
import PlusSheet from "../../components/MyPage/PlusSheet";
import MenuList from "../../components/MyPage/MenuList";
import AccountActions from "../../components/MyPage/AccountActions";
import ConfirmModal from "../../components/common/ConfirmModal/ConfimModal";
import { getMe } from "../../mocks/me";
import { changeGoal, clearAllRecords, savePlusInterest } from "../../utils/userStorage";

export default function MyPage() {
  const navigate = useNavigate();
  const [, refresh] = useReducer((x) => x + 1, 0);
  const [modal, setModal] = useState(null); // "logout" | "delete" | null
  const [isPlusOpen, setIsPlusOpen] = useState(false);
  const [toast, setToast] = useState("");

  const me = getMe();

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 2000);
  };

  const handleGoalChange = (goalId) => {
    changeGoal(goalId);
    refresh();
    showToast("목표를 바꿨어요. 체크한 단계는 그대로 남아 있어요.");
  };

  const handlePlusSubmit = (answer) => {
    const isFirst = savePlusInterest(answer);
    setIsPlusOpen(false);
    refresh();
    showToast(isFirst ? "첫 발견 조각을 받았어요!" : "응답을 바꿨어요.");
  };

  const handleLogout = () => navigate("/", { replace: true });

  const handleDeleteAll = () => {
    clearAllRecords();
    navigate("/", { replace: true });
  };

  return (
    <div className="flex flex-col gap-4 px-4 pt-[33px]">
      <ProfileCard me={me} />
      <MyGoalChips goalId={me.goal?.goalId} onChange={handleGoalChange} />
      <PlusCard onClick={() => setIsPlusOpen(true)} />
      <MenuList />

      <div className="mt-40">
        <AccountActions onLogout={() => setModal("logout")} onDeleteAll={() => setModal("delete")} />
      </div>

      {modal === "logout" && (
        <ConfirmModal
          title="로그아웃 할까요?"
          description={"모든 조각과 기록은 그대로 저장돼요. 다음에\n'카카오로 이어하기'로 바로 돌아올 수 있어요."}
          confirmText="로그아웃"
          onCancel={() => setModal(null)}
          onConfirm={handleLogout}
        />
      )}

      {modal === "delete" && (
        <ConfirmModal
          title="기록을 모두 지울까요?"
          description={"모든 조각, 복원도, 기분 · 회고 기록이 모두 삭제되고\n처음 화면으로 돌아가요. 되돌릴 수 없어요."}
          confirmText="모두 삭제"
          variant="danger"
          onCancel={() => setModal(null)}
          onConfirm={handleDeleteAll}
        />
      )}

      {isPlusOpen && (
        <PlusSheet
          plusInterest={me.plusInterest}
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