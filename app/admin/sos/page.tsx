'use client'

import { useState, useEffect } from 'react'
import { Phone, MapPin, User, Clock, Eye, ShieldAlert, Mic, AlertTriangle, X, Search, CheckCircle } from 'lucide-react'

// Enhanced SOS alerts with more comprehensive data
const sosAlerts = [
  {
    id: '1',
    patientName: 'John Doe',
    patientAge: 68,
    patientId: 'PT-001',
    trigger: 'Fall',
    time: '2 min ago',
    timestamp: '2024-01-15 14:23:45',
    status: 'Open',
    location: '123 Main St, Apartment 4B, New York, NY 10001',
    locationCoords: { lat: 40.7128, lng: -74.0060 },
    emergencyContact: {
      name: 'Mary Doe',
      relation: 'Wife',
      phone: '+1 234-567-8901'
    },
    secondaryContact: {
      name: 'Dr. Michael Chen',
      relation: 'Primary Care Physician',
      phone: '+1 234-567-8904'
    },
    reason: 'Fall detected by wearable device sensors',
    deviceInfo: 'Wearable Device ID: WD-7890',
    medicalConditions: ['Hypertension', 'Arthritis'],
    medications: ['Lisinopril', 'Ibuprofen'],
    priority: 'High'
  },
  {
    id: '2',
    patientName: 'Sarah Smith',
    patientAge: 72,
    patientId: 'PT-002',
    trigger: 'Voice',
    time: '5 min ago',
    timestamp: '2024-01-15 14:20:18',
    status: 'In Progress',
    location: '456 Oak Ave, House B, Los Angeles, CA 90001',
    locationCoords: { lat: 34.0522, lng: -118.2437 },
    emergencyContact: {
      name: 'Robert Smith',
      relation: 'Son',
      phone: '+1 234-567-8902'
    },
    secondaryContact: {
      name: 'Jane Smith',
      relation: 'Daughter',
      phone: '+1 234-567-8905'
    },
    reason: 'Voice command "Help me, I can\'t breathe" detected',
    deviceInfo: 'Smart Home Hub: SH-1234',
    medicalConditions: ['COPD', 'Asthma'],
    medications: ['Albuterol', 'Advair'],
    priority: 'Critical'
  },
  {
    id: '3',
    patientName: 'Mike Johnson',
    patientAge: 65,
    patientId: 'PT-003',
    trigger: 'Manual',
    time: '12 min ago',
    timestamp: '2024-01-15 14:13:52',
    status: 'Closed',
    location: '789 Pine Rd, House C, Chicago, IL 60601',
    locationCoords: { lat: 41.8781, lng: -87.6298 },
    emergencyContact: {
      name: 'Lisa Johnson',
      relation: 'Daughter',
      phone: '+1 234-567-8903'
    },
    reason: 'Manual SOS button pressed on mobile app',
    deviceInfo: 'Mobile App: v2.1.0',
    medicalConditions: ['Diabetes', 'Heart Disease'],
    medications: ['Metformin', 'Aspirin'],
    priority: 'Medium'
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

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'Critical': return 'bg-red-600 text-white animate-pulse'
    case 'High': return 'bg-orange-500 text-white'
    case 'Medium': return 'bg-yellow-500 text-white'
    case 'Low': return 'bg-blue-500 text-white'
    default: return 'bg-gray-500 text-white'
  }
}

const getTriggerIcon = (trigger: string) => {
  switch (trigger) {
    case 'Fall': return <ShieldAlert className="h-5 w-5" />
    case 'Voice': return <Mic className="h-5 w-5" />
    case 'Manual': return <AlertTriangle className="h-5 w-5" />
    default: return <AlertTriangle className="h-5 w-5" />
  }
}

