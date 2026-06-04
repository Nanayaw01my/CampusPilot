'use client'
import { Bell, Menu, Search, Sun, Moon, ChevronDown } from 'lucide-react'
import { useState, useEffect } from 'react'
import Avatar from '@/components/ui/Avatar'
import { mockUser, mockNotifications } from '@/lib/mock-data'
import Link from 'next/link'

interface TopbarProps {
  onMenuClick: () => void
}

export default function Topbar({ onMenuClick }: TopbarProps) {
  const [dark, setDark] = useState(false)
  const [search, setSearch] = useState('')
  const [showNotifs, setShowNotifs] = useState(false)
  const unread = mockNotifications.filter(n => !n.read).length

  useEffect(() => {
    if (dark) document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')
  }, [dark])

  return (
    <header className="sticky top-0 z-20 h-16 bg-white/80 dark:bg-gray-950/90 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800/50 flex items-center px-4 gap-3">
      {/* Mobile menu btn */}
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 transition"
      >
        <Menu size={20} />
      </button>

      {/* Search */}
      <div className="flex-1 max-w-xl relative">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search books, events, opportunities..."
          className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition"
        />
      </div>

      <div className="flex items-center gap-1 ml-auto">
        {/* Dark mode */}
        <button
          onClick={() => setDark(!dark)}
          className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition"
        >
          {dark ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifs(!showNotifs)}
            className="relative p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition"
          >
            <Bell size={18} />
            {unread > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-white dark:border-gray-950">
                {unread}
              </span>
            )}
          </button>

          {showNotifs && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden z-50">
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-800">
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Notifications</h3>
                <span className="text-xs text-indigo-600 cursor-pointer hover:underline">Mark all read</span>
              </div>
              <div className="max-h-72 overflow-y-auto">
                {mockNotifications.slice(0, 4).map(n => (
                  <div key={n.id} className={`flex gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition cursor-pointer ${!n.read ? 'bg-indigo-50/50 dark:bg-indigo-950/20' : ''}`}>
                    <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${!n.read ? 'bg-indigo-500' : 'bg-transparent'}`} />
                    <div>
                      <p className="text-xs font-semibold text-gray-800 dark:text-white">{n.title}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{n.message}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                href="/notifications"
                onClick={() => setShowNotifs(false)}
                className="block text-center py-2.5 text-xs font-semibold text-indigo-600 border-t border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition"
              >
                View All Notifications
              </Link>
            </div>
          )}
        </div>

        {/* Profile */}
        <Link href="/profile" className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition cursor-pointer">
          <Avatar name={mockUser.name} size="sm" />
          <div className="hidden sm:block">
            <p className="text-xs font-semibold text-gray-800 dark:text-white leading-none">{mockUser.name.split(' ')[0]}</p>
            <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-none mt-0.5">L{mockUser.level}</p>
          </div>
          <ChevronDown size={14} className="text-gray-400" />
        </Link>
      </div>
    </header>
  )
}
