const ADMIN_TABS = [
  { key: "users", label: "탑승객" },
  { key: "notices", label: "기내 방송" },
  { key: "plus", label: "플러스 수요" },
];

export default function AdminTabs({ activeTab, onChange }) {
  return (
    <div role="tablist" className="relative grid grid-cols-3 gap-1 rounded-2xl bg-navy p-1">
      {ADMIN_TABS.map(({ key, label }) => {
        const isActive = activeTab === key;
        return (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(key)}
            className={`h-9 rounded-xl text-[13px] font-bold cursor-pointer transition ${
              isActive ? "bg-brass text-navy" : "text-mute-on-navy"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}