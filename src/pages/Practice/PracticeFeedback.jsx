import { useEffect, useRef, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import FeedbackPieceCard from "../../components/Practice/FeedbackPieceCard";
import FeedbackSection from "../../components/Practice/FeedbackSection";
import Button from "../../components/common/Button/Button";
import ConfirmModal from "../../components/common/ConfirmModal/ConfimModal";
import { getRegion } from "../../mocks/regions";
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
  const color = piece ? getRegion(piece.stageNo)?.color : undefined;

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
    <div className="relative flex flex-1 flex-col bg-bg-page px-4 pb-8 pt-10">
      <p className="font-pixel text-xs text-[#E8C06A]">{title} · 연습 완료</p>
      <h1 className="mt-1 font-pixel text-2xl text-[#F4EAD5]">끝까지 해냈어!</h1>

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
        <section className="mt-4 rounded-lg border-2 border-[#15121F] bg-[#2B2340] px-4 py-3">
          <p className="font-pixel text-[10px] text-[#B9B0D0]">이제 진짜로 해볼까?</p>
          <p className="mt-1 text-sm text-[#F4EAD5] break-keep">{followMission.title}</p>
        </section>
      )}

      <div className="mt-auto flex flex-col items-center gap-3 pt-10">
        {followMission && (
          <Button title="실제 미션으로 담기" onClick={() => setIsConfirmOpen(true)} disabled={saving} />
        )}
        <button
          type="button"
          onClick={() => navigate("/practice", { replace: true })}
          className="h-[50px] w-[351px] cursor-pointer rounded-[10px] border-2 border-[#15121F] bg-[#2C2745] font-pixel text-base text-[#F4EAD5]"
        >
          다른 연습 해보기
        </button>
        <button
          type="button"
          onClick={() => navigate("/home")}
          className="cursor-pointer text-[11px] text-[#B9B0D0] underline"
        >
          모험 지도로
        </button>
      </div>

      {isConfirmOpen && (
        <ConfirmModal
          title="오늘 퀘스트로 담을까요?"
          description={"오늘 퀘스트가 이 미션으로 바뀌어요.\n바꾸기 횟수는 줄지 않아요."}
          confirmText={saving ? "담는 중..." : "담기"}
          onCancel={() => setIsConfirmOpen(false)}
          onConfirm={handleSaveMission}
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