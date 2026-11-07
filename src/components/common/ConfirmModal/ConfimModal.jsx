const CONFIRM_STYLE = {
  primary: "bg-[#E8C06A] text-[#15121F]",
  danger: "bg-[#D9604C] text-[#F4EAD5]",
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
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 px-6">
      <div className="w-full rounded-lg border-2 border-[#15121F] bg-[#F4EAD5] px-5 py-5">
        <h2 className="font-pixel text-lg text-[#15121F]">{title}</h2>
        <p className="mt-2 whitespace-pre-line text-xs leading-5 font-pixel font-normal break-keep text-[#15121F]/70">
          {description}
        </p>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="w-[134px] rounded-[5px] border-1 border-[#15121F] bg-[#3A3358] py-2.5 text-sm font-normal font-pixel text-[#F4EAD5]"
          >
            취소
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`w-[134px] rounded-[5px] border-2 border-[#2B2340] py-2.5 text-sm font-pixel font-normal ${CONFIRM_STYLE[variant]}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
