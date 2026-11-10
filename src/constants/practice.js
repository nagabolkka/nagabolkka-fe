export const PRACTICE_DAILY_LIMIT = 3; // 하루 연습 횟수
export const PRACTICE_MAX_TURNS = 3;
export const PRACTICE_MESSAGE_MAX = 200; // 직접 입력 최대 글자 수
export const PRACTICE_PIECE_MISSION_ID = 20; // 4계단 PRACTICE 칸 · 연습 조각

export const getPracticeLumiMessage = (remaining) =>
  remaining > 0
    ? `오늘 연습은 ${remaining}번 더 할 수 있어. 편하게 골라봐!`
    : "오늘 연습은 여기까지! 내일 또 같이 해보자.";