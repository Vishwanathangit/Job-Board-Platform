import React from 'react'
import { useState, useEffect } from 'react'
import { applicationsAPI } from '../../services/api'
import { toast } from 'react-hot-toast'
import Spinner from '../ui/Spinner'
import { Link, useNavigate } from 'react-router-dom'
import { Briefcase, Clock, Check, X } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

const CandidateDashboard = () => {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)

  const { user, isAuthenticated } = useAuth()

  const navigate = useNavigate()
  
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true)
        const response = await applicationsAPI.getByUser(user.id)
        setApplications(response.data.applications)
      } catch (error) {
        console.log('Failed to fetch applications: ', error)
      } finally {
        setLoading(false)
      }
    }

    fetchApplications()
  }, [])

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />
      case 'accepted':
        return <Check className="h-4 w-4 text-green-500" />
      case 'rejected':
        return <X className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-yellow-500" />
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="lg" />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Candidate Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-gray-500">Total Applications</h3>
            <p className="text-3xl font-bold">{applications.length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-gray-500">Pending</h3>
            <p className="text-3xl font-bold">
              {applications.filter(app => app.status === 'pending').length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-gray-500">Accepted</h3>
            <p className="text-3xl font-bold">
              {applications.filter(app => app.status === 'accepted').length}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Your Applications</h2>
        {applications.length > 0 ? (
          <div className="space-y-4">
            
            {applications.map(application => (
              <div key={application.id} className="border-b pb-4 last:border-b-0">
                <div className="flex justify-between items-start">
                  <div>
                    <div
                      onClick={() => navigate(`/jobs/${application.job.id}`, { state: { application: application } })}
                      className="font-medium text-blue-600 hover:text-blue-800"
                    >
                      {application.job.title}
                    </div>
                    <p className="text-sm text-gray-600">
                      {application.job.company}
                    </p>
                    <p className="text-sm mt-2 text-gray-700 line-clamp-2">
                      {application.coverLetter}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(application.status)}
                    <span className="text-sm capitalize">{application.status}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-gray-500">
                    Applied on {new Date(application.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Briefcase className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">
              No applications yet
            </h3>
            <p className="mt-1 text-gray-500">
              Browse <Link to="/jobs" className="text-blue-600">jobs</Link> and apply to get started
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default CandidateDashboard