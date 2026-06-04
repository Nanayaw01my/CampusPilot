'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AppLayout from '@/components/layout/AppLayout'
import Button from '@/components/ui/Button'
import { Settings, Bell, Shield, Palette, Smartphone, Moon, Sun, ChevronRight, Check } from 'lucide-react'
import { isAuthenticated } from '@/lib/api'

export default function SettingsPage() {
  const router = useRouter()
  const [theme, setTheme] = useState<'light' | 'dark' | 'auto'>('light')

  useEffect(() => {
    if (!isAuthenticated()) { router.push('/login'); return }
  }, [router])
  const [notifSettings, setNotifSettings] = useState({
    emailReminders: true, pushReminders: true, newBooks: true, events: true, opportunities: true, announcements: false,
  })

  const toggleNotif = (key: keyof typeof notifSettings) =>
    setNotifSettings(prev => ({ ...prev, [key]: !prev[key] }))

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-2">
            <Settings className="text-indigo-500" size={24} /> Settings
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage your preferences</p>
        </div>

        {/* Appearance */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5">
          <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Palette size={16} className="text-indigo-500" /> Appearance
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {[
              { value: 'light', icon: Sun, label: 'Light' },
              { value: 'dark', icon: Moon, label: 'Dark' },
              { value: 'auto', icon: Smartphone, label: 'Auto' },
            ].map(({ value, icon: Icon, label }) => (
              <button key={value} onClick={() => setTheme(value as any)}
                className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${theme === value ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600' : 'border-gray-200 dark:border-gray-700 text-gray-500 hover:border-gray-300'}`}>
                <Icon size={20} />
                <span className="text-xs font-semibold">{label}</span>
                {theme === value && <Check size={12} className="text-indigo-500" />}
              </button>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5">
          <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Bell size={16} className="text-indigo-500" /> Notifications
          </h3>
          <div className="space-y-3">
            {Object.entries(notifSettings).map(([key, enabled]) => (
              <div key={key} className="flex items-center justify-between py-2 border-b border-gray-50 dark:border-gray-800 last:border-0">
                <div>
                  <p className="text-sm font-medium text-gray-800 dark:text-white capitalize">
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())}
                  </p>
                </div>
                <button onClick={() => toggleNotif(key as any)}
                  className={`relative w-11 h-6 rounded-full transition-colors ${enabled ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'}`}>
                  <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${enabled ? 'translate-x-5' : ''}`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Security */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5">
          <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Shield size={16} className="text-indigo-500" /> Security
          </h3>
          <div className="space-y-2">
            {['Change Password', 'Two-Factor Auth', 'Connected Devices', 'Download My Data'].map(item => (
              <button key={item} className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition text-sm text-gray-700 dark:text-gray-300">
                {item} <ChevronRight size={16} className="text-gray-400" />
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <Button variant="primary">Save Changes</Button>
          <Button variant="danger">Delete Account</Button>
        </div>
      </div>
    </AppLayout>
  )
}
