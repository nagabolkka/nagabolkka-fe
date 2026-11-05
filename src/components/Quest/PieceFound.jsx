import Badge from "../common/Badge/Badge";

export default function PieceFound({ pieces, color }) {
  return (
    <section className="flex flex-col items-center mt-[75px] gap-5 pt-10">
      <p className="font-pixel text-xs tracking-[6px]" style={{ color }}>
        PIECE FOUND
      </p>

      <div className="relative flex h-[90px] w-[90px] items-center justify-center">
        {/* 뒤쪽 빛번짐 */}
        <div
          className="pointer-events-none absolute h-64 w-64 rounded-full"
          style={{
            background: `radial-gradient(circle, ${color}55 0%, ${color}1A 40%, transparent 70%)`,
          }}
        />
        {/* 조각 */}
        <div
          className="relative h-16 w-16 rotate-45 border-[3px] border-[#15121F]"
          style={{
            background: `linear-gradient(135deg, #FFFBE6 0%, ${color} 60%)`,
            boxShadow: `0 0 24px ${color}80`,
          }}
        />
      </div>

      <ul className="flex flex-col items-center gap-2">
        {pieces.map(({ id, name, isNew }) => (
          <li key={id} className="flex items-center gap-2">
            <span className="font-pixel text-xl text-[#F4EAD5]">{name}</span>
            {isNew && (
              <Badge size="sm" bgColor={color} textColor="#2B2340">
                NEW
              </Badge>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
