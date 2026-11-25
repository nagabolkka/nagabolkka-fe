const CONFIRM_STYLE = {
  primary: "bg-navy text-brass",
  danger: "bg-stamp-red text-white",
};

export default function ConfirmModal({
  title,
  description,
  confirmText,
  variant = "primary",
  onCancel,
  onConfirm,
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-deep/55 px-6">
      <div
        role="dialog"
        aria-modal="true"
        className="w-full max-w-[345px] rounded-2xl bg-ticket px-5 pt-5 pb-4 shadow-xl"
      >
        <h2 className="font-serif text-lg font-bold text-navy break-keep">
          {title}
        </h2>
        <p className="mt-2 whitespace-pre-line text-[13px] leading-5 break-keep text-mute">
          {description}
        </p>

        <div className="mt-5 grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={onCancel}
            className="w-full h-11 rounded-xl border-[1.5px] border-line bg-white text-sm font-bold text-navy cursor-pointer"
          >
            취소
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`w-full h-11 rounded-xl text-sm font-bold cursor-pointer ${CONFIRM_STYLE[variant]}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}