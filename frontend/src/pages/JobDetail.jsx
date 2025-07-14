import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { jobsAPI, applicationsAPI } from '../services/api'
import { useAuth } from '../context/AuthContext'
import JobDetails from '../components/job/JobDetails'
import { toast } from 'react-hot-toast'
import Spinner from '../components/ui/Spinner'

const JobDetail = () => {
  const { id } = useParams()
  const { user, isAuthenticated } = useAuth()
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [hasApplied, setHasApplied] = useState(false)

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true)
        const response = await jobsAPI.getById(id)
        setJob(response.data.job)
      } catch (error) {
        toast.error('Failed to fetch job details')
      } finally {
        setLoading(false)
      }
    }

    const checkApplication = async () => {
      if (isAuthenticated && user?.role === 'candidate') {
        try {
          const response = await applicationsAPI.getByUser(user._id)
          const hasApplied = response.data.applications.some(
            (app) => app.job._id === id
          )
          setHasApplied(hasApplied)
        } catch (error) {
          console.error('Failed to check application:', error)
        }
      }
    }

    fetchJob()
    checkApplication()
  }, [id, isAuthenticated, user])

  const handleApply = async (job) => {
    if (!isAuthenticated) {
      toast.error('Please login to apply for jobs')
      return
    }

    if (user?.role !== 'candidate') {
      toast.error('Only candidates can apply for jobs')
      return
    }

    if (hasApplied) {
      toast.error('You have already applied for this job')
      return
    }

    try {
      await applicationsAPI.create({
        job: job._id,
        coverLetter: `I'm interested in the ${job.title} position at ${job.company}`
      })
      setHasApplied(true)
      toast.success('Application submitted successfully!')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit application')
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="lg" />
      </div>
    )
  }

  if (!job) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Job not found</h1>
      </div>
    )
  }

  return (
    <JobDetails
      job={job}
      onApply={handleApply}
      canApply={isAuthenticated && user?.role === 'candidate'}
      hasApplied={hasApplied}
    />
  )
}

export default JobDetail