import { useEffect, useState, type JSX } from "react";
import Detail from "../../assets/detail.svg?react"
import ChevronDown from "../../assets/chevron-down.svg?react"
import HeartBeat from "../../assets/heart-beat.svg?react"
import DataFile from "../../assets/data-file.svg?react"
import Calendar from "../../assets/calendar.svg?react"
import { useLocation } from "react-router-dom"
import TextField from "../../components/TextField";

export default function GoatFormPage() {
  const location = useLocation()
  const data = location.state?.data
  const [code, setCode] = useState(data?.code || "")
  const [gender, setGender] = useState(data?.gender || "")
  const [race, setRace] = useState(data?.race || "")
  const [healthCondition, setHealthCondition] = useState(data?.healthCondition || "")
  const [currentWeight, setCurrentWeight] = useState(data?.currentWeight || "")
  const [lastWeighInDate, setLastWeighInDate] = useState(formatDateString(data?.lastWeighInDate))
  const [grade, setGrade] = useState(data?.grade || "")
  const [buckRace, setBuckRace] = useState(data?.buckRace || "")
  const [doeRace, setDoeRace] = useState(data?.doeRace || "")
  const [birthType, setBirthType] = useState(data?.birthType || "")
  const [birthWeight, setBirthWeight] = useState(data?.birthWeight || "")
  const [birthDate, setBirthDate] = useState(formatDateString(data?.birthDate))
  const [releaseDate, setReleaseDate] = useState(formatDateString(data?.releaseDate))
  
  return (
    <div className="flex flex-col gap-8 pb-14">
      <Section
        icon={c => <Detail className={c} />}
        name="Detail Pemilik"
      >
        <Column>
          <>
            <TextField 
              label="Kode/Nama Kambing"
              value={code}
              setValue={setCode}
            />
            <ComboBox 
              label="Jenis Kelamin"
              options={genders}
              value={gender}
              setValue={g => setGender(g)}
            />
            <TextField 
              label="Galur/Ras"
              value={race}
              setValue={setRace}
            />
          </>
        </Column>
      </Section>
      <Section
        icon={c => <HeartBeat className={c} />}
        name="Kondisi Kesehatan"
      >
        <ComboBox 
          label="Kambing Dinyatakan"
          options={healthConditions}
          value={healthCondition}
          setValue={setHealthCondition}
        />
      </Section>
      <Section
        icon={c => <DataFile className={c} />}
        name="Data Lengkap"
      >
        <Column>
          <>
            <TextField 
              label="Bobot Terkini"
              value={currentWeight}
              setValue={setCurrentWeight}
            />
            <TextField 
              label="Tanggal Timbang Terkini"
              value={lastWeighInDate}
              setValue={setLastWeighInDate}
              placeholder={dateFieldPlaceholder}
              trailingIcon={s => <Calendar className={s} />}
            />
            <TextField 
              label="Grade"
              value={grade}
              setValue={setGrade}
            />
            <TextField 
              label="Ras Pejantan"
              value={buckRace}
              setValue={setBuckRace}
            />
            <TextField 
              label="Ras Induk"
              value={doeRace}
              setValue={setDoeRace}
            />
            <ComboBox 
              label="Kelahiran"
              options={birthTypes}
              value={birthType}
              setValue={setBirthType}
            />
            <TextField 
              label="Bobot Kelahiran"
              value={birthWeight}
              setValue={setBirthWeight}
            />
            <TextField 
              label="Tanggal Kelahiran"
              value={birthDate}
              setValue={setBirthDate}
              placeholder={dateFieldPlaceholder}
              trailingIcon={s => <Calendar className={s} />}
            />
            <TextField 
              label="Tanggal Pelepasan"
              value={releaseDate}
              setValue={setReleaseDate}
              placeholder={dateFieldPlaceholder}
              trailingIcon={s => <Calendar className={s} />}
            />
          </>
        </Column>
      </Section>
      <Column>
        <>
          <div className="flex flex-col w-full">
            Catatan Kambing
            <textarea
              className={`
                outline-2 outline-[rgba(33,33,33,0.2)] rounded-md
                min-h-[120px] px-4 py-2
              `}
            />
          </div>
          {
            !data ? <button className="bg-green text-white w-[70%]">
              Simpan Data
            </button> : <div className="flex gap-4 w-full">
              <button className="bg-vivid-red text-white flex-1/2">Hapus</button>
              <button className="bg-dark-green text-white flex-1/2">Generate QR</button>
            </div> 
          }
        </>
      </Column>
    </div>
  )
}

function formatDateString(value: string | undefined): string {
  if (!value) return ""
  const date = typeof value === "string" ? new Date(value) : value
  return !isNaN(date.getTime()) ? date.toLocaleDateString() : ""
}

const dateFieldPlaceholder = "bb/hh/tttt, contoh: 01/27/2025" 
// references form Goat.ts
const genders = ["Jantan", "Betina"]
const healthConditions = ["Sehat", "Sakit"]
const birthTypes = ["Tunggal"]

function Column({
  children
}: {
  children: JSX.Element
}) {
  return (
    <div className="flex flex-col gap-2 items-center">
      {children}
    </div>
  )
}

function Section({
  icon,
  name,
  children
}: {
  icon: (iconClassName: string) => JSX.Element
  name: string
  children: JSX.Element
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <div className="text-dark-green">
          {icon("size-[32px]")}
        </div>
        <div className="font-medium text-xl">
          {name}
        </div>
      </div>
      {children}
    </div>
  )
}

function ComboBox({
  label,
  options,
  value,
  setValue
}: {
  label: string
  options: Array<string>
  value: string
  setValue: (value: string) => void
}) {
  const [expand, setExpand] = useState(false)

  useEffect(() => {
    if (options.length) {
      setValue(options[0])
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="relative w-full">
      <div className="">
        {label}
        <div 
          className={`
            outline-2 outline-[rgba(33,33,33,0.2)] bg-light-gray rounded-md 
            flex justify-between items-center px-4 py-2
          `}
          onClick={() => setExpand(!expand)}
        >
          {value}
          {<ChevronDown className="size-[24px]" />}
        </div>
      </div>
      {
        expand && <div className={`
          absolute top-full flex flex-col gap-4 bg-light-gray rounded-[4px]
          outline-2 outline-[rgba(33,33,33,0.2)] px-4 py-2 mt-2 w-full
        `}>
          {
            options.map(o => (
              <div
                onClick={() => {
                  setValue(o)
                  setExpand(false)
                }}
              >
                {o}
              </div>
            ))
          }
        </div>
      }
    </div>
  )
}