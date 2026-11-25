export default function Toast({ message, bottom = "bottom-28" }) {
  if (!message) return null;
  return (
    <div
      role="status"
      className={`fixed ${bottom} left-1/2 z-50 w-[300px] -translate-x-1/2 rounded-full bg-navy/95 px-6 py-2.5 text-center text-xs font-semibold text-paper shadow-lg`}
    >
      {message}
    </div>
  );
}