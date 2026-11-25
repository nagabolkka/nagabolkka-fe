import Lumi from "../common/Lumi/Lumi";

// 비행 중 (쪼개지 않은 퀘스트)
export default function ProgressCard({ onSplit }) {
  return (
    <section className="mt-4 flex flex-col items-center">
      <div className="relative">
        <Lumi pose="fly" size={170} className="animate-drift" />
        <div className="absolute -left-24 top-2 w-[120px] rounded-2xl bg-white px-3 py-2 shadow-[0_3px_8px_rgba(122,134,173,0.3)]">
          <p className="text-xs font-bold leading-[18px] text-navy">
            순항 중이에요!
            <br />
            천천히 다녀와요
          </p>
        </div>
      </div>

      <p className="mt-2 text-sm font-semibold text-navy">한 번에 하나의 탑승권</p>
      <p className="mt-0.5 text-xs text-mute">다녀오면 아래 버튼으로 입국 심사를 받아요.</p>

      <button
        type="button"
        onClick={onSplit}
        className="mt-4 text-xs font-medium text-mute underline cursor-pointer"
      >
        역시 어려워요? 작게 나눠 가기
      </button>
    </section>
  );
}