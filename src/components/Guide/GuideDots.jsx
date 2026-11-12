export default function GuideDots({ total, current }) {
  return (
    <div className="flex justify-center gap-3">
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className={`h-2 w-2 rounded-full ${
            i === current ? "bg-gold" : "bg-bg-raised"
          }`}
        />
      ))}
    </div>
  );
}