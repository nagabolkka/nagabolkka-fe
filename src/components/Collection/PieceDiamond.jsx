// 도장 칸 표시 (받음 = 섬 색 잉크 동그라미 · 아직 = 점선)
export default function PieceDiamond({ color, found, size = 22 }) {
  return (
    <span
      aria-hidden
      className="shrink-0 rounded-full"
      style={{
        width: size,
        height: size,
        border: `${Math.max(2, size / 9)}px ${found ? "solid" : "dashed"} ${found ? color : "#C9C2AE"}`,
        backgroundColor: found ? `${color}33` : "transparent",
      }}
    />
  );
}