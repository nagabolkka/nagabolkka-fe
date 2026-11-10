import PieceDiamond from "./PieceDiamond";
import { getPieceTypeLabel } from "../../constants/pieceType";

export default function PieceSheet({ piece, onClose }) {
  const { found, name, type, count, restoreText, hint, regionName, color } =
    piece;

  return (
    <div
      className="fixed inset-0 z-50 mx-auto flex max-w-mobile items-end bg-black/60"
      onClick={onClose}
    >
      <div
        className="w-full rounded-t-2xl bg-[#F4EAD5] px-5 pb-8 pt-10 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center">
          <PieceDiamond
            color={color}
            found={found}
            size={44}
            emptyColor="#3A3358"
          />
        </div>

        <p className="mt-7 text-sm font-normal font-pixel text-black">
          {regionName} · {getPieceTypeLabel(type)}
        </p>
        <h2 className="mt-[13px] font-pixel font-normal text-2xl text-black">
          {found ? name : "아직 찾지 못한 조각"}
        </h2>
        <p className="mt-[18px] text-sm font-normal font-pixel text-[#363636]">
          {found ? restoreText : `힌트 : ${hint}`}
        </p>

        <p className="mt-8 text-xs font-medium text-[#6B5E4A]">
          {found ? `${count}개 모음` : "찾으면 도감에 기록돼요."}
        </p>
      </div>
    </div>
  );
}
