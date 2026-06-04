'use client'
import { useState } from 'react'
import AppLayout from '@/components/layout/AppLayout'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { mockOpportunities } from '@/lib/mock-data'
import { formatDate, getDaysUntil } from '@/lib/utils'
import { Briefcase, Search, MapPin, DollarSign, Clock, Bookmark, ExternalLink, Star, Filter } from 'lucide-react'

const oppTypes = ['All', 'Scholarship', 'Internship', 'Competition', 'Grant', 'Exchange']
const typeColors: Record<string, string> = {
  Scholarship: 'from-amber-500 to-yellow-500',
  Internship: 'from-blue-500 to-indigo-600',
  Competition: 'from-pink-500 to-rose-600',
  Grant: 'from-emerald-500 to-teal-600',
  Exchange: 'from-violet-500 to-purple-600',
}
const typeBadge: Record<string, string> = {
  Scholarship: 'warning', Internship: 'info', Competition: 'danger', Grant: 'success', Exchange: 'purple',
}

export default function OpportunitiesPage() {
  const [search, setSearch] = useState('')
  const [type, setType] = useState('All')
  const [saved, setSaved] = useState<Set<string>>(new Set(mockOpportunities.filter(o => o.saved).map(o => o.id)))

  const filtered = mockOpportunities.filter(o =>
    (type === 'All' || o.type === type) &&
    (o.title.toLowerCase().includes(search.toLowerCase()) || o.provider.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-2">
              <Briefcase className="text-indigo-500" size={24} /> Opportunities
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Scholarships, internships, grants & more</p>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" icon={<Filter size={14} />}>Filter</Button>
            <Button variant="primary" icon={<Star size={14} />}>Saved ({saved.size})</Button>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search opportunities, providers..."
            className="w-full max-w-md pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40" />
        </div>

        {/* Type tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {oppTypes.map(t => (
            <button key={t} onClick={() => setType(t)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${type === t ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'}`}>
              {t}
            </button>
          ))}
        </div>

        {/* Opportunities */}
        <div className="grid md:grid-cols-2 gap-5">
          {filtered.map(opp => {
            const daysLeft = getDaysUntil(opp.deadline)
            const isSaved = saved.has(opp.id)
            return (
              <div key={opp.id} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden card-hover group">
                {/* Top accent bar */}
                <div className={`h-1.5 bg-gradient-to-r ${typeColors[opp.type] || 'from-indigo-500 to-purple-600'}`} />
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white text-base leading-tight mb-1">{opp.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{opp.provider}</p>
                    </div>
                    <button
                      onClick={() => {
                        const s = new Set(saved)
                        isSaved ? s.delete(opp.id) : s.add(opp.id)
                        setSaved(s)
                      }}
                      className={`p-2 rounded-xl transition flex-shrink-0 ${isSaved ? 'bg-amber-100 text-amber-600' : 'bg-gray-100 dark:bg-gray-800 text-gray-400 hover:text-amber-500'}`}
                    >
                      <Bookmark size={16} className={isSaved ? 'fill-amber-500' : ''} />
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge variant={typeBadge[opp.type] as any}>{opp.type}</Badge>
                    {daysLeft <= 14 && (
                      <Badge variant="danger" className="flex items-center gap-1">
                        <Clock size={10} /> {daysLeft}d left
                      </Badge>
                    )}
                  </div>

                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4 line-clamp-2">{opp.description}</p>

                  <div className="grid grid-cols-2 gap-3 mb-4 text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1.5">
                      <MapPin size={12} className="text-indigo-400" /> {opp.location}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <DollarSign size={12} className="text-emerald-400" /> {opp.stipend}
                    </div>
                    <div className="flex items-center gap-1.5 col-span-2">
                      <Clock size={12} className="text-amber-400" /> Deadline: <strong className={daysLeft <= 7 ? 'text-red-500' : 'text-gray-700 dark:text-gray-200'}>{formatDate(opp.deadline)}</strong>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-bold rounded-xl hover:opacity-90 transition flex items-center justify-center gap-1.5">
                      Apply Now <ExternalLink size={12} />
                    </button>
                    <button className="px-3 py-2.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-xl text-xs font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition">
                      Details
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
