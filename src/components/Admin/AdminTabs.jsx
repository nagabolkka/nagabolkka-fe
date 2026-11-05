const TABS = [
  { key: "users", label: "사용자 현황" },
  { key: "notices", label: "공지 관리" },
];

export default function AdminTabs({ activeTab, onChange }) {
  return (
    <div className="grid grid-cols-2 gap-1 rounded-lg bg-[#15121F] p-1">
      {TABS.map(({ key, label }) => {
        const isActive = activeTab === key;
        return (
          <button
            key={key}
            type="button"
            onClick={() => onChange(key)}
            className={`rounded-md py-2 font-pixel text-xs ${
              isActive
                ? "bg-[#F2C14E] font-bold text-[#2B2340]"
                : "text-[#B9B0D0]"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
