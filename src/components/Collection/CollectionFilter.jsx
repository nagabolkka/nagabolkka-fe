const TABS = [
  { value: false, label: "전체" },
  { value: true, label: "아직 못 받은 도장만" },
];

export default function CollectionFilter({ onlyMissing, onChange }) {
  return (
    <div className="flex gap-1.5" role="tablist">
      {TABS.map((tab) => {
        const on = tab.value === onlyMissing;
        return (
          <button
            key={tab.label}
            type="button"
            role="tab"
            aria-selected={on}
            onClick={() => onChange(tab.value)}
            className={`rounded-full px-3.5 py-1.5 text-xs font-bold cursor-pointer ${
              on ? "bg-navy text-brass" : "bg-ticket text-navy border border-navy/70"
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}