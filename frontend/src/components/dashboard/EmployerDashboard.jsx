import React from 'react'
import { useState, useEffect } from 'react'
import { jobsAPI, applicationsAPI } from '../../services/api'
import { toast } from 'react-hot-toast'
import Button from '../ui/Button'
import Spinner from '../ui/Spinner'
import Modal from '../ui/Modal'
import JobForm from '../job/JobForm'

const EmployerDashboard = () => {
  const [jobs, setJobs] = useState([])
  // const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [showJobForm, setShowJobForm] = useState(false)
  const [editingJob, setEditingJob] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [jobsRes, appsRes] = await Promise.all([
          jobsAPI.getAll(),
          // applicationsAPI.getByJob()
        ])
        setJobs(jobsRes.data.jobs)
        // setApplications(appsRes.data.applications)
      } catch (error) {
        toast.error('Failed to fetch dashboard data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleCreateJob = async (jobData) => {
    try {
      const response = await jobsAPI.create(jobData)
      setJobs([...jobs, response.data.job])
      setShowJobForm(false)
      toast.success('Job created successfully!')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create job')
    }
  }

  const handleUpdateJob = async (jobData) => {
    try {
      const response = await jobsAPI.update(editingJob.id, jobData)
      setJobs(jobs.map(job => 
        job.id === editingJob.id ? response.data.job : job
      ))
      setEditingJob(null)
      setShowJobForm(false)
      toast.success('Job updated successfully!')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update job')
    }
  }

  const handleDeleteJob = async (jobId) => {
    try {
      await jobsAPI.delete(jobId)
      setJobs(jobs.filter(job => job.id !== jobId))
      toast.success('Job deleted successfully!')
    } catch (error) {
      toast.error('Failed to delete job')
    }
  }

  const handleEditJob = (job) => {
    setEditingJob(job)
    setShowJobForm(true)
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
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Employer Dashboard</h1>
        <Button onClick={() => setShowJobForm(true)}>
          Post New Job
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500">Total Jobs</h3>
          <p className="text-3xl font-bold">{jobs.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500">Active Jobs</h3>
          <p className="text-3xl font-bold">
            {jobs.filter(job => job.status === 'approved').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500">Total Applications</h3>
          {/* <p className="text-3xl font-bold">{applications.length}</p> */}
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Your Jobs</h2>
        {jobs.length > 0 ? (
          <div className="space-y-4">
            {jobs.map(job => (
              <div key={job.id} className="border-b pb-4 last:border-b-0">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">{job.title}</h3>
                    <p className="text-sm text-gray-600">
                      {job.company} • {job.status}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditJob(job)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDeleteJob(job.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">You haven't posted any jobs yet</p>
        )}
      </div>

      <Modal
        isOpen={showJobForm}
        onClose={() => {
          setShowJobForm(false)
          setEditingJob(null)
        }}
        title={editingJob ? 'Edit Job' : 'Post New Job'}
        size="lg"
      >
        <JobForm
          job={editingJob}
          onSubmit={editingJob ? handleUpdateJob : handleCreateJob}
        />
      </Modal>
    </div>
  )
}

export default EmployerDashboard