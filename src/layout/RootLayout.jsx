import { Outlet } from 'react-router-dom'

export default function RootLayout() {
  return (
    <div className="min-h-dvh bg-bg-deep flex justify-center">
      <div className="w-full max-w-mobile min-h-dvh bg-bg-page flex flex-col">
        <main className="flex-1 flex flex-col">
          <Outlet />
        </main>
      </div>
    </div>
  )
}