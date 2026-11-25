import Button from "../common/Button/Button";

// 탑승권 아래 버튼 (네이비 화면)
export default function QuestActions({
  changeRemaining,
  onAccept,
  onSplit,
  onChange,
  onSkip,
}) {
  const canChange = changeRemaining > 0;

  return (
    <section className="mx-4 mt-5 flex flex-col items-center gap-2.5">
      <Button variant="gold" title="✈  탑승하기 (출국)" onClick={onAccept} />

      <button
        type="button"
        onClick={onSplit}
        className="w-full h-[58px] flex flex-col items-center justify-center rounded-xl border-[1.5px] border-[#8FA0D0] cursor-pointer active:bg-navy-2"
      >
        <span className="text-[15px] font-bold text-white">작게 나눠 가기</span>
        <span className="text-[11px] text-mute-on-navy">아직 어려워요 · 더 작게 나눠주세요</span>
      </button>

      <div className="w-full grid grid-cols-2 gap-2.5">
        <button
          type="button"
          onClick={onChange}
          disabled={!canChange}
          className="h-10 text-[13px] font-medium text-mute-on-navy cursor-pointer disabled:opacity-40 disabled:cursor-default"
        >
          {canChange ? `다른 편으로 (${changeRemaining}번 남음)` : "오늘은 다 바꿨어요"}
        </button>
        <button
          type="button"
          onClick={onSkip}
          className="h-10 text-[13px] font-medium text-mute-on-navy cursor-pointer"
        >
          오늘은 쉬어 가기
        </button>
      </div>
    </section>
  );
}