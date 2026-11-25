export default function TabIcon({ name, className = "w-6 h-6" }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...common}>
      {name === "passport" && (
        <>
          <rect x="5" y="2.5" width="14" height="19" rx="2" />
          <circle cx="12" cy="10" r="3.2" />
          <path d="M9 16.5h6" />
        </>
      )}
      {name === "pin" && (
        <>
          <path d="M12 21s-6-5.6-6-11a6 6 0 1 1 12 0c0 5.4-6 11-6 11z" />
          <circle cx="12" cy="10" r="2.2" />
        </>
      )}
      {name === "stamp" && (
        <>
          <circle cx="12" cy="5" r="2.4" />
          <path d="M10.5 7.3h3l1 6h-5z" />
          <rect x="5" y="13.3" width="14" height="4" rx="1" />
          <path d="M5 20.5h14" />
        </>
      )}
      {name === "log" && (
        <>
          <path d="M4 4.5h6a2 2 0 0 1 2 2v14a2 2 0 0 0-2-2H4z" />
          <path d="M20 4.5h-6a2 2 0 0 0-2 2v14a2 2 0 0 1 2-2h6z" />
        </>
      )}
      {name === "me" && (
        <>
          <circle cx="12" cy="8" r="4" />
          <path d="M4.5 20.5c1.4-3.6 4.2-5.5 7.5-5.5s6.1 1.9 7.5 5.5" />
        </>
      )}
    </svg>
  );
}