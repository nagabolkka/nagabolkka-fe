import mood1 from "../assets/images/moods/mood-1.svg";
import mood2 from "../assets/images/moods/mood-2.svg";
import mood3 from "../assets/images/moods/mood-3.svg";
import mood4 from "../assets/images/moods/mood-4.svg";
import mood5 from "../assets/images/moods/mood-5.svg";

export const MOODS = [
  { value: 1, label: "힘들었어요", image: mood1 },
  { value: 2, label: "그저 그래요", image: mood2 },
  { value: 3, label: "보통이에요", image: mood3 },
  { value: 4, label: "괜찮았어요", image: mood4 },
  { value: 5, label: "좋았어요", image: mood5 },
];

// 기분 별 다음 난이도 안내 
export const NEXT_DIFFICULTY_MESSAGE = {
  1: "다음엔 조금 더 가벼운 퀘스트로 준비할게요.",
  2: "다음엔 부담 없는 퀘스트로 준비할게요.",
  3: "다음에도 지금처럼 편안한 난이도로 준비할게요.",
  4: "다음에도 지금처럼 편안한 난이도로 준비할게요.",
  5: "다음엔 살짝 도전해볼 만한 퀘스트도 준비해볼게요.",
};