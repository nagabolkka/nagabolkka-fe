import { useMemo, useState } from "react";
import CollectionHeader from "../../components/Collection/CollectionHeader";
import RegionPieces from "../../components/Collection/RegionPieces";
import PieceSheet from "../../components/Collection/PieceSheet";
import { getCollection } from "../../mocks/collection";

export default function Collection() {
  const { foundCount, total, regions } = useMemo(() => getCollection(), []);
  const [selected, setSelected] = useState(null);

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