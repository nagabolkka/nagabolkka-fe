export default function ShortcutCard({ title, description, onClick }) {
  return (
      <button
        type="button"
        onClick={onClick}
        className="cursor-pointer w-[110px] h-[62px] px-[7px] py-2.5 gap-0.5 flex flex-col justify-center items-start text-left rounded-xl border-[3px] border-[#15121F] bg-[#2C2745] active:brightness-110"
      >
        <p className="text-[#F4EAD5] text-xs font-bold font-pixel leading-4">
          {title}
        </p>
        <p className="text-[#B9B0D0] text-xs font-normal font-sans leading-4">
          {description}
        </p>
      </button>
  );
}
