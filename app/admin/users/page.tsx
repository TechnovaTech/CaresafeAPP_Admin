'use client'

import { useState } from 'react'
import { Shield, ShieldOff, Eye, AlertTriangle, Activity, X, Search } from 'lucide-react'

const users = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@email.com',
    role: 'User',
    status: 'Active',
    joinDate: '2024-01-10',
    lastActive: '2 hours ago',
    sosCount: 3
  },
  {
    id: '2',
    name: 'Dr. Emily Johnson',
    email: 'emily.johnson@email.com',
    role: 'Doctor',
    status: 'Active',
    joinDate: '2024-01-08',
    lastActive: '1 hour ago',
    consultations: 45
  },
  {
    id: '3',
    name: 'Sarah Smith',
    email: 'sarah.smith@email.com',
    role: 'User',
    status: 'Blocked',
    joinDate: '2024-01-05',
    lastActive: '3 days ago',
    sosCount: 1
  },
  {
    id: '4',
    name: 'Admin User',
    email: 'admin@caresafe.com',
    role: 'Admin',
    status: 'Active',
    joinDate: '2024-01-01',
    lastActive: 'Online',
    adminLevel: 'Super Admin'
  }
]

const incidents = [
  { id: '1', user: 'Sarah Smith', type: 'Spam Reports', time: '2024-01-15 10:30 AM', severity: 'Medium' },
  { id: '2', user: 'John Doe', type: 'False SOS', time: '2024-01-15 09:15 AM', severity: 'Low' },
  { id: '3', user: 'Dr. Emily Johnson', type: 'Missed Consultation', time: '2024-01-14 08:45 AM', severity: 'High' }
]

const platformActivity = [
  { id: '1', activity: 'New user registration', user: 'Mike Johnson', time: '5 min ago' },
  { id: '2', activity: 'Doctor consultation completed', user: 'Dr. Emily Johnson', time: '12 min ago' },
  { id: '3', activity: 'SOS alert triggered', user: 'John Doe', time: '25 min ago' },
  { id: '4', activity: 'User profile updated', user: 'Sarah Smith', time: '1 hour ago' }
]

const getRoleColor = (role: string) => {
  switch (role) {
    case 'Admin': return 'bg-purple-500 text-white'
    case 'Doctor': return 'bg-blue-500 text-white'
    case 'User': return 'bg-gray-500 text-white'
    default: return 'bg-gray-500 text-white'
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Active': return 'bg-success text-white'
    case 'Blocked': return 'bg-danger text-white'
    default: return 'bg-gray-500 text-white'
  }
}

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'High': return 'bg-danger text-white'
    case 'Medium': return 'bg-yellow-500 text-white'
    case 'Low': return 'bg-blue-500 text-white'
    default: return 'bg-gray-500 text-white'
  }
}

export default function UsersPage() {
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [showModal, setShowModal] = useState(false)
  const [filter, setFilter] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredUsers = users
    .filter(user => filter === 'All' || user.role === filter)
    .filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.status.toLowerCase().includes(searchTerm.toLowerCase())
    )

  const handleShow = (user: any) => {
    setSelectedUser(user)
    setShowModal(true)
  }

  const handleBlockUser = () => {
    alert(`${selectedUser.name} has been ${selectedUser.status === 'Active' ? 'blocked' : 'unblocked'}!`)
    setShowModal(false)
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedUser(null)
  }

  return (
    <div className="space-y-6">
      {/* Filter Tabs */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex space-x-4">
          {['All', 'User', 'Doctor', 'Admin'].map((role) => (
            <button
              key={role}
              onClick={() => setFilter(role)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                filter === role
                  ? 'bg-primary text-white'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">User Management</h3>
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-primary text-white">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">Last Active</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(user.role)}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.lastActive}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleShow(user)}
                        className="text-primary hover:text-blue-700 p-1"
                        title="Show Details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      {user.role !== 'Admin' && (
                        <button
                          onClick={() => {
                            setSelectedUser(user)
                            handleBlockUser()
                          }}
                          className={`p-1 ${user.status === 'Active' ? 'text-danger hover:text-red-700' : 'text-success hover:text-green-700'}`}
                          title={user.status === 'Active' ? 'Block User' : 'Unblock User'}
                        >
                          {user.status === 'Active' ? <ShieldOff className="h-4 w-4" /> : <Shield className="h-4 w-4" />}
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Incident Log */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5" />
            <span>Incident Log</span>
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Severity</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {incidents.map((incident) => (
                <tr key={incident.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {incident.user}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {incident.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {incident.time}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSeverityColor(incident.severity)}`}>
                      {incident.severity}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Platform Activity */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 flex items-center space-x-2">
            <Activity className="h-5 w-5" />
            <span>Platform Activity</span>
          </h3>
        </div>
        <div className="p-6">
          <div className="space-y-3">
            {platformActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <div>
                  <p className="text-sm font-medium text-gray-900">{activity.activity}</p>
                  <p className="text-xs text-gray-500">{activity.user}</p>
                </div>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* User Details Modal */}
      {showModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">User Details</h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Name</label>
                <p className="text-sm text-gray-900">{selectedUser.name}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700">Email</label>
                <p className="text-sm text-gray-900">{selectedUser.email}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700">Role</label>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(selectedUser.role)}`}>
                  {selectedUser.role}
                </span>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700">Status</label>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedUser.status)}`}>
                  {selectedUser.status}
                </span>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700">Join Date</label>
                <p className="text-sm text-gray-900">{selectedUser.joinDate}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700">Last Active</label>
                <p className="text-sm text-gray-900">{selectedUser.lastActive}</p>
              </div>
              
              {selectedUser.role === 'User' && (
                <div>
                  <label className="text-sm font-medium text-gray-700">SOS Count</label>
                  <p className="text-sm text-gray-900">{selectedUser.sosCount}</p>
                </div>
              )}
              
              {selectedUser.role === 'Doctor' && (
                <div>
                  <label className="text-sm font-medium text-gray-700">Consultations</label>
                  <p className="text-sm text-gray-900">{selectedUser.consultations}</p>
                </div>
              )}
              
              {selectedUser.role === 'Admin' && (
                <div>
                  <label className="text-sm font-medium text-gray-700">Admin Level</label>
                  <p className="text-sm text-gray-900">{selectedUser.adminLevel}</p>
                </div>
              )}
              
              <div className="pt-4 space-y-3">
                {selectedUser.role !== 'Admin' && (
                  <button
                    onClick={handleBlockUser}
                    className={`w-full py-2 px-4 rounded-md transition-colors flex items-center justify-center space-x-2 ${
                      selectedUser.status === 'Active'
                        ? 'bg-danger text-white hover:bg-red-700'
                        : 'bg-success text-white hover:bg-green-700'
                    }`}
                  >
                    {selectedUser.status === 'Active' ? <ShieldOff className="h-4 w-4" /> : <Shield className="h-4 w-4" />}
                    <span>{selectedUser.status === 'Active' ? 'Block User' : 'Unblock User'}</span>
                  </button>
                )}
                
                <button
                  onClick={closeModal}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}