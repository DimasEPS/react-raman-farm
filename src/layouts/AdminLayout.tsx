import { useState, type JSX } from "react"
import Data from "../assets/admin-data.svg?react"
import Add from "../assets/admin-tambah.svg?react"
import Statistic from "../assets/admin-statisik.svg?react"
import Account from "../assets/admin-akun.svg?react"

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

// TODO use Context
function NavBar() {
  const [currentMenu, setCurrentMenu] = useState<Menu>("data")

  return (
    <div className={`
      flex justify-around w-full ${layoutComponentHeight} items-center bg-charcoal
      fixed bottom-0
    `}>
      {
        menus.map(m => (
          <div 
            className={`
              select-none cursor-pointer ${currentMenu === m.name ? "text-primary" : "text-white"}
              transition-colors duration-400
            `}
            onClick={() => setCurrentMenu(m.name)}
          >
            {m.icon}
          </div>
        ))
      }
    </div>
  )
}

type Menu = "data" | "tambah" | "statistik" | "akun"

const menus: Array<{ 
  name: Menu
  icon: JSX.Element
}> = [
  {
    name: "data",
    icon: <Data />
  },
  {
    name: "tambah",
    icon: <Add />
  },
  {
    name: "statistik",
    icon: <Statistic />
  },
  {
    name: "akun",
    icon: <Account />
  }
] 