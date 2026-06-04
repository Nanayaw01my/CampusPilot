'use client'
import { useState } from 'react'
import AppLayout from '@/components/layout/AppLayout'
import { mockNotifications } from '@/lib/mock-data'
import { timeAgo } from '@/lib/utils'
import { Bell, BookOpen, Calendar, Star, Megaphone, Check, Trash2, Filter } from 'lucide-react'

const iconMap: Record<string, React.ElementType> = {
  book: BookOpen, calendar: Calendar, star: Star, bell: Bell, megaphone: Megaphone,
}
const iconColors: Record<string, string> = {
  book: 'bg-indigo-100 text-indigo-600', calendar: 'bg-purple-100 text-purple-600',
  star: 'bg-amber-100 text-amber-600', bell: 'bg-blue-100 text-blue-600', megaphone: 'bg-emerald-100 text-emerald-600',
}

export default function NotificationsPage() {
  const [notifs, setNotifs] = useState(mockNotifications)

  const markAllRead = () => setNotifs(n => n.map(x => ({ ...x, read: true })))
  const markRead = (id: string) => setNotifs(n => n.map(x => x.id === id ? { ...x, read: true } : x))
  const remove = (id: string) => setNotifs(n => n.filter(x => x.id !== id))

  const unread = notifs.filter(n => !n.read).length

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-2">
              <Bell className="text-indigo-500" size={24} /> Notifications
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{unread} unread</p>
          </div>
          {unread > 0 && (
            <button onClick={markAllRead} className="flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition">
              <Check size={14} /> Mark all read
            </button>
          )}
        </div>

        <div className="space-y-2">
          {notifs.map(n => {
            const Icon = iconMap[n.icon] || Bell
            return (
              <div
                key={n.id}
                onClick={() => markRead(n.id)}
                className={`flex gap-4 p-4 rounded-2xl border cursor-pointer transition-all group ${
                  !n.read
                    ? 'bg-indigo-50/60 dark:bg-indigo-950/20 border-indigo-100 dark:border-indigo-900/40'
                    : 'bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${iconColors[n.icon] || 'bg-gray-100 text-gray-600'}`}>
                  <Icon size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className={`text-sm font-semibold ${!n.read ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-200'}`}>{n.title}</p>
                    {!n.read && <div className="w-2 h-2 bg-indigo-500 rounded-full flex-shrink-0 mt-1.5" />}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed">{n.message}</p>
                  <p className="text-[10px] text-gray-400 mt-1.5">{timeAgo(n.time)}</p>
                </div>
                <button
                  onClick={e => { e.stopPropagation(); remove(n.id) }}
                  className="p-1.5 text-gray-300 hover:text-red-400 transition opacity-0 group-hover:opacity-100 flex-shrink-0"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            )
          })}
          {notifs.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <Bell size={48} className="mx-auto mb-4 opacity-20" />
              <p className="font-medium text-gray-600 dark:text-gray-300">All caught up!</p>
              <p className="text-sm mt-1">No notifications to show</p>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  )
}
