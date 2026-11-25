import GoalStepItem from "./GoalStepItem";

// 지금 목표 + 4단계 체크
export default function GoalCard({ goal, pendingStepId, onToggle, onChange }) {
  const { name, steps, checked, total } = goal;
  const percent = total > 0 ? (checked / total) * 100 : 0;

  return (
    <>
      <section className="rounded-2xl bg-navy px-4 py-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs text-brass">나의 꿈 · 방문 목적</p>
            <h2 className="mt-0.5 font-serif text-2xl font-bold text-white">{name}</h2>
          </div>
          {onChange && (
            <button
              type="button"
              onClick={onChange}
              className="shrink-0 rounded-full bg-white/15 px-3 py-1.5 text-xs font-bold text-white cursor-pointer"
            >
              바꾸기 ›
            </button>
          )}
        </div>
        <p className="mt-2 text-xs text-mute-on-navy">
          {checked} / {total} 단계 · 꿈의 섬 불빛과 이어져요
        </p>
        <div className="mt-2 h-1.5 w-full rounded-full bg-white/20 overflow-hidden">
          <div className="h-full rounded-full bg-brass transition-all" style={{ width: `${percent}%` }} />
        </div>
      </section>

      <ul className="overflow-hidden rounded-2xl border border-line bg-ticket">
        {steps.map((step, i) => (
          <li key={step.stepId} className={i ? "border-t border-line" : ""}>
            <GoalStepItem step={step} disabled={pendingStepId === step.stepId} onToggle={() => onToggle(step)} />
          </li>
        ))}
      </ul>
    </>
  );
}