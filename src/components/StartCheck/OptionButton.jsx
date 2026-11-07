export default function OptionButton({ label, text, selected = false, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-2 w-[344px] h-[50px] rounded-[10px] border-2 px-[14px] text-left
        cursor-pointer transition-colors
        ${selected
          ? "bg-[#FFF4DC] border-[#F2C14E]"
          : "bg-[#F4EAD5] border-[#E6D6B0] hover:bg-[#FFF4DC]"}`}
    >
      <span className="flex justify-center items-center shrink-0 size-6 bg-[#F2C14E] rounded-[5px] border-[1.5px] border-[#2B2340]">
        <span className="text-xs font-pixel text-black">{label}</span>
      </span>
      <span className="text-sm font-pixel text-[#2B2340]">{text}</span>
    </button>
  );
}
