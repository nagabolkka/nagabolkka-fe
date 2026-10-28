export default function Button({ bgColor = "bg-[#F2C14E]", title, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`font-bold w-[351px] h-[50px] rounded-[10px] ${bgColor} font-pixel
            font-bold text-base text-[#2B2340] outline-2 outline-[#2B2340] cursor-pointer`}
    >
      {title}
    </button>
  );
}
