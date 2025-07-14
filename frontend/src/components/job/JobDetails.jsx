          import React from 'react'
          import { MapPin, Clock, DollarSign, Building, Calendar, Users } from 'lucide-react'
          import Button from '../ui/Button'
          import { useAuth } from '../../context/AuthContext'
          import { useLocation, useParams } from 'react-router-dom'
          
          const JobDetails = ({ job, onApply, canApply = true }) => {
            const formatSalary = (salary) => {
              return new Intl.NumberFormat('en-IN', {
                style: 'currency',
                currency: 'INR',
                maximumFractionDigits: 0
              }).format(salary)
            }
          
            const formatJobType = (type) => {
              return type.split('-').map(word => 
                word.charAt(0).toUpperCase() + word.slice(1)
              ).join(' ')
            }
          
            const { user } = useAuth()
            const { id } = useParams()
            const location = useLocation()
          
            const hasApplied = (location?.state?.application?.jobId === id && location?.state?.application?.userId === user?.id) || location?.state?.applied;
          
            return (
              <div className="bg-white rounded-lg shadow-md p-8">
                <div className="mb-8">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
                      <div className="flex items-center text-xl text-gray-600">
                        <Building className="h-5 w-5 mr-2" />
                        <span>{job.company}</span>
                      </div>
                    </div>
                    {canApply && !hasApplied && (
                      <Button size="lg" onClick={() => onApply(job)}>
                        Apply Now
                      </Button>
                    )}
                    {hasApplied && (
                      <Button size="lg" variant="secondary" disabled>
                        Applied
                      </Button>
                    )}
                  </div>
          
                  <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 mr-2" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 mr-2" />
                      <span>{formatJobType(job.jobType)}</span>
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="h-5 w-5 mr-2" />
                      <span>{formatSalary(job.salary)}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 mr-2" />
                      <span>Posted {new Date(job.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
          
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <section className="mb-8">
                      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Job Description</h2>
                      <div className="prose prose-blue max-w-none">
                        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                          {job.description}
                        </p>
                      </div>
                    </section>
          
                    <section className="mb-8">
                      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Requirements</h2>
                      <div className="prose prose-blue max-w-none">
                        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                          {job.requirements}
                        </p>
                      </div>
                    </section>
                  </div>
          
                  <div className="lg:col-span-1">
                    <div className="bg-gray-50 rounded-lg p-6 sticky top-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Summary</h3>
                      <div className="space-y-4">
                        <div>
                          <span className="text-sm font-medium text-gray-500">Company</span>
                          <p className="text-gray-900">{job.company}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-500">Location</span>
                          <p className="text-gray-900">{job.location}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-500">Job Type</span>
                          <p className="text-gray-900">{formatJobType(job.jobType)}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-500">Salary</span>
                          <p className="text-gray-900">{formatSalary(job.salary)}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-500">Posted</span>
                          <p className="text-gray-900">{new Date(job.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
          
                      {canApply && !hasApplied && (
                        <Button 
                          className="w-full mt-6" 
                          onClick={() => onApply(job)}
                        >
                          Apply for this Job
                        </Button>
                      )}
                      {hasApplied && (
                        <Button 
                          className="w-full mt-6" 
                          variant="secondary" 
                          disabled
                        >
                          Application Submitted
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          }
          
          export default JobDetails