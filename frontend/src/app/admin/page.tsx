'use client'
import { useState } from 'react'
import AppLayout from '@/components/layout/AppLayout'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { mockAnalytics, mockUsers } from '@/lib/mock-data'
import {
  Shield, Users, BookOpen, Download, Calendar, TrendingUp,
  ArrowUpRight, BarChart2, PieChart, Activity, Bell, Plus
} from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, PieChart as RPieChart, Pie, Cell, CartesianGrid } from 'recharts'

const COLORS = ['#6366f1', '#a855f7', '#22c55e', '#f59e0b', '#ef4444', '#06b6d4']

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'analytics'>('overview')

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-2">
              <Shield className="text-indigo-500" size={24} /> Admin Dashboard
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Platform overview and management</p>
          </div>
          <Button variant="primary" icon={<Bell size={14} />}>Send Announcement</Button>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Students', value: mockAnalytics.totalUsers.toLocaleString(), icon: Users, change: '+12%', color: 'from-indigo-500 to-purple-600' },
            { label: 'Active Today', value: mockAnalytics.activeToday.toLocaleString(), icon: Activity, change: '+5%', color: 'from-emerald-500 to-teal-600' },
            { label: 'Books Available', value: mockAnalytics.booksUploaded, icon: BookOpen, change: '+8', color: 'from-blue-500 to-indigo-600' },
            { label: 'Total Downloads', value: `${(mockAnalytics.totalDownloads / 1000).toFixed(1)}K`, icon: Download, change: '+34%', color: 'from-amber-500 to-orange-500' },
          ].map(({ label, value, icon: Icon, change, color }) => (
            <div key={label} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5 card-hover">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center`}>
                  <Icon size={18} className="text-white" />
                </div>
                <span className="text-xs font-bold text-emerald-600 flex items-center gap-0.5">
                  <ArrowUpRight size={12} /> {change}
                </span>
              </div>
              <p className="text-2xl font-black text-gray-900 dark:text-white">{value}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 font-medium">{label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2">
          {(['overview', 'users', 'analytics'] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold capitalize transition-all ${activeTab === tab ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'}`}>
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Weekly Activity Chart */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <BarChart2 size={16} className="text-indigo-500" /> Weekly Activity
              </h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={mockAnalytics.weeklyGrowth}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(99,102,241,0.1)" />
                  <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 8px 32px rgba(0,0,0,0.12)', background: 'white' }} />
                  <Bar dataKey="users" name="Users" fill="url(#grad1)" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="downloads" name="Downloads" fill="url(#grad2)" radius={[6, 6, 0, 0]} />
                  <defs>
                    <linearGradient id="grad1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                    <linearGradient id="grad2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#22c55e" />
                      <stop offset="100%" stopColor="#10b981" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Department Distribution */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <PieChart size={16} className="text-indigo-500" /> Students by Department
              </h3>
              <div className="flex items-center gap-4">
                <ResponsiveContainer width="50%" height={180}>
                  <RPieChart>
                    <Pie data={mockAnalytics.departmentStats} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="students" nameKey="dept">
                      {mockAnalytics.departmentStats.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(v: number) => v.toLocaleString()} />
                  </RPieChart>
                </ResponsiveContainer>
                <div className="flex-1 space-y-2">
                  {mockAnalytics.departmentStats.map((d, i) => (
                    <div key={d.dept} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-sm flex-shrink-0" style={{ background: COLORS[i % COLORS.length] }} />
                      <span className="text-xs text-gray-600 dark:text-gray-400 flex-1">{d.dept}</span>
                      <span className="text-xs font-bold text-gray-800 dark:text-gray-200">{d.students.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Top Books */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <TrendingUp size={16} className="text-indigo-500" /> Most Downloaded
              </h3>
              <div className="space-y-3">
                {mockAnalytics.topBooks.map((book, i) => (
                  <div key={book.title} className="flex items-center gap-3">
                    <span className="text-xs font-bold text-gray-400 w-4">{i + 1}</span>
                    <div className="flex-1">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-medium text-gray-700 dark:text-gray-300">{book.title}</span>
                        <span className="text-indigo-600 font-bold">{book.downloads}</span>
                      </div>
                      <div className="h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"
                          style={{ width: `${(book.downloads / 512) * 100}%` }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick actions */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Upload Book', icon: BookOpen, color: 'bg-indigo-100 text-indigo-700' },
                  { label: 'Add Event', icon: Calendar, color: 'bg-purple-100 text-purple-700' },
                  { label: 'Manage Users', icon: Users, color: 'bg-emerald-100 text-emerald-700' },
                  { label: 'Send Notif', icon: Bell, color: 'bg-amber-100 text-amber-700' },
                ].map(({ label, icon: Icon, color }) => (
                  <button key={label} className={`${color} rounded-xl p-4 flex flex-col items-center gap-2 text-xs font-bold hover:opacity-80 transition`}>
                    <Icon size={20} />
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">User Growth Trend</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={mockAnalytics.weeklyGrowth}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(99,102,241,0.1)" />
                  <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#6b7280' }} />
                  <YAxis tick={{ fontSize: 12, fill: '#6b7280' }} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 8px 32px rgba(0,0,0,0.12)', background: 'white' }} />
                  <Line type="monotone" dataKey="users" stroke="#6366f1" strokeWidth={3} dot={{ fill: '#6366f1', r: 5 }} name="Active Users" />
                  <Line type="monotone" dataKey="downloads" stroke="#22c55e" strokeWidth={3} dot={{ fill: '#22c55e', r: 5 }} name="Downloads" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  )
}
