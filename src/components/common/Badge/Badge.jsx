export default function Badge({
  children,
  bgColor = "rgba(44, 39, 69, 0.8)", 
  textColor = "#F4EAD5",
  className = "",
}) {
  return (
    <span
      className={`px-[7px] py-1 h-[27px] flex items-center rounded-[5px] border-2 border-[#15121F] text-sm font-pixel font-normal ${className}`}
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      {children}
    </span>
  );
}