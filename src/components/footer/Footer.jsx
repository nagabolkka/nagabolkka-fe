import { useLocation, useNavigate } from "react-router-dom";
import { TABS } from "../../constants/tabs";
import TabIcon from "./TabIcon";

export default function Footer() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <nav className="sticky bottom-0 z-20 w-full bg-navy pb-[env(safe-area-inset-bottom)]">
      <ul className="h-[68px] flex items-stretch">
        {TABS.map(({ label, path, icon }) => {
          const isActive = pathname.startsWith(path);

          return (
            <li key={path} className="relative flex-1">
              <button
                type="button"
                onClick={() => navigate(path)}
                aria-current={isActive ? "page" : undefined}
                className="w-full h-full flex flex-col items-center justify-end pb-2.5 cursor-pointer"
              >
                {isActive ? (
                  <>
                    {/* 볼록 : 네이비 큰 원 + 종이색 원 */}
                    <span className="absolute -top-7 left-1/2 -translate-x-1/2 w-[78px] h-[78px] rounded-full bg-navy" aria-hidden />
                    <span className="absolute -top-5 left-1/2 -translate-x-1/2 w-[58px] h-[58px] rounded-full bg-paper border-2 border-brass flex items-center justify-center">
                      <TabIcon name={icon} className="w-7 h-7 text-navy" />
                    </span>
                    <span className="relative text-[12px] font-bold text-brass">{label}</span>
                  </>
                ) : (
                  <>
                    <TabIcon name={icon} className="w-6 h-6 mb-1 text-[#8FA0D0]" />
                    <span className="text-[11px] font-medium text-[#8FA0D0]">{label}</span>
                  </>
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}