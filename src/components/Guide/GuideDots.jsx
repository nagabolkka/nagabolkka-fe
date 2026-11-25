export default function GuideDots({ total, current }) {
  return (
    <div className="flex justify-center gap-2.5" aria-hidden>
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className={`h-2 rounded-full transition-all ${i === current ? "w-6 bg-navy" : "w-2 bg-line"}`}
        />
      ))}
    </div>
  );
}