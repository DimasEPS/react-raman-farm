import type { Goat } from "../models/Goat"
import httpClient from "./httpClient"

class GoatService {
  private readonly basePath = "/api/goat"

  async createGoat(goat: Goat) {
    return httpClient.post(`${this.basePath}`)
  }
}

export default new GoatService()