export default function SOSDashboard() {
  const [selectedAlert, setSelectedAlert] = useState<any>(null)
  const [showModal, setShowModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [realTimeAlerts, setRealTimeAlerts] = useState(sosAlerts)

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeAlerts(prev => prev.map(alert => {
        if (alert.status === 'Open') {
          const minutes = Math.floor(Math.random() * 5) + 1
          const seconds = Math.floor(Math.random() * 60)
          return {
            ...alert,
            time: `${minutes}m ${seconds}s ago`
          }
        }
        return alert
      }))
    }, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const filteredAlerts = realTimeAlerts.filter(alert => 
    alert.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alert.trigger.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alert.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alert.patientId.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleShow = (alert: any) => {
    setSelectedAlert(alert)
    setShowModal(true)
  }

  const handleStatusUpdate = (status: string) => {
    setSelectedAlert((prev: any) => ({ ...prev, status }))
    setRealTimeAlerts(prev => prev.map(alert => 
      alert.id === selectedAlert.id ? { ...alert, status } : alert
    ))
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedAlert(null)
  }

  const handleCall = (phone: string, name: string) => {
    alert(`Initiating call to ${name} (${phone})...`)
    // Here would be the actual call integration
  }

  return (
    <div className="space-y-6">
      {/* SOS Alerts Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Active SOS Alerts</h3>
            <p className="text-sm text-gray-500 mt-1">Real-time emergency notifications from patients</p>
          </div>
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search alerts by patient name, ID, or status..."
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
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAlerts.length > 0 ? (
                filteredAlerts.map((alert) => (
                  <tr 
                    key={alert.id} 
                    className={`hover:bg-gray-50 transition-colors ${alert.status === 'Open' ? 'bg-red-50' : ''}`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mr-3">
                          <User className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{alert.patientName}</div>
                          <div className="text-xs text-gray-500">{alert.patientId} • {alert.patientAge}y</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-700">
                        <div className="mr-2 text-yellow-500">
                          {getTriggerIcon(alert.trigger)}
                        </div>
                        <span>{alert.trigger}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(alert.priority)}`}>
                        {alert.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1 text-gray-400" />
                        <span>{alert.time}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(alert.status)}`}>
                        {alert.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button
                        onClick={() => handleShow(alert)}
                        className="text-primary hover:text-blue-700 p-1"
                        title="Show Details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-500">No SOS alerts found</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal for comprehensive information */}
      {showModal && selectedAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto max-h-screen">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl mx-4 my-8 max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10">
              <h3 className="text-lg font-medium text-gray-900">Patient & Alert Details</h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              {/* Patient Profile */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                  <div className="bg-primary rounded-lg p-4 text-white">
                    <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <User className="h-10 w-10" />
                    </div>
                    <h4 className="text-xl font-semibold text-center">{selectedAlert.patientName}</h4>
                    <div className="text-center text-sm text-white bg-opacity-75 mt-1">{selectedAlert.patientId}</div>
                    <div className="text-center text-sm text-white bg-opacity-75 mt-1">{selectedAlert.patientAge} years old</div>
                  </div>
                </div>
                
                <div className="md:col-span-2 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm font-medium text-gray-700 mb-1">Emergency Contact</div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{selectedAlert.emergencyContact.name}</div>
                          <div className="text-sm text-gray-600">{selectedAlert.emergencyContact.relation}</div>
                        </div>
                        <button 
                          onClick={() => handleCall(selectedAlert.emergencyContact.phone, selectedAlert.emergencyContact.name)}
                          className="bg-primary text-white px-3 py-1 rounded-md text-sm flex items-center"
                        >
                          <Phone className="h-3 w-3 mr-1" />
                          Call
                        </button>
                      </div>
                      <div className="text-sm text-gray-900 mt-1">{selectedAlert.emergencyContact.phone}</div>
                    </div>
                    
                    {selectedAlert.secondaryContact && (
                      <div>
                        <div className="text-sm font-medium text-gray-700 mb-1">Secondary Contact</div>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">{selectedAlert.secondaryContact.name}</div>
                            <div className="text-sm text-gray-600">{selectedAlert.secondaryContact.relation}</div>
                          </div>
                          <button 
                            onClick={() => handleCall(selectedAlert.secondaryContact.phone, selectedAlert.secondaryContact.name)}
                            className="bg-primary text-white px-3 py-1 rounded-md text-sm flex items-center"
                          >
                            <Phone className="h-3 w-3 mr-1" />
                            Call
                          </button>
                        </div>
                        <div className="text-sm text-gray-900 mt-1">{selectedAlert.secondaryContact.phone}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Alert Details */}
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
                <h5 className="text-lg font-medium text-gray-900 mb-4">Alert Information</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-1">Trigger Type</div>
                    <div className="flex items-center">
                      <div className="mr-2 text-yellow-500">
                        {getTriggerIcon(selectedAlert.trigger)}
                      </div>
                      <span className="font-medium">{selectedAlert.trigger}</span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-1">Priority</div>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(selectedAlert.priority)}`}>
                      {selectedAlert.priority}
                    </span>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-1">Reported Time</div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1 text-gray-400" />
                      <span>{selectedAlert.timestamp}</span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-1">Status</div>
                    <select
                      value={selectedAlert.status}
                      onChange={(e) => handleStatusUpdate(e.target.value)}
                      className="text-sm px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="Open">Open</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-1">Device</div>
                    <div>{selectedAlert.deviceInfo}</div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-1">Time Elapsed</div>
                    <div className="font-medium">{selectedAlert.time}</div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="text-sm font-medium text-gray-700 mb-1">Trigger Reason</div>
                  <div className="bg-gray-50 p-3 rounded-md">{selectedAlert.reason}</div>
                </div>
              </div>
              
              {/* Location Details */}
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
                <h5 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-primary" />
                  Location Information
                </h5>
                <div className="h-64 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg flex items-center justify-center relative">
                  <MapPin className="h-16 w-16 text-primary animate-pulse" />
                  <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 px-3 py-2 rounded-md shadow-sm">
                    <div className="font-medium">{selectedAlert.patientName}</div>
                    <div className="text-sm text-gray-600">{selectedAlert.location}</div>
                  </div>
                </div>
                <div className="mt-3 text-sm text-gray-600">{selectedAlert.location}</div>
              </div>
              
              {/* Medical Information */}
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
                <h5 className="text-lg font-medium text-gray-900 mb-4">Medical Profile</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-2">Medical Conditions</div>
                    <div className="flex flex-wrap gap-2">
                      {selectedAlert.medicalConditions.map((condition: string, index: number) => (
                        <span key={index} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          {condition}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-2">Current Medications</div>
                    <div className="flex flex-wrap gap-2">
                      {selectedAlert.medications.map((medication: string, index: number) => (
                        <span key={index} className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                          {medication}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="border-t border-gray-200 pt-4 space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <button 
                    onClick={() => handleCall('+1 234-567-8900', selectedAlert.patientName)}
                    className="w-full bg-primary text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 text-sm font-medium"
                  >
                    <Phone className="h-4 w-4" />
                    <span>Call Patient</span>
                  </button>
                  <button 
                    onClick={() => handleCall(selectedAlert.emergencyContact.phone, selectedAlert.emergencyContact.name)}
                    className="w-full bg-yellow-500 text-white py-3 px-4 rounded-md hover:bg-yellow-600 transition-colors flex items-center justify-center space-x-2 text-sm font-medium"
                  >
                    <Phone className="h-4 w-4" />
                    <span>Call Emergency Contact</span>
                  </button>
                  <button 
                    onClick={() => handleStatusUpdate('Closed')}
                    className={`w-full py-3 px-4 rounded-md transition-colors flex items-center justify-center space-x-2 text-sm font-medium ${selectedAlert.status === 'Closed' ? 'bg-gray-300 cursor-not-allowed' : 'bg-success text-white hover:bg-green-600'}`}
                    disabled={selectedAlert.status === 'Closed'}
                  >
                    <ShieldAlert className="h-4 w-4" />
                    <span>Close Case</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}