import { litCount } from "../../constants/islands";

// 섬 불빛 : 복원도 before → after (20% 마다 불빛 1개)
export default function RestorationCard({ regionName, before, after, nextMessage }) {
  const litBefore = litCount(before);
  const litAfter = litCount(after);

  return (
    <section className="mt-5 w-full rounded-2xl bg-navy-2 p-4">
      <div className="flex items-center justify-between">
        <span className="text-xs text-mute-on-navy">{regionName} 불빛</span>
        <span className="text-sm font-bold text-brass">
          {before}% → {after}%
        </span>
      </div>

      <div className="mt-3 flex gap-3" aria-label={`불빛 ${litAfter} / 5`}>
        {Array.from({ length: 5 }, (_, i) => {
          const on = i < litAfter;
          const isNew = i >= litBefore && i < litAfter;
          return (
            <span
              key={i}
              className={`h-5 w-5 rounded-full transition ${
                on ? "bg-lamp" : "bg-[#3A4878]"
              } ${isNew ? "shadow-[0_0_10px_4px_rgba(255,224,122,0.55)] animate-pulse" : ""}`}
            />
          );
        })}
      </div>

      {nextMessage && <p className="mt-3 text-xs text-mute-on-navy">{nextMessage}</p>}
    </section>
  );
}