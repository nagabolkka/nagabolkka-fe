import { useLocation, useNavigate } from "react-router-dom";
import { TABS } from "../../constants/tabs";

export default function Footer() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <nav className="sticky bottom-0 w-full h-[59px] px-[30px] bg-[#15121F] border-t-[3px] border-[#2C2745] flex items-center justify-between">
      {TABS.map(({ label, path }) => {
        const isActive = pathname.startsWith(path);

        return (
          <button
            key={path}
            type="button"
            onClick={() => navigate(path)}
            className={`text-xs font-pixel cursor-pointer ${
              isActive
                ? "text-[#F2C14E] font-bold"
                : "text-[#8E88A8] font-normal"
            }`}
          >
            {label}
          </button>
        );
      })}
    </nav>
  );
}
