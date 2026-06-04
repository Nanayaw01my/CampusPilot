'use client'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard, BookOpen, Headphones, FileText, Calendar,
  Briefcase, Bell, User, Settings, LogOut, X, Compass,
  Shield, TrendingUp, ChevronRight
} from 'lucide-react'
import Avatar from '@/components/ui/Avatar'
import { authApi, clearAuth, getUser } from '@/lib/api'

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: BookOpen, label: 'Library', href: '/library' },
  { icon: Headphones, label: 'Audio Books', href: '/audio' },
  { icon: FileText, label: 'Past Questions', href: '/past-questions' },
  { icon: Calendar, label: 'Events', href: '/events' },
  { icon: Briefcase, label: 'Opportunities', href: '/opportunities' },
  { icon: Bell, label: 'Reminders', href: '/reminders' },
  { icon: TrendingUp, label: 'Notifications', href: '/notifications' },
]

const bottomItems = [
  { icon: User, label: 'Profile', href: '/profile' },
  { icon: Settings, label: 'Settings', href: '/settings' },
  { icon: Shield, label: 'Admin', href: '/admin' },
]

interface SidebarProps {
  open: boolean
  onClose: () => void
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [user, setUser] = useState<{ name: string; department: string; level: string } | null>(null)

  useEffect(() => {
    setUser(getUser())
  }, [])

  const handleLogout = async () => {
    try {
      await authApi.logout()
    } catch {
      // ignore
    } finally {
      clearAuth()
      router.push('/login')
    }
  }

  const displayName = user?.name || 'Student'
  const displayDept = user?.department || 'University'
  const displayLevel = user?.level || ''

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside className={cn(
        'fixed left-0 top-0 h-full w-64 z-40 flex flex-col',
        'bg-white/90 dark:bg-gray-950/95 backdrop-blur-xl',
        'border-r border-gray-100 dark:border-gray-800/50',
        'shadow-2xl transition-transform duration-300',
        'lg:translate-x-0',
        open ? 'translate-x-0' : '-translate-x-full'
      )}>
        {/* Logo */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-800/50">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg">
              <Compass className="text-white" size={18} />
            </div>
            <div>
              <span className="font-bold text-gray-900 dark:text-white text-base leading-none block">Campus</span>
              <span className="font-bold text-sm leading-none gradient-text">Pilot</span>
            </div>
          </Link>
          <button onClick={onClose} className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500">
            <X size={18} />
          </button>
        </div>

        {/* User Quick Info */}
        <div className="mx-3 mt-3 p-3 rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/40 dark:to-purple-950/40 border border-indigo-100 dark:border-indigo-900/40">
          <div className="flex items-center gap-3">
            <Avatar name={displayName} size="sm" />
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{displayName}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {displayDept}{displayLevel ? ` • L${displayLevel}` : ''}
              </p>
            </div>
          </div>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-0.5">
          <p className="text-[10px] font-semibold text-gray-400 dark:text-gray-600 uppercase tracking-wider px-3 py-2">Main Menu</p>
          {navItems.map(({ icon: Icon, label, href }) => {
            const active = pathname === href || pathname.startsWith(href + '/')
            return (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group',
                  active
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/20'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/60 hover:text-gray-900 dark:hover:text-white'
                )}
              >
                <Icon size={18} className={active ? 'text-white' : 'text-gray-400 group-hover:text-indigo-500'} />
                <span className="flex-1">{label}</span>
                {active && <ChevronRight size={14} className="text-white/70" />}
              </Link>
            )
          })}

          <p className="text-[10px] font-semibold text-gray-400 dark:text-gray-600 uppercase tracking-wider px-3 py-2 mt-2">Account</p>
          {bottomItems.map(({ icon: Icon, label, href }) => {
            const active = pathname === href
            return (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group',
                  active
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/20'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/60 hover:text-gray-900 dark:hover:text-white'
                )}
              >
                <Icon size={18} className={active ? 'text-white' : 'text-gray-400 group-hover:text-indigo-500'} />
                {label}
              </Link>
            )
          })}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-gray-100 dark:border-gray-800/50">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  )
}
