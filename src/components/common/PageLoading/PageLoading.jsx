import Lumi from "../Lumi/Lumi";

// API 응답 전 · 실패 화면
export default function PageLoading({ error = false }) {
  return (
    <div className="flex min-h-[60vh] flex-1 flex-col items-center justify-center bg-sky-paper px-6">
      {error ? (
        <>
          <Lumi pose="worried" size={96} />
          <p className="mt-3 font-serif text-lg font-bold text-navy">
            불러오지 못했어요
          </p>
          <p className="mt-1 text-xs text-mute">잠시 후 다시 시도해 주세요.</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-4 rounded-full bg-navy px-5 py-2 text-xs font-bold text-brass cursor-pointer"
          >
            다시 시도
          </button>
        </>
      ) : (
        <>
          <Lumi pose="fly" size={88} className="animate-drift" />
          <p className="mt-3 text-xs font-semibold text-mute animate-pulse">
            불러오는 중…
          </p>
        </>
      )}
    </div>
  );
}