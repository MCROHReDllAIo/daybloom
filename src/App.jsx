import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import RequireAuth from './components/RequireAuth'
import Home from './pages/Home'
import Timetable from './pages/Timetable'
import TrainingHub from './pages/TrainingHub'
import TrainingSession from './pages/TrainingSession'
import LearningPlan from './pages/LearningPlan'
import Progress from './pages/Progress'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Signup from './pages/Signup'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route
          path="/timetable"
          element={
            <RequireAuth>
              <Timetable />
            </RequireAuth>
          }
        />
        <Route
          path="/training"
          element={
            <RequireAuth>
              <TrainingHub />
            </RequireAuth>
          }
        />
        <Route
          path="/training/:categoryId"
          element={
            <RequireAuth>
              <TrainingSession />
            </RequireAuth>
          }
        />
        <Route
          path="/plan"
          element={
            <RequireAuth>
              <LearningPlan />
            </RequireAuth>
          }
        />
        <Route
          path="/progress"
          element={
            <RequireAuth>
              <Progress />
            </RequireAuth>
          }
        />
        <Route
          path="/profile"
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
