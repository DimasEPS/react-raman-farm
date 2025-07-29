import httpClient from "./httpClient"

class AuthService {
  private readonly basePath = "/api/auth"

  async login(email: string, password: string) {
    return httpClient.post(`${this.basePath}/login`, {
      identifier: email,
      password: password
    })
  }

  logout(onSuccess: () => void | undefined) {
    const token = localStorage.getItem("token")
    if (!token) return
    else {
      httpClient.post(`${this.basePath}/logout`)
        .then(r => {
          if (r.status === 200) {
            localStorage.removeItem("token")
            localStorage.removeItem("user")
            onSuccess()
          }
        })
    }
  }
}

export default new AuthService()