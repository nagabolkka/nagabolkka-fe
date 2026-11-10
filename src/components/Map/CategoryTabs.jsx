import { CATEGORY_TABS } from "../../constants/placeCategory";

export default function CategoryTabs({ value, onChange }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {CATEGORY_TABS.map((tab) => {
        const isActive = tab.value === value;
        return (
          <li key={tab.value}>
            <button
              type="button"
              onClick={() => onChange(tab.value)}
              className={`cursor-pointer h-[25px] rounded-[5px] border-2 border-[#15121F] px-1.5 py-0.5 font-pixel font-normal text-xs ${
                isActive
                  ? "bg-[#F2C14E] text-[#15121F]"
                  : "bg-[#2C2745] text-[#F4EAD5]"
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
