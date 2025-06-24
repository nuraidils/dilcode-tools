import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'

import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'
import PomodoroPage from './pages/PomodoroPage'
import StudyPlanPage from './pages/StudyPlanPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />, // kita gunakan main layout sebagai elemen dasar
    children: [ // definiskan halaman sebagai children
      {
        index: true, // ini untuk path '/'
        element: <HomePage />
      },
      {
        path: 'pomodoro',
        element: <PomodoroPage />
      },
      {
        path: 'study-plan',
        element: <StudyPlanPage />
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
