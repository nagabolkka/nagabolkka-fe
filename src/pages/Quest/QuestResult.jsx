import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { getRegion } from "../../mocks/regions";
import { NEXT_DIFFICULTY_MESSAGE } from "../../constants/moods";
import PieceFound from "../../components/Quest/PieceFound";
import RestorationCard from "../../components/Quest/RestorationCard";
import Button from "../../components/common/Button/Button";

// 조각 획득 : 기록 화면이 넘겨준 완료 응답 + 기분
export default function QuestResult() {
  const navigate = useNavigate();
  const { state: result } = useLocation();

  if (!result?.pieces) return <Navigate to="/home" replace />;

  const { pieces, lumiMessage, restoration, mood } = result;
  const region = getRegion(restoration.stageNo); 

  return (
    <div className="flex min-h-screen flex-col gap-6 px-5 pb-8">
      <PieceFound
        pieces={pieces.map(({ pieceId, name, isNew }) => ({ id: pieceId, name, isNew }))}
        color={region.color}
      />
      <div className="relative mt-4">
        <span className="absolute -top-3 left-4 rounded-md bg-[#E8C06A] px-2.5 py-0.5 font-pixel text-xs text-[#2B2118]">
          루미
        </span>
        <p className="rounded-xl border border-[#E8C06A]/40 bg-[#F4EAD5]/10 px-4 pb-4 pt-5 text-sm leading-relaxed text-[#F4EAD5]">
          {lumiMessage}
        </p>
      </div>
      <RestorationCard
        regionName={restoration.regionName}
        before={restoration.before}
        after={restoration.after}
        color={region.color}
        nextMessage={NEXT_DIFFICULTY_MESSAGE[mood]}
      />
      <div className="mt-[126px]">
        <Button
          title="모험 지도에서 확인하기"
          onClick={() => navigate("/home")}
        />
      </div>
    </div>
  );
}