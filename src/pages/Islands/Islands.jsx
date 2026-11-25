import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackHeader from "../../components/common/BackHeader/BackHeader";
import FloatingIsland from "../../components/common/Island/FloatingIsland";
import ConfirmModal from "../../components/common/ConfirmModal/ConfimModal";
import PageLoading from "../../components/common/PageLoading/PageLoading";
import Toast from "../../components/common/Toast/Toast";
import { getHome } from "../../api/home";
import { actTodayQuest } from "../../api/quests";
import { getIsland, litCount } from "../../constants/islands";
import { getLocation } from "../../utils/location";

// 섬 자리 (아래 = 1번 섬 → 위 = 5번 섬) : [left %, top px]
const SPOTS = [
  [50, 530],
  [22, 430],
  [72, 320],
  [24, 200],
  [70, 80],
];

const isPassed = (r) => r.status === "PASSED" || r.status === "COMPLETED";

// 마음 군도 : 5개 섬 상태 · 지나온 섬은 그 섬 미션으로 바꿀 수 있음
export default function Islands() {
  const navigate = useNavigate();
  const [home, setHome] = useState(null);
  const [error, setError] = useState(false);
  const [revisit, setRevisit] = useState(null); // 누른 지나온 섬
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    let ignore = false;
    getLocation()
      .then((location) => getHome(location))
      .then((data) => {
        if (!ignore) setHome(data);
      })
      .catch((e) => {
        if (ignore) return;
        if (e.response?.data?.code === "ONBOARDING_REQUIRED") {
          navigate("/start-check", { replace: true });
          return;
        }
        if (!e.response || e.response.status >= 500) {
          navigate("/maintenance", { replace: true });
          return;
        }
        setError(true);
      });
    return () => {
      ignore = true;
    };
  }, [navigate]);

  if (!home) return <PageLoading error={error} />;

  const { currentRegion, regions, todayQuest } = home;

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 2000);
  };

  const handleSelect = (region) => {
    if (region.stageNo === currentRegion.stageNo) {
      navigate("/home");
      return;
    }
    if (!isPassed(region)) {
      showToast("섬마다 불빛 5개를 켜면 다음 섬 안개가 걷혀요.");
      return;
    }
    if (todayQuest.status === "COMPLETED" || todayQuest.status === "SKIPPED") {
      showToast(`내일 ${getIsland(region.stageNo).name} 미션에 도전해 봐요!`);
      return;
    }
    setRevisit(region);
  };

  // 지나온 섬 미션 받기 → 오늘 퀘스트 교체 → 홈
  const handleRevisit = async () => {
    if (busy) return;
    setBusy(true);
    const stageNo = revisit.stageNo;
    setRevisit(null);
    try {
      const location = await getLocation();
      await actTodayQuest("REVISIT", location, { stageNo });
      navigate("/home");
    } catch (e) {
      const code = e.response?.data?.code;
      if (code === "QUEST_CHANGE_LIMIT") showToast("오늘은 더 바꿀 수 없어요.");
      else if (code === "QUEST_ALREADY_DONE") showToast("오늘 퀘스트를 이미 마쳤어요.");
      else showToast("잠시 후 다시 시도해 주세요.");
      setBusy(false);
    }
  };

  return (
    <div className="relative flex-1 flex flex-col bg-gradient-to-b from-[#BFE4F4] to-[#E8F6FC] overflow-hidden">
      <BackHeader title="마음 군도" label="MIND ISLANDS" onBack={() => navigate(-1)} />

      <div className="relative mx-auto h-[720px] w-full max-w-[393px]">
        {/* 항로 */}
        <svg aria-hidden className="absolute inset-0 w-full h-full" viewBox="0 0 393 720" preserveAspectRatio="none">
          <path
            d="M196 650 C120 590 300 540 260 470 C210 400 90 400 120 330 C160 260 300 270 280 190 C260 140 150 140 280 100"
            stroke="#1C2A5E"
            strokeOpacity="0.45"
            strokeWidth="2.5"
            strokeDasharray="4 8"
            fill="none"
          />
        </svg>

        {regions.map((region) => {
          const island = getIsland(region.stageNo);
          const [left, top] = SPOTS[region.stageNo - 1];
          const isCurrent = region.stageNo === currentRegion.stageNo;
          const locked = region.status === "LOCKED";
          const lit = isCurrent ? litCount(currentRegion.restoration) : isPassed(region) ? 5 : 0;
          const sub = isCurrent
            ? `불빛 ${lit} / 5 · 지금 여기`
            : locked
              ? "안개 속"
              : "다녀온 섬 · 미션 도전";

          return (
            <button
              key={region.stageNo}
              type="button"
              onClick={() => handleSelect(region)}
              className="absolute flex flex-col items-center -translate-x-1/2 cursor-pointer"
              style={{ left: `${left}%`, top }}
              aria-label={`${island.name} · ${sub}`}
            >
              <FloatingIsland stageNo={region.stageNo} lit={locked ? -1 : lit} locked={locked} size={isCurrent ? 150 : 130} />
              <span
                className={`-mt-4 rounded-xl px-3 py-1.5 text-center ${
                  isCurrent ? "bg-navy text-brass" : "bg-ticket text-navy border border-navy/70"
                }`}
              >
                <span className="block text-[13px] font-bold">{island.name}</span>
                <span className={`block text-[10px] ${isCurrent ? "text-mute-on-navy" : "text-mute"}`}>
                  {sub}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {revisit && (
        <ConfirmModal
          title={`${getIsland(revisit.stageNo).name} 미션도 도전할 수 있어요!`}
          description={`다녀온 섬에서 아직 못 받은 도장을 모을 수 있어요.\n오늘 탑승권을 이 섬 편으로 바꿀까요?\n(다른 편 바꾸기 1번을 써요)`}
          confirmText="이 섬 편 받기"
          onCancel={() => setRevisit(null)}
          onConfirm={handleRevisit}
        />
      )}

      <Toast message={toast} bottom="bottom-10" />
    </div>
  );
}