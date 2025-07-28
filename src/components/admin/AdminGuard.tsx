import type { JSX } from "react"
import { Navigate } from "react-router-dom"

export default function AdminGuard({
  children
}: {
  children: JSX.Element
}) {
  // change later
  const isAdmin = false

  if (!isAdmin) return <Navigate to="/" replace />
  else return children
}