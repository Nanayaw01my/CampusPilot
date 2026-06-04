'use client'
import { useState } from 'react'
import AppLayout from '@/components/layout/AppLayout'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import ProgressBar from '@/components/ui/ProgressBar'
import { mockBooks } from '@/lib/mock-data'
import { Search, Filter, BookOpen, Download, Bookmark, Star, Clock, Grid, List, Upload, Eye } from 'lucide-react'

const categories = ['All', 'Computer Science', 'Mathematics', 'Economics', 'Chemistry', 'Engineering', 'Medicine']

const gradients = [
  'from-indigo-500 to-purple-600',
  'from-emerald-500 to-teal-600',
  'from-orange-500 to-red-500',
  'from-blue-500 to-indigo-600',
  'from-pink-500 to-rose-600',
  'from-amber-500 to-yellow-500',
]

export default function LibraryPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [view, setView] = useState<'grid' | 'list'>('grid')

  const filtered = mockBooks.filter(b =>
    (category === 'All' || b.category === category) &&
    (b.title.toLowerCase().includes(search.toLowerCase()) || b.author.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-2">
              <BookOpen className="text-indigo-500" size={24} />
              Digital Library
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{mockBooks.length} books available · {mockBooks.filter(b => b.progress > 0).length} in progress</p>
          </div>
          <Button variant="primary" icon={<Upload size={16} />}>Upload Book</Button>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search books, authors..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
            />
          </div>
          <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
            <button onClick={() => setView('grid')} className={`p-2 rounded-lg transition ${view === 'grid' ? 'bg-white dark:bg-gray-700 shadow-sm' : 'text-gray-400'}`}>
              <Grid size={16} />
            </button>
            <button onClick={() => setView('list')} className={`p-2 rounded-lg transition ${view === 'list' ? 'bg-white dark:bg-gray-700 shadow-sm' : 'text-gray-400'}`}>
              <List size={16} />
            </button>
          </div>
        </div>

        {/* Category tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                category === c
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Books Grid/List */}
        {view === 'grid' ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filtered.map((book, i) => (
              <div key={book.id} className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 card-hover group">
                {/* Cover */}
                <div className={`h-40 bg-gradient-to-br ${gradients[i % gradients.length]} flex items-center justify-center relative`}>
                  <BookOpen size={36} className="text-white/80" />
                  {book.progress > 0 && (
                    <div className="absolute bottom-2 left-2 right-2">
                      <ProgressBar value={book.progress} size="sm" />
                    </div>
                  )}
                  <button className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/20 hover:bg-black/40 text-white transition opacity-0 group-hover:opacity-100">
                    <Bookmark size={12} />
                  </button>
                </div>
                <div className="p-3">
                  <p className="font-semibold text-gray-900 dark:text-white text-xs leading-tight line-clamp-2 mb-1">{book.title}</p>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 truncate mb-2">{book.author}</p>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="primary" size="sm">{book.category.split(' ')[0]}</Badge>
                    <div className="flex items-center gap-0.5 text-[10px] text-amber-500">
                      <Star size={10} className="fill-amber-500" /> {book.rating}
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <button className="flex-1 flex items-center justify-center gap-1 py-1.5 bg-indigo-600 text-white rounded-lg text-[10px] font-semibold hover:bg-indigo-700 transition">
                      <Eye size={10} /> Read
                    </button>
                    <button className="p-1.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition">
                      <Download size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((book, i) => (
              <div key={book.id} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-4 flex gap-4 items-center card-hover">
                <div className={`w-14 h-20 rounded-xl bg-gradient-to-br ${gradients[i % gradients.length]} flex items-center justify-center flex-shrink-0 shadow-md`}>
                  <BookOpen size={22} className="text-white/80" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white text-sm">{book.title}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{book.author}</p>
                    </div>
                    <div className="flex items-center gap-0.5 text-amber-500 flex-shrink-0">
                      <Star size={12} className="fill-amber-500" />
                      <span className="text-xs font-bold">{book.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mt-2">
                    <Badge variant="primary">{book.category}</Badge>
                    <span className="text-xs text-gray-400 flex items-center gap-1"><Clock size={10} />{book.pages} pages</span>
                    <span className="text-xs text-gray-400">{book.downloads} downloads</span>
                  </div>
                  {book.progress > 0 && (
                    <div className="mt-2">
                      <ProgressBar value={book.progress} showPercent size="sm" />
                    </div>
                  )}
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <Button variant="primary" size="sm" icon={<Eye size={14} />}>Read</Button>
                  <Button variant="secondary" size="sm" icon={<Download size={14} />}>Download</Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  )
}
