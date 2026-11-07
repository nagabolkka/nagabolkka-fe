export default function AccountActions({ onLogout, onDeleteAll }) {
  return (
    <div className="flex flex-col gap-3">
      <button
        type="button"
        onClick={onLogout}
        className="w-[357px] h-[50px] rounded-[10px] border-2 border-[#15121F] bg-[#2C2745] py-3 text-base font-normal font-pixel text-[#F4EAD5]"
      >
        로그아웃
      </button>
      <button
        type="button"
        onClick={onDeleteAll}
        className="w-[357px] h-[50px] rounded-[10px] border-2 border-dashed border-[#6A3A48] py-3 text-base font-normal font-pixel text-[#F3A7B5]"
      >
        내 기록 모두 삭제
      </button>
    </div>
  );
}
