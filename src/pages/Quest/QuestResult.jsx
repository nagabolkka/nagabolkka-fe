import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { getIsland, MOOD_INK } from "../../constants/islands";
import { MOODS, NEXT_DIFFICULTY_MESSAGE } from "../../constants/moods";
import PieceFound from "../../components/Quest/PieceFound";
import RestorationCard from "../../components/Quest/RestorationCard";
import Button from "../../components/common/Button/Button";
import PushAskCard from "../../components/Quest/PushAskCard";
import Lumi from "../../components/common/Lumi/Lumi";

// 도장 획득 : 기록 화면이 넘겨준 완료 응답 + 기분
export default function QuestResult() {
  const navigate = useNavigate();
  const { state: result } = useLocation();

  if (!result?.pieces) return <Navigate to="/home" replace />;

  const { pieces, lumiMessage, restoration, mood } = result;
  const island = getIsland(restoration.stageNo);
  const ink = MOOD_INK[mood] ?? island.dark;
  const moodLabel = MOODS.find((m) => m.value === mood)?.label;

  return (
    <div className="flex min-h-dvh flex-col bg-navy px-5 pb-8">
      <PieceFound
        islandName={island.name}
        moodLabel={moodLabel}
        color={ink}
        pieces={pieces.map(({ pieceId, name, isNew }) => ({
          id: pieceId,
          name,
          isNew,
        }))}
      />

      <RestorationCard
        regionName={island.name}
        before={restoration.before}
        after={restoration.after}
        nextMessage={NEXT_DIFFICULTY_MESSAGE[mood]}
      />

      {/* 루미 한마디 */}
      <section className="mt-3 flex items-center gap-2 rounded-2xl bg-white p-3">
        <Lumi pose="cheer" size={58} decorative className="shrink-0" />
        <p className="text-[13px] font-medium leading-5 text-navy break-keep">{lumiMessage}</p>
      </section>

      <div className="mt-3">
        <PushAskCard />
      </div>

      <div className="mt-auto pt-8 flex justify-center">
        <Button variant="gold" title="여권으로 돌아가기" onClick={() => navigate("/home")} />
      </div>
    </div>
  );
}