export const GOALS = [
  { goalId: 5, code: "SCHOOL", name: "학업 복귀" },
  { goalId: 4, code: "VOLUNTEER", name: "봉사" },
  { goalId: 3, code: "MEETUP", name: "모임" },
  { goalId: 2, code: "PART_TIME", name: "알바" },
  { goalId: 1, code: "JOB", name: "취업" },
];

export const getGoal = (goalId) => GOALS.find((g) => g.goalId === goalId);