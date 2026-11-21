const TABS = [
  { value: false, label: "전체" },
  { value: true, label: "모자란 조각만" },
];

export default function CollectionFilter({ onlyMissing, onChange }) {
  return (
    <div className="flex gap-2" role="tablist">
      {TABS.map((tab) => {
        const on = tab.value === onlyMissing;
        return (
          <button
            key={tab.label}
            type="button"
            role="tab"
            aria-selected={on}
            onClick={() => onChange(tab.value)}
            className={`cursor-pointer rounded-full border-[1.5px] border-[#15121F] px-3 py-[5px] font-pixel text-[11px] ${
              on ? "bg-[#E8C06A] text-[#15121F]" : "bg-[#2C2745] text-[#B9B0D0]"
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
