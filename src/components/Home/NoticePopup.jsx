export default function NoticePopup({ notice, onClose, onHideToday }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-deep/55 px-5">
      <div
        role="dialog"
        aria-modal="true"
        aria-label={notice.title}
        className="relative w-full max-w-[353px] overflow-hidden rounded-2xl bg-ticket shadow-xl"
      >
        <div className="h-10 px-4 flex items-center justify-between bg-navy">
          <span className="label-en text-[11px] text-brass">NOTICE · 공지</span>
          <span className="label-en text-[11px] text-mute-on-navy">NAGABOLKKA AIR</span>
        </div>

        <div className="px-5 pt-4 pb-5">
          <h2 className="font-serif text-xl font-bold text-navy break-keep">
            {notice.title}
          </h2>
          <p className="mt-3 whitespace-pre-line text-sm leading-6 text-navy/80 break-keep">
            {notice.content}
          </p>

          <div className="mt-5 grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={onHideToday}
              className="h-11 rounded-xl border-[1.5px] border-line bg-white text-[13px] font-bold text-mute whitespace-nowrap cursor-pointer"
            >
              오늘 하루 보지 않기
            </button>
            <button
              type="button"
              onClick={onClose}
              className="h-11 rounded-xl bg-navy text-[13px] font-bold text-brass cursor-pointer"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}