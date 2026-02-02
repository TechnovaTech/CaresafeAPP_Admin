'use client'

import { useState } from 'react'
import { Clock, AlertTriangle, RotateCcw, Eye, X, Search, Edit, Plus } from 'lucide-react'

const escalationCases = [
  {
    id: '1',
    sosId: 'SOS-001',
    patientName: 'John Doe',
    priority: 'High',
    slaTimer: '00:05:23',
    status: 'Open',
    autoReassign: true,
    assignedTo: 'Admin 1',
    escalationLevel: 1
  },
  {
    id: '2',
    sosId: 'SOS-002',
    patientName: 'Sarah Smith',
    priority: 'Critical',
    slaTimer: '00:02:15',
    status: 'In Progress',
    autoReassign: false,
    assignedTo: 'Admin 2',
    escalationLevel: 2
  },
  {
    id: '3',
    sosId: 'SOS-003',
    patientName: 'Mike Johnson',
    priority: 'Medium',
    slaTimer: '00:08:45',
    status: 'Closed',
    autoReassign: false,
    assignedTo: 'Admin 1',
    escalationLevel: 1
  }
]

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'Critical': return 'bg-danger text-white'
    case 'High': return 'bg-yellow-500 text-white'
    case 'Medium': return 'bg-blue-500 text-white'
    case 'Low': return 'bg-gray-500 text-white'
    default: return 'bg-gray-500 text-white'
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Open': return 'bg-danger text-white'
    case 'In Progress': return 'bg-yellow-500 text-white'
    case 'Closed': return 'bg-success text-white'
    default: return 'bg-gray-500 text-white'
  }
}

export default function EscalationPage() {
  const [selectedCase, setSelectedCase] = useState<any>(null)
  const [showModal, setShowModal] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [editData, setEditData] = useState<any>({})

  const filteredCases = escalationCases.filter(escalationCase => 
    escalationCase.sosId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    escalationCase.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    escalationCase.priority.toLowerCase().includes(searchTerm.toLowerCase()) ||
    escalationCase.status.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleShow = (escalationCase: any) => {
    setSelectedCase(escalationCase)
    setIsEditMode(false)
    setShowModal(true)
  }

  const handleEdit = (escalationCase: any) => {
    setSelectedCase(escalationCase)
    setEditData(escalationCase)
    setIsEditMode(true)
    setShowModal(true)
  }

  const handleSave = () => {
    alert('Case updated successfully!')
    setShowModal(false)
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedCase(null)
    setIsEditMode(false)
    setEditData({})
  }

  return (
    <div className="space-y-6">
      {/* Escalation Cases Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">SOS Escalation Cases</h3>
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search cases..."
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
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">SOS ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">Patient</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">SLA Timer</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">Auto Reassign</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCases.map((escalationCase) => (
                <tr key={escalationCase.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {escalationCase.sosId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {escalationCase.patientName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(escalationCase.priority)}`}>
                      {escalationCase.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{escalationCase.slaTimer}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(escalationCase.status)}`}>
                      {escalationCase.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {escalationCase.autoReassign ? (
                      <RotateCcw className="h-4 w-4 text-yellow-500 mx-auto animate-spin" />
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      onClick={() => handleShow(escalationCase)}
                      className="text-blue-600 hover:text-blue-800 p-1 mr-2"
                      title="Show Details"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleEdit(escalationCase)}
                      className="text-green-600 hover:text-green-800 p-1"
                      title="Edit Case"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Case Modal */}
      {showModal && selectedCase && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[80vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">
                {isEditMode ? 'Edit Case' : 'Case Details'}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">SOS ID</label>
                {isEditMode ? (
                  <input
                    type="text"
                    value={editData.sosId || ''}
                    onChange={(e) => setEditData({...editData, sosId: e.target.value})}
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-sm text-gray-900">{selectedCase.sosId}</p>
                )}
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700">Patient</label>
                {isEditMode ? (
                  <input
                    type="text"
                    value={editData.patientName || ''}
                    onChange={(e) => setEditData({...editData, patientName: e.target.value})}
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-sm text-gray-900">{selectedCase.patientName}</p>
                )}
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700">Priority</label>
                {isEditMode ? (
                  <select
                    value={editData.priority || ''}
                    onChange={(e) => setEditData({...editData, priority: e.target.value})}
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                  </select>
                ) : (
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(selectedCase.priority)}`}>
                    {selectedCase.priority}
                  </span>
                )}
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700">SLA Timer</label>
                {isEditMode ? (
                  <input
                    type="text"
                    value={editData.slaTimer || ''}
                    onChange={(e) => setEditData({...editData, slaTimer: e.target.value})}
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <p className="text-sm text-gray-900 font-mono">{selectedCase.slaTimer}</p>
                  </div>
                )}
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700">Assigned To</label>
                {isEditMode ? (
                  <select
                    value={editData.assignedTo || ''}
                    onChange={(e) => setEditData({...editData, assignedTo: e.target.value})}
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Admin 1">Admin 1</option>
                    <option value="Admin 2">Admin 2</option>
                    <option value="Admin 3">Admin 3</option>
                  </select>
                ) : (
                  <p className="text-sm text-gray-900">{selectedCase.assignedTo}</p>
                )}
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700">Status</label>
                {isEditMode ? (
                  <select
                    value={editData.status || ''}
                    onChange={(e) => setEditData({...editData, status: e.target.value})}
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Closed">Closed</option>
                  </select>
                ) : (
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedCase.status)}`}>
                    {selectedCase.status}
                  </span>
                )}
              </div>
              
              <div className="flex space-x-3 pt-4">
                {isEditMode ? (
                  <>
                    <button
                      onClick={handleSave}
                      className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={closeModal}
                      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                  >
                    Close
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}