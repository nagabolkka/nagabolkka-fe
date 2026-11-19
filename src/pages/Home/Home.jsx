import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RegionHeader from "../../components/Home/RegionHeader";
import LumiMessage from "../../components/common/LumiMessage/LumiMessage";
import NextRegionCard from "../../components/Home/NextRegionCard";
import TodayQuestCard from "../../components/Home/TodayQuestCard";
import AdventurePath from "../../components/Home/AdventurePath";
import ShortcutCard from "../../components/Home/ShortcutCard";
import NoticePopup from "../../components/Home/NoticePopup";
import PageLoading from "../../components/common/PageLoading/PageLoading";
import { getHome } from "../../api/home";
import { getRegion } from "../../mocks/regions";
import { getHomeLumiMessage } from "../../constants/lumiMessages";
import {
  hideNoticeToday,
  isNoticeHiddenToday,
} from "../../utils/noticeStorage";
import { getActiveNotice } from "../../api/notices";
import { respondNextRegion } from "../../api/regions";
import { saveWeather } from "../../utils/weatherStorage";
import LocationBanner from "../../components/common/LocationBanner/LocationBanner";
import { getLocation, getLocationStatus } from "../../utils/location";
import ConfirmModal from "../../components/common/ConfirmModal/ConfimModal";
import { actTodayQuest } from "../../api/quests";

export default function Home() {
  const navigate = useNavigate();
  const [home, setHome] = useState(null);
  const [error, setError] = useState(false);
  const [stayed, setStayed] = useState(false); // "지금이 좋아요" 누름
  const [answering, setAnswering] = useState(false); // 다음 지역 응답 중 (연타 방지)

  const [notice, setNotice] = useState(null);

  const [revisitRegion, setRevisitRegion] = useState(null); // 누른 지나온 계단
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
    goal,
    nextRegionSuggestion,
  } = home;

  // 지역 정보는 서버, 이미지는 프론트 에셋
  const localRegion = getRegion(currentRegion.stageNo);
  const region = {
    ...currentRegion,
    imageUrl: localRegion.imageUrl,
    rainyImageUrl: localRegion.rainyImageUrl,
  };

  // 오늘 퀘스트의 지역 (지나온 계단 미션이면 그 계단 색)
  const questRegion = getRegion(todayQuest.stageNo);

  const lumiMessage = getHomeLumiMessage({
    homeState,
    pieceName: todayQuest.reward.name,
    regionName: questRegion.name,
    sky: weather.sky,
  });

  const pathRegions = regions.map((r) => ({
    ...r,
    isCurrent: r.stageNo === currentRegion.stageNo,
  }));

  const showNextRegion = Boolean(nextRegionSuggestion) && !stayed;

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

  // 다음 지역 : 열기 → 홈 다시 불러오기 (새 지역 · 모험의 길) / 머물기 → 카드 숨김 (7일 뒤 다시)
  const handleNextRegion = async (accept) => {
    if (answering) return;
    setAnswering(true);
    try {
      await respondNextRegion(accept);
      if (accept) {
        setHome(await getHome());
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

  // 지나온 계단 누름 : 오늘 퀘스트가 끝났으면 안내만, 아니면 모달
  const handleSelectPassed = (passedRegion) => {
    if (todayQuest.status === "COMPLETED" || todayQuest.status === "SKIPPED") {
      showToast(`내일 ${passedRegion.name} 미션에 도전해 봐요!`);
      return;
    }
    setRevisitRegion(passedRegion);
  };

  // 이 계단 미션 받기 → 오늘 퀘스트 교체 → 홈 다시 불러오기
  const handleRevisit = async () => {
    if (answering) return;
    setAnswering(true);
    const stageNo = revisitRegion.stageNo;
    setRevisitRegion(null);
    try {
      const location = await getLocation();
      await actTodayQuest("REVISIT", location, { stageNo });
      setHome(await getHome(location));
    } catch (e) {
      const code = e.response?.data?.code;
      if (code === "QUEST_CHANGE_LIMIT") {
        showToast("오늘은 더 바꿀 수 없어요.");
      } else if (code === "QUEST_ALREADY_DONE") {
        showToast("오늘 퀘스트를 이미 마쳤어요.");
      } else {
        showToast("잠시 후 다시 시도해 주세요.");
      }
    } finally {
      setAnswering(false);
    }
  };

  return (
    <div className="relative flex flex-col pb-3">
      <RegionHeader
        region={region}
        restoration={currentRegion.restoration}
        isRainy={weather.isRainy}
        sky={weather.sky}
        pieceCount={pieceCount}
      />
      <LumiMessage message={lumiMessage} />
      <LocationBanner status={locationStatus} onRetry={handleRetryLocation} />
      {showNextRegion && (
        <NextRegionCard
          region={region}
          nextRegion={nextRegionSuggestion}
          onStay={() => handleNextRegion(false)}
          onOpen={() => handleNextRegion(true)}
        />
      )}
      <TodayQuestCard
        mission={todayQuest}
        region={questRegion}
        status={todayQuest.status}
        onClick={() => navigate(questPath)}
        isSavedPlace={todayQuest.source === "SAVED_PLACE"}
      />
      <AdventurePath
        regions={pathRegions}
        onSelectPassed={handleSelectPassed}
      />
      <div className="grid grid-cols-3 gap-[17px] pl-3 pr-[17px] mt-2.5">
        <ShortcutCard
          title="연습실"
          description="루미와 말 연습"
          onClick={() => navigate("/practice")}
        />
        <ShortcutCard
          title="목표 준비"
          description={
            goal ? `${goal.name} · ${goal.checked}/${goal.total}` : "목표 없음"
          }
          onClick={() => navigate("/goals")}
        />
        <ShortcutCard
          title="루미의 편지"
          description="이번 주 이야기"
          onClick={() => navigate("/letter")}
        />
      </div>
      {notice && (
        <NoticePopup
          notice={notice}
          onClose={() => setNotice(null)}
          onHideToday={handleHideToday}
        />
      )}
      {revisitRegion && (
        <ConfirmModal
          title={`${revisitRegion.name} 미션도 도전할 수 있어요!`}
          description={`지나온 계단에서 아직 못 찾은 조각을 모을 수 있어요.\n오늘 퀘스트를 이 계단 미션으로 바꿀까요?\n(바꾸기 1번을 써요)`}
          confirmText="이 계단 미션 받기"
          onCancel={() => setRevisitRegion(null)}
          onConfirm={handleRevisit}
        />
      )}

      {toast && (
        <div className="fixed w-[300px] px-6 bottom-24 left-1/2 z-50 -translate-x-1/2 rounded-full bg-[#15121F]/90 py-2 text-center text-xs text-[#F4EAD5]">
          {toast}
        </div>
      )}
    </div>
  );
}
