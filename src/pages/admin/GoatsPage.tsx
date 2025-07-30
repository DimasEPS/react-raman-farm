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
  const navigate = useNavigate()
  const [update, setUpdate] = useState(false)

  useEffect(() => {
    (async () => {
      const res = await GoatService.getGoats()
      setFetchGoats(res.goats)
      setTotalPage(res.totalPage)
    })()
  }, [update])

  return (
    <div className="size-full flex flex-col gap-4 pb-2">
      <div>
        <i className="font-medium ps-2">Cari data kambing</i>
        <SearchBar 
          placeholder="Masukkan Nomor Induk Kambing"
          value={searchValue}
          setValue={setSearchValue}
        />
      </div>
      <hr />
      {
        fetchGoats
          .sort((a, b) => b.updatedAt!.getTime() - a.updatedAt!.getTime())
          .map(g => (
            <Card 
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
                if (await GoatService.deleteGoat(g.id)) setUpdate(!update)
              }}
            />
          ))
      }
      <PaginationBars 
        currentPage={page}
        setPage={setPage}
        totalPage={totalPage}
        className="mx-auto"
      />
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
        <button className="bg-blue" onClick={onEdit}>Edit</button>
        <button className="bg-vivid-red" onClick={onDelete}>Hapus</button>
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
