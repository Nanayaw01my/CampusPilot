'use client'
import { useState } from 'react'
import AppLayout from '@/components/layout/AppLayout'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { mockReminders } from '@/lib/mock-data'
import { formatDate, formatTime, getDaysUntil } from '@/lib/utils'
import { Bell, Plus, Check, Trash2, Clock, BookOpen, FileText, Calendar, Target, ChevronDown } from 'lucide-react'

const typeIcons: Record<string, React.ElementType> = {
  assignment: FileText, exam: BookOpen, event: Calendar, study: Target, deadline: Clock,
}
const typeColors: Record<string, string> = {
  assignment: 'bg-blue-100 text-blue-600', exam: 'bg-red-100 text-red-600',
  event: 'bg-purple-100 text-purple-600', study: 'bg-emerald-100 text-emerald-600',
  deadline: 'bg-amber-100 text-amber-600',
}
const priorityVariants: Record<string, string> = { urgent: 'danger', high: 'warning', medium: 'primary', low: 'success' }

export default function RemindersPage() {
  const [reminders, setReminders] = useState(mockReminders)
  const [showAdd, setShowAdd] = useState(false)
  const [filter, setFilter] = useState<'all' | 'pending' | 'done'>('all')
  const [form, setForm] = useState({ title: '', type: 'assignment', dueDate: '', priority: 'medium', notifyEmail: true, notifyPush: true })

  const filtered = reminders.filter(r =>
    filter === 'all' ? true : filter === 'pending' ? !r.completed : r.completed
  )

  const toggle = (id: string) => setReminders(r => r.map(x => x.id === id ? { ...x, completed: !x.completed } : x))
  const remove = (id: string) => setReminders(r => r.filter(x => x.id !== id))

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-2">
              <Bell className="text-indigo-500" size={24} /> Reminders
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {reminders.filter(r => !r.completed).length} pending · {reminders.filter(r => r.completed).length} completed
            </p>
          </div>
          <Button variant="primary" icon={<Plus size={16} />} onClick={() => setShowAdd(true)}>Add Reminder</Button>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Pending', count: reminders.filter(r => !r.completed).length, color: 'bg-amber-50 dark:bg-amber-950/30 text-amber-600 border-amber-200 dark:border-amber-800' },
            { label: 'Completed', count: reminders.filter(r => r.completed).length, color: 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 border-emerald-200 dark:border-emerald-800' },
            { label: 'This Week', count: reminders.filter(r => getDaysUntil(r.dueDate) <= 7 && getDaysUntil(r.dueDate) >= 0).length, color: 'bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 border-indigo-200 dark:border-indigo-800' },
          ].map(({ label, count, color }) => (
            <div key={label} className={`rounded-2xl border p-4 text-center ${color}`}>
              <p className="text-2xl font-black">{count}</p>
              <p className="text-xs font-semibold mt-0.5 opacity-80">{label}</p>
            </div>
          ))}
        </div>

        {/* Add form */}
        {showAdd && (
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5 shadow-lg">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">New Reminder</h3>
            <div className="space-y-3">
              <input placeholder="Reminder title..." value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40" />
              <div className="grid grid-cols-2 gap-3">
                <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}
                  className="px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40">
                  {['assignment', 'exam', 'event', 'study', 'deadline'].map(t => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
                </select>
                <select value={form.priority} onChange={e => setForm({ ...form, priority: e.target.value })}
                  className="px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40">
                  {['urgent', 'high', 'medium', 'low'].map(p => <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>)}
                </select>
              </div>
              <input type="datetime-local" value={form.dueDate} onChange={e => setForm({ ...form, dueDate: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40" />
              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.notifyEmail} onChange={e => setForm({ ...form, notifyEmail: e.target.checked })} className="w-4 h-4 accent-indigo-600" />
                  Email notify
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.notifyPush} onChange={e => setForm({ ...form, notifyPush: e.target.checked })} className="w-4 h-4 accent-indigo-600" />
                  Push notify
                </label>
              </div>
              <div className="flex gap-3">
                <Button variant="primary" className="flex-1" onClick={() => {
                  if (form.title) {
                    setReminders(prev => [...prev, { id: Date.now().toString(), ...form, completed: false }])
                    setForm({ title: '', type: 'assignment', dueDate: '', priority: 'medium', notifyEmail: true, notifyPush: true })
                    setShowAdd(false)
                  }
                }}>Save Reminder</Button>
                <Button variant="secondary" onClick={() => setShowAdd(false)}>Cancel</Button>
              </div>
            </div>
          </div>
        )}

        {/* Filter tabs */}
        <div className="flex gap-2">
          {(['all', 'pending', 'done'] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all capitalize ${filter === f ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'}`}>
              {f === 'done' ? 'Completed' : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Reminders list */}
        <div className="space-y-3">
          {filtered.map(r => {
            const Icon = typeIcons[r.type] || Bell
            const days = getDaysUntil(r.dueDate)
            return (
              <div key={r.id} className={`bg-white dark:bg-gray-900 rounded-2xl border p-4 flex gap-4 items-start transition-all ${r.completed ? 'opacity-60 border-gray-100 dark:border-gray-800' : 'border-gray-100 dark:border-gray-800 shadow-sm'}`}>
                <button onClick={() => toggle(r.id)}
                  className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition ${r.completed ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-gray-300 dark:border-gray-600 hover:border-indigo-500'}`}>
                  {r.completed && <Check size={12} />}
                </button>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${typeColors[r.type] || 'bg-gray-100 text-gray-600'}`}>
                  <Icon size={14} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`font-semibold text-sm ${r.completed ? 'line-through text-gray-400' : 'text-gray-900 dark:text-white'}`}>{r.title}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 flex items-center gap-1">
                    <Clock size={10} />
                    {formatDate(r.dueDate)} · {formatTime(r.dueDate)}
                    {!r.completed && days <= 3 && days >= 0 && (
                      <span className="text-red-500 font-semibold ml-1">({days === 0 ? 'Today!' : `${days}d left`})</span>
                    )}
                  </p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <Badge variant={priorityVariants[r.priority] as any} size="sm">{r.priority}</Badge>
                    <span className="text-[10px] text-gray-400 capitalize">{r.type}</span>
                  </div>
                </div>
                <button onClick={() => remove(r.id)} className="p-1.5 text-gray-400 hover:text-red-500 transition flex-shrink-0">
                  <Trash2 size={14} />
                </button>
              </div>
            )
          })}
          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <Bell size={40} className="mx-auto mb-3 opacity-30" />
              <p className="font-medium">No reminders here</p>
              <p className="text-sm mt-1">Add a reminder to get started</p>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  )
}
