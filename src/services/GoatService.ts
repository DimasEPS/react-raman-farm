import type { Goat } from "../models/Goat"
import httpClient from "./httpClient"

class GoatService {
  private readonly basePath = "/api/goat"

  async createGoat(goat: Omit<Goat, "id">): Promise<boolean> {
    const filterGoat = {
      weightDate: this.toMySQLDateTimeString(goat.weightDate),
      birthDate: this.toMySQLDateTimeString(goat.birthDate),
      releaseDate: this.toMySQLDateTimeString(goat.releaseDate),
      ...goat
    }
    const res = await httpClient.post(`${this.basePath}`, filterGoat)
    return res.status == 201
  }

  async updateGoat(id: number, newData: Omit<Goat, "id">): Promise<boolean> {
    const filterGoat = {
      weightDate: this.toMySQLDateTimeString(newData.weightDate),
      birthDate: this.toMySQLDateTimeString(newData.birthDate),
      releaseDate: this.toMySQLDateTimeString(newData.releaseDate),
      ...newData
    }
    const res = await httpClient.put(`${this.basePath}/${id}`, filterGoat)
    return res.status == 200
  }

  async getGoats(
    search?: string,
    page?: number
  ): Promise<{
    goats: Array<Goat>
    totalPage: number
    nextPage?: number
  }> {
    let goats: Array<Goat> = []
    let nextPage: number | undefined = undefined
    let totalPage = 1 // Default to 1
    
    const queries = `?${[["search", search], ["page", page]]
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .filter(([_, v]) => !!v)
      .map(([k, v]) => `${k}=${v}`)
      .join("&")}`

    const res = await httpClient.get(`${this.basePath}${queries}`)
    if (res.status === 200) {
      goats = res.data.data.map(g => {
        if (g.weightDate) g.weightDate = new Date(g.weightDate) // Fixed typo: weighDate -> weightDate
        if (g.birthDate) g.birthDate = new Date(g.birthDate)
        if (g.releaseDate) g.releaseDate = new Date(g.releaseDate)
        if (g.createdAt) g.createdAt = new Date(g.createdAt)
        if (g.updatedAt) g.updatedAt = new Date(g.updatedAt)
        if (g.deletedAt) g.deletedAt = new Date(g.deletedAt)
        
        return g
      })
      
      const metadata = res.data.meta
      // Fix: Use totalPages from backend response
      totalPage = metadata.totalPages || 1
      
      // Fix: Check if there's a next page
      if (metadata.page < metadata.totalPages) {
        nextPage = metadata.page + 1
      }
    }
    
    return {
      goats,
      totalPage,
      nextPage
    }
  }

  async getGoatById(id: number): Promise<Goat | null> {
    const res = await httpClient.get(`${this.basePath}/${id}`)
    if (res.status == 200) return res.data.data
    else return null
  }

  async deleteGoat(id: number): Promise<boolean> {
    const res = await httpClient.delete(`${this.basePath}/${id}`)
    return res.status === 200
  }

  async getGoatQr(id: number): Promise<{
    link: string
    qrBase64Image: string
  } | null> {
    const res = await httpClient.get(`${this.basePath}/${id}/qrcode`)
    if (res) {
      return {
        link: res.data.link,
        qrBase64Image: res.data.data.qrCode
      }
    } else return null
  }

  async getGoatByCodeName(codeName: string): Promise<Goat | null> {
    const res = await httpClient.get(`${this.basePath}/codename/${codeName}`)
    if (res.status == 200) {
      const goat = res.data.data
      return {
        ...goat,
        birthDate: goat.birthDate ? new Date(goat.birthDate) : undefined,
        weightDate: goat.weightDate ? new Date(goat.weightDate) : undefined,
        releaseDate: goat.releaseDate ? new Date(goat.releaseDate) : undefined,
        createdAt: goat.createdAt ? new Date(goat.createdAt) : undefined,
        updatedAt: goat.updatedAt ? new Date(goat.updatedAt) : undefined,
        deletedAt: goat.deletedAt ? new Date(goat.deletedAt) : undefined,
      }
    } else {
      return null
    }
  }

  private toMySQLDateTimeString(date: Date | undefined): string | null {
    if (!date) return null

    const pad = (n: number) => n.toString().padStart(2, '0')
    const yyyy = date.getFullYear()
    const mm = pad(date.getMonth() + 1)
    const dd = pad(date.getDate())
    const hh = pad(date.getHours())
    const mi = pad(date.getMinutes())
    const ss = pad(date.getSeconds())
    return `${yyyy}-${mm}-${dd} ${hh}:${mi}:${ss}`
  }
}

export default new GoatService()