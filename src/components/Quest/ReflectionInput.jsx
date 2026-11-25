const MAX_LENGTH = 100;

// 여행 메모 한 줄 (네이비 화면)
export default function ReflectionInput({ value, onChange, showRestPieceGuide }) {
  return (
    <section className="mt-5 px-4">
      <p className="font-serif text-[15px] font-bold text-white">
        여행 메모 <span className="text-xs font-sans font-medium text-mute-on-navy">(선택)</span>
      </p>

      <div className="relative mt-2">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value.slice(0, MAX_LENGTH))}
          placeholder="예) 오랜만에 나갔는데 바람이 시원했다"
          rows={3}
          aria-label="여행 메모"
          className="w-full h-[96px] rounded-2xl bg-ticket px-4 pt-3 pb-6 text-[15px] text-navy placeholder:text-mute/70 resize-none outline-none"
        />
        <span className="absolute right-3 bottom-2 text-[11px] text-mute">
          {value.length} / {MAX_LENGTH}
        </span>
      </div>

      {showRestPieceGuide && (
        <p className="mt-2.5 text-xs font-semibold text-brass break-keep">
          쉼의 섬에서는 한 줄을 남기면 「쉼의 도장」도 함께 받아요.
        </p>
      )}
      <p className="mt-1.5 text-xs text-mute-on-navy">
        메모는 나만 볼 수 있고, 기관에 공유되지 않아요.
      </p>
    </section>
  );
}