import httpClient from "./httpClient"

class AuthService {
  private readonly basePath = "/api/auth"

  async login(email: string, password: string) {
    return httpClient.post(`${this.basePath}/login`, {
      identifier: email,
      password: password
    })
  }
}

export default new AuthService()