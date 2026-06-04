'use client'
import { useState } from 'react'
import AppLayout from '@/components/layout/AppLayout'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { mockEvents } from '@/lib/mock-data'
import { formatDate, getDaysUntil } from '@/lib/utils'
import { Calendar, MapPin, Users, Clock, Search, Filter, Plus, Bell, ChevronRight } from 'lucide-react'

const eventTypes = ['All', 'Conference', 'Workshop', 'Sports', 'Career', 'Academic', 'Cultural']
const typeColors: Record<string, string> = {
  Conference: 'primary', Workshop: 'info', Sports: 'success', Career: 'warning', Academic: 'purple', Cultural: 'danger',
}
const eventGradients: Record<string, string> = {
  Conference: 'from-indigo-500 to-purple-600', Workshop: 'from-blue-500 to-cyan-600',
  Sports: 'from-emerald-500 to-teal-600', Career: 'from-amber-500 to-orange-500',
  Academic: 'from-violet-500 to-purple-700', Cultural: 'from-pink-500 to-rose-600',
}

export default function EventsPage() {
  const [search, setSearch] = useState('')
  const [type, setType] = useState('All')

  const filtered = mockEvents.filter(e =>
    (type === 'All' || e.type === type) &&
    e.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-2">
              <Calendar className="text-indigo-500" size={24} /> Campus Events
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{mockEvents.length} upcoming events</p>
          </div>
          <Button variant="primary" icon={<Plus size={16} />}>Create Event</Button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search events..."
            className="w-full max-w-md pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40" />
        </div>

        {/* Type tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {eventTypes.map(t => (
            <button key={t} onClick={() => setType(t)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${type === t ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'}`}>
              {t}
            </button>
          ))}
        </div>

        {/* Featured Event */}
        {filtered[0] && (
          <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${eventGradients[filtered[0].type] || 'from-indigo-500 to-purple-600'} p-6 text-white shadow-xl`}>
            <div className="absolute inset-0 opacity-20">
              <div className="absolute -top-8 -right-8 w-40 h-40 bg-white rounded-full" />
            </div>
            <div className="relative">
              <Badge variant="success" className="mb-3">{filtered[0].type}</Badge>
              <h2 className="text-xl sm:text-2xl font-black mb-2">{filtered[0].title}</h2>
              <p className="text-white/80 text-sm mb-4">{filtered[0].description}</p>
              <div className="flex flex-wrap gap-4 text-sm mb-5">
                <span className="flex items-center gap-1.5"><Calendar size={14} /> {formatDate(filtered[0].date)}</span>
                <span className="flex items-center gap-1.5"><Clock size={14} /> {filtered[0].time}</span>
                <span className="flex items-center gap-1.5"><MapPin size={14} /> {filtered[0].location}</span>
                <span className="flex items-center gap-1.5"><Users size={14} /> {filtered[0].registered}/{filtered[0].capacity}</span>
              </div>
              <div className="flex gap-3">
                <Button size="md" className="bg-white text-indigo-700 hover:bg-white/90 font-bold">Register Now</Button>
                <Button size="md" className="bg-white/20 hover:bg-white/30 border-white/30 text-white" icon={<Bell size={14} />}>Remind Me</Button>
              </div>
            </div>
          </div>
        )}

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.slice(1).map(event => {
            const daysLeft = getDaysUntil(event.date)
            const capacity = Math.round((event.registered / event.capacity) * 100)
            return (
              <div key={event.id} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden card-hover group">
                <div className={`h-28 bg-gradient-to-br ${eventGradients[event.type] || 'from-indigo-500 to-purple-600'} flex items-center justify-center relative`}>
                  <Calendar size={36} className="text-white/60" />
                  <div className="absolute top-3 right-3">
                    <Badge variant={typeColors[event.type] as any}>{event.type}</Badge>
                  </div>
                  {daysLeft <= 7 && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {daysLeft}d left!
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-2 line-clamp-2">{event.title}</h3>
                  <div className="space-y-1.5 mb-3">
                    <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1.5"><Calendar size={11} /> {formatDate(event.date)} · {event.time}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1.5"><MapPin size={11} /> {event.location}</p>
                  </div>
                  {/* Capacity bar */}
                  <div className="mb-3">
                    <div className="flex justify-between text-[10px] text-gray-400 mb-1">
                      <span className="flex items-center gap-1"><Users size={9} /> {event.registered} registered</span>
                      <span>{capacity}% full</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${capacity > 80 ? 'bg-red-500' : capacity > 60 ? 'bg-amber-500' : 'bg-emerald-500'}`} style={{ width: `${capacity}%` }} />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold rounded-xl hover:opacity-90 transition">Register</button>
                    <button className="p-2 bg-gray-100 dark:bg-gray-800 text-gray-500 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition">
                      <Bell size={14} />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </AppLayout>
  )
}
