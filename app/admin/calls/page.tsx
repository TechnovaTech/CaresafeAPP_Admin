'use client'

import { useState } from 'react'
import { Phone, Save, Eye, X, Search } from 'lucide-react'

const callLogs = [
  {
    id: '1',
    sosId: 'SOS-001',
    calledTo: 'John Doe (Patient)',
    time: '10:30 AM',
    result: 'Answered',
    notes: 'Patient confirmed they are okay, false alarm'
  },
  {
    id: '2',
    sosId: 'SOS-002',
    calledTo: 'Emergency Contact - Mary Smith',
    time: '10:25 AM',
    result: 'No Answer',
    notes: 'Left voicemail, trying alternative contact'
  },
  {
    id: '3',
    sosId: 'SOS-003',
    calledTo: 'Mike Johnson (Patient)',
    time: '10:20 AM',
    result: 'Busy',
    notes: 'Line busy, will retry in 2 minutes'
  }
]

const getResultColor = (result: string) => {
  switch (result) {
    case 'Answered': return 'bg-success text-white'
    case 'No Answer': return 'bg-yellow-500 text-white'
    case 'Busy': return 'bg-danger text-white'
    default: return 'bg-gray-500 text-white'
  }
}

export default function CallsPage() {
  const [notes, setNotes] = useState('')
  const [selectedCall, setSelectedCall] = useState<any>(null)
  const [showModal, setShowModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredCalls = callLogs.filter(call => 
    call.sosId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    call.calledTo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    call.result.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleShow = (call: any) => {
    setSelectedCall(call)
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
            <thead className="bg-primary text-white">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">SOS ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">Called To</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">Result</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCalls.map((call) => (
                <tr key={call.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {call.sosId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {call.calledTo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {call.time}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getResultColor(call.result)}`}>
                      {call.result}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      onClick={() => handleShow(call)}
                      className="text-primary hover:text-blue-700 p-1"
                      title="Show Details"
                    >
                      <Eye className="h-4 w-4" />
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
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Call Details</h3>
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
                <p className="text-sm text-gray-900">{selectedCall.sosId}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700">Called To</label>
                <p className="text-sm text-gray-900">{selectedCall.calledTo}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700">Time</label>
                <p className="text-sm text-gray-900">{selectedCall.time}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700">Result</label>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getResultColor(selectedCall.result)}`}>
                  {selectedCall.result}
                </span>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700">Previous Notes</label>
                <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-md">{selectedCall.notes}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Add Resolution Notes
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter resolution details..."
                />
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={handleSaveResolution}
                  className="flex-1 bg-success text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Save className="h-4 w-4" />
                  <span>Save Resolution</span>
                </button>
                <button
                  onClick={closeModal}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}