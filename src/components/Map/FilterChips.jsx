import { PLACE_FILTERS } from "../../constants/placeCategory";

export default function FilterChips({ filters, onToggle }) {
  return (
    <ul className="flex flex-wrap gap-[5px] items-center">
      {PLACE_FILTERS.map(({ key, label }) => {
        const isOn = filters[key];
        return (
          <li key={key}>
            <button
              type="button"
              onClick={() => onToggle(key)}
              className={`flex cursor-pointer items-center gap-1 rounded-full border-2 px-2.5 py-1 text-[11px] ${
                isOn
                  ? "border-[#F2C14E] bg-[#2B2340] text-[#F2C14E]"
                  : "border-[#4A4370] bg-transparent text-[#E6DFF5]"
              }`}
            >
              <span
                className={`h-2.5 w-2.5 border ${
                  isOn ? "border-[#F2C14E] bg-[#F2C14E]" : "border-[#4A4370]"
                }`}
              />
              {label}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
