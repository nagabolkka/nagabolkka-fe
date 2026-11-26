import Lumi from "../common/Lumi/Lumi";

// 관제탑 헤더 : 기장 루미 + CONTROL TOWER · 로그아웃
export default function AdminHeader({ onLogout }) {
  return (
    <header className="relative flex items-center justify-between pt-6 pb-4">
      <div className="flex items-center gap-2.5">
        <Lumi pose="salute" size={42} decorative />
        <div>
          <p className="label-en text-[11px] text-brass">CONTROL TOWER</p>
          <h1 className="font-serif text-xl font-bold text-white">마음 군도 관제탑</h1>
        </div>
      </div>
      <button
        type="button"
        onClick={onLogout}
        className="rounded-full border border-mute-on-navy/50 px-3 py-1.5 text-xs font-medium text-mute-on-navy cursor-pointer"
      >
        로그아웃
      </button>
    </header>
  );
}