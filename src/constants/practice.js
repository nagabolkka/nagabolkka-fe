export const PRACTICE_MESSAGE_MAX = 200; // 직접 입력 최대 글자 수

export const VOICE_MAX_SECONDS = 30; // 녹음 최대 (넘으면 자동으로 멈춤)
export const VOICE_MIN_MS = 700; // 이보다 짧으면 「조금 더 길게 말해 주세요」

export const getPracticeLumiMessage = (remaining) =>
  remaining > 0
    ? `오늘 연습은 ${remaining}번 더 할 수 있어요. 편하게 골라 봐요!`
    : "오늘 연습은 여기까지! 내일 또 같이 해요.";