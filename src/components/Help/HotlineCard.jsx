export default function HotlineCard({ label, number, primary }) {
  const tel = `tel:${number.replaceAll("-", "")}`;

  if (primary) {
    return (
      <a
        href={tel}
        className="flex items-center justify-between rounded-[10px] border-2 border-[#2B2340] bg-[#F4EAD5] px-4 py-4"
      >
        <div>
          <p className="text-xs font-medium font-sans text-[#2B2340]">
            {label}
          </p>
          <p className="mt-0.5 font-pixel text-4xl font-bold text-[#2B2340]">
            {number}
          </p>
        </div>
        <span className="w-[68px] h-[30px] rounded-md bg-[#2B2340] p-[7px] text-xs font-normal font-pixel text-[#F4EAD5]">
          전화 걸기
        </span>
      </a>
    );
  }

  return (
    <a
      href={tel}
      className="flex items-center justify-between rounded-[10px] border-2 border-[#15121F] bg-[#2C2F45] px-4 py-3"
    >
      <div>
        <p className="text-xs font-medium font-sans text-[#C3C6DA]">{label}</p>
        <p className="mt-1 font-pixel text-2xl font-normal text-[#F4EAD5]">
          {number}
        </p>
      </div>
      <span className="text-xs font-normal font-pixel text-[#F4EAD5]">
        전화 ▶
      </span>
    </a>
  );
}
