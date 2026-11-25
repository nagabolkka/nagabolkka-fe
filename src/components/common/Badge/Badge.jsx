const SIZE = {
  md: "px-2.5 py-1 text-xs rounded-full", // 기본
  sm: "px-2 py-0.5 text-[11px] rounded-full", // 작은 태그
};

export default function Badge({
  children,
  size = "md",
  bgColor = "#1C2A5E",
  textColor = "#D2B36B",
  className = "",
}) {
  return (
    <span
      className={`inline-flex items-center font-sans font-bold ${SIZE[size]} ${className}`}
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      {children}
    </span>
  );
}