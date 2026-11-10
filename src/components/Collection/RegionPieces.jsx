import PieceSlot from "./PieceSlot";

export default function RegionPieces({ region, onSelect }) {
  const { name, pieceFamily, color, restoration, slots } = region;

  return (
    <section className="rounded-[10px] border-2 border-[#15121F] bg-[#2C2745] p-3 shadow-[0px_4px_0px_0px_rgba(21,18,31,0.25)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className="h-2.5 w-2.5 rotate-45"
            style={{ backgroundColor: color }}
          />
          <h2 className="font-pixel font-normal text-sm text-[#F4EAD5]">
            {name}
          </h2>
          <span className="text-xs font-medium font-sans text-[#B9B0D0]">
            {pieceFamily}
          </span>
        </div>
        <span className="font-pixel text-xs font-normal text-[#B9B0D0]">
          복원 {restoration}%
        </span>
      </div>

      <ul className="mt-3 grid grid-cols-5 gap-[13px]">
        {slots.map((slot) => (
          <li key={slot.slotNo}>
            <PieceSlot
              slot={slot}
              color={color}
              onClick={() => onSelect({ ...slot, regionName: name, color })}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
