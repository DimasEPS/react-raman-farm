export type Goat = {
  code: string
  breeder: string
  gender: Gender
  race: string
  healthCondition: HealthCondition
  currentWeight: string
  lastWeighInDate: Date
  grade: string
  buck: string
  buckRace: string
  doeRace: string
  birthType: BirthType
  birthWeight: string
  birthDate: Date
  releaseDate: Date
}

type Gender = "Jantan" | "Betina"
type HealthCondition = "Sehat" | "Sakit"
type BirthType = "Tunggal" | ""