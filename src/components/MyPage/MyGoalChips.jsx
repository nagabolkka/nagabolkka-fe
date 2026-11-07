import { GOALS } from "../../constants/goals";

export default function MyGoalChips({ goalId, onChange }) {
  return (
    <section className="w-[357px] h-[83px] rounded-[10px] border-2 border-[#15121F] bg-[#2C2745] pl-[14px] py-4">
      <h2 className="text-sm font-normal font-pixel text-[#F4EAD5]">내 목표</h2>
      <ul className="mt-2.5 flex flex-wrap gap-1.5">
        {GOALS.map(({ goalId: id, name }) => {
          const isSelected = id === goalId;
          return (
            <li key={id}>
              <button
                type="button"
                onClick={() => !isSelected && onChange(id)}
                className={`rounded-[5px] border-[1.5px] border-[#15121F] px-2 py-0.5 text-xs font-pixel font-medium ${
                  isSelected
                    ? "bg-[#F2C14E] text-[#15121F]"
                    : "bg-[#1E1A2E] text-[#F4EAD5]"
                }`}
              >
                {name}
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
