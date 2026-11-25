export default function CollectionHeader({ foundCount, total }) {
  return (
    <header className="flex items-end justify-between">
      <div>
        <p className="label-en text-[11px] text-mute">STAMPS</p>
        <h1 className="mt-0.5 font-serif text-[24px] font-bold text-navy">
          모은 도장 {foundCount} / {total}
        </h1>
      </div>
    </header>
  );
}