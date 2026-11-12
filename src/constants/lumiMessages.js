import { iGa } from "../utils/josa";

export const HOME_LUMI_MESSAGE = {
  DEFAULT: () => "오늘도 조각이 떨어졌대. 같이 보러 갈래?",
  RAINY: () => "오늘은 비가 와. 가까운 곳으로 골라봤어.",
  SAVED_PLACE: () => "네가 담아둔 곳으로 퀘스트를 바꿨어.",
  COMPLETED: ({ pieceName, regionName }) =>
    `${pieceName} 고마워! ${regionName}${iGa(regionName)} 조금 더 밝아졌어.`,
  SKIPPED: () => "괜찮아. 쉬는 것도 모험의 일부야.",
  IN_PROGRESS: () => "천천히 다녀와. 여기서 기다릴게.",
  WELCOME_BACK: () => "다시 와줘서 고마워. 오늘은 가볍게 시작해 볼까?",
};

// COMPLETED > SKIPPED > IN_PROGRESS > WELCOME_BACK > SAVED_PLACE > RAINY > DEFAULT
export const getHomeLumiMessage = ({ homeState, pieceName, regionName }) =>
  (HOME_LUMI_MESSAGE[homeState] ?? HOME_LUMI_MESSAGE.DEFAULT)({
    pieceName,
    regionName,
  });