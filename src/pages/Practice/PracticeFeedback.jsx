import { useEffect, useRef, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import FeedbackPieceCard from "../../components/Practice/FeedbackPieceCard";
import FeedbackSection from "../../components/Practice/FeedbackSection";
import Button from "../../components/common/Button/Button";
import ConfirmModal from "../../components/common/ConfirmModal/ConfimModal";
import { getIsland } from "../../constants/islands";
import Lumi from "../../components/common/Lumi/Lumi";
import Toast from "../../components/common/Toast/Toast";
import { actTodayQuest } from "../../api/quests";
import { getLocation } from "../../utils/location";

export default function PracticeFeedback() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState("");
  const toastTimer = useRef(null);

  useEffect(() => () => clearTimeout(toastTimer.current), []);

  // 새로고침 등으로 결과가 없으면 연습실로 (서버는 이미 끝 처리됨)
  if (!state?.feedback) return <Navigate to="/practice" replace />;

  const { title, feedback, piece, followMission } = state;
  const color = piece ? getIsland(piece.stageNo).dark : undefined;

  const showToast = (message) => {
    clearTimeout(toastTimer.current);
    setToast(message);
    toastTimer.current = setTimeout(() => setToast(""), 2500);
  };

  // 연습 후 실제 미션 → 오늘 퀘스트 교체 (바꾸기 횟수 그대로)
  const handleSaveMission = async () => {
    if (saving) return;
    setSaving(true);
    try {
      const location = await getLocation(); // 첫 방문 미션 → 근처 도서관
      await actTodayQuest("PRACTICE_MISSION", location, { missionId: followMission.missionId });
      navigate("/home", { replace: true });
    } catch (e) {
      setSaving(false);
      setIsConfirmOpen(false);
      if (!e.response || e.response.status >= 500) {
        navigate("/maintenance", { replace: true });
        return;
      }
      const code = e.response.data?.code;
      showToast(
        code === "QUEST_ALREADY_DONE"
          ? "오늘 퀘스트는 이미 마쳤어요. 내일 또 연습해 봐요!"
          : "담지 못했어요. 다시 시도해 주세요.",
      );
    }
  };

  return (
    <div className="relative flex flex-1 flex-col bg-sky-paper px-4 pb-8 pt-8">
      <div className="flex items-center gap-3">
        <Lumi pose="cheer" size={76} decorative />
        <div>
          <p className="text-xs font-bold text-mute">{title} · 연습 완료</p>
          <h1 className="mt-0.5 font-serif text-2xl font-bold text-navy">끝까지 해냈어요!</h1>
        </div>
      </div>

      {piece && (
        <div className="mt-5">
          <FeedbackPieceCard
            name={piece.name}
            regionName={piece.regionName}
            color={color}
            isNew={piece.isNew}
          />
        </div>
      )}

      <div className="mt-4 flex flex-col gap-3">
        <FeedbackSection title="잘한 점" items={feedback.good} />
        <FeedbackSection
          title="다음에 해볼 말"
          items={feedback.next.map((line) => `"${line}"`)}
        />
      </div>

      {followMission && (
        <section className="mt-4 overflow-hidden rounded-2xl bg-ticket border border-line">
          <p className="bg-brass px-4 py-1.5 text-[11px] font-bold text-navy">이제 진짜로 다녀와 볼까요?</p>
          <p className="px-4 py-3 font-serif text-base font-bold text-navy break-keep">{followMission.title}</p>
        </section>
      )}

      <div className="mt-auto flex flex-col items-center gap-3 pt-10">
        {followMission && (
          <Button title="오늘 탑승권으로 담기" onClick={() => setIsConfirmOpen(true)} disabled={saving} />
        )}
        <button
          type="button"
          onClick={() => navigate("/practice", { replace: true })}
          className="h-[52px] w-full cursor-pointer rounded-xl border border-line bg-ticket text-base font-bold text-navy"
        >
          다른 연습 해보기
        </button>
        <button
          type="button"
          onClick={() => navigate("/home")}
          className="cursor-pointer text-xs text-mute underline"
        >
          여권으로
        </button>
      </div>

      {isConfirmOpen && (
        <ConfirmModal
          title="오늘 탑승권으로 담을까요?"
          description={"오늘 탑승권이 이 미션으로 바뀌어요.\n다른 편 바꾸기 횟수는 줄지 않아요."}
          confirmText={saving ? "담는 중..." : "담기"}
          onCancel={() => setIsConfirmOpen(false)}
          onConfirm={handleSaveMission}
        />
      )}

      <Toast message={toast} bottom="bottom-10" />
    </div>
  );
}