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

  if (!token) return <Navigate to="/" replace />
  else return children
}