'use client'
import { useState } from 'react'
import AppLayout from '@/components/layout/AppLayout'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { mockPastQuestions } from '@/lib/mock-data'
import { FileText, Search, Download, Bookmark, Upload, Filter, ChevronRight } from 'lucide-react'

const departments = ['All', 'Computer Science', 'Mathematics', 'Economics', 'Chemistry', 'Engineering', 'Medicine']
const years = ['All', '2023', '2022', '2021', '2020']
const levels = ['All', '100', '200', '300', '400']

export default function PastQuestionsPage() {
  const [search, setSearch] = useState('')
  const [dept, setDept] = useState('All')
  const [year, setYear] = useState('All')
  const [level, setLevel] = useState('All')
  const [saved, setSaved] = useState<Set<string>>(new Set())

  const filtered = mockPastQuestions.filter(q =>
    (dept === 'All' || q.department === dept) &&
    (year === 'All' || q.year === year) &&
    (level === 'All' || q.level === level) &&
    q.course.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-2">
              <FileText className="text-indigo-500" size={24} /> Past Questions
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{mockPastQuestions.length} papers available</p>
          </div>
          <Button variant="primary" icon={<Upload size={16} />}>Upload Questions</Button>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-4 space-y-4">
          <div className="relative">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by course name..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { label: 'Department', options: departments, value: dept, set: setDept },
              { label: 'Year', options: years, value: year, set: setYear },
              { label: 'Level', options: levels, value: level, set: setLevel },
            ].map(({ label, options, value, set }) => (
              <div key={label}>
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 block">{label}</label>
                <select value={value} onChange={e => set(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40">
                  {options.map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
            ))}
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-gray-500 dark:text-gray-400">Showing <strong className="text-gray-900 dark:text-white">{filtered.length}</strong> results</p>

        {/* Questions list */}
        <div className="space-y-3">
          {filtered.map(q => {
            const isSaved = saved.has(q.id)
            return (
              <div key={q.id} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-4 flex gap-4 items-center card-hover group">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-950/50 dark:to-purple-950/50 flex items-center justify-center flex-shrink-0">
                  <FileText size={20} className="text-indigo-600 dark:text-indigo-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 dark:text-white text-sm">{q.course}</h3>
                  <div className="flex flex-wrap gap-2 mt-1.5">
                    <Badge variant="primary">{q.department}</Badge>
                    <Badge variant="info">Level {q.level}</Badge>
                    <Badge variant="success">{q.year}</Badge>
                    <Badge variant="purple">{q.semester} Sem</Badge>
                  </div>
                  <p className="text-xs text-gray-400 mt-1.5 flex items-center gap-1">
                    <Download size={10} /> {q.downloads} downloads
                  </p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => { const s = new Set(saved); isSaved ? s.delete(q.id) : s.add(q.id); setSaved(s) }}
                    className={`p-2 rounded-xl transition ${isSaved ? 'bg-amber-100 text-amber-600 dark:bg-amber-950/40' : 'bg-gray-100 dark:bg-gray-800 text-gray-400 hover:text-amber-500'}`}>
                    <Bookmark size={16} className={isSaved ? 'fill-amber-500' : ''} />
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl text-xs font-bold hover:opacity-90 transition">
                    <Download size={12} /> Download
                  </button>
                </div>
              </div>
            )
          })}
          {filtered.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <FileText size={48} className="mx-auto mb-4 opacity-20" />
              <p className="font-medium text-gray-600 dark:text-gray-300">No questions found</p>
              <p className="text-sm mt-1">Try adjusting your filters</p>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  )
}
