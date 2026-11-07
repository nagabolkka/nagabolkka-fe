const STATUS = {
  ACTIVE: { label: "게시 중", bg: "#CFE8C4" },
  STOPPED: { label: "중지", bg: "#E0D6C2" },
};

export default function NoticeItem({ notice, onToggle, onPreview, onDelete }) {
  const isActive = notice.status === "ACTIVE";
  const status = STATUS[notice.status];

  return (
    <li className="rounded-lg border-2 border-[#15121F] bg-[#F4EAD5] px-4 py-3.5">
      <div className="flex items-center justify-between gap-2">
        <h3 className="font-pixel text-sm font-normal text-black">
          {notice.title}
        </h3>
        <span
          className="shrink-0 h-[19px] rounded-sm border-2 border-[#2B2340] px-2 flex itesm-center text-[10px] font-normal font-pixel text-black"
          style={{ backgroundColor: status.bg }}
        >
          {status.label}
        </span>
      </div>
      <p className="mt-[5px] text-sm font-normal font-sans text-black">
        {notice.content}
      </p>

      <div className="mt-3 grid grid-cols-[1fr_1.1fr_0.6fr] gap-2">
        <button
          type="button"
          onClick={onToggle}
          className="w-[118px] h-[34px] rounded-md bg-[#2B2340] border-2 border-[#2B2340] py-[7px] px-[30px] text-xs font-normal font-pixel text-[#F4EAD5]"
        >
          {isActive ? "게시 중지" : "다시 게시"}
        </button>
        <button
          type="button"
          onClick={onPreview}
          className="w-[132px] h-[34px] rounded-md border-2 border-[#2B2340] py-[7px] px-[25px] font-normal font-pixel text-xs text-[#2B2340]"
        >
          팝업 미리보기
        </button>
        <button
          type="button"
          onClick={onDelete}
          className="w-[58px] h-[34px] rounded-md border-2 border-[#B5523B] py-[7px] px-[15px] text-xs font-normal font-pixel text-[#B5523B]"
        >
          삭제
        </button>
      </div>
    </li>
  );
}
