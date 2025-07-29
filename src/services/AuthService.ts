import httpClient from "./httpClient"

class AuthService {
  private readonly basePath = "/api/auth"

  async login(
    email: string, 
    password: string, 
    onSuccess?: () => void, 
    onFail?: () => void
  ) {
    httpClient.post(`${this.basePath}/login`, {
      identifier: email,
      password: password
    })
     .then(res => {
        if (res && res.status == 200) {
          localStorage.setItem("token", res.data.data.token)
          localStorage.setItem("user", JSON.stringify({
            ...res.data.data.user,
            ...{ password: password }
          }))
          onSuccess?.()
        } else {
          onFail?.()
        }
      })
      .catch(r => {
        console.error(r)
        onFail?.()
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