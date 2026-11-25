const VARIANTS = {
  primary: "bg-navy text-brass shadow-[0_4px_0_rgba(14,22,56,0.35)]",
  gold: "bg-brass text-navy",
  line: "bg-ticket text-navy border-[1.5px] border-navy",
  kakao: "bg-[#FEE500] text-[#191919]",
};

const DISABLED = "bg-[#DDE2EE] text-mute cursor-not-allowed";
const DISABLED_DARK = "bg-navy-2 text-mute-on-navy/60 cursor-not-allowed";

export default function Button({
  variant = "primary",
  title,
  onClick,
  disabled = false,
  className = "",
}) {
  const isDark = variant === "gold";
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`w-[calc(100vw_-_42px)] max-w-[351px] h-[52px] rounded-xl font-sans font-bold text-base transition active:translate-y-px ${
        disabled
          ? isDark
            ? DISABLED_DARK
            : DISABLED
          : `${VARIANTS[variant] ?? VARIANTS.primary} cursor-pointer`
      } ${className}`}
    >
      {title}
    </button>
  );
}