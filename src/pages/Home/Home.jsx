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
  getActiveNotice,
} from "../../utils/noticeStorage";
import { respondNextRegion } from "../../api/regions";

export default function Home() {
  const navigate = useNavigate();
  const [home, setHome] = useState(null);
  const [error, setError] = useState(false);
  const [stayed, setStayed] = useState(false); // "지금이 좋아요" 누름
  const [answering, setAnswering] = useState(false); // 다음 지역 응답 중 (연타 방지)

  const [notice, setNotice] = useState(() => {
    const active = getActiveNotice();
    return active && !isNoticeHiddenToday(active.noticeId) ? active : null;
  });

  useEffect(() => {
    let ignore = false;
    getHome()
      .then((data) => {
        if (!ignore) setHome(data);
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

  return (
    <div className="relative flex flex-col pb-3">
      <RegionHeader
        region={region}
        restoration={currentRegion.restoration}
        isRainy={weather.isRainy}
        pieceCount={pieceCount}
      />
      <LumiMessage message={lumiMessage} />
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
      <AdventurePath regions={pathRegions} />
      <div className="flex gap-[17px] pl-3 mt-2.5">
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
    </div>
  );
}
