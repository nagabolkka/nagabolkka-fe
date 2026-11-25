export default function CheckBox({ checked, onChange, label, bold = false }) {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer select-none">
      <input type="checkbox" checked={checked} onChange={onChange} className="sr-only peer" />
      <span
        aria-hidden
        className={`flex size-[22px] shrink-0 items-center justify-center rounded-md border-[1.8px] border-navy peer-focus-visible:ring-2 peer-focus-visible:ring-brass ${
          checked ? "bg-navy" : "bg-white"
        }`}
      >
        {checked && (
          <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
            <path d="M1 5L4.5 8.5L11 1.5" stroke="#D2B36B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      {label && (
        <span className={`text-sm text-navy ${bold ? "font-bold" : "font-medium"}`}>{label}</span>
      )}
    </label>
  );
}