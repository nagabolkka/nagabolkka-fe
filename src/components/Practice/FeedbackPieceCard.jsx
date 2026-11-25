import InkStamp from "../common/Stamp/InkStamp";

export default function FeedbackPieceCard({ name, regionName, color, isNew }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-navy px-4 py-3">
      <InkStamp
        title={name.replace(" 조각", "")}
        color={color ?? "#D2B36B"}
        size={64}
        slam
        delay={200}
      />
      <div>
        <div className="flex items-center gap-2">
          <p className="text-base font-bold text-white">{name} 도장 쾅!</p>
          {isNew && (
            <span className="rounded-full bg-stamp-red px-2 py-0.5 text-[10px] font-bold text-white">
              NEW
            </span>
          )}
        </div>
        <p className="mt-0.5 text-[11px] text-mute-on-navy">
          {regionName} · 도장 탭에 찍혔어요
        </p>
      </div>
    </div>
  );
}
