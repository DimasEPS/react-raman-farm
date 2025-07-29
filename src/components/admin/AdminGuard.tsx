import { useEffect, type JSX } from "react"
import { Navigate } from "react-router-dom"
import isTokenExpired from "../../utils/isTokenExpired"
import AuthService from "../../services/AuthService"

export default function AdminGuard({
  children
}: {
  children: JSX.Element
}) {
  // change later
  const token = localStorage.getItem("token")

  useEffect(() => {
    if (token && isTokenExpired(token)) {
      const userData = localStorage.getItem("user")
      if (userData) {
        const { email, password } = JSON.parse(userData) as {
          id: number
          username: string
          email: string
          role: string
          password: string
        }
        AuthService.login(email, password)
          .then(r => {
            if (r.data) {
              localStorage.setItem("token", r.data.token)
            }
          })
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!token) return <Navigate to="/" replace />
  else return children
}