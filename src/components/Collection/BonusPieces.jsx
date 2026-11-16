// 도감 25칸 밖 보너스 조각 (받은 것만 · 없으면 안 그림)
export default function BonusPieces({ pieces }) {
  if (!pieces?.length) return null;

  return (
    <section className="rounded-[10px] border-2 border-[#15121F] bg-[#2C2745] p-3 shadow-[0px_4px_0px_0px_rgba(21,18,31,0.25)]">
      <div className="flex items-center gap-2">
        <div
          className="h-2.5 w-2.5 rotate-45"
          style={{ background: "linear-gradient(135deg, #FFFBE6 0%, #E8C06A 60%)" }}
        />
        <h2 className="font-pixel font-normal text-sm text-[#F4EAD5]">특별한 조각</h2>
        <span className="text-xs font-medium font-sans text-[#B9B0D0]">도감 칸 밖</span>
      </div>

      <ul className="mt-3 flex flex-col gap-2">
        {pieces.map((piece) => (
          <li key={piece.pieceId} className="flex items-center gap-3 rounded-md bg-[#3A3358] px-3 py-2">
            <div
              className="ml-1 h-4 w-4 shrink-0 rotate-45 border-2 border-[#15121F]"
              style={{ background: "linear-gradient(135deg, #FFFBE6 0%, #E8C06A 60%)" }}
            />
            <div>
              <p className="font-pixel text-xs text-[#F4EAD5]">{piece.name}</p>
              <p className="text-[10px] text-[#B9B0D0]">{piece.acquiredAt?.slice(0, 10).replaceAll("-", ".")} 획득</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}