const MAX_LENGTH = 100;

export default function ReflectionInput({
  value,
  onChange,
  showRestPieceGuide,
}) {
  return (
    <section className="mt-[19px]">
      <p className="text-[#F4EAD5] text-xs font-normal font-pixel pl-[15px]">
        루미에게 한 줄{" "}
        <span className="text-[#B9B0D0] text-[10px] font-medium font-sans">
          (선택)
        </span>
      </p>

      <div className="relative mt-2 pl-[22px]">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value.slice(0, MAX_LENGTH))}
          placeholder="예) 오랜만에 나갔는데 바람이 시원했다"
          rows={4}
          className="w-[345px] h-[102px] pl-[10px] pt-[13px] rounded-[10px] border-2 border-[#E6D6B0] bg-[#F4EAD5] text-[#15121F] text-sm font-sans placeholder:text-[#757575] resize-none outline-none"
        />
      </div>

      {showRestPieceGuide && (
        <p className="mt-[15px] text-[#F2C14E] text-xs font-medium font-sans pl-[22px]">
          시작의 방에서는 한 줄을 남기면 쉼의 조각도 함께 찾을 수 있어요.
        </p>
      )}
      <p className="mt-[9px] text-[#B9B0D0] text-xs font-medium font-sans pl-[22px]">
        회고는 나만 볼 수 있고, 기관에 공유되지 않아요.
      </p>
    </section>
  );
}
