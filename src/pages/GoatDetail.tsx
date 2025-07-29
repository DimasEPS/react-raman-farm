import { Navigate, useLocation } from "react-router-dom";
import { isGoat } from "../models/Goat";
import GoatIcon from "../assets/goat.svg?react"
import formatDateString from "../utils/formatDateString";

export default function GoatDetail() {
  const data = useLocation().state?.data

  if (!data || !isGoat(data)) return <Navigate to="/" replace />
  else return (
    <div className="flex flex-col items-center h-[100dvh] gap-8">
      <div className="flex items-center justify-center w-full bg-dark-green py-6">
        <GoatIcon className="scale-110" />
      </div>
      <div className="text-center">
        <h3 className="font-bold">
          Detail Informasi
        </h3>
        Data Kambing
      </div>
      <div className="flex flex-col px-6 gap-6 w-full">
        <Info 
          section="DETAIL PEMILIK"
          data={new Map([
            ["Kode/Nama Kambing", data.code],
            ["Nama Breeder", resolveUndefinedData(data.breeder)],
            ["Jenis Kelamin", data.gender],
            ["Ras/Galur", resolveUndefinedData(data.race)]
          ])}
        />
        <Info 
          section="INFORMASI KESEHATAN"
          data={new Map([
            ["Kambing Dinyatakan", resolveUndefinedData(data.healthCondition)]
          ])}
        />
        <Info 
          section="DATA LENGKAP"
          data={new Map([
            ["Bobot Terkini", resolveUndefinedData(data.currentWeight)],
            ["Tanggal Timbang Terkini", resolveUndefinedData(data.currentWeight)],
            ["Grade", resolveUndefinedData(data.currentWeight)],
            ["Warna", resolveUndefinedData(data.color)],
            ["Ras Pejantan", resolveUndefinedData(data.buckRace)],
            ["Ras Induk", resolveUndefinedData(data.doeRace)],
            ["Kelahiran", resolveUndefinedData(data.birthType)],
            ["Bobot Lahir", resolveUndefinedData(data.birthWeight)],
            ["Tanggal Lahir", resolveUndefinedData(formatDateString(data.birthDate))],
            ["Tanggal Pelepasan", resolveUndefinedData(formatDateString(data.releaseDate))],
            ["Catatan", resolveUndefinedData(data.notes)],
          ])}
        />
      </div>
    </div>
  )
}

function Info({
  section,
  data
}: {
  section: string
  data: Map<string, string>
}) {
  return (
    <div className="flex flex-col gap-6 bg-white rounded-xl p-6 shadow-md">
      <span className="font-medium">{section}</span>
      <div className="flex flex-col gap-3">
        {
          [...data.entries()].map(([k, v]) => (
            <div className="flex jusitfy-between w-full gap-2">
              <div className="flex flex-2/5">
                <span className="flex-4/5">{k}</span>
                <span className="flex-1/5">:</span>
              </div>
              <span className="flex-3/5 text-end">{v}</span>
            </div>
          ))
        }
      </div>
    </div>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function resolveUndefinedData(data: any | undefined) {
  return data || "-"
}