# Caresafe Admin Panel

A professional healthcare administration web panel built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Admin Login** - Secure authentication with role selection
- **Dashboard** - Overview of SOS alerts, users, and system metrics
- **SOS Emergency Management** - Real-time SOS alert handling with patient details
- **Call Management** - Manual call handling and resolution tracking
- **Escalation Management** - SLA monitoring and case reassignment
- **Doctor Verification** - Approve/reject doctor registrations with document review
- **User Management** - User administration with blocking/unblocking capabilities
- **System Logs** - Comprehensive logging and audit trails

## Design Features

- **Healthcare Color Scheme**: 
  - Background: #F3F6FB (light blue/white)
  - Primary: #2563EB (blue)
  - Danger/SOS: #DC2626 (red)
  - Success: #16A34A (green)
- **Modern UI**: Rounded cards, soft shadows, clean layout
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Professional Tables**: Sortable columns with status badges
- **Interactive Components**: Hover effects, active states

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **No Backend**: Frontend-only with dummy data

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Navigate to the Admin directory:
```bash
cd Admin
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Login Credentials

Use any email/password combination to login. The system uses dummy authentication.

## Project Structure

```
Admin/
├── app/                    # Next.js App Router pages
│   ├── dashboard/         # Dashboard home
│   ├── sos/              # SOS emergency management
│   ├── calls/            # Call handling
│   ├── escalation/       # Case escalation
│   ├── doctors/          # Doctor verification
│   ├── users/            # User management
│   ├── logs/             # System logs
│   └── globals.css       # Global styles
├── components/            # Reusable components
│   ├── Sidebar.tsx       # Navigation sidebar
│   └── Header.tsx        # Top header bar
├── types/                # TypeScript type definitions
└── public/               # Static assets
```

## Pages Overview

### 1. Login Page (`/`)
- Email/password authentication
- Role selection (Admin/Super Admin)
- Clean centered card layout

### 2. Dashboard (`/dashboard`)
- Summary cards (Active SOS, Total Users, etc.)
- Recent SOS alerts table
- Status badges and metrics

### 3. SOS Dashboard (`/sos`)
- Real-time SOS alerts table
- Patient profile panel
- Map placeholder
- Action buttons (Call Patient, Call Emergency Contact, Close Case)

### 4. Call Management (`/calls`)
- Call logs table
- Call details panel
- Resolution notes
- Save functionality

### 5. Escalation Management (`/escalation`)
- SLA timer monitoring
- Case reassignment
- Priority levels
- Auto-reassign indicators

### 6. Doctor Verification (`/doctors`)
- Doctor applications table
- Document viewer
- Approve/Reject actions
- Audit log

### 7. User Management (`/users`)
- User list with filtering
- Block/Unblock functionality
- Incident logs
- Platform activity

### 8. System Logs (`/logs`)
- System and audit logs
- Search and filtering
- Export functionality
- Log level filtering

## Customization

### Colors
Update colors in `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: '#2563EB',
      danger: '#DC2626',
      success: '#16A34A',
      background: '#F3F6FB',
    },
  },
}
```

### Data
Replace dummy data in each page component with real API calls when backend is ready.

## Build for Production

```bash
npm run build
npm start
```

## License

MIT License - see LICENSE file for details.