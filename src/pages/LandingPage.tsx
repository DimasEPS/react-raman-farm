import { useState } from "react"
import bg from "../assets/landing-bg.png"
import SearchBar from "../components/SearchBar"
import Header from "../components/Header"
import { Navigate, useNavigate } from "react-router-dom"
import GoatService from "../services/GoatService"

export default function LandingPage() {
  const [searchValue, setSearchValue] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const isAdmin = localStorage.getItem("token")

  const handleSearch = async () => {
    if (!searchValue.trim()) {
      setError("Masukkan nomor induk kambing")
      return
    }

    setIsSearching(true)
    setError("")

    try {
      const goat = await GoatService.getGoatByCodeName(searchValue.trim())
      if (goat) {
        // Navigate menggunakan ID di URL parameter, bukan state
        navigate(`/kambing/${goat.id}`)
      } else {
        setError("Kambing dengan kode tersebut tidak ditemukan")
      }
    } catch (err) {
      setError("Kambing dengan kode tersebut tidak ditemukan")
    } finally {
      setIsSearching(false)
    }
  }

  if (isAdmin) return <Navigate to="/admin" />
  else return (
    <div className="relative">
      <div className="absolute top-0 left-0 w-full h-full">
        <div 
          className="w-full min-h-[384px] max-h-[600px] relative bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${bg})`
          }}
        >
          <div className={`
            flex flex-col gap-4 absolute top-[30%] items-center justify-center
            text-white w-[80%] left-1/2 -translate-x-1/2
          `}>
            <b className="italic">CARI DATA KAMBING</b>
            <SearchBar 
              placeholder="Masukkan Nomor Induk Kambing"
              value={searchValue}
              setValue={setSearchValue}
            />
            <button 
              className="bg-dark-green px-6 py-2 rounded-lg text-white font-medium disabled:opacity-50"
              onClick={handleSearch}
              disabled={isSearching}
            >
              {isSearching ? "Mencari..." : "Cari Data"}
            </button>
            {error && (
              <div className="text-red-300 text-sm text-center">
                {error}
              </div>
            )}
          </div>
          <div 
            className="w-full bg-bg absolute top-[90%] pb-16"
            style={{
              // adjust first param (h radius) based on its content height
              clipPath: "ellipse(120% 100% at 50% 100%)"
            }}
          >
            <div className="flex flex-col gap-6 pt-6 items-center w-[90%] mx-auto">
              <b className="text-2xl sm:text-3xl">Misi Kami</b>
              <span className="text-center">
                Data kambing - domba yang jelas akan meningkatkan kredibilitas peternakan anda
              </span>
              <div className="flex flex-col gap-12 w-full">
                {missions.map((d, i) => (
                  <Mission 
                    number={i + 1}
                    title={d.title}
                    desc={d.desc}
                  />
                ))}
              </div>
            </div>  
          </div>
        </div>
      </div>
      <Header />
    </div>
  )
}

const missions: Array<MissionData> = [
  {
    title: "Sanad",
  },
  {
    title: "Pertumbuhan",
  },
  {
    title: "Kesehatan",
  },
]

function Mission({
  number,
  title,
  desc
}: MissionData) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-4 items-center">
        <div
          // bg size = text size * 2 
          className={`
            text-2xl font-medium rounded-full size-[3rem] bg-primary text-[rgba(0,0,0,60)]
            flex items-center justify-center  
          `}
        >
          {number}
        </div>
        <h3 className="font-medium">
          {title}
        </h3>
      </div>
      {desc}
    </div>
  )
}

type MissionData = {
  number?: number
  title: string
  desc?: string
}