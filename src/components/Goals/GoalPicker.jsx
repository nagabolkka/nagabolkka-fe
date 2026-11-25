import { useState } from "react";
import Button from "../common/Button/Button";
import InkStamp from "../common/Stamp/InkStamp";
import { GOALS } from "../../constants/goals";

// 꿈의 섬 입국 신고서 : 1/2 방문 목적 (목표 5종) → 2/2 체류 계획 (4단계 미리보기) → 저장
export default function GoalPicker({
  currentGoalId,
  submitting = false,
  onSubmit,
}) {
  const [goalId, setGoalId] = useState(currentGoalId ?? null);
  const [step, setStep] = useState(1);
  const goal = GOALS.find((g) => g.goalId === goalId);

  if (step === 2 && goal) {
    return (
      <div className="flex flex-col px-4">
        <p className="label-en text-[11px] text-mute">ARRIVAL CARD · 2 / 2</p>
        <section className="mt-2 flex items-center justify-between rounded-2xl bg-navy px-4 py-3.5">
          <div>
            <p className="text-xs text-brass">방문 목적</p>
            <p className="font-serif text-xl font-bold text-white">
              {goal.name}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setStep(1)}
            className="text-xs font-bold text-white cursor-pointer"
          >
            바꾸기
          </button>
        </section>

        <h2 className="mt-5 font-serif text-base font-bold text-navy">
          체류 계획 · 4단계
        </h2>
        <p className="mt-0.5 text-xs text-mute">
          아주 작게 시작해요. 하나씩 체크하면 돼요.
        </p>
        <ol className="mt-2 overflow-hidden rounded-2xl border border-line bg-ticket">
          {goal.steps.map((content, i) => (
            <li
              key={content}
              className={`flex items-center gap-3 px-4 py-3 ${i ? "border-t border-line" : ""}`}
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brass text-[13px] font-bold text-navy">
                {i + 1}
              </span>
              <span className="text-[15px] font-bold text-navy break-keep">
                {content}
              </span>
            </li>
          ))}
        </ol>

        <div className="mt-6 flex justify-center">
          <Button
            title={submitting ? "도장 찍는 중…" : "입국 도장 받고 저장"}
            disabled={submitting}
            onClick={() => onSubmit(goal.goalId)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col px-4">
      <section className="relative overflow-hidden rounded-2xl border border-[#8FA0D0] bg-ticket px-4 pb-5 pt-4">
        <div aria-hidden className="absolute inset-x-0 top-0 h-2 bg-brass" />
        <p className="label-en mt-1 text-[11px] text-stamp-red">
          PURPOSE OF VISIT · 1 / 2
        </p>
        <h2 className="mt-1 font-serif text-[19px] font-bold text-navy">
          이번 방문 목적은 무엇인가요?
        </h2>
        <p className="mt-0.5 text-xs text-mute">
          하나만 골라요 · 언제든 바꿀 수 있어요
        </p>

        <ul
          role="radiogroup"
          aria-label="방문 목적"
          className="mt-3 flex flex-col gap-2"
        >
          {GOALS.map((g) => {
            const on = g.goalId === goalId;
            return (
              <li key={g.goalId}>
                <button
                  type="button"
                  role="radio"
                  aria-checked={on}
                  onClick={() => setGoalId(g.goalId)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-left cursor-pointer ${
                    on
                      ? "border-2 border-brass bg-[#FBF5E4]"
                      : "border border-line bg-white"
                  }`}
                >
                  <span
                    aria-hidden
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                      on ? "border-navy bg-navy" : "border-navy bg-white"
                    }`}
                  >
                    {on && <span className="h-2 w-2 rounded-full bg-brass" />}
                  </span>
                  <span className="text-[15px] font-bold text-navy">
                    {g.name}
                  </span>
                  <span className="ml-auto text-[11px] text-mute truncate">
                    {g.steps[0]}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="mt-4 flex items-end justify-between">
          <div>
            <p className="label-en text-[9px] text-mute">SIGNATURE</p>
            <p className="mt-0.5 w-32 border-b border-navy font-serif text-lg text-navy/70">
              모험가
            </p>
          </div>
          {goal ? (
            <InkStamp
              key={goal.goalId}
              top="DREAM"
              title="꿈의 섬"
              color="#B08A3A"
              size={70}
              rotate={-12}
              slam
            />
          ) : (
            <InkStamp
              title="STAMP"
              color="#C9C2AE"
              dashed
              rotate={0}
              size={70}
            />
          )}
        </div>
      </section>

      <div className="mt-5 flex justify-center">
        <Button
          title="다음 · 체류 계획 보기"
          disabled={!goal}
          onClick={() => setStep(2)}
        />
      </div>
    </div>
  );
}
