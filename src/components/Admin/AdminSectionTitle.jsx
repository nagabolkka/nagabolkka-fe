export default function AdminSectionTitle({ en, title }) {
  return (
    <div>
      <p className="label-en text-[10px] text-brass">{en}</p>
      <h2 className="mt-0.5 font-serif text-base font-bold text-white">{title}</h2>
    </div>
  );
}