export default function BackHeader({ title, label, onBack, dark = false, right }) {
  return (
    <header className="flex items-center gap-2 px-3 pt-5 pb-2">
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          aria-label="뒤로"
          className={`w-10 h-10 -ml-1 flex items-center justify-center text-[28px] leading-none cursor-pointer ${
            dark ? "text-white" : "text-navy"
          }`}
        >
          ‹
        </button>
      )}
      <div className="min-w-0 flex-1">
        {label && (
          <p className={`label-en text-[11px] ${dark ? "text-brass" : "text-mute"}`}>{label}</p>
        )}
        <h1 className={`font-serif text-xl font-bold truncate ${dark ? "text-white" : "text-navy"}`}>
          {title}
        </h1>
      </div>
      {right}
    </header>
  );
}