import { useNavigate } from "react-router-dom";

const MENUS = [
  { label: "사회 연결 목표", path: "/goals" },
  { label: "연습실", path: "/practice" },
  { label: "루미의 편지", path: "/letter" },
  { label: "나가볼까 사용법", path: "/guide" },
  { label: "도움 받기", path: "/help" },
];

export default function MenuList() {
  const navigate = useNavigate();

  return (
    <ul className="w-[357px] divide-y divide-[#3A3358] rounded-[10px] border-[1.5px] border-[#15121F] bg-[#2C2745]">
      {MENUS.map(({ label, path }) => (
        <li key={path}>
          <button
            type="button"
            onClick={() => navigate(path)}
            className="flex w-full items-center justify-between px-4 py-3 text-xs font-normal font-pixel text-[#F4EAD5]"
          >
            {label}
            <span className="text-xs text-[#F4EAD5]/60">▶</span>
          </button>
        </li>
      ))}
    </ul>
  );
}
