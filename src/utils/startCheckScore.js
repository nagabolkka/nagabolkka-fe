import { getIsland } from "../constants/islands";

export const calcScore = (answers) => answers.reduce((sum, a) => sum + a, 0);

// 점수 → 출발 섬 
export const getStageNo = (score) => {
  if (score <= 4) return 1;
  if (score <= 9) return 2;
  if (score <= 14) return 3;
  if (score <= 19) return 4;
  return 5;
};

// 시작 체크 결과 : 점수 · 출발 섬
export const getStartIsland = (answers) => {
  const score = calcScore(answers);
  return { score, island: getIsland(getStageNo(score)) };
};