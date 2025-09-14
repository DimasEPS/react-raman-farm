import { authClient } from "./httpClient"

class AuthService {
  private readonly basePath = "/auth"

  async login(
    email: string, 
    password: string
  ): Promise<string | null> {
    try {
      const res = await authClient.post(`${this.basePath}/login`, {
        identifier: email,
        password: password
      })

      if (res && res.status == 200) {
        const token = res.data.data.token
        localStorage.setItem("token", token)
        localStorage.setItem("user", JSON.stringify({
          ...res.data.data.user,
          ...{ password: password }
        }))
        return token
      } else return null
    } catch (e) {
      console.error(e)
      return null
    }
  }

  logout(onSuccess: () => void | undefined) {
    const token = localStorage.getItem("token")
    const clear = () => {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      onSuccess()
    }
    if (!token) return
    else {
      authClient.post(`${this.basePath}/logout`)
        .then(clear)
        .catch(clear)
    }
  }
}

export default new AuthService()
