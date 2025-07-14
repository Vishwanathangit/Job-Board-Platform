import React from 'react'
import { Link } from 'react-router-dom'
import { Search, Briefcase, Users, TrendingUp, ArrowRight } from 'lucide-react'
import Button from '../components/ui/Button'

const Home = () => {
  const features = [
    {
      icon: <Search className="h-8 w-8 text-blue-600" />,
      title: "Smart Job Search",
      description: "Find the perfect job with our advanced search filters and personalized recommendations."
    },
    {
      icon: <Briefcase className="h-8 w-8 text-blue-600" />,
      title: "Quality Opportunities",
      description: "Access curated job listings from top companies across various industries."
    },
    {
      icon: <Users className="h-8 w-8 text-blue-600" />,
      title: "Connect with Employers",
      description: "Build meaningful connections with hiring managers and recruiters."
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-blue-600" />,
      title: "Career Growth",
      description: "Take the next step in your career with opportunities that match your aspirations."
    }
  ]

  const stats = [
    { number: "10,000+", label: "Active Jobs" },
    { number: "5,000+", label: "Companies" },
    { number: "50,000+", label: "Job Seekers" },
    { number: "95%", label: "Success Rate" }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Find Your Dream Job
              <span className="block text-blue-200">Today</span>
            </h1>
            <p className="text-xl sm:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Connect with top employers and discover opportunities that match your skills and aspirations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/jobs">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 min-w-[200px]">
                  Browse Jobs
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/register">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-blue-600 min-w-[200px]"
                >
                  Post a Job
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Choose JobBoard?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're dedicated to connecting talented professionals with amazing opportunities.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have found their perfect job through our platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-gray-100 min-w-[200px]"
              >
                Create Account
              </Button>
            </Link>
            <Link to="/jobs">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-blue-600 min-w-[200px]"
              >
                Explore Jobs
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home