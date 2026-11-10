import backButton from "../../assets/images/backButton.svg";

export default function LetterHeader({ onBack }) {
  return (
    <header className="flex items-center gap-3">
      <button type="button" onClick={onBack} className="cursor-pointer">
        <img src={backButton} className="h-[22px] w-[22px]" />
      </button>
      <h1 className="font-pixel text-base font-normal text-[#F4EAD5]">
        루미의 편지
      </h1>
    </header>
  );
}
