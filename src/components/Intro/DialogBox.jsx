export default function DialogBox({ speaker, text }) {
  return (
    <div className="relative w-[calc(100vw_-_42px)] max-w-[351px] min-h-[96px] rounded-2xl bg-ticket px-4 pt-6 pb-4">
      {speaker && (
        <span className="absolute left-4 top-0 -translate-y-1/2 rounded-full bg-brass px-3 py-0.5 text-xs font-bold text-navy">
          {speaker}
        </span>
      )}
      <p className="text-sm font-medium leading-6 text-navy break-keep">{text}</p>
      <span aria-hidden className="absolute right-4 bottom-2 text-xs text-brass animate-pulse">
        ▼
      </span>
    </div>
  );
}