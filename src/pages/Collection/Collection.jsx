import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CollectionHeader from "../../components/Collection/CollectionHeader";
import CurrentChapterCard from "../../components/Collection/CurrentChapterCard";
import CollectionFilter from "../../components/Collection/CollectionFilter";
import RegionPieces from "../../components/Collection/RegionPieces";
import BonusPieces from "../../components/Collection/BonusPieces";
import PieceSheet from "../../components/Collection/PieceSheet";
import PageLoading from "../../components/common/PageLoading/PageLoading";
import { getCollection } from "../../api/collection";
import { chapterState, missingSlots } from "../../utils/collection";

export default function Collection() {
  const navigate = useNavigate();
  const [collection, setCollection] = useState(null);
  const [error, setError] = useState(false);
  const [selected, setSelected] = useState(null);
  const [onlyMissing, setOnlyMissing] = useState(false); // 「아직 못 받은 도장만」 보기

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

  // 응답이 온 뒤에만 꺼냄 (위에서 꺼내면 처음 렌더 때 collection 이 null 이라 에러)
  const { foundCount, total, regions, bonusPieces } = collection;
  const current = regions.find((region) => chapterState(region.status) === "current");
  // 못 받은 도장만 : 다 모은 섬은 숨김
  const shownRegions = onlyMissing
    ? regions.filter((region) => missingSlots(region).length > 0)
    : regions;

  return (
    <div className="flex flex-col gap-3.5 bg-sky-paper px-4 pb-8 pt-6 min-h-full">
      <CollectionHeader foundCount={foundCount} total={total} />

      {current && <CurrentChapterCard region={current} />}

      <CollectionFilter onlyMissing={onlyMissing} onChange={setOnlyMissing} />

      {shownRegions.map((region) => (
        <RegionPieces
          key={region.stageNo}
          region={region}
          onlyMissing={onlyMissing}
          onSelect={setSelected}
        />
      ))}

      {onlyMissing && shownRegions.length === 0 && (
        <p className="rounded-2xl border border-dashed border-line py-8 text-center text-sm text-mute">
          모든 도장을 모았어요!
        </p>
      )}

      {/* 도장 25칸 밖 특별 도장 (받은 것만 · 없으면 안 그림 · 못 받은 도장만 보기에서는 숨김) */}
      {!onlyMissing && <BonusPieces pieces={bonusPieces} />}

      {selected && (
        <PieceSheet piece={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}