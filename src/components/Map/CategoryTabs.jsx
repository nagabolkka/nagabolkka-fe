import { CATEGORY_TABS } from "../../constants/placeCategory";

export default function CategoryTabs({ value, onChange }) {
  return (
    <ul className="flex gap-1.5 overflow-x-auto pb-0.5">
      {CATEGORY_TABS.map((tab) => {
        const isActive = tab.value === value;
        return (
          <li key={tab.value} className="shrink-0">
            <button
              type="button"
              onClick={() => onChange(tab.value)}
              aria-pressed={isActive}
              className={`h-8 rounded-full px-3.5 text-[13px] font-bold cursor-pointer ${
                isActive ? "bg-navy text-brass" : "bg-ticket text-navy border border-navy/70"
              }`}
            >
              {tab.label}
            </button>
          </li>
        );
      })}
    </ul>
  );
}