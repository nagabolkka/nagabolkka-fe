import { GOALS } from "../../constants/goals";

export default function GoalChips({ selected, onSelect }) {
  return (
    <div className="flex gap-[9px]">
      {GOALS.map((goal) => {
        const isSelected = selected === goal;
        return (
          <button
            type="button"
            key={goal}
            onClick={() => onSelect(isSelected ? null : goal)}
            className={`inline-flex items-center h-[23px] px-1.5 py-2.5 cursor-pointer shrink-0 whitespace-nowrap rounded-[5px] border-[1.5px] border-[#15111F] font-pixel font-normal transition-colors duration-150 ${
              isSelected
                ? "bg-[#F2C14E] text-[#2B2340]"
                : "bg-[#2C2745] text-[#F4EAD5]"
            }`}
          >
            {goal}
          </button>
        );
      })}
    </div>
  );
}