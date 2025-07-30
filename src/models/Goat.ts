export type Goat = {
  id: number
  codeName: string
  breeder?: string
  gender: string
  breedLine?: string
  healthStatus?: string
  currentWeight?: number
  weightDate?: Date
  grade?: string
  color?: string
  sireBreed?: string
  damBreed?: string
  birthType?: string
  birthWeight?: number
  birthDate?: Date
  releaseDate?: Date
  salesNotes?: string
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isGoat(obj: any): obj is Goat {
  const validGenders = ['Male', 'Female']
  const validHealthStatuses = ['Sehat', 'Sakit']
  const validBirthTypes = ['Tunggal']

  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.id === 'number' &&
    typeof obj.codeName === 'string' &&
    validGenders.includes(obj.gender) &&
    (obj.breeder === undefined || typeof obj.breeder === 'string') &&
    (obj.breedLine === undefined || typeof obj.breedLine === 'string') &&
    (obj.healthStatus === undefined || validHealthStatuses.includes(obj.healthStatus)) &&
    (obj.currentWeight === undefined || typeof obj.currentWeight === 'number') &&
    (obj.weightDate === undefined || obj.weightDate instanceof Date) &&
    (obj.grade === undefined || typeof obj.grade === 'string') &&
    (obj.color === undefined || typeof obj.color === 'string') &&
    (obj.sireBreed === undefined || typeof obj.sireBreed === 'string') &&
    (obj.damBreed === undefined || typeof obj.damBreed === 'string') &&
    (obj.birthType === undefined || validBirthTypes.includes(obj.birthType)) &&
    (obj.birthWeight === undefined || typeof obj.birthWeight === 'number') &&
    (obj.birthDate === undefined || obj.birthDate instanceof Date) &&
    (obj.releaseDate === undefined || obj.releaseDate instanceof Date) &&
    (obj.salesNotes === undefined || typeof obj.salesNotes === 'string') &&
    (obj.createdAt === undefined || obj.createdAt instanceof Date) &&
    (obj.updatedAt === undefined || obj.updatedAt instanceof Date) &&
    (obj.deletedAt === undefined || obj.deletedAt instanceof Date)
  )
}