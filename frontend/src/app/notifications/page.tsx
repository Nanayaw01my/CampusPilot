'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AppLayout from '@/components/layout/AppLayout'
import { notificationsApi, isAuthenticated } from '@/lib/api'
import { timeAgo } from '@/lib/utils'
import { Bell, BookOpen, Calendar, Star, Megaphone, Check, Trash2 } from 'lucide-react'

const iconMap: Record<string, React.ElementType> = {
  book: BookOpen, calendar: Calendar, star: Star, bell: Bell, megaphone: Megaphone,
}
const iconColors: Record<string, string> = {
  book: 'bg-indigo-100 text-indigo-600', calendar: 'bg-purple-100 text-purple-600',
  star: 'bg-amber-100 text-amber-600', bell: 'bg-blue-100 text-blue-600', megaphone: 'bg-emerald-100 text-emerald-600',
}

export default function NotificationsPage() {
  const router = useRouter()
  const [notifs, setNotifs] = useState<Record<string, unknown>[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isAuthenticated()) { router.push('/login'); return }
    notificationsApi.list()
      .then(res => {
        const data = (res.data as { data: Record<string, unknown>[] }).data
        setNotifs(Array.isArray(data) ? data : [])
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [router])

  const markAllRead = async () => {
    await notificationsApi.markAllRead()
    setNotifs(n => n.map(x => ({ ...x, read: true })))
  }

  const markRead = async (id: string) => {
    if (notifs.find(n => n.id === id && !n.read)) {
      await notificationsApi.markRead(id)
    }
    setNotifs(n => n.map(x => x.id === id ? { ...x, read: true } : x))
  }

  const remove = (id: string) => setNotifs(n => n.filter(x => x.id !== id))

  const unread = notifs.filter(n => !n.read).length

  if (loading) return (
    <AppLayout>
      <div className="flex items-center justify-center h-64">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    </AppLayout>
  )

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
            const icon = n.icon as string
            const Icon = iconMap[icon] || Bell
            const id = n.id as string
            return (
              <div key={id} onClick={() => markRead(id)}
                className={`flex gap-4 p-4 rounded-2xl border cursor-pointer transition-all group ${
                  !n.read ? 'bg-indigo-50/60 dark:bg-indigo-950/20 border-indigo-100 dark:border-indigo-900/40'
                  : 'bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${iconColors[icon] || 'bg-gray-100 text-gray-600'}`}>
                  <Icon size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className={`text-sm font-semibold ${!n.read ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-200'}`}>{n.title as string}</p>
                    {!n.read && <div className="w-2 h-2 bg-indigo-500 rounded-full flex-shrink-0 mt-1.5" />}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed">{n.message as string}</p>
                  <p className="text-[10px] text-gray-400 mt-1.5">{timeAgo(n.created_at as string)}</p>
                </div>
                <button onClick={e => { e.stopPropagation(); remove(id) }}
                  className="p-1.5 text-gray-300 hover:text-red-400 transition opacity-0 group-hover:opacity-100 flex-shrink-0">
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
