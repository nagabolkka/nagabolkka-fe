import { getPieceTypeLabel } from "../../constants/pieceType";
import { missingSlots } from "../../utils/collection";

export default function CurrentChapterCard({ region }) {
  const { stageNo, name, color } = region;
  const missing = missingSlots(region);

  return (
    <section className="w-full rounded-[10px] border-2 border-[#E8C06A] bg-[#2C2745] px-[14px] py-3">
      <p className="font-pixel text-[11px] text-[#E8C06A]">
        지금 챕터 · CHAPTER {stageNo} {name}
      </p>

      {missing.length === 0 ? (
        <>
          <p className="mt-2 font-pixel text-sm text-[#F4EAD5]">
            이 챕터 조각을 다 모았어요!
          </p>
          <p className="mt-1 text-[11px] text-[#B9B0D0] break-keep">
            다음 지역이 열리면 새 조각을 모을 수 있어요.
          </p>
        </>
      ) : (
        <>
          <p className="mt-2 font-pixel text-sm text-[#F4EAD5]">
            모자란 조각 {missing.length}개 · 하나씩 채워 볼까?
          </p>
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {missing.map((slot) => (
              <li
                key={slot.slotNo}
                className="rounded-full border border-dashed bg-[#221E3A] px-2 py-[3px] text-[11px] font-semibold font-sans text-[#F4EAD5]"
                style={{ borderColor: color }}
              >
                {getPieceTypeLabel(slot.type)}
              </li>
            ))}
          </ul>
          <p className="mt-2 text-[11px] text-[#B9B0D0] break-keep">
            칸을 누르면 힌트와 어떤 퀘스트에서 얻는지 볼 수 있어요
          </p>
        </>
      )}
    </section>
  );
}
