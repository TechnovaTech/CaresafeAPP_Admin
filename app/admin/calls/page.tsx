'use client'

import { useState } from 'react'
import { Phone, Save, Eye, X, Search, Edit } from 'lucide-react'

const callLogs = [
  {
    callId: 'CALL-001',
    caseId: 'CASE-001',
    calledTo: 'John Doe (Patient)',
    phoneNumber: '+1-555-0123',
    callTime: '2024-01-15 10:30 AM',
    callResult: 'Answered',
    notes: 'Patient confirmed they are okay, false alarm'
  },
  {
    callId: 'CALL-002',
    caseId: 'CASE-002',
    calledTo: 'Mary Smith (Contact)',
    phoneNumber: '+1-555-0456',
    callTime: '2024-01-15 10:25 AM',
    callResult: 'Not Answered',
    notes: 'Left voicemail, trying alternative contact'
  },
  {
    callId: 'CALL-003',
    caseId: 'CASE-003',
    calledTo: 'Mike Johnson (Patient)',
    phoneNumber: '+1-555-0789',
    callTime: '2024-01-15 10:20 AM',
    callResult: 'Not Answered',
    notes: 'Line busy, will retry in 2 minutes'
  }
]

const getResultColor = (result: string) => {
  switch (result) {
    case 'Answered': return 'bg-green-500 text-white'
    case 'Not Answered': return 'bg-red-500 text-white'
    default: return 'bg-gray-500 text-white'
  }
}

export default function CallsPage() {
  const [notes, setNotes] = useState('')
  const [selectedCall, setSelectedCall] = useState<any>(null)
  const [showModal, setShowModal] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [editData, setEditData] = useState<any>({})

  const filteredCalls = callLogs.filter(call => 
    call.callId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    call.caseId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    call.calledTo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    call.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    call.callResult.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleShow = (call: any) => {
    setSelectedCall(call)
    setIsEditMode(false)
    setShowModal(true)
  }

  const handleEdit = (call: any) => {
    setSelectedCall(call)
    setEditData(call)
    setIsEditMode(true)
    setShowModal(true)
  }

  const handleSaveResolution = () => {
    alert('Resolution saved successfully!')
    setNotes('')
    setShowModal(false)
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedCall(null)
    setIsEditMode(false)
    setEditData({})
    setNotes('')
  }

  return (
    <div className="space-y-6">
      {/* Call Logs Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Call Logs</h3>
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search calls..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase">Call ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase">Case ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase">Called To</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase">Phone Number</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase">Call Time</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase">Call Result</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase">Notes</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCalls.map((call) => (
                <tr key={call.callId} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {call.callId}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {call.caseId}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {call.calledTo}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {call.phoneNumber}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {call.callTime}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getResultColor(call.callResult)}`}>
                      {call.callResult}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500 max-w-xs truncate">
                    {call.notes}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      onClick={() => handleShow(call)}
                      className="text-blue-600 hover:text-blue-800 p-1 mr-2"
                      title="Show Details"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleEdit(call)}
                      className="text-green-600 hover:text-green-800 p-1"
                      title="Edit Call"
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

      {/* Call Details Modal */}
      {showModal && selectedCall && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl mx-4 max-h-[80vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">
                {isEditMode ? 'Edit Call Details' : 'Call Details'}
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
                <label className="text-sm font-medium text-gray-700">Call ID</label>
                {isEditMode ? (
                  <input
                    type="text"
                    value={editData.callId || ''}
                    onChange={(e) => setEditData({...editData, callId: e.target.value})}
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-sm text-gray-900">{selectedCall.callId}</p>
                )}
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700">Case ID</label>
                {isEditMode ? (
                  <input
                    type="text"
                    value={editData.caseId || ''}
                    onChange={(e) => setEditData({...editData, caseId: e.target.value})}
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-sm text-gray-900">{selectedCall.caseId}</p>
                )}
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700">Called To</label>
                {isEditMode ? (
                  <input
                    type="text"
                    value={editData.calledTo || ''}
                    onChange={(e) => setEditData({...editData, calledTo: e.target.value})}
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-sm text-gray-900">{selectedCall.calledTo}</p>
                )}
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700">Phone Number</label>
                {isEditMode ? (
                  <input
                    type="text"
                    value={editData.phoneNumber || ''}
                    onChange={(e) => setEditData({...editData, phoneNumber: e.target.value})}
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-sm text-gray-900">{selectedCall.phoneNumber}</p>
                )}
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700">Call Time</label>
                {isEditMode ? (
                  <input
                    type="text"
                    value={editData.callTime || ''}
                    onChange={(e) => setEditData({...editData, callTime: e.target.value})}
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-sm text-gray-900">{selectedCall.callTime}</p>
                )}
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700">Call Result</label>
                {isEditMode ? (
                  <select
                    value={editData.callResult || ''}
                    onChange={(e) => setEditData({...editData, callResult: e.target.value})}
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Answered">Answered</option>
                    <option value="Not Answered">Not Answered</option>
                  </select>
                ) : (
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getResultColor(selectedCall.callResult)}`}>
                    {selectedCall.callResult}
                  </span>
                )}
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700">Notes</label>
                {isEditMode ? (
                  <textarea
                    value={editData.notes || ''}
                    onChange={(e) => setEditData({...editData, notes: e.target.value})}
                    rows={3}
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-md">{selectedCall.notes}</p>
                )}
              </div>
              
              <div className="flex space-x-3 pt-4">
                {isEditMode ? (
                  <>
                    <button
                      onClick={handleSaveResolution}
                      className="flex-1 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors flex items-center justify-center space-x-2"
                    >
                      <Save className="h-4 w-4" />
                      <span>Save Changes</span>
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