import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PaginationBars from "../../components/PaginationBars";
import SearchBar from "../../components/SearchBar";
import type { Goat } from "../../models/Goat";
import GoatService from "../../services/GoatService";

export default function GoatsPage() {
  const [searchValue, setSearchValue] = useState("")
  const [fetchGoats, setFetchGoats] = useState<Array<Goat>>([])
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)
  const [isSearching, setIsSearching] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchError, setSearchError] = useState("")
  const navigate = useNavigate()
  const [update, setUpdate] = useState(false)

  // Load all goats with pagination (default behavior)
  useEffect(() => {
    if (!isSearching) {
      (async () => {
        try {
          const res = await GoatService.getGoats(undefined, page)
          setFetchGoats(res.goats)
          setTotalPage(res.totalPage)
        } catch (error) {
          console.error('Error loading goats:', error)
        }
      })()
    }
  }, [update, page, isSearching])

  // Handle search when user clicks search icon
  const handleSearch = async () => {
    if (!searchValue.trim()) {
      // If search is empty, return to showing all goats
      setIsSearching(false)
      setSearchQuery("")
      setSearchError("")
      setPage(1)
      return
    }

    setIsSearching(true)
    setSearchQuery(searchValue.trim())
    setSearchError("")

    try {
      const goat = await GoatService.getGoatByCodeName(searchValue.trim())
      if (goat) {
        setFetchGoats([goat])
        setTotalPage(1)
      } else {
        setFetchGoats([])
        setTotalPage(1)
        setSearchError(`Kambing dengan kode "${searchValue.trim()}" tidak ditemukan`)
      }
    } catch (error) {
      console.error("Search error:", error)
      setFetchGoats([])
      setTotalPage(1)
      setSearchError(`Kambing dengan kode "${searchValue.trim()}" tidak ditemukan`)
    }
  }

  // Clear search and return to all goats
  const clearSearch = () => {
    setSearchValue("")
    setSearchQuery("")
    setSearchError("")
    setIsSearching(false)
    setPage(1)
  }

  return (
    <div className="size-full flex flex-col gap-4 pb-2">
      <div>
        <i className="font-medium ps-2">Cari data kambing</i>
        <SearchBar 
          placeholder="Masukkan Nomor Induk Kambing"
          value={searchValue}
          setValue={setSearchValue}
          onSearch={handleSearch}
        />
        {isSearching && (
          <div className="flex items-center justify-between mt-2 px-2">
            <span className="text-sm text-gray-600">
              {searchError ? searchError : `Hasil pencarian untuk: "${searchQuery}"`}
            </span>
            <button 
              onClick={clearSearch}
              className="text-sm text-blue-600 hover:text-blue-800 underline"
            >
              Tampilkan semua
            </button>
          </div>
        )}
      </div>
      <hr />
      {
        fetchGoats.length > 0 ? (
          fetchGoats
            .sort((a, b) => b.updatedAt!.getTime() - a.updatedAt!.getTime())
            .map((g, index) => (
              <Card 
                key={g.id || index}
                codeName={g.codeName}
                birthDate={g.birthDate}
                currentWeight={g.currentWeight}
                onEdit={() => navigate(
                  "/admin/form",
                  {
                    state: {
                      data: g
                    }
                  }
                )}
                onDelete={async () => {
                  if (await GoatService.deleteGoat(g.id)) {
                    if (isSearching) {
                      // If we were showing search result and deleted it, go back to all goats
                      clearSearch()
                    } else {
                      setUpdate(!update)
                    }
                  }
                }}
              />
            ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            {isSearching 
              ? (searchError || "Kambing tidak ditemukan")
              : "Tidak ada data kambing"
            }
          </div>
        )
      }
      {!isSearching && totalPage > 1 && (
        <PaginationBars 
          currentPage={page}
          setPage={setPage}
          totalPage={totalPage}
          className="mx-auto"
        />
      )}
      <div className="min-h-[1px] w-full" />
    </div>
  )
}

function Card({
  codeName,
  birthDate,
  currentWeight,
  onEdit,
  onDelete
}: Data & {
  onEdit: () => void
  onDelete: () => void
}) {
  const { year, month } = calculateAge(birthDate)

  return (
    <div className="flex flex-col px-5 py-4 gap-4 bg-white rounded-2xl shadow-md">
      <b>{codeName}</b>
      <div className="flex flex-col gap-2">
        <span>
          Usia Kambing  : {year > 0 && `${year} tahun`} 
          {month > 0 && ` ${month} bulan`}
          {!year && !month && "-"}
        </span>
        <span>Berat Kambing : {currentWeight ? `${currentWeight} kg` : "-"}</span>
      </div>
      <div className="flex gap-4 text-white">
        <button className="bg-blue px-4 py-2 rounded" onClick={onEdit}>Edit</button>
        <button className="bg-vivid-red px-4 py-2 rounded" onClick={onDelete}>Hapus</button>
      </div>
    </div>
  )
}

type Data = Pick<Goat, "codeName" | "birthDate" | "currentWeight">

function calculateAge(birthDate: Date | undefined): {
  year: number
  month: number
} {
  if (!birthDate) return {
    year: 0,
    month: 0
  }

  const today = new Date()
  let year = today.getFullYear() - birthDate.getFullYear()
  let month = today.getMonth() - birthDate.getMonth()

  if (today.getDate() < birthDate.getDate() && month === 0) {
    month--
  }

  if (month < 0) {
    year--
    month += 12
  }

  return { year, month }
}
