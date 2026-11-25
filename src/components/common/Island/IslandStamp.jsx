import stamp1 from "../../../assets/islands/island-stamp-1.svg";
import stamp2 from "../../../assets/islands/island-stamp-2.svg";
import stamp3 from "../../../assets/islands/island-stamp-3.svg";
import stamp4 from "../../../assets/islands/island-stamp-4.svg";
import stamp5 from "../../../assets/islands/island-stamp-5.svg";
import { getIsland } from "../../../constants/islands";

const STAMPS = { 1: stamp1, 2: stamp2, 3: stamp3, 4: stamp4, 5: stamp5 };

export default function IslandStamp({ stageNo, size = 64, dim = false, className = "" }) {
  const { name } = getIsland(stageNo);

  return (
    <img
      src={STAMPS[stageNo] ?? stamp1}
      alt={`${name} 우표`}
      width={size}
      height={size}
      draggable={false}
      className={`select-none ${dim ? "opacity-45 grayscale-[40%]" : ""} ${className}`}
    />
  );
}