export default function HelpNotice({ message }) {
  return (
    <p className="flex items-center w-full min-h-[74px] py-3 whitespace-pre-line rounded-[10px] border-2 border-dashed border-[#D9D9D9] px-[15px] pl-[18px] pr-[29px] text-sm font-normal leading-5 font-sans text-[#D9D9D9]">
      {message}
    </p>
  );
}
