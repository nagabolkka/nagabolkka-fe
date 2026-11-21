import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/footer/Footer";
import { listenForegroundPush, refreshPushToken } from "../utils/push";

export default function MainLayout() {
  // 알림을 켠 기기만 : 토큰 갱신 · 화면이 앞에 있을 때도 알림 보이게
  useEffect(() => {
    refreshPushToken().catch(() => {});
    listenForegroundPush().catch(() => {});
  }, []);
  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 flex flex-col">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
