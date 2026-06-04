'use client'
import AppLayout from '@/components/layout/AppLayout'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import ProgressBar from '@/components/ui/ProgressBar'
import Button from '@/components/ui/Button'
import { mockUser, mockStats, mockBooks, mockEvents, mockReminders, mockOpportunities } from '@/lib/mock-data'
import { formatDate, getDaysUntil } from '@/lib/utils'
import {
  BookOpen, Headphones, FileText, Calendar, Briefcase, Bell,
  TrendingUp, ArrowRight, Clock, Star, Flame, Target,
  ChevronRight, Plus, Zap
} from 'lucide-react'
import Link from 'next/link'

const statCards = [
  { label: 'Books Read', value: mockStats.booksRead, icon: BookOpen, color: 'from-indigo-500 to-purple-600', bg: 'bg-indigo-50 dark:bg-indigo-950/40', change: '+3 this week' },
  { label: 'Q-Papers', value: mockStats.questionsDownloaded, icon: FileText, color: 'from-violet-500 to-purple-600', bg: 'bg-violet-50 dark:bg-violet-950/40', change: '+8 this week' },
  { label: 'Events', value: mockStats.eventsAttended, icon: Calendar, color: 'from-emerald-500 to-teal-600', bg: 'bg-emerald-50 dark:bg-emerald-950/40', change: '+2 this month' },
  { label: 'Saved Opps', value: mockStats.savedOpportunities, icon: Briefcase, color: 'from-orange-500 to-amber-500', bg: 'bg-orange-50 dark:bg-orange-950/40', change: 'New: 2 deadlines' },
]

const upcomingReminders = mockReminders.filter(r => !r.completed).slice(0, 3)
const upcomingEvents = mockEvents.slice(0, 3)
const recentBooks = mockBooks.filter(b => b.progress > 0)
const featuredOpp = mockOpportunities[0]

const priorityColors: Record<string, string> = {
  urgent: 'danger',
  high: 'warning',
  medium: 'primary',
  low: 'success',
}

export default function DashboardPage() {
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

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
                {mockStats.readingStreak} day streak!
              </p>
              <h1 className="text-2xl sm:text-3xl font-black text-white mb-1 font-display">
                {greeting}, {mockUser.name.split(' ')[0]}! 👋
              </h1>
              <p className="text-indigo-200 text-sm">
                {mockUser.department} · Level {mockUser.level} · Here&apos;s your overview
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
                    Currently Reading
                  </h2>
                  <Link href="/library" className="text-sm text-indigo-600 dark:text-indigo-400 font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                    View all <ChevronRight size={14} />
                  </Link>
                </div>
                <div className="space-y-4">
                  {recentBooks.map(book => (
                    <div key={book.id} className="flex gap-4 items-start">
                      <div className={`w-12 h-16 rounded-lg bg-gradient-to-br flex-shrink-0 flex items-center justify-center shadow-md ${
                        ['from-indigo-500 to-purple-600', 'from-emerald-500 to-teal-600', 'from-orange-500 to-red-500'][+book.id % 3]
                      }`}>
                        <BookOpen size={18} className="text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 dark:text-white text-sm truncate">{book.title}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{book.author}</p>
                        <ProgressBar value={book.progress} showPercent size="sm" animated />
                        <p className="text-xs text-gray-400 mt-1">{Math.round(book.pages * book.progress / 100)} of {book.pages} pages</p>
                      </div>
                      <Link href="/library" className="text-indigo-500 hover:text-indigo-600">
                        <ArrowRight size={16} />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="space-y-4">
            {/* Streak Card */}
            <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-5 text-white shadow-lg">
              <div className="flex items-center gap-2 mb-2">
                <Flame size={20} className="text-amber-200" />
                <span className="font-bold">Reading Streak</span>
              </div>
              <p className="text-4xl font-black">{mockStats.readingStreak}</p>
              <p className="text-amber-200 text-sm mt-0.5">consecutive days 🔥</p>
              <div className="flex gap-1.5 mt-3">
                {Array(7).fill(0).map((_, i) => (
                  <div key={i} className={`flex-1 h-1.5 rounded-full ${i < mockStats.readingStreak % 7 ? 'bg-white' : 'bg-white/30'}`} />
                ))}
              </div>
            </div>

            {/* Quick Links */}
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
              <div className="space-y-3">
                {upcomingReminders.map(r => {
                  const days = getDaysUntil(r.dueDate)
                  return (
                    <div key={r.id} className="flex gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        r.priority === 'urgent' ? 'bg-red-100 text-red-600' :
                        r.priority === 'high' ? 'bg-amber-100 text-amber-600' :
                        'bg-indigo-100 text-indigo-600'
                      }`}>
                        <Target size={14} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-gray-800 dark:text-white truncate">{r.title}</p>
                        <p className="text-[10px] text-gray-500 mt-0.5 flex items-center gap-1">
                          <Clock size={10} />
                          {days <= 0 ? 'Today!' : days === 1 ? 'Tomorrow' : `${days} days left`}
                        </p>
                      </div>
                      <Badge variant={priorityColors[r.priority] as any} size="sm">{r.priority}</Badge>
                    </div>
                  )
                })}
              </div>
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
              <div className="space-y-3">
                {upcomingEvents.map(event => (
                  <div key={event.id} className="flex gap-3 items-start">
                    <div className="w-10 text-center flex-shrink-0">
                      <div className="text-lg font-black text-indigo-600 leading-none">{new Date(event.date).getDate()}</div>
                      <div className="text-[10px] text-gray-400 uppercase">{new Date(event.date).toLocaleString('en', { month: 'short' })}</div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-800 dark:text-white truncate">{event.title}</p>
                      <p className="text-[10px] text-gray-500 flex items-center gap-1 mt-0.5">
                        <Clock size={9} /> {event.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Featured Opportunity */}
          <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-violet-700 rounded-2xl p-5 text-white shadow-xl">
            <div className="flex items-center gap-2 mb-3">
              <Star size={14} className="text-amber-300" />
              <span className="text-xs font-semibold text-indigo-200">Featured Opportunity</span>
            </div>
            <h3 className="font-bold text-base mb-1">{featuredOpp.title}</h3>
            <p className="text-indigo-200 text-xs mb-1">{featuredOpp.provider}</p>
            <Badge variant="success" className="mb-3">{featuredOpp.type}</Badge>
            <p className="text-xs text-indigo-200 leading-relaxed mb-4 line-clamp-2">{featuredOpp.description}</p>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-indigo-300">Deadline</p>
                <p className="text-sm font-bold">{formatDate(featuredOpp.deadline)}</p>
              </div>
              <Link href="/opportunities">
                <button className="bg-white/20 hover:bg-white/30 transition px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1">
                  Apply <ArrowRight size={12} />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
