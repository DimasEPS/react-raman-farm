export type Goat = {
  code: string
  breeder: string
  gender: Gender
  race: string
  healthCondition: HealthCondition
  currentWeight: number
  lastWeighInDate: Date
  grade: string
  buck: string
  buckRace: string
  doeRace: string
  birthType: BirthType
  birthWeight: number
  birthDate: Date
  releaseDate: Date
}

type Gender = "Jantan" | "Betina"
type HealthCondition = "Sehat" | ""
type BirthType = "Tunggal" | ""