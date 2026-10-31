import { REGIONS } from "../constants/regions";

export const calcScore = (answers) =>
  answers.reduce((sum, a) => sum + a, 0);

export const getStageNo = (score) => {
  if (score <= 4) return 1;
  if (score <= 9) return 2;
  if (score <= 14) return 3;
  if (score <= 19) return 4;
  return 5;
};

export const getStartRegion = (answers) => {
  const score = calcScore(answers);
  const region = REGIONS.find((r) => r.stageNo === getStageNo(score));
  return { score, region };
};