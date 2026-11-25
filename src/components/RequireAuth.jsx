import { Navigate, useLocation } from 'react-router-dom'
import { useApp } from '../context/AppContext'

export default function RequireAuth({ children }) {
  const { isLoggedIn } = useApp()
  const location = useLocation()
  if (!isLoggedIn) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }
  return children
}
