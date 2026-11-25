// 24시간 상담 전화 (primary = 맨 위 강조)
export default function HotlineCard({ label, number, primary }) {
  const tel = `tel:${number.replaceAll("-", "")}`;

  return (
    <a
      href={tel}
      className={`flex items-center justify-between rounded-2xl px-4 py-3.5 ${
        primary ? "bg-navy" : "bg-[#F4F6FB]"
      }`}
    >
      <div>
        <p className={`text-[13px] font-medium ${primary ? "text-mute-on-navy" : "text-mute"}`}>{label}</p>
        <p className={`mt-0.5 font-serif font-bold ${primary ? "text-[30px] text-white" : "text-2xl text-navy"}`}>
          {number}
        </p>
      </div>
      <span
        className={`rounded-full px-4 py-2 text-sm font-bold ${primary ? "bg-brass text-navy" : "bg-navy text-brass"}`}
      >
        전화
      </span>
    </a>
  );
}