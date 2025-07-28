import type { JSX } from "react"
import Data from "../assets/admin-data.svg?react"
import Add from "../assets/admin-tambah.svg?react"
import Account from "../assets/admin-akun.svg?react"
import { Outlet, useLocation, useNavigate } from "react-router-dom"

export default function AdminLayout() {
  return (
    <div className="w-full h-[100dvh] flex flex-col relative bg-white-bone">
      <Header />
      <div className="size-full px-4 overflow-y-auto pt-6 mb-[60px]">
        <Outlet />
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
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return (
    <div className={`
      flex justify-around w-full ${layoutComponentHeight} items-center bg-charcoal
      fixed bottom-0
    `}>
      {
        menus.map(m => (
          <div 
            className={`
              select-none cursor-pointer ${pathname === m.name ? "text-primary" : "text-white"}
              transition-colors duration-400
            `}
            onClick={() => {
              navigate(m.name)
            }}
          >
            {m.icon}
          </div>
        ))
      }
    </div>
  )
}

type Menu = "/admin" | "/admin/form" | "/admin/profil"

const menus: Array<{ 
  name: Menu
  icon: JSX.Element
}> = [
  {
    name: "/admin",
    icon: <Data />
  },
  {
    name: "/admin/form",
    icon: <Add />
  },
  {
    name: "/admin/profil",
    icon: <Account />
  }
] 