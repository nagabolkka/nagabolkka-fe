import { MOODS } from "../../constants/moods";

export default function MoodSelector({ selected, onSelect }) {
  return (
    <div className="mt-4 grid grid-cols-5 gap-2.5">
      {MOODS.map(({ value, label, image }) => {
        const isSelected = selected === value;
        return (
          <button
            key={value}
            type="button"
            onClick={() => onSelect(value)}
            className={`h-[70px] flex flex-col items-center justify-center gap-[5px] py-2.5 px-[13px] rounded-[10px] border-2 cursor-pointer transition-colors ${
              isSelected
                ? "border-[#F2C14E] bg-[#3B3366]"
                : "border-[#15121F] bg-[#2C2745]"
            }`}
          >
            <img src={image} className="w-[35px] h-[35px]" />
            <span className="text-[#E6DFF5] text-[10px] font-medium font-sans whitespace-nowrap">
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
