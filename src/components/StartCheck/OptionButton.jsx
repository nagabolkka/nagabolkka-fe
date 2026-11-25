// 출국 심사 선택지
export default function OptionButton({ label, text, selected = false, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`flex items-center gap-3 w-full min-h-[54px] rounded-xl px-4 text-left cursor-pointer transition ${
        selected ? "bg-navy text-white" : "bg-ticket border border-line text-navy active:bg-white"
      }`}
    >
      <span
        className={`flex justify-center items-center shrink-0 size-6 rounded-full text-[11px] font-bold ${
          selected ? "bg-brass text-navy" : "bg-paper text-mute"
        }`}
      >
        {label}
      </span>
      <span className="flex-1 text-[15px] font-semibold break-keep">{text}</span>
      {selected && <span aria-hidden className="text-brass">✓</span>}
    </button>
  );
}