export default function DialogBox({ speaker, text }) {
  return (
    <div className="relative w-[351px] h-[98px] rounded-[10px] outline-2 outline-[#F4EAD5] pl-[17px] pt-[22px] mb-[19px] mt-43">
      {speaker && (
        <span className="absolute w-10 h-[22px] flex justify-center items-center left-6 top-0 -translate-y-1/2 bg-[#F2C14E] rounded-[5px] outline-1 outline-[#2B2340] px-1.5 py-0.5 font-pixel text-xs text-[#2B2340]">
          {speaker}
        </span>
      )}

      <p className="text-sm font-medium leading-5 text-cream">{text}</p>

      <span className="absolute right-5 bottom-3 text-xs text-gold animate-pulse">
        ▼
      </span>
    </div>
  );
}
