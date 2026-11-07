import Button from "../common/Button/Button";

export default function QuestActions({
  changeRemaining,
  onAccept,
  onSplit,
  onChange,
  onSkip,
}) {
  const canChange = changeRemaining > 0;

  return (
    <section className="mx-6 mt-[21px] flex flex-col gap-3">
      {/* 수락 */}
      <div className="flex justify-center">
        <Button title="퀘스트 수락" onClick={onAccept} />
      </div>

      {/* 쪼개기 */}
      <button
        type="button"
        onClick={onSplit}
        className="w-[351px] h-[69px] px-[87px] pt-4 pb-2.5 flex flex-col items-center rounded-[10px] border-2 border-[#15121F] bg-[#3A3550] cursor-pointer active:brightness-110"
      >
        <p className="text-[#F4EAD5] text-base font-bold font-pixel">
          퀘스트 쪼개기
        </p>
        <p className="mt-0.5 text-[#B9B0D0] text-xs font-medium font-sans">
          아직 어려워요 · 더 작게 나눠주세요
        </p>
      </button>

      {/* 바꾸기 · 건너뛰기 */}
      <div className="flex gap-[13px]">
        <button
          type="button"
          onClick={onChange}
          disabled={!canChange}
          className="w-[169px] h-[37px] rounded-[10px] border-2 border-dashed border-[#4A4370] text-[#B0AAAA] text-xs font-normal font-pixel cursor-pointer disabled:opacity-40 disabled:cursor-default"
        >
          {canChange ? "다른 퀘스트로 바꾸기" : "오늘은 다 바꿨어요"}
        </button>
        <button
          type="button"
          onClick={onSkip}
          className="w-[169px] h-[37px] rounded-[10px] border-2 border-dashed border-[#4A4370] text-[#B0AAAA] text-xs font-normal font-pixel cursor-pointer"
        >
          오늘은 건너뛰기
        </button>
      </div>
    </section>
  );
}
