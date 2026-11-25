export default function FeedbackSection({ title, items }) {
  return (
    <section className="rounded-2xl border border-line bg-ticket px-4 py-3">
      <h2 className="font-serif text-[15px] font-bold text-navy">{title}</h2>
      <ul className="mt-2 list-disc pl-4 text-[13px] leading-6 text-navy/85 break-keep">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}