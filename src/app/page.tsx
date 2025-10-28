'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import {
  DocumentCheckIcon,
  ClipboardDocumentListIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
} from '@heroicons/react/24/outline'

export default function DashboardPage() {
  const stats = [
    {
      name: 'Total Certificates',
      value: '2,847',
      change: '+12.5%',
      trend: 'up',
      icon: DocumentCheckIcon,
      color: 'blue',
    },
    {
      name: 'Pending Enrollments',
      value: '23',
      change: '-4.3%',
      trend: 'down',
      icon: ClipboardDocumentListIcon,
      color: 'yellow',
    },
    {
      name: 'Expiring Soon',
      value: '47',
      change: '+8.2%',
      trend: 'up',
      icon: ExclamationTriangleIcon,
      color: 'red',
    },
    {
      name: 'Active Users',
      value: '156',
      change: '+2.4%',
      trend: 'up',
      icon: CheckCircleIcon,
      color: 'green',
    },
  ]

  const recentActivity = [
    { action: 'Certificate issued', target: 'app.example.com', user: 'john@example.com', time: '2 minutes ago', status: 'success' },
    { action: 'Enrollment approved', target: 'api.partner.org', user: 'admin@gigvault.io', time: '15 minutes ago', status: 'success' },
    { action: 'Certificate revoked', target: 'old.service.io', user: 'security@gigvault.io', time: '1 hour ago', status: 'danger' },
    { action: 'User added', target: 'jane@example.com', user: 'admin@gigvault.io', time: '2 hours ago', status: 'info' },
  ]

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Welcome back! Here's what's happening with your PKI infrastructure.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((stat) => (
          <Card key={stat.name} hover className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className={`
                  p-3 rounded-lg
                  ${stat.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/30' : ''}
                  ${stat.color === 'yellow' ? 'bg-yellow-100 dark:bg-yellow-900/30' : ''}
                  ${stat.color === 'red' ? 'bg-red-100 dark:bg-red-900/30' : ''}
                  ${stat.color === 'green' ? 'bg-green-100 dark:bg-green-900/30' : ''}
                `}>
                  <stat.icon className={`
                    h-6 w-6
                    ${stat.color === 'blue' ? 'text-blue-600 dark:text-blue-400' : ''}
                    ${stat.color === 'yellow' ? 'text-yellow-600 dark:text-yellow-400' : ''}
                    ${stat.color === 'red' ? 'text-red-600 dark:text-red-400' : ''}
                    ${stat.color === 'green' ? 'text-green-600 dark:text-green-400' : ''}
                  `} />
                </div>
                <div className="flex items-center text-sm">
                  {stat.trend === 'up' ? (
                    <ArrowTrendingUpIcon className="h-4 w-4 text-green-500 mr-1" />
                  ) : (
                    <ArrowTrendingDownIcon className="h-4 w-4 text-red-500 mr-1" />
                  )}
                  <span className={stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}>
                    {stat.change}
                  </span>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{stat.name}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Action
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Target
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {recentActivity.map((activity, index) => (
                  <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                      {activity.action}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                      {activity.target}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                      {activity.user}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {activity.time}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={activity.status as any}>
                        {activity.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
