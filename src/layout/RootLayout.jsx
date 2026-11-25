import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <div className="min-h-dvh bg-paper flex justify-center">
      <div className="w-full min-h-dvh bg-paper text-navy flex flex-col">
        <main className="flex-1 flex flex-col">
          <Outlet />
        </main>
      </div>
    </div>
  );
}