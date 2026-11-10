import { iGa } from "../utils/josa";

export const HOME_LUMI_MESSAGE = {
  DEFAULT: () => "오늘도 조각이 떨어졌대. 같이 보러 갈래?",
  RAINY: () => "오늘은 비가 와. 가까운 곳으로 골라봤어.",
  SAVED_PLACE: () => "네가 담아둔 곳으로 퀘스트를 바꿨어.",
  COMPLETED: ({ pieceName, regionName }) =>
    `${pieceName} 고마워! ${regionName}${iGa(regionName)} 조금 더 밝아졌어.`,
  SKIPPED: () => "괜찮아. 쉬는 것도 모험의 일부야.",
};

// 우선순위 : 오늘 퀘스트 결과(완료 · 건너뜀) > 담은 장소 > 비 > 기본
export const getHomeLumiMessage = ({
  questStatus,
  isRainy,
  isSavedPlace,
  pieceName,
  regionName,
}) => {
  if (questStatus === "COMPLETED")
    return HOME_LUMI_MESSAGE.COMPLETED({ pieceName, regionName });
  if (questStatus === "SKIPPED") return HOME_LUMI_MESSAGE.SKIPPED();
  if (isSavedPlace) return HOME_LUMI_MESSAGE.SAVED_PLACE();
  if (isRainy) return HOME_LUMI_MESSAGE.RAINY();
  return HOME_LUMI_MESSAGE.DEFAULT();
};
