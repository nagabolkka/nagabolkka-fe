import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import BackHeader from "../../components/common/BackHeader/BackHeader";
import Ticket from "../../components/common/Ticket/Ticket";
import InkStamp from "../../components/common/Stamp/InkStamp";
import QuestMap from "../../components/Quest/QuestMap";
import QuestActions from "../../components/Quest/QuestActions";
import PageLoading from "../../components/common/PageLoading/PageLoading";
import Toast from "../../components/common/Toast/Toast";
import useQuest from "../../hooks/useQuest";
import { actTodayQuest } from "../../api/quests";
import { saveSplitSteps } from "../../utils/splitStepStorage";
import { getLocation } from "../../utils/location";
import { DIFFICULTY } from "../../constants/difficulty";
import { SEAT_BY_DIFFICULTY, todayFlight } from "../../constants/islands";
import { formatDistance, formatMinutes } from "../../utils/format";

// 오늘의 탑승권 (퀘스트 상세)
export default function QuestDetail() {
  const navigate = useNavigate();
  const { quest, setQuest, mission, region, isRainy, error } = useQuest();
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState("");

  if (!quest) return <PageLoading error={error} />;

  // 이미 끝난 퀘스트 (완료 · 쉬기) → 홈
  if (quest.status === "COMPLETED" || quest.status === "SKIPPED") {
    return <Navigate to="/home" replace />;
  }

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 2000);
  };

  // 동작 API → 성공하면 응답으로 화면 교체 · 실패하면 null
  const act = async (type) => {
    if (busy) return null; // 연속 클릭 무시
    setBusy(true);
    try {
      // 바꾸기는 새 미션 장소를 지금 위치 기준으로
      const location = type === "CHANGE" ? await getLocation() : null;
      const updated = await actTodayQuest(type, location);
      setQuest(updated);
      return updated;
    } catch (e) {
      const code = e.response?.data?.code;
      if (code === "QUEST_CHANGE_LIMIT") {
        showToast("오늘은 더 바꿀 수 없어요.");
      } else if (code === "QUEST_ALREADY_DONE") {
        navigate("/home", { replace: true });
      } else {
        showToast("잠시 후 다시 시도해 주세요.");
      }
      return null;
    } finally {
      setBusy(false);
    }
  };

  const handleAccept = async () => {
    if (await act("ACCEPT")) navigate("/quest/progress");
  };

  const handleSplit = async () => {
    const updated = await act("SPLIT");
    if (!updated) return;
    saveSplitSteps(updated.questId, []); // 새로 쪼갰으니 체크 초기화
    navigate("/quest/split");
  };

  const handleChange = async () => {
    await act("CHANGE"); // 같은 화면에서 미션만 바뀜
  };

  const handleSkip = async () => {
    if (await act("SKIP")) navigate("/home");
  };

  const difficulty = DIFFICULTY[mission.difficulty];
  const distance = mission.isIndoor
    ? "이동 없음"
    : mission.distanceM != null
      ? formatDistance(mission.distanceM)
      : "-";

  return (
    <div className="flex-1 flex flex-col bg-navy pb-8">
      <BackHeader
        dark
        title="오늘의 탑승권"
        label={`TODAY'S FLIGHT · ${region.name}`}
        onBack={() => navigate("/home")}
      />

      <Ticket
        className="mx-4 mt-1"
        color={region.color}
        accent={region.dark}
        flight={todayFlight()}
        from={{ code: "ROOM", label: "내 방" }}
        to={{ code: region.code, label: mission.placeName }}
        stub={
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="label-en text-[11px] text-navy truncate">
                {todayFlight()} · ROOM → {region.code}
              </p>
              <p className="mt-1 text-[11px] text-mute">다녀오면 이 칸에 도장이 찍혀요</p>
              <svg width="180" height="24" aria-hidden className="mt-2">
                {Array.from({ length: 36 }, (_, i) => (
                  <rect key={i} x={i * 5} y="0" width={[1, 2, 1, 3, 1, 2][i % 6]} height="24" fill="#1C2A5E" />
                ))}
              </svg>
            </div>
            <InkStamp title="STAMP" color="#C9C2AE" dashed rotate={0} size={66} />
          </div>
        }
      >
        <div className="mt-3 pt-3 border-t border-line">
          <h2 className="font-serif text-[21px] font-bold leading-7 text-navy break-keep">
            {mission.title}
          </h2>
          <p className="mt-1.5 text-[13px] leading-5 text-mute break-keep">{mission.description}</p>
        </div>

        <dl className="mt-3 pt-3 border-t border-line grid grid-cols-3 gap-y-3 gap-x-2">
          <Info label="GATE / 탑승구" value={mission.placeName} />
          <Info label="DIST / 거리" value={distance} />
          <Info
            label="TIME / 소요"
            value={mission.estMinutes != null ? formatMinutes(mission.estMinutes) : "-"}
          />
          <Info label="CLASS / 등급" value={difficulty.label} />
          <Info label="SEAT / 좌석" value={SEAT_BY_DIFFICULTY[mission.difficulty]} />
          <Info label="ISLAND / 섬" value={region.name} />
        </dl>

        <QuestMap mission={mission} region={region} isRainy={isRainy} color={region.color} />

        <div className="mt-3 flex items-center gap-3 rounded-xl px-3 py-2.5" style={{ backgroundColor: `${region.color}2E` }}>
          <InkStamp title={mission.reward.name} color={region.dark} dashed rotate={0} size={48} />
          <div className="min-w-0">
            <p className="text-[11px] font-semibold" style={{ color: region.dark }}>
              도착하면 받는 도장
            </p>
            <p className="text-sm font-bold text-navy truncate">
              {mission.reward.name} · {region.name} 불빛 +1
            </p>
          </div>
        </div>
      </Ticket>

      <QuestActions
        changeRemaining={quest.changeRemaining}
        onAccept={handleAccept}
        onSplit={handleSplit}
        onChange={handleChange}
        onSkip={handleSkip}
      />

      <Toast message={toast} bottom="bottom-10" />
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="min-w-0">
      <dt className="text-[9px] text-mute">{label}</dt>
      <dd className="mt-0.5 text-[14px] font-bold text-navy break-keep line-clamp-2">{value}</dd>
    </div>
  );
}