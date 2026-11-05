const formatDate = (date) => {
  const [, m, d] = date.split("-");
  return `${Number(m)}월 ${Number(d)}일`;
};

export default function UserCard({ user }) {
  const {
    label,
    stageNo,
    assigned,
    completed,
    skipped,
    achievementRate,
    lastActiveAt,
  } = user;

  return (
    <li className="w-[365px] h-[110px] border-2 border-[#15121F] rounded-lg bg-[#2C2745] pl-4 py-3.5 pr-[14px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-[#F4EAD5]">{label}</span>
          <span className="h-5 rounded border-[1.5px] border-[#4A4370] px-2.5 py-0.5 text-[10px] text-[#E6DFF5] font-normal font-pixel">
            계단 {stageNo}
          </span>
        </div>
        <span className="font-pixel text-xs font-normal text-[#F2C14E]">
          {achievementRate}%
        </span>
      </div>

      <div className="mt-3 h-[11px] w-full overflow-hidden rounded-full bg-[#1B1830] border-2 border-[#15121F]">
        <div
          className="h-full rounded-full bg-[#F2C14E]"
          style={{ width: `${achievementRate}%` }}
        />
      </div>

      <p className="mt-[7px] text-xs font-normal font-sans text-[#B9B0D0">
        배정 {assigned} · 완료 {completed} · 건너뜀 {skipped}
      </p>
      <p className="mt-0.5 text-xs font-normal font-sans text-[#B9B0D0]">
        최근 활동 {lastActiveAt ? formatDate(lastActiveAt) : "-"}
      </p>
    </li>
  );
}
