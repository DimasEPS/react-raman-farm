import { useState } from "react";
import SearchBar from "../../components/SearchBar";
import AdminLayout from "../../layouts/AdminLayout";
import type { Goat } from "../../models/Goat";

export default function GoatsPage() {
  const [searchValue, setSearchValue] = useState("")
  const now = new Date()
  const goats: Array<Data> = [
    {
      code: "goat1",
      birthDate: new Date(now.getFullYear() - 2, now.getMonth() - 2),
      currentWeight: 12
    },
    {
      code: "goat2",
      birthDate: new Date(now.getFullYear() - 1, now.getMonth() + 8),
      currentWeight: 8
    },
    {
      code: "goat3",
      birthDate: new Date(now.getFullYear() - 3, now.getMonth()),
      currentWeight: 24
    },
  ]

  return <AdminLayout>
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
        goats.map(g => (
          <Card 
            code={g.code}
            birthDate={g.birthDate}
            currentWeight={g.currentWeight}
          />
        ))
      }
      <div className="min-h-[1px] w-full" />
    </div>
  </AdminLayout>
}

function Card({
  code,
  birthDate,
  currentWeight
}: Data) {
  const { year, month } = calculateAge(birthDate)

  return (
    <div className="flex flex-col px-5 py-4 gap-4 bg-white rounded-2xl shadow-md">
      <b>{code}</b>
      <div className="flex flex-col gap-2">
        <span>Usia Kambing  : {year > 0 && `${year} tahun`} {month > 0 && `${month} bulan`}</span>
        <span>Berat Kambing : {Number(currentWeight.toFixed(1))}</span>
      </div>
      <div className="flex gap-4 text-white">
        <button className="bg-blue">Edit</button>
        <button className="bg-vivid-red">Hapus</button>
      </div>
    </div>
  )
}

type Data = Pick<Goat, "code" | "birthDate" | "currentWeight">

function calculateAge(birthDate: Date): {
  year: number
  month: number
} {
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
