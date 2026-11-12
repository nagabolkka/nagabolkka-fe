export default function GuideLineCard({ text }) {
  return (
    <li className="rounded-[10px] border-[1.5px] border-bg-deep bg-[#2C2745] px-4 py-3.5 font-sans text-sm font-medium leading-5 text-cream break-keep">
      {text}
    </li>
  );
}