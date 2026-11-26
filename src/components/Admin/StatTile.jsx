export default function StatTile({ en, label, value, unit }) {
  return (
    <div className="min-w-0 rounded-xl bg-navy-2 px-3 pt-2.5 pb-3">
      <p className="label-en text-[9px] text-brass">{en}</p>
      <p className="mt-1 flex items-baseline gap-0.5">
        <span className="font-serif text-2xl font-bold leading-none text-white">{value}</span>
        <span className="text-xs text-mute-on-navy">{unit}</span>
      </p>
      <p className="mt-1.5 text-[11px] text-mute-on-navy">{label}</p>
    </div>
  );
}