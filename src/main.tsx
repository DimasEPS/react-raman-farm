import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import LandingPage from './pages/LandingPage.tsx'
import GoatsPage from './pages/admin/GoatsPage.tsx'
import GoatFormPage from './pages/admin/GoatFormPage.tsx'
import AdminLayout from './layouts/AdminLayout.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />
  },
  {
    path: "/admin",
    element: <AdminLayout>
      <Outlet />
    </AdminLayout>,
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
