// 기내 방송 카드 : 방송 번호 띠 · 상태 · 중지/다시 방송 · 미리보기 · 삭제 · 알림
export default function NoticeItem({ notice, disabled = false, onToggle, onPreview, onDelete, onPush }) {
  const isActive = notice.status === "ACTIVE";
  const code = `NA ${String(notice.noticeId).padStart(3, "0")}`;

  return (
    <li className="overflow-hidden rounded-2xl bg-ticket">
      <div className={`flex h-9 items-center justify-between px-3.5 ${isActive ? "bg-navy" : "bg-[#5B6795]"}`}>
        <span className={`label-en text-[11px] ${isActive ? "text-brass" : "text-[#D6DBEA]"}`}>📢 {code}</span>
        <span
          className={`flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-bold text-white ${
            isActive ? "bg-[#2F7A55]" : "bg-[#3C4878]"
          }`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${isActive ? "bg-[#8BE0B0]" : "bg-mute-on-navy"}`} />
          {isActive ? "방송 중" : "중지"}
        </span>
      </div>

      <div className="px-3.5 pt-3 pb-3.5">
        <h3 className="font-serif text-[15px] font-bold text-navy break-keep">{notice.title}</h3>
        <p className="mt-1 whitespace-pre-line text-xs leading-[18px] text-mute break-keep">{notice.content}</p>

        <div className="mt-3 grid grid-cols-[1fr_1fr_60px] gap-1.5">
          <button
            type="button"
            onClick={onToggle}
            disabled={disabled}
            className="h-9 rounded-[10px] bg-navy text-xs font-bold text-white cursor-pointer disabled:opacity-50"
          >
            {isActive ? "방송 중지" : "다시 방송"}
          </button>
          <button
            type="button"
            onClick={onPreview}
            className="h-9 rounded-[10px] border-[1.5px] border-navy text-xs font-bold text-navy cursor-pointer"
          >
            팝업 미리보기
          </button>
          <button
            type="button"
            onClick={onDelete}
            disabled={disabled}
            className="h-9 rounded-[10px] border-[1.5px] border-stamp-red text-xs font-bold text-stamp-red cursor-pointer disabled:opacity-50"
          >
            삭제
          </button>
        </div>

        {notice.pushedAt ? (
          <p className="mt-2.5 flex items-center justify-center gap-2 text-[11px] text-mute">
            <span className="label-en -rotate-[4deg] rounded border-[1.5px] border-stamp-red px-1.5 text-[10px] text-stamp-red">
              SENT
            </span>
            알림 보냄 · {formatPushedAt(notice.pushedAt)}
          </p>
        ) : (
          isActive && (
            <button
              type="button"
              onClick={onPush}
              disabled={disabled}
              className="mt-1.5 h-10 w-full rounded-[10px] bg-brass text-xs font-bold text-navy cursor-pointer disabled:opacity-50"
            >
              📣 탑승객에게 알림 보내기
            </button>
          )
        )}
      </div>
    </li>
  );
}

// "2026-11-20T14:00:00" → "11.20 14:00"
function formatPushedAt(value) {
  const d = new Date(value);
  const pad = (n) => String(n).padStart(2, "0");
  return `${pad(d.getMonth() + 1)}.${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}