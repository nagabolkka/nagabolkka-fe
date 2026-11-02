import { Outlet } from "react-router-dom";
import Footer from "../components/footer/Footer";

export default function MainLayout() {
  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 flex flex-col">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}