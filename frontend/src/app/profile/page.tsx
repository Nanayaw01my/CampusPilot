'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AppLayout from '@/components/layout/AppLayout'
import Avatar from '@/components/ui/Avatar'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { authApi, isAuthenticated } from '@/lib/api'
import { formatDate } from '@/lib/utils'
import { Mail, BookOpen, Award, Camera, Edit, Star, Flame, Target, TrendingUp } from 'lucide-react'
import api from '@/lib/api'
import toast from 'react-hot-toast'

export default function ProfilePage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'overview' | 'activity' | 'settings'>('overview')
  const [editing, setEditing] = useState(false)
  const [user, setUser] = useState<Record<string, unknown> | null>(null)
  const [name, setName] = useState('')
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isAuthenticated()) { router.push('/login'); return }
    authApi.me().then(res => {
      setUser(res.data)
      setName(res.data.name || '')
    }).finally(() => setLoading(false))
  }, [router])

  const handleSaveName = async () => {
    setSaving(true)
    try {
      const res = await api.patch('/auth/profile', { name })
      setUser(res.data)
      setName(res.data.name)
      setEditing(false)
      toast.success('Profile updated!')
    } catch { toast.error('Failed to update profile') }
    finally { setSaving(false) }
  }

  if (loading || !user) return (
    <AppLayout>
      <div className="flex items-center justify-center h-64">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    </AppLayout>
  )

  const bookmarks = (user.bookmarks as string[]) || []
  const savedQs = (user.saved_questions as string[]) || []
  const readingProgress = (user.reading_progress as Record<string, number>) || {}
  const booksInProgress = Object.keys(readingProgress).length

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-violet-700 rounded-2xl p-6 text-white shadow-xl">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-white rounded-full" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white rounded-full" />
          </div>
          <div className="relative flex flex-col sm:flex-row items-center sm:items-start gap-5">
            <div className="relative">
              <Avatar name={name} size="xl" className="ring-4 ring-white/30 shadow-2xl" />
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full flex items-center justify-center text-indigo-700 shadow-lg hover:scale-110 transition">
                <Camera size={14} />
              </button>
            </div>
            <div className="flex-1 text-center sm:text-left">
              {editing ? (
                <div className="flex items-center gap-2 mb-2">
                  <input value={name} onChange={e => setName(e.target.value)}
                    className="text-xl font-black bg-white/20 border border-white/30 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-white/50" />
                  <button onClick={handleSaveName} disabled={saving}
                    className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-semibold disabled:opacity-60">
                    {saving ? 'Saving...' : 'Done'}
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                  <h1 className="text-2xl font-black">{name}</h1>
                  <button onClick={() => setEditing(true)} className="p-1.5 hover:bg-white/20 rounded-lg transition">
                    <Edit size={14} />
                  </button>
                </div>
              )}
              <p className="text-indigo-200 text-sm mb-3 flex items-center justify-center sm:justify-start gap-1.5">
                <Mail size={12} /> {user.email as string}
              </p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <Badge variant="primary" size="md">{user.department as string || 'N/A'}</Badge>
                <Badge variant="info" size="md">Level {user.level as string || 'N/A'}</Badge>
                <Badge variant="success" size="md">{user.role as string || 'Student'}</Badge>
              </div>
            </div>
            <div className="text-center sm:text-right">
              <div className="flex items-center gap-1.5 text-amber-300 mb-1">
                <Flame size={16} /> <span className="font-bold">{booksInProgress} in progress</span>
              </div>
              <p className="text-xs text-indigo-200">Member since {formatDate(user.created_at as string)}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Bookmarked', value: bookmarks.length, icon: BookOpen, color: 'text-indigo-600' },
            { label: 'Q-Papers', value: savedQs.length, icon: TrendingUp, color: 'text-purple-600' },
            { label: 'Reading', value: booksInProgress, icon: Award, color: 'text-emerald-600' },
            { label: 'Saved Opps', value: ((user.saved_opportunities as string[]) || []).length, icon: Target, color: 'text-amber-600' },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-4 text-center">
              <Icon size={20} className={`${color} mx-auto mb-2`} />
              <p className="text-2xl font-black text-gray-900 dark:text-white">{value}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{label}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl w-fit">
          {(['overview', 'activity', 'settings'] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold capitalize transition-all ${activeTab === tab ? 'bg-white dark:bg-gray-700 shadow text-gray-900 dark:text-white' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}>
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-5">
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2"><BookOpen size={16} className="text-indigo-500" /> Reading Progress</h3>
              {booksInProgress === 0 ? (
                <p className="text-sm text-gray-400 text-center py-4">No books in progress. Visit the library to start reading!</p>
              ) : (
                <p className="text-sm text-gray-600 dark:text-gray-300">{booksInProgress} book{booksInProgress > 1 ? 's' : ''} currently in progress</p>
              )}
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2"><Star size={16} className="text-amber-500" /> Achievements</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: 'Member', icon: '🎓', earned: true, desc: 'Joined CampusPilot' },
                  { label: 'Explorer', icon: '📚', earned: bookmarks.length > 0, desc: 'Bookmarked a book' },
                  { label: 'Researcher', icon: '🔍', earned: savedQs.length > 0, desc: 'Saved a past question' },
                  { label: 'Scholar', icon: '⭐', earned: booksInProgress > 0, desc: 'Started reading' },
                ].map(a => (
                  <div key={a.label} className={`p-3 rounded-xl border text-center ${a.earned ? 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800' : 'bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700 opacity-50'}`}>
                    <div className="text-3xl mb-1">{a.icon}</div>
                    <p className={`text-xs font-bold ${a.earned ? 'text-amber-700 dark:text-amber-400' : 'text-gray-500'}`}>{a.label}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">{a.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5 space-y-4">
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">Account Settings</h3>
            {[
              { label: 'Full Name', value: name, type: 'text' },
              { label: 'Email Address', value: user.email as string, type: 'email' },
              { label: 'Department', value: user.department as string, type: 'text' },
            ].map(({ label, value, type }) => (
              <div key={label}>
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 block mb-1">{label}</label>
                <input defaultValue={value} type={type} readOnly={label !== 'Full Name'}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 read-only:opacity-60" />
              </div>
            ))}
            <div className="pt-2 flex gap-3">
              <Button variant="primary" loading={saving} onClick={handleSaveName}>Save Changes</Button>
              <Button variant="secondary" onClick={() => setEditing(false)}>Cancel</Button>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  )
}
