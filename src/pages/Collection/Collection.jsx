import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CollectionHeader from "../../components/Collection/CollectionHeader";
import RegionPieces from "../../components/Collection/RegionPieces";
import PieceSheet from "../../components/Collection/PieceSheet";
import PageLoading from "../../components/common/PageLoading/PageLoading";
import { getCollection } from "../../api/collection";

export default function Collection() {
  const navigate = useNavigate();
  const [collection, setCollection] = useState(null);
  const [error, setError] = useState(false);
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

  const { foundCount, total, regions } = collection;

  return (
    <div className="flex flex-col gap-4 px-4 pb-6 pt-8">
      <CollectionHeader foundCount={foundCount} total={total} />

      {regions.map((region) => (
        <RegionPieces key={region.stageNo} region={region} onSelect={setSelected} />
      ))}

      {selected && <PieceSheet piece={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}