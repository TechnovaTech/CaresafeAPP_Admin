'use client'

import { useState } from 'react'
import { FileText, Download, Filter, Search } from 'lucide-react'

const systemLogs = [
  {
    id: '1',
    timestamp: '2024-01-15 10:30:25',
    level: 'INFO',
    module: 'SOS_SERVICE',
    message: 'SOS alert processed successfully for user ID: 12345',
    userId: '12345'
  },
  {
    id: '2',
    timestamp: '2024-01-15 10:29:15',
    level: 'ERROR',
    module: 'NOTIFICATION_SERVICE',
    message: 'Failed to send push notification to device: timeout error',
    userId: '67890'
  },
  {
    id: '3',
    timestamp: '2024-01-15 10:28:45',
    level: 'WARN',
    module: 'AUTH_SERVICE',
    message: 'Multiple failed login attempts detected for user: john.doe@email.com',
    userId: '11111'
  },
  {
    id: '4',
    timestamp: '2024-01-15 10:27:30',
    level: 'INFO',
    module: 'DOCTOR_SERVICE',
    message: 'Doctor verification completed for registration: MD-12345',
    userId: '22222'
  },
  {
    id: '5',
    timestamp: '2024-01-15 10:26:10',
    level: 'ERROR',
    module: 'DATABASE',
    message: 'Connection timeout while updating user profile',
    userId: '33333'
  },
  {
    id: '6',
    timestamp: '2024-01-15 10:25:00',
    level: 'INFO',
    module: 'CALL_SERVICE',
    message: 'Emergency call initiated successfully',
    userId: '44444'
  }
]

const auditLogs = [
  {
    id: '1',
    timestamp: '2024-01-15 10:30:00',
    admin: 'Admin User',
    action: 'APPROVE_DOCTOR',
    target: 'Dr. Emily Johnson',
    details: 'Doctor verification approved'
  },
  {
    id: '2',
    timestamp: '2024-01-15 10:25:00',
    admin: 'Super Admin',
    action: 'BLOCK_USER',
    target: 'Sarah Smith',
    details: 'User blocked due to spam reports'
  },
  {
    id: '3',
    timestamp: '2024-01-15 10:20:00',
    admin: 'Admin User',
    action: 'CLOSE_SOS',
    target: 'SOS-001',
    details: 'SOS case closed - false alarm'
  },
  {
    id: '4',
    timestamp: '2024-01-15 10:15:00',
    admin: 'Admin User',
    action: 'UPDATE_SETTINGS',
    target: 'System Settings',
    details: 'Updated SOS response timeout to 5 minutes'
  }
]

const getLevelColor = (level: string) => {
  switch (level) {
    case 'ERROR': return 'bg-danger text-white'
    case 'WARN': return 'bg-yellow-500 text-white'
    case 'INFO': return 'bg-blue-500 text-white'
    case 'DEBUG': return 'bg-gray-500 text-white'
    default: return 'bg-gray-500 text-white'
  }
}

export default function LogsPage() {
  const [activeTab, setActiveTab] = useState('system')
  const [searchTerm, setSearchTerm] = useState('')
  const [levelFilter, setLevelFilter] = useState('All')

  const filteredSystemLogs = systemLogs.filter(log => {
    const matchesSearch = log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.module.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLevel = levelFilter === 'All' || log.level === levelFilter
    return matchesSearch && matchesLevel
  })

  const filteredAuditLogs = auditLogs.filter(log => {
    const matchesSearch = log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.target.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.admin.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  const handleExportLogs = () => {
    alert('Logs exported successfully!')
  }

  return (
    <div className="space-y-6">
      {/* Header with Search and Export */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            
            {activeTab === 'system' && (
              <select
                value={levelFilter}
                onChange={(e) => setLevelFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="All">All Levels</option>
                <option value="ERROR">Error</option>
                <option value="WARN">Warning</option>
                <option value="INFO">Info</option>
                <option value="DEBUG">Debug</option>
              </select>
            )}
          </div>
          
          <button
            onClick={handleExportLogs}
            className="bg-primary text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Download className="h-4 w-4" />
            <span>Export Logs</span>
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('system')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'system'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <FileText className="h-4 w-4" />
                <span>System Logs</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('audit')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'audit'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <FileText className="h-4 w-4" />
                <span>Audit Logs</span>
              </div>
            </button>
          </nav>
        </div>

        {/* System Logs */}
        {activeTab === 'system' && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-primary text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase">Timestamp</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase">Level</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase">Module</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase">Message</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase">User ID</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredSystemLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">
                      {log.timestamp}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getLevelColor(log.level)}`}>
                        {log.level}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {log.module}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 max-w-md">
                      {log.message}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {log.userId}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Audit Logs */}
        {activeTab === 'audit' && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-primary text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase">Timestamp</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase">Admin</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase">Action</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase">Target</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase">Details</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAuditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">
                      {log.timestamp}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {log.admin}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                        {log.action}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {log.target}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 max-w-md">
                      {log.details}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}