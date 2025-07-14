// import React from 'react'
// import { useState, useEffect } from 'react'
// import { usersAPI, jobsAPI } from '../../services/api'
// import { toast } from 'react-hot-toast'
// import Button from '../ui/Button'
// import Spinner from '../ui/Spinner'

// const AdminDashboard = () => {
//   const [users, setUsers] = useState([])
//   const [jobs, setJobs] = useState([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true)
//         const [usersRes, jobsRes] = await Promise.all([
//           usersAPI.getAll(),
//           jobsAPI.getAll()
//         ])
//         setUsers(usersRes.data.users)
//         setJobs(jobsRes.data.jobs)
//       } catch (error) {
//         toast.error('Failed to fetch dashboard data')
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchData()
//   }, [])

//   const handleApproveJob = async (jobId) => {
//     try {
//       await jobsAPI.approve(jobId)
//       setJobs(jobs.map(job => 
//         job._id === jobId ? { ...job, status: 'approved' } : job
//       ))
//       toast.success('Job approved successfully')
//     } catch (error) {
//       toast.error('Failed to approve job')
//     }
//   }

//   const handleDeleteUser = async (userId) => {
//     try {
//       await usersAPI.delete(userId)
//       setUsers(users.filter(user => user._id !== userId))
//       toast.success('User deleted successfully')
//     } catch (error) {
//       toast.error('Failed to delete user')
//     }
//   }

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <Spinner size="lg" />
//       </div>
//     )
//   }

//   return (
//     <div className="space-y-8">
//       <div>
//         <h1 className="text-2xl font-bold text-gray-900 mb-4">Admin Dashboard</h1>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//           <div className="bg-white p-4 rounded-lg shadow">
//             <h3 className="text-gray-500">Total Users</h3>
//             <p className="text-3xl font-bold">{users.length}</p>
//           </div>
//           <div className="bg-white p-4 rounded-lg shadow">
//             <h3 className="text-gray-500">Total Jobs</h3>
//             <p className="text-3xl font-bold">{jobs.length}</p>
//           </div>
//           <div className="bg-white p-4 rounded-lg shadow">
//             <h3 className="text-gray-500">Pending Jobs</h3>
//             <p className="text-3xl font-bold">
//               {jobs.filter(job => job.status === 'pending').length}
//             </p>
//           </div>
//         </div>
//       </div>

//       <div className="bg-white shadow rounded-lg p-6">
//         <h2 className="text-xl font-semibold mb-4">Pending Jobs</h2>
//         {jobs.filter(job => job.status === 'pending').length > 0 ? (
//           <div className="space-y-4">
//             {jobs
//               .filter(job => job.status === 'pending')
//               .map(job => (
//                 <div key={job._id} className="border-b pb-4 last:border-b-0">
//                   <div className="flex justify-between items-center">
//                     <div>
//                       <h3 className="font-medium">{job.title}</h3>
//                       <p className="text-sm text-gray-600">{job.company}</p>
//                     </div>
//                     <Button
//                       size="sm"
//                       onClick={() => handleApproveJob(job._id)}
//                     >
//                       Approve
//                     </Button>
//                   </div>
//                 </div>
//               ))}
//           </div>
//         ) : (
//           <p className="text-gray-500">No pending jobs</p>
//         )}
//       </div>

//       <div className="bg-white shadow rounded-lg p-6">
//         <h2 className="text-xl font-semibold mb-4">All Users</h2>
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Name
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Email
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Role
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {users.map(user => (
//                 <tr key={user._id}>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm font-medium text-gray-900">
//                       {user.name}
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm text-gray-500">{user.email}</div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
//                       {user.role}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                     <button
//                       onClick={() => handleDeleteUser(user._id)}
//                       className="text-red-600 hover:text-red-900"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default AdminDashboard