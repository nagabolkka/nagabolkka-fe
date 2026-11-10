import { getGoal } from "../constants/goals";
import { loadAdventure } from "../utils/adventureStorage";
import { getGoalChecks, isHopePieceReceived } from "../utils/goalStorage";

// 목표를 아직 안 골랐으면 null
export const getMyGoal = () => {
  const { goalId } = loadAdventure();
  const goal = getGoal(goalId);
  if (!goal) return null;

  const checks = getGoalChecks(goalId);
  const steps = goal.steps.map((content, i) => ({
    stepId: goalId * 10 + i + 1,
    stepNo: i + 1,
    content,
    checked: checks.includes(i + 1),
  }));

  return {
    goalId,
    name: goal.name,
    steps,
    checked: steps.filter((step) => step.checked).length,
    total: steps.length,
    hopePieceReceived: isHopePieceReceived(goalId),
  };
};