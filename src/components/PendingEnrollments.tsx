'use client'

import { useEffect, useState } from 'react'

interface Enrollment {
  id: string
  common_name: string
  organization: string
  email: string
  status: string
  created_at: string
}

export function PendingEnrollments() {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // TODO: Fetch from real API
    setTimeout(() => {
      setEnrollments([
        { 
          id: '1', 
          common_name: 'app.newclient.com', 
          organization: 'New Client Inc',
          email: 'admin@newclient.com',
          status: 'pending',
          created_at: '2025-10-28T10:30:00Z'
        },
        { 
          id: '2', 
          common_name: 'api.partner.org', 
          organization: 'Partner Org',
          email: 'ops@partner.org',
          status: 'pending',
          created_at: '2025-10-28T09:15:00Z'
        },
        { 
          id: '3', 
          common_name: 'secure.customer.io', 
          organization: 'Customer LLC',
          email: 'security@customer.io',
          status: 'pending',
          created_at: '2025-10-27T16:45:00Z'
        },
      ])
      setLoading(false)
    }, 500)
  }, [])

  const handleApprove = (id: string) => {
    // TODO: Call API to approve
    console.log('Approving enrollment:', id)
    alert(`Approving enrollment ${id}`)
  }

  const handleReject = (id: string) => {
    // TODO: Call API to reject
    console.log('Rejecting enrollment:', id)
    alert(`Rejecting enrollment ${id}`)
  }

  if (loading) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Pending Enrollments</h2>
        <div className="animate-pulse space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">Pending Enrollments</h2>
      </div>
      <ul className="divide-y divide-gray-200">
        {enrollments.map((enrollment) => (
          <li key={enrollment.id} className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {enrollment.common_name}
                </p>
                <p className="text-sm text-gray-500">
                  {enrollment.organization} • {enrollment.email}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Requested: {new Date(enrollment.created_at).toLocaleString()}
                </p>
              </div>
              <div className="ml-4 flex space-x-2">
                <button
                  onClick={() => handleApprove(enrollment.id)}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleReject(enrollment.id)}
                  className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Reject
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="px-6 py-4 border-t border-gray-200">
        <a href="/enrollments" className="text-sm font-medium text-blue-600 hover:text-blue-500">
          View all enrollments →
        </a>
      </div>
    </div>
  )
}

