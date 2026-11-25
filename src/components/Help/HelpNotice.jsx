export default function HelpNotice({ message }) {
  return (
    <p className="w-full whitespace-pre-line rounded-2xl bg-[#F4F6FB] px-4 py-3.5 text-sm leading-6 text-navy break-keep">
      {message}
    </p>
  );
}