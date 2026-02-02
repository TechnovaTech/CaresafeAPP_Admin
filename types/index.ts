export interface User {
  id: string;
  name: string;
  email: string;
  role: 'User' | 'Doctor' | 'Admin';
  status: 'Active' | 'Blocked';
  joinDate: string;
}

export interface Doctor {
  id: string;
  name: string;
  email: string;
  registrationNumber: string;
  specialization: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  documents: string[];
  submittedDate: string;
}

export interface SOSAlert {
  id: string;
  patientName: string;
  patientAge: number;
  trigger: 'Voice' | 'Fall' | 'Manual';
  time: string;
  status: 'Open' | 'In Progress' | 'Closed';
  location: string;
  emergencyContact: string;
  reason: string;
}

export interface CallLog {
  id: string;
  sosId: string;
  calledTo: string;
  time: string;
  result: 'Answered' | 'No Answer' | 'Busy';
  notes: string;
}