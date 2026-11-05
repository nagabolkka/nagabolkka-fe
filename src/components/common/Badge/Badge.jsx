const SIZE = {
  md: "px-[7px] py-1 text-sm rounded-[5px] border-2", // 기본 
  sm: "px-1.5 py-0.5 text-xs rounded-[4px] border-[1.5px]", // 작은 태그 
};

export default function Badge({
  children,
  size = "md",
  bgColor = "rgba(44, 39, 69, 0.8)", 
  textColor = "#F4EAD5",
  className = "",
}) {
  return (
    <span
      className={`inline-flex items-center border-[#15121F] font-pixel font-normal ${SIZE[size]} ${className}`}
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      {children}
    </span>
  );
}