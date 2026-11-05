import Button from "../common/Button/Button";

export default function QuestBottomBar({ canRecord, onRecord, onBack }) {
  return (
    <section className="mt-auto px-3 pt-6 pb-8 flex flex-col items-center gap-3">
      <Button title="다녀왔어요 · 기록하기" disabled={!canRecord} onClick={onRecord} />
      <button
        type="button"
        onClick={onBack}
        className="text-[#B9B0D0] text-sm font-normal font-sans cursor-pointer"
      >
        모험 지도로 돌아가기 (진행 상태 유지)
      </button>
    </section>
  );
}