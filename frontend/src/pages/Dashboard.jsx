import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'
// import AdminDashboard from '../components/dashboard/AdminDashboard'
import EmployerDashboard from '../components/dashboard/EmployerDashboard'
import CandidateDashboard from '../components/dashboard/CandidateDashboard'
import Spinner from '../components/ui/Spinner'

const Dashboard = () => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="lg" />
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {user.role === 'admin' && <AdminDashboard />}
      {user.role === 'employer' && <EmployerDashboard />}
      {user.role === 'candidate' && <CandidateDashboard />}
    </div>
  )
}

export default Dashboard


