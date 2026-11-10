import backButton from "../../assets/images/backButton.svg";

export default function PlaceHero({ color, onBack }) {
  return (
    <div
      className="relative h-[190px] w-full overflow-hidden"
      style={{
        background: `linear-gradient(180deg, ${color}80 0%, ${color}26 100%)`,
      }}
    >
      <div
        className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rotate-45 border-[3px] border-[#15121F]"
        style={{ backgroundColor: color, boxShadow: `0 0 28px ${color}99` }}
      />
      <button
        type="button"
        onClick={onBack}
        className="absolute left-4 top-6 cursor-pointer"
        aria-label="뒤로가기"
      >
        <img src={backButton} className="h-[25px] w-[25px]" />
      </button>
    </div>
  );
}
