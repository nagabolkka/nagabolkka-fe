import { PLACE_FILTERS } from "../../constants/placeCategory";

export default function FilterChips({ filters, onToggle }) {
  return (
    <ul className="flex flex-wrap gap-1.5 items-center">
      {PLACE_FILTERS.map(({ key, label }) => {
        const isOn = filters[key];
        return (
          <li key={key}>
            <button
              type="button"
              onClick={() => onToggle(key)}
              aria-pressed={isOn}
              className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold cursor-pointer ${
                isOn ? "bg-[#E3EEFF] text-navy border border-navy" : "bg-transparent text-mute border border-line"
              }`}
            >
              <span aria-hidden>{isOn ? "✓" : "+"}</span>
              {label}
            </button>
          </li>
        );
      })}
    </ul>
  );
}