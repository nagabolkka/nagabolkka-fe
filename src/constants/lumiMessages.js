import { iGa } from "../utils/josa";

// 홈 기장 루미 한마디
export const HOME_LUMI_MESSAGE = {
  DEFAULT: () => "오늘 탑승권이 나왔어요. 같이 가볼까요?",
  RAINY: ({ sky }) =>
    sky === "SNOW"
      ? "오늘은 눈이 와요. 가까운 곳으로 편을 잡았어요."
      : "오늘은 비가 와요. 가까운 곳으로 편을 잡았어요.",
  SAVED_PLACE: () => "담아둔 곳으로 탑승권을 바꿨어요.",
  COMPLETED: ({ pieceName, regionName }) =>
    `${pieceName} 도장 고마워요! ${regionName}${iGa(regionName)} 조금 더 환해졌어요.`,
  SKIPPED: () => "괜찮아요. 쉬어 가는 것도 여행의 일부예요.",
  IN_PROGRESS: () => "천천히 다녀와요. 여기서 기다릴게요.",
  WELCOME_BACK: () => "다시 와줘서 고마워요. 오늘은 가볍게 출발해 볼까요?",
};

// COMPLETED > SKIPPED > IN_PROGRESS > WELCOME_BACK > SAVED_PLACE > RAINY > DEFAULT
export const getHomeLumiMessage = ({ homeState, pieceName, regionName, sky }) =>
  (HOME_LUMI_MESSAGE[homeState] ?? HOME_LUMI_MESSAGE.DEFAULT)({
    pieceName,
    regionName,
    sky,
  });