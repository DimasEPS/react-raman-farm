export type Goat = {
  code: string
  breeder?: string
  gender: Gender
  race?: string
  healthCondition?: HealthCondition
  currentWeight?: string
  lastWeighInDate?: Date
  grade?: string
  color?: string
  buck?: string
  buckRace?: string
  doeRace?: string
  birthType?: BirthType
  birthWeight?: string
  birthDate?: Date
  releaseDate?: Date
  notes?: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isGoat(obj: any): obj is Goat {
  const validGenders = ['Jantan', 'Betina']
  const validHealthConditions = ['Sehat', 'Sakit']
  const validBirthTypes = ['Tunggal', '']

  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.code === 'string' &&
    validGenders.includes(obj.gender) &&
    (obj.breeder === undefined || typeof obj.breeder === 'string') &&
    (obj.race === undefined || typeof obj.race === 'string') &&
    (obj.healthCondition === undefined || validHealthConditions.includes(obj.healthCondition)) &&
    (obj.currentWeight === undefined || typeof obj.currentWeight === 'string') &&
    (obj.lastWeighInDate === undefined || obj.lastWeighInDate instanceof Date) &&
    (obj.grade === undefined || typeof obj.grade === 'string') &&
    (obj.color === undefined || typeof obj.color === 'string') &&
    (obj.buck === undefined || typeof obj.buck === 'string') &&
    (obj.buckRace === undefined || typeof obj.buckRace === 'string') &&
    (obj.doeRace === undefined || typeof obj.doeRace === 'string') &&
    (obj.birthType === undefined || validBirthTypes.includes(obj.birthType)) &&
    (obj.birthWeight === undefined || typeof obj.birthWeight === 'string') &&
    (obj.birthDate === undefined || obj.birthDate instanceof Date) &&
    (obj.releaseDate === undefined || obj.releaseDate instanceof Date) &&
    (obj.notes === undefined || typeof obj.notes === 'string')
  )
}

type Gender = "Jantan" | "Betina"
type HealthCondition = "Sehat" | "Sakit"
type BirthType = "Tunggal" | ""