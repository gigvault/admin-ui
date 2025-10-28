'use client'

import { useEffect, useState } from 'react'

interface Certificate {
  id: number
  serial: string
  subject_cn: string
  not_after: string
  revoked: boolean
}

export function RecentCertificates() {
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const response = await fetch('/api/certificates?limit=10&sort=desc', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        })
        
        if (!response.ok) {
          throw new Error('Failed to fetch certificates')
        }
        
        const data = await response.json()
        setCertificates(data)
      } catch (error) {
        console.error('Error fetching certificates:', error)
        // Set empty array on error
        setCertificates([])
      } finally {
        setLoading(false)
      }
    }

    fetchCertificates()
  }, [])

  if (loading) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Certificates</h2>
        <div className="animate-pulse space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-16 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">Recent Certificates</h2>
      </div>
      <ul className="divide-y divide-gray-200">
        {certificates.map((cert) => (
          <li key={cert.id} className="px-6 py-4 hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {cert.subject_cn}
                </p>
                <p className="text-sm text-gray-500">
                  Serial: {cert.serial} • Expires: {cert.not_after}
                </p>
              </div>
              <div className="ml-4">
                {cert.revoked ? (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    Revoked
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Active
                  </span>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="px-6 py-4 border-t border-gray-200">
        <a href="/certificates" className="text-sm font-medium text-blue-600 hover:text-blue-500">
          View all certificates →
        </a>
      </div>
    </div>
  )
}

