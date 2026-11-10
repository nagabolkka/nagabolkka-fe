export default function PieceDiamond({ color, found, size = 18, emptyColor = "#1B1830" }) {
  return (
    <div
      className="shrink-0 rotate-45 border-2 border-[#15121F]"
      style={{
        width: size,
        height: size,
        backgroundColor: found ? color : emptyColor,
      }}
    />
  );
}