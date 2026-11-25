export default function GuideLineCard({ text }) {
  return (
    <li className="rounded-xl border border-line bg-ticket px-4 py-3 text-sm font-medium leading-5 text-navy break-keep">
      {text}
    </li>
  );
}