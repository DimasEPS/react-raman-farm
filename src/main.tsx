import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import LandingPage from './pages/LandingPage.tsx'
import GoatsPage from './pages/admin/GoatsPage.tsx'
import GoatFormPage from './pages/admin/GoatFormPage.tsx'
import AdminLayout from './layouts/AdminLayout.tsx'
import AdminGuard from './components/admin/AdminGuard.tsx'
import ProfilePage from './pages/admin/ProfilePage.tsx'
import LoginPage from './pages/LoginPage.tsx'
import GoatDetail from './pages/GoatDetail.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />
  },
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/kambing",
    element: <GoatDetail />
  },
  {
    path: "/kambing/:id",
    element: <GoatDetail />
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
      },
      {
        path: "profil",
        element: <ProfilePage />
      }
    ]
  },
  {
    path: "*",
    element: <Navigate to={"/"} replace />
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
