import React from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Briefcase, DollarSign, CheckCircle } from 'lucide-react'
import Button from '../ui/Button'

const JobCard = ({ job, onApply, showApplyButton, applied }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
          <p className="text-gray-600">{job.company}</p>
        </div>
        {applied && (
          <div className="flex items-center text-green-600">
            <CheckCircle className="h-5 w-5 mr-1" />
            <span>Applied</span>
          </div>
        )}
      </div>
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-gray-600">
          <MapPin className="h-4 w-4 mr-2" />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Briefcase className="h-4 w-4 mr-2" />
          <span>{job.jobType}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <DollarSign className="h-4 w-4 mr-2" />
          <span>₹{job.salary.toLocaleString()}</span>
        </div>
      </div>
      <p className="text-gray-600 mb-4 line-clamp-2">{job.description}</p>
      <div className="flex justify-between items-center">
        <Link
          to={`/jobs/${job.id}`}
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          View Details
        </Link>
        {showApplyButton && (
          <Button
            onClick={() => onApply(job)}
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            Apply Now
          </Button>
        )}
      </div>
    </div>
  )
}

export default JobCard