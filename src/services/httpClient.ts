import axios from "axios";

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_BE_BASE_URL || "http://localhost:3000",
  headers: {
    "Content-Type": "application/json"
  }
})

httpClient.interceptors.request.use(c => {
  const token = localStorage.getItem("token")
  if (token) c.headers.Authorization = `Bearer ${token}`
  return c
})

export default httpClient