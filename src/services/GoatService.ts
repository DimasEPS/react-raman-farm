import type { Goat } from "../models/Goat"
import httpClient from "./httpClient"

class GoatService {
  private readonly basePath = "/api/goat"

  async createGoat(goat: Goat) {
    return httpClient.post(`${this.basePath}`)
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
    let totalPage = 0
    const queries = `?${[["search", search], ["page", page]]
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .filter(([_, v]) => !!v)
      .map(([k, v]) => `${k}=${v}`)
      .join("&")}`

    const res = await httpClient.get(`${this.basePath}${queries}`)
    if (res.status === 200) {
      goats = res.data.data
      const metadata = res.data.meta
      if (!metadata.totalPage) {
        totalPage = 1
      }
      if (metadata.totalPages > metadata.page) {
        nextPage = ++metadata.page
      }
    }
    return {
      goats,
      totalPage,
      nextPage
    }
  }
}

export default new GoatService()