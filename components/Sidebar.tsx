'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  AlertTriangle, 
  Phone, 
  TrendingUp, 
  UserCheck, 
  Users, 
  FileText, 
  LogOut 
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'SOS Alerts', href: '/admin/sos', icon: AlertTriangle },
  { name: 'Calls', href: '/admin/calls', icon: Phone },
  { name: 'Escalation', href: '/admin/escalation', icon: TrendingUp },
  { name: 'Doctor Verification', href: '/admin/doctors', icon: UserCheck },
  { name: 'Users', href: '/admin/users', icon: Users },
  { name: 'Logs', href: '/admin/logs', icon: FileText },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 min-h-screen shadow-lg" style={{ backgroundColor: '#2563EB' }}>
      <div className="p-6">
        <h2 className="text-xl font-bold text-white">Caresafe Admin</h2>
      </div>
      
      <nav className="mt-6">
        {navigation.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-6 py-3 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-white bg-opacity-20 text-white border-r-4 border-white'
                  : 'text-blue-100 hover:bg-white hover:bg-opacity-10 hover:text-white'
              }`}
            >
              <Icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
        
        <Link
          href="/admin/login"
          className="flex items-center px-6 py-3 text-sm font-medium text-blue-100 hover:bg-white hover:bg-opacity-10 hover:text-white mt-8"
        >
          <LogOut className="mr-3 h-5 w-5" />
          Logout
        </Link>
      </nav>
    </div>
  )
}