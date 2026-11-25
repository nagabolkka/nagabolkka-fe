import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LumiMessage from "../../components/common/LumiMessage/LumiMessage";
import NextIslandPass from "../../components/Home/NextIslandPass";
import TodayQuestCard from "../../components/Home/TodayQuestCard";
import IslandHero from "../../components/Home/IslandHero";
import NoticePopup from "../../components/Home/NoticePopup";
import Toast from "../../components/common/Toast/Toast";
import DifficultySheet from "../../components/Home/DifficultySheet";
import PageLoading from "../../components/common/PageLoading/PageLoading";
import { getHome } from "../../api/home";
import { getIsland } from "../../constants/islands";
import { formatQuestDate } from "../../utils/format";
import { getHomeLumiMessage } from "../../constants/lumiMessages";
import { DIFFICULTY } from "../../constants/difficulty";
import {
  hideNoticeToday,
  isNoticeHiddenToday,
} from "../../utils/noticeStorage";
import { getActiveNotice } from "../../api/notices";
import { respondNextRegion } from "../../api/regions";
import { saveWeather } from "../../utils/weatherStorage";
import LocationBanner from "../../components/common/LocationBanner/LocationBanner";
import { getLocation, getLocationStatus } from "../../utils/location";
import { actTodayQuest } from "../../api/quests";

const SKY_LABEL = { CLEAR: "맑음", RAIN: "비", SNOW: "눈" };

// 난이도 바꾸기 실패 안내
const DIFFICULTY_ERROR_MESSAGE = {
  QUEST_DIFFICULTY_LIMIT: "오늘은 난이도를 이미 바꿨어요.",
  QUEST_DIFFICULTY_LOCKED: "지금은 난이도를 바꿀 수 없어요.",
  QUEST_ALREADY_DONE: "오늘 퀘스트를 이미 마쳤어요.",
};

