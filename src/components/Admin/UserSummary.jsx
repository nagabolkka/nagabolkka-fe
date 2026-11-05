export default function UserSummary({ summary }) {
  const items = [
    { label: "전체 사용자", value: `${summary.totalUsers}명` },
    { label: "평균 달성률", value: `${summary.avgAchievementRate}%` },
    { label: "플러스 관심", value: `${summary.plusInterest.total}명` },
  ];

  return (
    <section>
      <div className="grid grid-cols-3 gap-[13px]">
        {items.map(({ label, value }) => (
          <div
            key={label}
            className="w-[113px] h-[57px] border-2 border-[#15121F] rounded-lg bg-[#2B2340] px-3 py-[6px]"
          >
            <p className="text-xs font-sans font-normal text-[#B9B0D0]">
              {label}
            </p>
            <p className="mt-1 font-pixel font-normal text-base text-[#F4EAD5] leading-6">
              {value}
            </p>
          </div>
        ))}
      </div>
      <p className="mt-[11px] text-[10px] text-[#B9B0D0] font-sans font-normal">
        달성률 = 완료 ÷ 퀘스트가 배정된 날 / 기분 · 회고 · 연습 기록은 이 화면에
        보이지 않아요.
      </p>
    </section>
  );
}
