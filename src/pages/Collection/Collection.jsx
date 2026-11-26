import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CollectionHeader from "../../components/Collection/CollectionHeader";
import IslandTabs from "../../components/Collection/IslandTabs";
import StampPage from "../../components/Collection/StampPage";
import BonusPieces from "../../components/Collection/BonusPieces";
import PieceSheet from "../../components/Collection/PieceSheet";
import PageLoading from "../../components/common/PageLoading/PageLoading";
import { getCollection } from "../../api/collection";
import { chapterState } from "../../utils/collection";

// 도장 = 도감 : 섬 우표 탭으로 한 섬씩 · 여권 한 페이지에 기분 잉크 도장
export default function Collection() {
  const navigate = useNavigate();
  const [collection, setCollection] = useState(null);
  const [error, setError] = useState(false);
  const [stageNo, setStageNo] = useState(null); // 고른 섬 (처음엔 지금 섬)
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    let ignore = false;
    getCollection()
      .then((data) => {
        if (!ignore) setCollection(data);
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

  if (!collection) return <PageLoading error={error} />;

  const { foundCount, total, regions, bonusPieces } = collection;
  const current =
    regions.find((region) => chapterState(region.status) === "current") ??
    regions[0];
  const shown = regions.find((region) => region.stageNo === stageNo) ?? current;

  return (
    <div className="flex min-h-full flex-col gap-3.5 bg-sky-paper px-4 pb-8 pt-6">
      <CollectionHeader foundCount={foundCount} total={total} />

      <IslandTabs
        regions={regions}
        selected={shown.stageNo}
        onSelect={setStageNo}
      />
      <div className="mt-4"> 
        <StampPage region={shown} onSelect={setSelected} />
      </div>

      {/* 도장 25칸 밖 특별 도장 (받은 것만 · 없으면 안 그림) */}
      <BonusPieces pieces={bonusPieces} />

      {selected && (
        <PieceSheet piece={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
