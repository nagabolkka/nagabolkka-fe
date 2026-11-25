export default function AccountActions({ onLogout, onDeleteAll }) {
  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        onClick={onLogout}
        className="w-full h-12 rounded-xl border border-line bg-ticket text-[15px] font-bold text-navy cursor-pointer"
      >
        로그아웃
      </button>
      <button
        type="button"
        onClick={onDeleteAll}
        className="w-full h-12 rounded-xl border border-dashed border-stamp-red/50 text-[15px] font-bold text-stamp-red cursor-pointer"
      >
        내 기록 모두 삭제
      </button>
    </div>
  );
}