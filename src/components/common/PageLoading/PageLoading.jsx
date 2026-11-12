// API 응답 전 · 실패 화면
export default function PageLoading({ error = false }) {
  return (
    <div className="flex min-h-[60vh] flex-1 flex-col items-center justify-center bg-bg-page px-6">
      {error ? (
        <>
          <p className="font-pixel text-sm text-cream">불러오지 못했어요</p>
          <p className="mt-2 font-sans text-xs text-sub">
            잠시 후 다시 시도해 주세요.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-4 font-pixel text-xs text-gold underline cursor-pointer"
          >
            다시 시도
          </button>
        </>
      ) : (
        <p className="font-pixel text-xs text-sub animate-pulse">
          불러오는 중…
        </p>
      )}
    </div>
  );
}