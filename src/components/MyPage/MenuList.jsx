import { useNavigate } from "react-router-dom";

// 나 탭 메뉴 (꿈 준비 · 연습실 · 엽서 · 도움 · 사용법)
// goal : 지금 목표 (없으면 null → 「아직 비어 있어요」 강조)
export default function MenuList({ goal }) {
  const navigate = useNavigate();
  const empty = !goal;

  const menus = [
    {
      key: "goal",
      label: empty ? "나의 꿈 · 아직 비어 있어요" : "나의 꿈 준비",
      sub: empty ? "설정하기" : `${goal.name}${goal.total ? ` · ${goal.checked ?? 0} / ${goal.total}` : ""}`,
      path: "/goals",
      highlight: empty,
    },
    { key: "practice", label: "입국 심사 연습실", sub: "말 거는 연습", path: "/practice" },
    { key: "letter", label: "루미의 엽서함", sub: "이번 주 엽서", path: "/letter" },
    { key: "help", label: "도움이 필요할 때", path: "/help" },
    { key: "guide", label: "나가볼까 사용법", path: "/guide" },
  ];

  return (
    <ul className="w-full overflow-hidden rounded-2xl border border-line bg-ticket">
      {menus.map(({ key, label, sub, path, highlight }, i) => (
        <li key={key} className={i ? "border-t border-line" : ""}>
          <button
            type="button"
            onClick={() => navigate(path)}
            className={`relative flex w-full items-center justify-between gap-3 px-4 py-4 text-left cursor-pointer ${
              highlight ? "bg-[#FBF5E4]" : ""
            }`}
          >
            {highlight && <span aria-hidden className="absolute left-1.5 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-stamp-red" />}
            <span className="text-[15px] font-bold text-navy">{label}</span>
            <span className="flex items-center gap-2 min-w-0">
              {sub && (
                <span className={`text-xs truncate ${highlight ? "font-bold text-[#B08A3A]" : "text-mute"}`}>{sub}</span>
              )}
              <span aria-hidden className="text-lg text-mute">›</span>
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}