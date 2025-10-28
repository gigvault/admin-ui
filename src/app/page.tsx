'use client'

import { useEffect, useState } from 'react'
import { DashboardStats } from '@/components/DashboardStats'
import { RecentCertificates } from '@/components/RecentCertificates'
import { PendingEnrollments } from '@/components/PendingEnrollments'

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalCertificates: 0,
    activeCertificates: 0,
    revokedCertificates: 0,
    pendingEnrollments: 0,
  })

  useEffect(() => {
    // TODO: Fetch real stats from API
    setStats({
      totalCertificates: 1247,
      activeCertificates: 1198,
      revokedCertificates: 49,
      pendingEnrollments: 12,
    })
  }, [])

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-sm text-gray-700">
            Overview of your GigVault PKI infrastructure
          </p>
        </div>
      </div>

      <DashboardStats stats={stats} />
      
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RecentCertificates />
        <PendingEnrollments />
      </div>
    </div>
  )
}

