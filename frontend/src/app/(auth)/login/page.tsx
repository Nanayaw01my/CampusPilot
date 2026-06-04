'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Eye, EyeOff, Mail, Lock, Compass, ArrowRight, Sparkles } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

export default function LoginPage() {
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ email: '', password: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      window.location.href = '/dashboard'
    }, 1200)
  }

  return (
    <div className="min-h-screen bg-mesh flex items-center justify-center p-4">
      {/* Orbs */}
      <div className="fixed top-1/4 left-1/6 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl" />
      <div className="fixed bottom-1/4 right-1/6 w-80 h-80 bg-purple-600/15 rounded-full blur-3xl" />

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="bg-white/10 backdrop-blur-2xl border border-white/15 rounded-3xl p-8 shadow-2xl">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/40">
                <Compass className="text-white" size={20} />
              </div>
              <span className="font-bold text-xl text-white">Campus<span className="gradient-text">Pilot</span></span>
            </Link>
            <h1 className="text-2xl font-black text-white mb-1">Welcome back!</h1>
            <p className="text-gray-400 text-sm">Sign in to your account to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-300 block mb-1.5">Email Address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  placeholder="you@university.edu"
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/15 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 text-sm transition"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-sm font-medium text-gray-300">Password</label>
                <Link href="/forgot-password" className="text-xs text-indigo-400 hover:text-indigo-300">Forgot password?</Link>
              </div>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type={showPass ? 'text' : 'password'}
                  required
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-3 bg-white/10 border border-white/15 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 text-sm transition"
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300">
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              className="w-full mt-2"
              iconRight={<ArrowRight size={16} />}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <p className="text-sm text-gray-400">
              Don&apos;t have an account?{' '}
              <Link href="/register" className="text-indigo-400 hover:text-indigo-300 font-semibold transition">
                Create one free
              </Link>
            </p>
          </div>

          {/* Demo login */}
          <div className="mt-4 p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
            <p className="text-xs text-indigo-300 text-center font-medium flex items-center justify-center gap-1">
              <Sparkles size={12} />
              Demo: Use any email and password to explore
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
