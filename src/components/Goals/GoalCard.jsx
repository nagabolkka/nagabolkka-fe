import GoalStepItem from "./GoalStepItem";

export default function GoalCard({ goal, onToggle }) {
  const { name, steps, checked, total } = goal;

  return (
    <section className="rounded-[10px] border-[3px] border-[#E6D6B0] bg-[#F4EAD5] px-3.5 py-4">
      <h2 className="font-pixel text-xl text-[#15121F]">{name}</h2>

      <div className="mt-3 h-3 w-full border-2 border-[#2B2340]/40 bg-[#E6D6B0]">
        <div
          className="h-full bg-[#9B8CE0] transition-all"
          style={{ width: `${(checked / total) * 100}%` }}
        />
      </div>
      <p className="mt-2 font-pixel text-xs text-[#6B5E4A]">
        준비 {checked}/{total}
      </p>

      <ul className="mt-2 flex flex-col gap-2">
        {steps.map((step) => (
          <li key={step.stepId}>
            <GoalStepItem step={step} onToggle={() => onToggle(step.stepNo)} />
          </li>
        ))}
      </ul>
    </section>
  );
}