export default function Home() {
  const navigate = useNavigate();
  const [home, setHome] = useState(null);
  const [error, setError] = useState(false);
  const [stayed, setStayed] = useState(false); // "조금 더 머물래요" 누름
  const [answering, setAnswering] = useState(false); // 다음 섬 응답 · 난이도 바꾸기 중 (연타 방지)

  const [notice, setNotice] = useState(null);

  const [isDifficultyOpen, setIsDifficultyOpen] = useState(false); // 난이도 시트
  const [toast, setToast] = useState("");

  const [locationStatus, setLocationStatus] = useState(null); // 위치 안내 카드

  useEffect(() => {
    let ignore = false;
    getLocation()
      .then((location) => {
        if (!ignore) setLocationStatus(getLocationStatus());
        return getHome(location);
      })
      .then((data) => {
        if (ignore) return;
        saveWeather(data.weather);
        setHome(data);
      })
      .catch((e) => {
        if (ignore) return;
        const code = e.response?.data?.code;
        if (code === "ONBOARDING_REQUIRED") {
          navigate("/start-check", { replace: true });
          return;
        }
        // 응답 없음 (서버 꺼짐 · 15초 초과) · 500번대 → 점검 화면
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

  // 게시 중 공지 (오늘 하루 보지 않기 한 공지는 빼고) — 실패해도 홈은 그대로
  useEffect(() => {
    let ignore = false;
    getActiveNotice()
      .then((active) => {
        if (!ignore && active && !isNoticeHiddenToday(active.noticeId))
          setNotice(active);
      })
      .catch(() => {});
    return () => {
      ignore = true;
    };
  }, []);

  if (!home) return <PageLoading error={error} />;

  const {
    weather,
    currentRegion,
    pieceCount,
    homeState,
    todayQuest,
    regions,
    nextRegionSuggestion,
  } = home;

  // 섬 (지역 stageNo → 마음 군도) · 오늘 퀘스트의 섬 (지나온 섬 미션이면 그 섬)
  const island = getIsland(currentRegion.stageNo);
  const questIsland = getIsland(todayQuest.stageNo);

  const lumiMessage = getHomeLumiMessage({
    homeState,
    pieceName: todayQuest.reward.name,
    regionName: questIsland.name,
    sky: weather.sky,
  });

  const showNextRegion = Boolean(nextRegionSuggestion) && !stayed;

  // 난이도 칩 : 수락 전 · 자동 배정 퀘스트만 (횟수 0 이어도 열림 → 「오늘 다 바꿈」 시트)
  const canPickDifficulty =
    todayQuest.status === "ASSIGNED" && todayQuest.source === "AUTO";

  // 진행 중이면 진행 화면으로, 아니면 상세로
  const questPath =
    todayQuest.status === "IN_PROGRESS"
      ? todayQuest.isSplit
        ? "/quest/split"
        : "/quest/progress"
      : "/quest";

  const handleHideToday = () => {
    hideNoticeToday(notice.noticeId);
    setNotice(null);
  };

  // 다음 섬 : 탑승 → 홈 다시 불러오기 (새 섬) / 머물기 → 탑승권 닫기 (7일 뒤 다시)
  const handleNextRegion = async (accept) => {
    if (answering) return;
    setAnswering(true);
    try {
      await respondNextRegion(accept);
      if (accept) {
        setHome(await getHome());
        showToast(`${getIsland(nextRegionSuggestion.stageNo).name}에 도착했어요!`);
      } else {
        setStayed(true);
      }
    } catch (e) {
      // 응답 없음 (서버 꺼짐 · 15초 초과) · 500번대 → 점검 화면
      if (!e.response || e.response.status >= 500) {
        navigate("/maintenance", { replace: true });
        return;
      }
      // REGION_NOT_SUGGESTED (다른 화면에서 이미 응답 등) → 최신 홈으로
      setHome(await getHome().catch(() => home));
    } finally {
      setAnswering(false);
    }
  };

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 2000);
  };

  // 위치 다시 묻기 → 받으면 그 위치로 홈 다시 (설정에서 위치를 켜고 돌아온 사람)
  const handleRetryLocation = async () => {
    const location = await getLocation();
    setLocationStatus(getLocationStatus());
    if (!location) return;
    try {
      const data = await getHome(location);
      saveWeather(data.weather);
      setHome(data);
    } catch {
      showToast("잠시 후 다시 시도해 주세요.");
    }
  };

  // 난이도 바꾸기 (EASIER · HARDER) → 오늘 퀘스트 교체 → 홈 다시 불러오기
  const handleDifficulty = async (type) => {
    if (answering) return;
    setAnswering(true);
    try {
      const location = await getLocation();
      const quest = await actTodayQuest(type, location);
      setHome(await getHome(location));
      setIsDifficultyOpen(false);
      const arrow = type === "HARDER" ? "▲" : "▼";
      showToast(
        `${arrow} ${DIFFICULTY[quest.difficulty].label} 퀘스트로 바꿨어요`,
      );
    } catch (e) {
      setIsDifficultyOpen(false);
      const code = e.response?.data?.code;
      showToast(
        DIFFICULTY_ERROR_MESSAGE[code] ?? "잠시 후 다시 시도해 주세요.",
      );
      setHome(await getHome().catch(() => home)); // 다른 화면에서 이미 바꿨을 수 있음 → 최신으로
    } finally {
      setAnswering(false);
    }
  };

  return (
    <div className="relative flex flex-col bg-sky-paper pb-6 min-h-full">
      {/* 상단 : 날짜 · 날씨 · 도장 수 */}
      <header className="flex items-start justify-between px-5 pt-6">
        <div>
          <p className="text-[13px] font-medium text-mute">
            {formatQuestDate(new Date())}
          </p>
          <h1 className="mt-0.5 font-serif text-[22px] font-bold text-navy">
            오늘의 여권
          </h1>
        </div>
        <div className="flex gap-1.5 pt-1">
          <span className="rounded-full border border-line bg-white px-3 py-1 text-xs font-bold text-navy">
            {SKY_LABEL[weather.sky] ?? (weather.isRainy ? "비" : "맑음")}
          </span>
          <span className="rounded-full bg-navy px-3 py-1 text-xs font-bold text-brass">
            도장 {pieceCount}
          </span>
        </div>
      </header>

      {/* 지금 섬 (누르면 마음 군도) */}
      <IslandHero
        island={island}
        regions={regions}
        restoration={currentRegion.restoration}
        isRainy={weather.isRainy}
        onOpenMap={() => navigate("/islands")}
      />

      <LumiMessage message={lumiMessage} pose="passenger" />
      <LocationBanner status={locationStatus} onRetry={handleRetryLocation} />

      <div className="mt-4">
        <TodayQuestCard
          mission={todayQuest}
          region={questIsland}
          status={todayQuest.status}
          onClick={() => navigate(questPath)}
          isSavedPlace={todayQuest.source === "SAVED_PLACE"}
          onDifficultyClick={
            canPickDifficulty ? () => setIsDifficultyOpen(true) : undefined
          }
        />
      </div>

      {/* 섬 불빛 5개 다 켬 → 다음 섬 새 탑승권 (전체 화면) */}
      {showNextRegion && (
        <NextIslandPass
          region={currentRegion}
          nextRegion={nextRegionSuggestion}
          difficulty={todayQuest.difficulty}
          submitting={answering}
          onStay={() => handleNextRegion(false)}
          onOpen={() => handleNextRegion(true)}
        />
      )}

      {notice && !showNextRegion && (
        <NoticePopup
          notice={notice}
          onClose={() => setNotice(null)}
          onHideToday={handleHideToday}
        />
      )}

      {isDifficultyOpen && (
        <DifficultySheet
          current={todayQuest.difficulty}
          remaining={todayQuest.difficultyChangeRemaining ?? 0}
          submitting={answering}
          onClose={() => !answering && setIsDifficultyOpen(false)}
          onChange={handleDifficulty}
        />
      )}

      <Toast message={toast} />
    </div>
  );
}