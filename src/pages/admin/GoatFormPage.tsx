import { useEffect, useState, type JSX } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Calendar from "../../assets/calendar.svg?react";
import ChevronDown from "../../assets/chevron-down.svg?react";
import DataFile from "../../assets/data-file.svg?react";
import Detail from "../../assets/detail.svg?react";
import HeartBeat from "../../assets/heart-beat.svg?react";
import TextField from "../../components/TextField";
import GoatService from "../../services/GoatService";
import formatDateString from "../../utils/formatDateString";

export default function GoatFormPage() {
  const location = useLocation()
  const data = location.state?.data
  const navigate = useNavigate()
  const [code, setCode] = useState(data?.codeName || "")
  const [gender, setGender] = useState(() => {
    let g = data?.gender
    if (g) {
      switch (g) {
        case 'Male':
          g = "Jantan"
          break
        case 'Female':
          g = "Betina"
          break
      }
    }
    return g || ""
  })
  const [race, setRace] = useState(data?.breedLine || "")
  const [healthCondition, setHealthCondition] = useState(data?.healthCondition || "")
  const [currentWeight, setCurrentWeight] = useState(data?.currentWeight || "")
  const [weightDate, setWeightDate] = useState(formatDateString(data?.weightDate))
  const [grade, setGrade] = useState(data?.grade || "")
  const [color, setColor] = useState(data?.color || "")
  const [sireBreed, setSireBreed] = useState(data?.sireBreed || "")
  const [damBreed, setDamBreed] = useState(data?.damBreed || "")
  const [birthType, setBirthType] = useState(data?.birthType || "")
  const [birthWeight, setBirthWeight] = useState(data?.birthWeight || "")
  const [birthDate, setBirthDate] = useState(formatDateString(data?.birthDate))
  const [releaseDate, setReleaseDate] = useState(formatDateString(data?.releaseDate))
  const [salesNotes, setSalesNotes] = useState(data?.salesNotes || "")
  const saveEnabled = code 
    && isValidDate(weightDate) 
    && isValidDate(birthDate) 
    && isValidDate(releaseDate)

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
              required
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
              placeholder={weightPlaceholder}
              type="number"
            />
            <TextField 
              label="Tanggal Timbang Terkini"
              value={weightDate}
              setValue={setWeightDate}
              placeholder={dateFieldPlaceholder}
              trailingIcon={s => <Calendar className={s} />}
            />
            <TextField 
              label="Grade"
              value={grade}
              setValue={setGrade}
            />
            <TextField 
              label="Warna"
              value={color}
              setValue={setColor}
            />
            <TextField 
              label="Ras Pejantan"
              value={sireBreed}
              setValue={setSireBreed}
            />
            <TextField 
              label="Ras Induk"
              value={damBreed}
              setValue={setDamBreed}
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
              placeholder={weightPlaceholder}
              type="number"
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
              value={salesNotes}
              onChange={e => setSalesNotes(e.target.value)}
            />
          </div>
          {
            <div className="flex gap-4 w-full">
              {
                data && <>
                  <button 
                    className="bg-vivid-red text-white flex-1/4"
                    onClick={async () => {
                      if (await GoatService.deleteGoat(data.id)) navigate("/admin")
                    }}
                  >
                      Hapus
                  </button>
                  <button className="bg-dark-green text-white flex-2/4">Generate QR</button>
                </>
              }
              <button 
                className={`
                  text-white w-[70%] flex-1/4 ${
                    saveEnabled ? "bg-green" : "bg-light-gray"
                  }  
                `}
                disabled={!saveEnabled}
                onClick={async () => {
                  let success = false
                  const newData = {
                    codeName: code,
                    gender: gender === "Jantan" ? "Male" : gender === "Betina" ? "Female" : "Male",
                    breedLine: race,
                    healthStatus: healthCondition,
                    currentWeight: currentWeight ? Number(currentWeight) : undefined,
                    weightDate: weightDate ? new Date(weightDate) : undefined,
                    grade: grade,
                    color: color,
                    sireBreed: sireBreed,
                    damBreed: damBreed,
                    birthType: birthType,
                    birthWeight: birthWeight ? Number(birthWeight) : undefined,
                    birthDate: birthDate ? new Date(birthDate) : undefined,
                    releaseDate: releaseDate ? new Date(releaseDate) : undefined,
                    salesNotes: salesNotes
                  }
                  if (!data) success = await GoatService.createGoat(newData)
                    else success = await GoatService.updateGoat(data.id, newData)
                  if (success) navigate("/admin", { replace: true })
                }}
              >
                Simpan Data
              </button>
            </div> 
          }
        </>
      </Column>
    </div>
  )
}

function isValidDate(dateStr: string): boolean {
  if (!dateStr) return true

  const dateRegex = /^(0?[1-9]|1[0-2])\/(0?[1-9]|[12][0-9]|3[01])\/(\d{4})$/
  const match = dateStr.match(dateRegex)
  if (!match) return false

  const [month, day, year] = dateStr.split("/").map(Number)

  if (year < 1000 || year > 9999) return false

  const date = new Date(year, month - 1, day)

  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  )
}

const dateFieldPlaceholder = "bb/hh/tttt, contoh: 01/27/2025" 
const weightPlaceholder = "kg, contoh: 2.4" 
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
    if (options.length && !value) {
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