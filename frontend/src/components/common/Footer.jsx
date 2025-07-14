import React from 'react'
import { Briefcase } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Briefcase className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">JobBoard</span>
            </div>
            <p className="text-gray-400 mb-4">
              Connect talented professionals with amazing opportunities. 
              Find your dream job or hire the best candidates.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">For Job Seekers</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/jobs" className="hover:text-white transition-colors">Browse Jobs</a></li>
              <li><a href="/register" className="hover:text-white transition-colors">Create Account</a></li>
              <li><a href="/dashboard" className="hover:text-white transition-colors">My Applications</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">For Employers</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/register" className="hover:text-white transition-colors">Post a Job</a></li>
              <li><a href="/dashboard" className="hover:text-white transition-colors">Manage Jobs</a></li>
              <li><a href="/dashboard" className="hover:text-white transition-colors">View Applications</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 JobBoard. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer