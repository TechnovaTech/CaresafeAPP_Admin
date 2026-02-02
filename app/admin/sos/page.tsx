'use client'

import { useState } from 'react'
import { Phone, MapPin, User, Clock, Eye, Trash2, X, Search } from 'lucide-react'

const sosAlerts = [
  {
    id: '1',
    patientName: 'John Doe',
    patientAge: 68,
    trigger: 'Fall',
    time: '2 min ago',
    status: 'Open',
    location: 'Home - Living Room',
    emergencyContact: '+1 234-567-8901',
    reason: 'Fall detected by sensors'
  },
  {
    id: '2',
    patientName: 'Sarah Smith',
    patientAge: 72,
    trigger: 'Voice',
    time: '5 min ago',
    status: 'In Progress',
    location: 'Home - Bedroom',
    emergencyContact: '+1 234-567-8902',
    reason: 'Voice command "Help me"'
  },
  {
    id: '3',
    patientName: 'Mike Johnson',
    patientAge: 65,
    trigger: 'Manual',
    time: '12 min ago',
    status: 'Closed',
    location: 'Home - Kitchen',
    emergencyContact: '+1 234-567-8903',
    reason: 'Manual SOS button pressed'
  }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Open': return 'bg-danger text-white'
    case 'In Progress': return 'bg-yellow-500 text-white'
    case 'Closed': return 'bg-success text-white'
    default: return 'bg-gray-500 text-white'
  }
}

export default function SOSDashboard() {
  const [selectedAlert, setSelectedAlert] = useState<any>(null)
  const [showModal, setShowModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredAlerts = sosAlerts.filter(alert => 
    alert.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alert.trigger.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alert.status.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleShow = (alert: any) => {
    setSelectedAlert(alert)
    setShowModal(true)
  }

  const handleDelete = (alert: any) => {
    if (confirm('Are you sure you want to delete this SOS alert?')) {
      alert('Deleted SOS alert for ' + alert.patientName)
    }
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedAlert(null)
  }

  return (
    <div className="space-y-6">
      {/* SOS Alerts Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Active SOS Alerts</h3>
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search alerts..."
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
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">Patient</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">Trigger</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAlerts.map((alert) => (
                <tr key={alert.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {alert.patientName}
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleShow(alert)}
                        className="text-primary hover:text-blue-700 p-1"
                        title="Show Details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(alert)}
                        className="text-danger hover:text-red-700 p-1"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="bg-white rounded-lg shadow p-6">
        <h4 className="text-lg font-medium text-gray-900 mb-3">Location Map</h4>
        <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
            <p className="text-lg text-gray-500">Map View Placeholder</p>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {showModal && selectedAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Patient Details</h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-medium text-gray-900">{selectedAlert.patientName}</h4>
                  <p className="text-sm text-gray-500">Age: {selectedAlert.patientAge}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-700">Emergency Contact</label>
                  <p className="text-sm text-gray-900">{selectedAlert.emergencyContact}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700">Location</label>
                  <p className="text-sm text-gray-900">{selectedAlert.location}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700">Trigger Reason</label>
                  <p className="text-sm text-gray-900">{selectedAlert.reason}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700">Time</label>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <p className="text-sm text-gray-900">{selectedAlert.time}</p>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700">Status</label>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedAlert.status)}`}>
                    {selectedAlert.status}
                  </span>
                </div>
              </div>
              
              <div className="pt-4 space-y-3">
                <button className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>Call Patient</span>
                </button>
                
                <button className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>Call Emergency Contact</span>
                </button>
                
                <button className="w-full bg-danger text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors">
                  Close Case
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}