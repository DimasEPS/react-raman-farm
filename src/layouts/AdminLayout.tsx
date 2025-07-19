import type { JSX } from "react";

export default function AdminLayout({
  children
}: {
  children: JSX.Element
}) {
  return (
    <div className="w-full h-[100dvh] flex flex-col relative bg-white-bone">
      <Header />
      <div className="size-full px-4 overflow-y-auto pt-6 mb-[60px]">
        {children}
      </div>
      <NavBar />
    </div>
  )
}

const layoutComponentHeight = "h-[60px]"

function Header() {
  return (
    <div className={`
      flex items-center justify-center ${layoutComponentHeight} p-4 w-full text-white bg-primary
    `}>
      PANEL ADMIN - Goat Tracker
    </div>
  )
}

function NavBar() {
  return (
    <div className={`
      flex justify-around w-full ${layoutComponentHeight} items-center bg-charcoal
      fixed bottom-0 text-white
    `}>
      Menus
    </div>
  )
}