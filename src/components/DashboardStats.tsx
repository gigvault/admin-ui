interface StatsProps {
  stats: {
    totalCertificates: number
    activeCertificates: number
    revokedCertificates: number
    pendingEnrollments: number
  }
}

export function DashboardStats({ stats }: StatsProps) {
  const statItems = [
    { 
      name: 'Total Certificates', 
      value: stats.totalCertificates,
      icon: '📜',
      color: 'blue'
    },
    { 
      name: 'Active Certificates', 
      value: stats.activeCertificates,
      icon: '✅',
      color: 'green'
    },
    { 
      name: 'Revoked Certificates', 
      value: stats.revokedCertificates,
      icon: '⛔',
      color: 'red'
    },
    { 
      name: 'Pending Enrollments', 
      value: stats.pendingEnrollments,
      icon: '⏳',
      color: 'yellow'
    },
  ]

  return (
    <div className="mt-8">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {statItems.map((item) => (
          <div
            key={item.name}
            className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <span className="text-3xl">{item.icon}</span>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {item.name}
                    </dt>
                    <dd className="flex items-baseline">
                      <div className={`text-2xl font-semibold text-${item.color}-600`}>
                        {item.value.toLocaleString()}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

