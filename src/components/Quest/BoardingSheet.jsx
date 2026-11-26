// 탑승하기 → 탑승 방법 고르기 : 루미랑 통화하며 / 혼자
export default function BoardingSheet({ busy = false, onCall, onSolo, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end bg-navy-deep/60" onClick={() => !busy && onClose()}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="boarding-title"
        className="w-full rounded-t-[24px] bg-navy-deep px-5 pt-2.5 pb-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto h-1 w-10 rounded-full bg-mute-on-navy/50" />
        <p className="label-en mt-4 text-center text-[10px] text-brass">HOW TO BOARD</p>
        <h2 id="boarding-title" className="mt-1 text-center font-serif text-xl font-bold text-white">
          어떻게 탑승할까요?
        </h2>
        <p className="mt-1 text-center text-xs text-mute-on-navy">가는 동안 루미가 이어폰으로 옆에 있어 줄 수 있어요</p>

        <div className="mt-5 flex flex-col gap-2.5">
          <button
            type="button"
            onClick={onCall}
            disabled={busy}
            className="flex items-center gap-3.5 rounded-2xl bg-brass px-5 py-4 text-left cursor-pointer disabled:opacity-60"
          >
            <span className="text-2xl" aria-hidden>
              🎧
            </span>
            <span>
              <span className="block text-base font-bold text-navy">루미랑 통화하며 가기</span>
              <span className="block text-xs text-navy/70">녹음 안 해요 · 한 번 최대 10분</span>
            </span>
          </button>
          <button
            type="button"
            onClick={onSolo}
            disabled={busy}
            className="flex items-center gap-3.5 rounded-2xl border-[1.5px] border-mute-on-navy/50 px-5 py-4 text-left cursor-pointer disabled:opacity-60"
          >
            <span className="text-2xl text-white" aria-hidden>
              ✈
            </span>
            <span>
              <span className="block text-base font-bold text-white">혼자 가 볼게요</span>
              <span className="block text-xs text-mute-on-navy">가다가 언제든 루미를 부를 수 있어요</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}