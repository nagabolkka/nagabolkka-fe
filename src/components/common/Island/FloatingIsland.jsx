import float1 from "../../../assets/islands/island-float-1.svg";
import float2 from "../../../assets/islands/island-float-2.svg";
import float3 from "../../../assets/islands/island-float-3.svg";
import float4 from "../../../assets/islands/island-float-4.svg";
import float5 from "../../../assets/islands/island-float-5.svg";
import fog from "../../../assets/islands/island-fog.svg";
import rain from "../../../assets/islands/island-rain.svg";
import { getIsland } from "../../../constants/islands";

const FLOAT = { 1: float1, 2: float2, 3: float3, 4: float4, 5: float5 };

const LAMPS = [
  [32, 111],
  [54, 116],
  [80, 118],
  [106, 116],
  [128, 111],
];

export default function FloatingIsland({ stageNo, lit = -1, locked = false, rainy = false, float = false, size = 160, className = "" }) {
  const { name } = getIsland(stageNo);
  const dot = Math.max(6, size * 0.045);

  return (
    <div
      className={`relative shrink-0 ${float ? "animate-drift" : ""} ${className}`}
      style={{ width: size, height: size }}
      role="img"
      aria-label={locked ? `${name} (안개 속)` : lit >= 0 ? `${name} 불빛 ${lit}개` : name}
    >
      <img src={FLOAT[stageNo] ?? float1} alt="" draggable={false} className="absolute inset-0 w-full h-full select-none" />
      {rainy && <img src={rain} alt="" draggable={false} className="absolute inset-0 w-full h-full select-none" />}

      {lit >= 0 &&
        LAMPS.map(([x, y], i) => (
          <span
            key={i}
            aria-hidden
            className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-navy ${
              i < lit ? "bg-lamp shadow-[0_0_8px_3px_rgba(255,224,122,0.6)]" : "bg-[#E3E7F2]"
            }`}
            style={{ left: `${(x / 160) * 100}%`, top: `${(y / 160) * 100}%`, width: dot, height: dot }}
          />
        ))}

      {locked && <img src={fog} alt="" draggable={false} className="absolute inset-0 w-full h-full select-none" />}
    </div>
  );
}