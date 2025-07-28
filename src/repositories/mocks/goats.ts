import type { Goat } from "../../models/Goat";

export const mockGoats: Goat[] = [
  {
    code: "GT-001",
    breeder: "Peternakan Suka Maju",
    gender: "Jantan",
    race: "Kacang",
    healthCondition: "Sehat",
    currentWeight: "34.5",
    lastWeighInDate: new Date("2025-07-10"),
    grade: "A",
    buck: "BK-202",
    buckRace: "Boer",
    doeRace: "Etawa",
    birthType: "Tunggal",
    birthWeight: "3.0",
    birthDate: new Date("2025-01-01"),
    releaseDate: new Date("2025-07-25")
  },
  {
    code: "GT-002",
    breeder: "Peternakan Berkah Tani",
    gender: "Betina",
    race: "Etawa",
    healthCondition: "Sakit",
    currentWeight: "28.7",
    lastWeighInDate: new Date("2025-06-20"),
    grade: "B",
    buck: "BK-108",
    buckRace: "Kacang",
    doeRace: "Etawa",
    birthType: "",
    birthWeight: "2.5",
    birthDate: new Date("2024-12-12"),
    releaseDate: new Date("2025-07-10")
  },
  {
    code: "GT-003",
    breeder: "Kambing Makmur Jaya",
    gender: "Jantan",
    race: "Boer",
    healthCondition: "Sehat",
    currentWeight: "31.2",
    lastWeighInDate: new Date("2025-07-15"),
    grade: "A",
    buck: "BK-309",
    buckRace: "Etawa",
    doeRace: "Kacang",
    birthType: "Tunggal",
    birthWeight: "3.3",
    birthDate: new Date("2025-03-22"),
    releaseDate: new Date("2025-07-28")
  }
]