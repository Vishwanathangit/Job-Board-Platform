import React, { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'
import { jobsAPI, applicationsAPI } from '../services/api'
import JobCard from '../components/job/JobCard'
import JobFilters from '../components/job/JobFilters'
import Modal from '../components/ui/Modal'
import Button from '../components/ui/Button'
import Spinner from '../components/ui/Spinner'

const Jobs = () => {
  const { user, isAuthenticated } = useAuth()
  console.log('User:', user?.id)

  const [allJobs, setAllJobs] = useState([])       
  const [jobs, setJobs] = useState([])              
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    search: '',
    location: '',
    jobType: '',
    salaryRange: ''
  })
  const [selectedJob, setSelectedJob] = useState(null)
  const [showApplicationModal, setShowApplicationModal] = useState(false)
  const [coverLetter, setCoverLetter] = useState('')
  const [applying, setApplying] = useState(false)
  const [appliedJobs, setAppliedJobs] = useState(new Set())

  useEffect(() => {
    fetchJobs()
    if (isAuthenticated && user?.role === 'candidate') {
      fetchUserApplications()
    }
  }, [isAuthenticated, user])

  useEffect(() => {
    if (!loading) {
      applyLocalFilters()
    }
  }, [filters, allJobs, loading])

  const fetchJobs = async () => {
    try {
      setLoading(true)
      const response = await jobsAPI.getAll()
      setAllJobs(response.data.jobs.reverse())
      setJobs(response.data.jobs.reverse())
    } catch (error) {
      console.log('Failed to fetch jobs: ', error)
    } finally {
      setLoading(false)
    }
  }

  const applyLocalFilters = () => {
    const filtered = allJobs.filter((job) => {
      const matchesSearch = filters.search
        ? job.title.toLowerCase().includes(filters.search.toLowerCase())
        : true

      const matchesLocation = filters.location
        ? job.location.toLowerCase().includes(filters.location.toLowerCase())
        : true

      const matchesJobType = filters.jobType
        ? job.jobType.toLowerCase() === filters.jobType.toLowerCase()
        : true

      const matchesSalary = filters.salaryRange
        ? job.salary >= parseInt(filters.salaryRange)
        : true

      return matchesSearch && matchesLocation && matchesJobType && matchesSalary
    })

    setJobs(filtered.reverse())
  }

  const fetchUserApplications = async () => {
    try {
      const response = await applicationsAPI.getByUser(user.id)
      const jobIds = new Set(response.data.applications.map(app => app.job.id))
      setAppliedJobs(jobIds)
    } catch (error) {
      console.error('Failed to fetch user applications:', error)
    }
  }

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters)
  }

  const handleClearFilters = () => {
    setFilters({
      search: '',
      location: '',
      jobType: '',
      salaryRange: ''
    })
  }

  const handleApply = (job) => {
    if (!isAuthenticated) {
      toast.error('Please login to apply for jobs')
      return
    }

    if (user?.role !== 'candidate') {
      toast.error('Only candidates can apply for jobs')
      return
    }

    if (appliedJobs.has(job._id)) {
      toast.error('You have already applied for this job')
      return
    }

    setSelectedJob(job)
    setShowApplicationModal(true)
  }

  const handleSubmitApplication = async () => {
    if (!coverLetter.trim()) {
      toast.error('Please write a cover letter')
      return
    }

    try {
      setApplying(true)
      await applicationsAPI.create({
        job: selectedJob.id,
        coverLetter: coverLetter.trim()
      })

      setAppliedJobs(prev => new Set([...prev, selectedJob.id]))
      setShowApplicationModal(false)
      setCoverLetter('')
      setSelectedJob(null)
      toast.success('Application submitted successfully!')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit application')
    } finally {
      setApplying(false)
    }
  }

  const handleCloseModal = () => {
    setShowApplicationModal(false)
    setCoverLetter('')
    setSelectedJob(null)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Jobs</h1>
        <p className="text-gray-600">
          Discover your next career opportunity from thousands of job listings.
        </p>
      </div>

      <JobFilters
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onClear={handleClearFilters}
      />

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <Spinner size="lg" />
        </div>
      ) : (
        <>
          <div className="mb-6">
            <p className="text-gray-600">
              {jobs.filter((element) =>element.userId != user?.id).length} job{jobs.length !== 1 ? 's' : ''} found
            </p>
          </div>

          {jobs.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-500 mb-4">
                <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <h3 className="mt-2 text-lg font-medium text-gray-900">No jobs found</h3>
                <p className="mt-1 text-gray-500">Try adjusting your search filters</p>
              </div>
              <Button variant="outline" onClick={handleClearFilters}>
                Clear all filters
              </Button>
            </div>
          ) : (

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.filter((element) =>element.userId != user?.id).map(job => (
                <JobCard
                  key={job.id}
                  job={job}
                  onApply={handleApply}
                  showApplyButton={appliedJobs.has(job.id) ? false : true}
                  applied={appliedJobs.has(job.id)}
                />
              ))}
            </div>
          )}
        </>
      )}

      <Modal
        isOpen={showApplicationModal}
        onClose={handleCloseModal}
        title={`Apply for ${selectedJob?.title}`}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cover Letter
            </label>
            <textarea
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              rows={8}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Explain why you're a good fit for this position..."
            />
          </div>
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={handleCloseModal} disabled={applying}>
              Cancel
            </Button>
            <Button onClick={handleSubmitApplication} loading={applying}>
              Submit Application
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default Jobs
