import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import { useApp } from '../context/AppContext'

export default function Layout() {
  const { toast } = useApp()

  return (
    <div className="app-shell">
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
      {toast && (
        <div className={`toast ${toast.type || 'success'}`} role="status">
          {toast.message}
        </div>
      )}
    </div>
  )
}
