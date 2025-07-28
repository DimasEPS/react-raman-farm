import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import LandingPage from './pages/LandingPage.tsx'
import GoatsPage from './pages/admin/GoatsPage.tsx'
import GoatFormPage from './pages/admin/GoatFormPage.tsx'
import AdminLayout from './layouts/AdminLayout.tsx'
import AdminGuard from './components/admin/AdminGuard.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />
  },
  {
    path: "/admin",
    element: <AdminGuard>
      <AdminLayout />
    </AdminGuard>,
    children: [
      {
        path: "",
        element: <GoatsPage />
      },
      {
        path: "form",
        element: <GoatFormPage />
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
