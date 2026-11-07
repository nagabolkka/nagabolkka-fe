export default function RestorationCard({
  regionName,
  before,
  after,
  color,
  nextMessage,
}) {
  return (
    <section className="w-[351px] h-[109px] rounded-[10px] bg-[#2C2745] p-[15px] border-2 border-[#15121F]">
      <div className="flex items-center justify-between">
        <span className="text-sm text-[#F4EAD5]">{regionName} 복원도</span>
        <span className="font-pixel text-sm" style={{ color }}>
          {before}% → {after}%
        </span>
      </div>

      <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${after}%`, backgroundColor: color }}
        />
      </div>

      {nextMessage && (
        <p className="mt-3.5 text-xs font-medium font-sans text-[#F4EAD5]/60">
          {nextMessage}
        </p>
      )}
    </section>
  );
}
