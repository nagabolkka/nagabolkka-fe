export default function FeedbackSection({ title, items }) {
  return (
    <section className="rounded-lg border-2 border-[#15121F] bg-[#2B2340] px-4 py-3">
      <h2 className="font-pixel text-sm text-[#F2C14E]">{title}</h2>
      <ul className="mt-2 list-disc pl-4 text-xs leading-5 text-[#F4EAD5]">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}