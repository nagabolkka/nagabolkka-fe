export default function NoticePopup({ notice, onClose, onHideToday }) {
  return (
    <div className="absolute inset-0 z-50 flex justify-center bg-black/50 px-5 pt-80">
      <div className="relative h-fit w-full rounded-xl border-2 border-[#15121F] bg-[#F4EAD5] px-5 pb-5 pt-7">
        <span className="absolute -top-3 left-5 rounded-md border-2 border-[#15121F] bg-[#E8C06A] px-2.5 py-0.5 text-xs font-bold text-[#15121F]">
          공지
        </span>

        <h2 className="font-pixel text-xl text-[#2B2340]">{notice.title}</h2>
        <p className="mt-3 text-base font-normal font-sans text-[#2B2340] leading-5">
          {notice.content}
        </p>

        <div className="mt-5 grid grid-cols-2 gap-[18px]">
          <button
            type="button"
            onClick={onHideToday}
            className="cursor-pointer w-[148px] h-[43px] rounded-lg border-2 border-[#B9A882] py-2.5 px-[7px] text-sm font-pixel font-normal text-black"
          >
            오늘 하루 보지 않기
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-[148px] h-[43px] bg-[#F2C14E] rounded-lg border-2 border-[#2B2340] py-2.5 px-[7px] font-pixel text-sm font-bold text-black"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
