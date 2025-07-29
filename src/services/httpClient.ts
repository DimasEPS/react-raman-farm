import axios from "axios";
import isTokenExpired from "../utils/isTokenExpired";
import AuthService from "./AuthService";

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_BE_BASE_URL || "http://localhost:3000",
  headers: {
    "Content-Type": "application/json"
  }
})

httpClient.interceptors.request.use(c => {
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
        AuthService.login(
          email,
          password,
          () => {
            c.headers.Authorization = `Bearer ${localStorage.getItem("token")}`
          }
        )
      }
    }
  }
  return c
})

export default httpClient