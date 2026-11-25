import Button from "../common/Button/Button";

export default function QuestBottomBar({ canRecord, onRecord, onBack }) {
  return (
    <section className="mt-auto px-4 pt-6 pb-8 flex flex-col items-center gap-3">
      <Button title="착륙했어요 · 입국 심사 받기" disabled={!canRecord} onClick={onRecord} />
      <button
        type="button"
        onClick={onBack}
        className="text-[13px] text-mute cursor-pointer"
      >
        여권으로 돌아가기 (비행 상태 유지)
      </button>
    </section>
  );
}