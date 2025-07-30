import axios from "axios";
import isTokenExpired from "../utils/isTokenExpired";
import AuthService from "./AuthService";

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_BE_BASE_URL || "http://localhost:3000",
  headers: {
    "Content-Type": "application/json"
  }
})

export const authClient = axios.create({
  baseURL: import.meta.env.VITE_BE_BASE_URL || "http://localhost:3000",
  headers: {
    "Content-Type": "application/json"
  }
})

httpClient.interceptors.request.use(async c => {
  const token = localStorage.getItem("token")
  if (token) {
    if (!isTokenExpired(token)) {
      c.headers.Authorization = `Bearer ${token}`
    } else {
      const user = localStorage.getItem("user")
      if (user) {
        const { email, password } = JSON.parse(user) as {
          id: number
          username: string
          email: string
          role: string
          password: string
        }
        const t = await AuthService.login(
          email,
          password
        )
        if (t) {
          console.log("token refreshed")
          c.headers.Authorization = `Bearer ${t}`
        }
      }
    }
  }
  return c
})

export default httpClient