export default function LumiBubble({ region }) {
  return (
    <div className="mt-[30px] relative w-[351px] h-[76px] rounded-[10px] outline-2 outline-[#F4EAD5] px-4 py-[17px]">
      <p className="text-[#F4EAD5] text-sm font-medium font-sans leading-5 break-keep">
        {region.lumiLine}
      </p>
      <span className="absolute w-10 h-[22px] flex justify-center items-center left-4 top-0 -translate-y-1/2 bg-[#F2C14E] rounded-[5px] outline-1 outline-[#2B2340] px-1.5 py-0.5 font-pixel text-xs text-[#2B2340]">
        루미
      </span>
    </div>
  );
}
