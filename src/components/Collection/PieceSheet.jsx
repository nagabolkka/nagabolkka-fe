import InkStamp from "../common/Stamp/InkStamp";
import { getPieceHowTo, getPieceTypeLabel } from "../../constants/pieceType";
import { MOODS } from "../../constants/moods";

// 도장 한 칸 자세히
export default function PieceSheet({ piece, onClose }) {
  const { found, name, type, count, restoreText, hint, regionName, color, chapterState, acquiredAt, mood } = piece;
  const locked = chapterState === "locked";
  const moodLabel = MOODS.find((m) => m.value === mood)?.label;

  return (
    <div className="fixed inset-0 z-50 flex items-end bg-navy-deep/55" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={found ? name : "아직 못 받은 도장"}
        className="w-full rounded-t-[22px] bg-ticket px-5 pb-8 pt-3 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto h-1 w-10 rounded-full bg-line" />
        <div className="mt-5 flex justify-center">
          <InkStamp
            title={found ? name.replace(" 조각", "") : "?"}
            sub={regionName}
            color={found ? color : "#C9C2AE"}
            dashed={!found}
            size={120}
          />
        </div>

        <p className="mt-3 text-[13px] text-mute">
          {regionName} · {getPieceTypeLabel(type)}
        </p>
        <h2 className="mt-1 font-serif text-2xl font-bold text-navy">
          {found ? name : "아직 못 받은 도장"}
        </h2>
        <p className="mt-3 text-sm text-navy/80 break-keep">{found ? restoreText : `힌트 : ${hint}`}</p>
        {!found && (
          <p className="mt-2 text-xs text-mute break-keep">
            {locked ? "이 섬 탑승권이 나오면 모을 수 있어요" : getPieceHowTo(type)}
          </p>
        )}

        <p className="mt-6 text-xs font-semibold text-mute">
          {found
            ? [acquiredAt?.replaceAll("-", ".") && `${acquiredAt.replaceAll("-", ".")} 처음 받음`, moodLabel && `그날 기분 「${moodLabel}」`, `${count}번 찍음`]
                .filter(Boolean)
                .join(" · ")
            : "받으면 그날 기분 잉크로 찍혀요."}
        </p>
      </div>
    </div>
  );
}