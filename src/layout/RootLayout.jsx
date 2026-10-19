import { Outlet } from 'react-router-dom'

export default function RootLayout() {
  return (
    <div className="min-h-dvh bg-bg-deep flex justify-center">
      <div className="w-full max-w-mobile min-h-dvh bg-bg-base flex flex-col">
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  )
}