import Badge from "../common/Badge/Badge";

export default function AdminHeader({ onLogout }) {
  return (
    <header className="flex items-center justify-between py-4">
      <div className="flex items-center gap-2">
        <Badge size="sm" bgColor="#E8C06A" textColor="#2B2340">
          ADMIN
        </Badge>
        <h1 className="font-pixel text-base font-normal text-[#F4EAD5]">
          관리자
        </h1>
      </div>
      <button
        type="button"
        onClick={onLogout}
        className="rounded-md bg-[#2C2745] px-2.5 py-[5px] border-2 border-[#15121F] text-xs font-normal font-pixel text-[#F4EAD5]"
      >
        로그아웃
      </button>
    </header>
  );
}
