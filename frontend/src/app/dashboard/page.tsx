'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AppLayout from '@/components/layout/AppLayout'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import ProgressBar from '@/components/ui/ProgressBar'
import Button from '@/components/ui/Button'
import { formatDate, getDaysUntil } from '@/lib/utils'
import { authApi, libraryApi, eventsApi, remindersApi, opportunitiesApi, isAuthenticated } from '@/lib/api'
import {
  BookOpen, Headphones, FileText, Calendar, Briefcase, Bell,
  TrendingUp, ArrowRight, Clock, Star, Flame, Target,
  ChevronRight, Plus, Zap
} from 'lucide-react'
import Link from 'next/link'

const gradients = ['from-indigo-500 to-purple-600', 'from-emerald-500 to-teal-600', 'from-orange-500 to-red-500']
const priorityColors: Record<string, string> = { urgent: 'danger', high: 'warning', medium: 'primary', low: 'success' }

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<Record<string, unknown> | null>(null)
  const [books, setBooks] = useState<Record<string, unknown>[]>([])
  const [events, setEvents] = useState<Record<string, unknown>[]>([])
  const [reminders, setReminders] = useState<Record<string, unknown>[]>([])
  const [featuredOpp, setFeaturedOpp] = useState<Record<string, unknown> | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isAuthenticated()) { router.push('/login'); return }
    Promise.all([
      authApi.me(),
      libraryApi.list({ per_page: 5 }),
      eventsApi.list({ per_page: 3 }),
      remindersApi.list(),
      opportunitiesApi.list({ per_page: 1 }),
    ]).then(([userRes, booksRes, eventsRes, remindersRes, oppsRes]) => {
      setUser(userRes.data)
      setBooks(booksRes.data.data || [])
      setEvents(eventsRes.data.data || [])
      setReminders(remindersRes.data || [])
      setFeaturedOpp((oppsRes.data.data || [])[0] || null)
    }).catch(() => {
      router.push('/login')
    }).finally(() => setLoading(false))
  }, [router])

  if (loading) return (
    <AppLayout>
      <div className="flex items-center justify-center h-64">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    </AppLayout>
  )

  if (!user) return null

  const userName = (user.name as string) || 'Student'
  const dept = (user.department as string) || ''
  const level = (user.level as string) || ''
  const readingProgress = (user.reading_progress as Record<string, number>) || {}
  const bookmarks = (user.bookmarks as string[]) || []
  const savedOpps = (user.saved_opportunities as string[]) || []
  const savedQs = (user.saved_questions as string[]) || []

  const booksInProgress = books.filter(b => readingProgress[b.id as string] > 0)

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  const upcomingReminders = (reminders as Record<string, unknown>[])
    .filter(r => !r.completed)
    .slice(0, 3)

  const statCards = [
    { label: 'Books Saved', value: bookmarks.length, icon: BookOpen, color: 'from-indigo-500 to-purple-600', bg: 'bg-indigo-50 dark:bg-indigo-950/40', change: 'In your library' },
    { label: 'Q-Papers Saved', value: savedQs.length, icon: FileText, color: 'from-violet-500 to-purple-600', bg: 'bg-violet-50 dark:bg-violet-950/40', change: 'Downloaded' },
    { label: 'Events Available', value: events.length, icon: Calendar, color: 'from-emerald-500 to-teal-600', bg: 'bg-emerald-50 dark:bg-emerald-950/40', change: 'Upcoming' },
    { label: 'Saved Opps', value: savedOpps.length, icon: Briefcase, color: 'from-orange-500 to-amber-500', bg: 'bg-orange-50 dark:bg-orange-950/40', change: 'Check deadlines' },
  ]

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Welcome Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-violet-700 p-6 shadow-xl">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full translate-x-32 -translate-y-32" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full -translate-x-24 translate-y-24" />
          </div>
          <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-indigo-200 text-sm font-medium flex items-center gap-1.5 mb-1">
                <Flame size={14} className="text-amber-300" />
                Welcome to CampusPilot!
              </p>
              <h1 className="text-2xl sm:text-3xl font-black text-white mb-1 font-display">
                {greeting}, {userName.split(' ')[0]}! 👋
              </h1>
              <p className="text-indigo-200 text-sm">
                {dept}{level ? ` · Level ${level}` : ''} · Here&apos;s your overview
              </p>
            </div>
            <div className="flex gap-3">
              <Link href="/library">
                <Button variant="primary" size="sm" className="bg-white/20 hover:bg-white/30 border-white/30" icon={<BookOpen size={14} />}>
                  Library
                </Button>
              </Link>
              <Link href="/reminders">
                <Button size="sm" className="bg-white text-indigo-700 hover:bg-white/90 font-bold" icon={<Plus size={14} />}>
                  Add Reminder
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map(({ label, value, icon: Icon, color, bg, change }) => (
            <div key={label} className={`${bg} rounded-2xl p-4 border border-gray-100 dark:border-gray-800 card-hover`}>
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-md`}>
                  <Icon size={18} className="text-white" />
                </div>
                <TrendingUp size={14} className="text-emerald-500 mt-1" />
              </div>
              <p className="text-2xl font-black text-gray-900 dark:text-white">{value}</p>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mt-0.5">{label}</p>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">{change}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Reading Progress */}
          <div className="lg:col-span-2">
            <Card>
              <div className="p-5">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <BookOpen size={18} className="text-indigo-500" />
                    {booksInProgress.length > 0 ? 'Currently Reading' : 'Available Books'}
                  </h2>
                  <Link href="/library" className="text-sm text-indigo-600 dark:text-indigo-400 font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                    View all <ChevronRight size={14} />
                  </Link>
                </div>
                {books.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    <BookOpen size={32} className="mx-auto mb-2 opacity-40" />
                    <p className="text-sm">No books yet. Visit the library to get started!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {(booksInProgress.length > 0 ? booksInProgress : books).slice(0, 3).map((book, i) => {
                      const progress = readingProgress[book.id as string] || 0
                      const pages = (book.pages as number) || 100
                      const pct = Math.min(100, Math.round((progress / pages) * 100))
                      return (
                        <div key={book.id as string} className="flex gap-4 items-start">
                          <div className={`w-12 h-16 rounded-lg bg-gradient-to-br flex-shrink-0 flex items-center justify-center shadow-md ${gradients[i % 3]}`}>
                            <BookOpen size={18} className="text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-gray-900 dark:text-white text-sm truncate">{book.title as string}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{book.author as string}</p>
                            {pct > 0 && <ProgressBar value={pct} showPercent size="sm" animated />}
                            <p className="text-xs text-gray-400 mt-1">{book.category as string}</p>
                          </div>
                          <Link href="/library" className="text-indigo-500 hover:text-indigo-600">
                            <ArrowRight size={16} />
                          </Link>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-5 text-white shadow-lg">
              <div className="flex items-center gap-2 mb-2">
                <Flame size={20} className="text-amber-200" />
                <span className="font-bold">Quick Stats</span>
              </div>
              <p className="text-4xl font-black">{books.length}</p>
              <p className="text-amber-200 text-sm mt-0.5">books available 📚</p>
              <div className="flex gap-1.5 mt-3">
                {Array(7).fill(0).map((_, i) => (
                  <div key={i} className={`flex-1 h-1.5 rounded-full ${i < Math.min(7, books.length) ? 'bg-white' : 'bg-white/30'}`} />
                ))}
              </div>
            </div>

            <Card>
              <div className="p-4">
                <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-3 flex items-center gap-2">
                  <Zap size={16} className="text-indigo-500" />
                  Quick Access
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { icon: Headphones, label: 'Audio', href: '/audio', color: 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600' },
                    { icon: FileText, label: 'Past Q.', href: '/past-questions', color: 'bg-purple-100 dark:bg-purple-950/40 text-purple-600' },
                    { icon: Calendar, label: 'Events', href: '/events', color: 'bg-blue-100 dark:bg-blue-950/40 text-blue-600' },
                    { icon: Star, label: 'Opps', href: '/opportunities', color: 'bg-amber-100 dark:bg-amber-950/40 text-amber-600' },
                  ].map(({ icon: Icon, label, href, color }) => (
                    <Link key={label} href={href} className={`${color} rounded-xl p-3 flex flex-col items-center gap-1.5 text-xs font-semibold hover:opacity-80 transition`}>
                      <Icon size={18} />
                      {label}
                    </Link>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Upcoming Reminders */}
          <Card>
            <div className="p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <Bell size={16} className="text-indigo-500" />
                  Reminders
                </h2>
                <Link href="/reminders" className="text-xs text-indigo-600 font-semibold">View all</Link>
              </div>
              {upcomingReminders.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-4">No pending reminders</p>
              ) : (
                <div className="space-y-3">
                  {upcomingReminders.map((r) => {
                    const days = getDaysUntil(r.due_date as string)
                    return (
                      <div key={r.id as string} className="flex gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          r.priority === 'urgent' ? 'bg-red-100 text-red-600' :
                          r.priority === 'high' ? 'bg-amber-100 text-amber-600' :
                          'bg-indigo-100 text-indigo-600'
                        }`}>
                          <Target size={14} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-gray-800 dark:text-white truncate">{r.title as string}</p>
                          <p className="text-[10px] text-gray-500 mt-0.5 flex items-center gap-1">
                            <Clock size={10} />
                            {days <= 0 ? 'Today!' : days === 1 ? 'Tomorrow' : `${days} days left`}
                          </p>
                        </div>
                        <Badge variant={priorityColors[r.priority as string] as 'danger' | 'warning' | 'primary' | 'success'} size="sm">{r.priority as string}</Badge>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </Card>

          {/* Upcoming Events */}
          <Card>
            <div className="p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <Calendar size={16} className="text-indigo-500" />
                  Events
                </h2>
                <Link href="/events" className="text-xs text-indigo-600 font-semibold">View all</Link>
              </div>
              {events.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-4">No upcoming events</p>
              ) : (
                <div className="space-y-3">
                  {events.slice(0, 3).map(event => (
                    <div key={event.id as string} className="flex gap-3 items-start">
                      <div className="w-10 text-center flex-shrink-0">
                        <div className="text-lg font-black text-indigo-600 leading-none">{new Date(event.date as string).getDate()}</div>
                        <div className="text-[10px] text-gray-400 uppercase">{new Date(event.date as string).toLocaleString('en', { month: 'short' })}</div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-gray-800 dark:text-white truncate">{event.title as string}</p>
                        <p className="text-[10px] text-gray-500 flex items-center gap-1 mt-0.5">
                          <Clock size={9} /> {event.time as string}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Card>

          {/* Featured Opportunity */}
          {featuredOpp ? (
            <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-violet-700 rounded-2xl p-5 text-white shadow-xl">
              <div className="flex items-center gap-2 mb-3">
                <Star size={14} className="text-amber-300" />
                <span className="text-xs font-semibold text-indigo-200">Featured Opportunity</span>
              </div>
              <h3 className="font-bold text-base mb-1">{featuredOpp.title as string}</h3>
              <p className="text-indigo-200 text-xs mb-1">{featuredOpp.provider as string}</p>
              <Badge variant="success" className="mb-3">{featuredOpp.type as string}</Badge>
              <p className="text-xs text-indigo-200 leading-relaxed mb-4 line-clamp-2">{featuredOpp.description as string}</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-indigo-300">Deadline</p>
                  <p className="text-sm font-bold">{formatDate(featuredOpp.deadline as string)}</p>
                </div>
                <Link href="/opportunities">
                  <button className="bg-white/20 hover:bg-white/30 transition px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1">
                    Apply <ArrowRight size={12} />
                  </button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-violet-700 rounded-2xl p-5 text-white shadow-xl flex items-center justify-center">
              <Link href="/opportunities" className="text-indigo-200 text-sm font-semibold hover:text-white transition">
                Browse Opportunities →
              </Link>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  )
}
