'use client'

import { useState } from 'react'
import { Eye, Check, X, FileText, Calendar, Search } from 'lucide-react'

const doctors = [
  {
    id: '1',
    name: 'Dr. Emily Johnson',
    email: 'emily.johnson@email.com',
    registrationNumber: 'MD-12345',
    specialization: 'Cardiology',
    status: 'Pending',
    documents: ['Medical License', 'ID Proof', 'Specialization Certificate'],
    submittedDate: '2024-01-15',
    experience: '8 years',
    hospital: 'City General Hospital'
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    email: 'michael.chen@email.com',
    registrationNumber: 'MD-12346',
    specialization: 'Neurology',
    status: 'Approved',
    documents: ['Medical License', 'ID Proof', 'Specialization Certificate'],
    submittedDate: '2024-01-14',
    experience: '12 years',
    hospital: 'Metro Medical Center'
  },
  {
    id: '3',
    name: 'Dr. Sarah Williams',
    email: 'sarah.williams@email.com',
    registrationNumber: 'MD-12347',
    specialization: 'Pediatrics',
    status: 'Rejected',
    documents: ['Medical License', 'ID Proof'],
    submittedDate: '2024-01-13',
    experience: '5 years',
    hospital: 'Children\'s Hospital'
  }
]

const auditLogs = [
  { id: '1', action: 'Approved', doctor: 'Dr. Michael Chen', admin: 'Admin 1', time: '2024-01-15 10:30 AM' },
  { id: '2', action: 'Rejected', doctor: 'Dr. Sarah Williams', admin: 'Admin 2', time: '2024-01-15 09:15 AM' },
  { id: '3', action: 'Submitted', doctor: 'Dr. Emily Johnson', admin: 'System', time: '2024-01-15 08:45 AM' }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Pending': return 'bg-yellow-500 text-white'
    case 'Approved': return 'bg-success text-white'
    case 'Rejected': return 'bg-danger text-white'
    default: return 'bg-gray-500 text-white'
  }
}

export default function DoctorVerificationPage() {
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null)
  const [showModal, setShowModal] = useState(false)
  const [filter, setFilter] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredDoctors = doctors
    .filter(doc => filter === 'All' || doc.status === filter)
    .filter(doc => 
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.status.toLowerCase().includes(searchTerm.toLowerCase())
    )

  const handleShow = (doctor: any) => {
    setSelectedDoctor(doctor)
    setShowModal(true)
  }

  const handleApprove = () => {
    alert(`Dr. ${selectedDoctor.name} approved successfully!`)
    setShowModal(false)
  }

  const handleReject = () => {
    alert(`Dr. ${selectedDoctor.name} rejected!`)
    setShowModal(false)
  }

  const handleViewDocument = (document: string) => {
    alert(`Viewing ${document} for ${selectedDoctor.name}`)
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedDoctor(null)
  }

  return (
    <div className="space-y-6">
      {/* Filter Tabs */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex space-x-4">
          {['All', 'Pending', 'Approved', 'Rejected'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                filter === status
                  ? 'bg-primary text-white'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Doctors Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Doctor Verification Queue</h3>
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search doctors..."
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
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">Registration</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">Specialization</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDoctors.map((doctor) => (
                <tr key={doctor.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {doctor.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {doctor.registrationNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {doctor.specialization}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(doctor.status)}`}>
                      {doctor.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleShow(doctor)}
                        className="text-primary hover:text-blue-700 p-1"
                        title="Show Details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      {doctor.status === 'Pending' && (
                        <>
                          <button
                            onClick={() => {
                              setSelectedDoctor(doctor)
                              handleApprove()
                            }}
                            className="text-success hover:text-green-700 p-1"
                            title="Approve"
                          >
                            <Check className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedDoctor(doctor)
                              handleReject()
                            }}
                            className="text-danger hover:text-red-700 p-1"
                            title="Reject"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Audit Log */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Audit Log</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Doctor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Admin</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {auditLogs.map((log) => (
                <tr key={log.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {log.action}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {log.doctor}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {log.admin}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {log.time}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Doctor Details Modal */}
      {showModal && selectedDoctor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Doctor Details</h3>
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
                <p className="text-sm text-gray-900">{selectedDoctor.name}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700">Email</label>
                <p className="text-sm text-gray-900">{selectedDoctor.email}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700">Registration Number</label>
                <p className="text-sm text-gray-900">{selectedDoctor.registrationNumber}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700">Specialization</label>
                <p className="text-sm text-gray-900">{selectedDoctor.specialization}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700">Experience</label>
                <p className="text-sm text-gray-900">{selectedDoctor.experience}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700">Hospital</label>
                <p className="text-sm text-gray-900">{selectedDoctor.hospital}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700">Submitted Date</label>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <p className="text-sm text-gray-900">{selectedDoctor.submittedDate}</p>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700">Status</label>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedDoctor.status)}`}>
                  {selectedDoctor.status}
                </span>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Documents</label>
                <div className="space-y-2">
                  {selectedDoctor.documents.map((doc: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => handleViewDocument(doc)}
                      className="w-full flex items-center justify-between p-2 border border-gray-200 rounded-md hover:bg-gray-50"
                    >
                      <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-900">{doc}</span>
                      </div>
                      <Eye className="h-4 w-4 text-gray-400" />
                    </button>
                  ))}
                </div>
              </div>
              
              {selectedDoctor.status === 'Pending' && (
                <div className="pt-4 space-y-3">
                  <button
                    onClick={handleApprove}
                    className="w-full bg-success text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Check className="h-4 w-4" />
                    <span>Approve</span>
                  </button>
                  
                  <button
                    onClick={handleReject}
                    className="w-full bg-danger text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <X className="h-4 w-4" />
                    <span>Reject</span>
                  </button>
                </div>
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
      )}
    </div>
  )
}