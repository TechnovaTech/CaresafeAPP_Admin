'use client'

import { AlertTriangle, Users, UserCheck, Clock } from 'lucide-react'

const stats = [
  { name: 'Active SOS', value: '12', icon: AlertTriangle, color: 'text-danger' },
  { name: 'Total Users', value: '2,847', icon: Users, color: 'text-primary' },
  { name: 'Doctors Pending', value: '8', icon: UserCheck, color: 'text-yellow-600' },
  { name: 'Avg Response Time', value: '2.3 min', icon: Clock, color: 'text-success' },
]

const recentSOS = [
  { id: '1', patient: 'John Doe', trigger: 'Fall', time: '2 min ago', status: 'Open' },
  { id: '2', patient: 'Sarah Smith', trigger: 'Voice', time: '5 min ago', status: 'In Progress' },
  { id: '3', patient: 'Mike Johnson', trigger: 'Manual', time: '12 min ago', status: 'Closed' },
  { id: '4', patient: 'Emma Wilson', trigger: 'Fall', time: '18 min ago', status: 'Open' },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Open': return 'bg-danger text-white'
    case 'In Progress': return 'bg-yellow-500 text-white'
    case 'Closed': return 'bg-success text-white'
    default: return 'bg-gray-500 text-white'
  }
}

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.name} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Recent SOS Alerts</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Patient</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trigger</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentSOS.map((alert) => (
                <tr key={alert.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {alert.patient}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {alert.trigger}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {alert.time}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(alert.status)}`}>
                      {alert.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}