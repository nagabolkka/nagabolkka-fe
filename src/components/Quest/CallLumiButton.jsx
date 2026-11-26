// 비행 중 「루미 부르기」 : 누르면 동행 통화 화면으로
export default function CallLumiButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mx-4 mt-3 flex items-center gap-3 rounded-2xl border-[1.5px] border-brass bg-navy px-4 py-3 text-left cursor-pointer"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brass text-lg" aria-hidden>
        🎧
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-bold text-white">루미 부르기</span>
        <span className="block text-[11px] text-mute-on-navy">무서워지면 이어폰으로 같이 걸어요 · 녹음 안 해요</span>
      </span>
      <span className="text-brass" aria-hidden>
        →
      </span>
    </button>
  );
}