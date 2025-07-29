import { jwtDecode } from "jwt-decode"

export default function isTokenExpired(token: string): boolean {
  try {
    const decoded = jwtDecode(token)
    const currentTime = Math.floor(Date.now() / 1000)
    if (!decoded.exp) return true
    return decoded.exp < currentTime
  } catch (_) {
    return true 
  }
}