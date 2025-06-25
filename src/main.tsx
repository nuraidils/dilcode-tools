import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'

import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'
import PomodoroPage from './pages/PomodoroPage'
import StudyPlanPage from './pages/StudyPlanPage'
import HabitTrackerPage from './pages/HabitTrackerPage'
import UangJajanTrackerPage from './pages/UangJajanTrackerPage'
import FinancialToolsPage from './pages/FinancialToolsPage'
import RandomToolsPage from './pages/RandomToolsPage'
import ApiTestPage from './pages/ApiTestPage'
import SocialDownloaderPage from './pages/SocialDownloaderPage'

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
      {
        path: 'habit-tracker',
        element: <HabitTrackerPage />
      },
      {
        path: 'financial',
        element: <FinancialToolsPage />
      },
      {
        path: 'uang-jajan-tracker',
        element: <UangJajanTrackerPage />
      },
      {
        path: 'random',
        element: <RandomToolsPage />
      },
      {
        path: 'api-test',
        element: <ApiTestPage />
      },
      {
        path: 'social-tools',
        element: <SocialDownloaderPage />
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
