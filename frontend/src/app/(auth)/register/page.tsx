'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Eye, EyeOff, Mail, Lock, User, Compass, ArrowRight, BookOpen } from 'lucide-react'
import Button from '@/components/ui/Button'

const departments = ['Computer Science', 'Engineering', 'Medicine', 'Economics', 'Law', 'Sciences', 'Arts', 'Business']
const levels = ['100', '200', '300', '400', 'Postgraduate']

export default function RegisterPage() {
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({ name: '', email: '', password: '', department: '', level: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (step === 1) { setStep(2); return }
    setLoading(true)
    setTimeout(() => { window.location.href = '/dashboard' }, 1200)
  }

  return (
    <div className="min-h-screen bg-mesh flex items-center justify-center p-4">
      <div className="fixed top-1/4 right-1/6 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl" />
      <div className="fixed bottom-1/3 left-1/6 w-80 h-80 bg-indigo-600/15 rounded-full blur-3xl" />

      <div className="relative w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-2xl border border-white/15 rounded-3xl p-8 shadow-2xl">
          {/* Logo */}
          <div className="text-center mb-6">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/40">
                <Compass className="text-white" size={20} />
              </div>
              <span className="font-bold text-xl text-white">Campus<span className="gradient-text">Pilot</span></span>
            </Link>
            <h1 className="text-2xl font-black text-white mb-1">Create Account</h1>
            <p className="text-gray-400 text-sm">Join thousands of students today</p>
          </div>

          {/* Step indicator */}
          <div className="flex items-center gap-3 mb-6">
            {[1, 2].map(s => (
              <div key={s} className="flex items-center gap-2 flex-1">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${s <= step ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white' : 'bg-white/10 text-gray-500'}`}>
                  {s}
                </div>
                <span className={`text-xs font-medium ${s <= step ? 'text-gray-200' : 'text-gray-500'}`}>
                  {s === 1 ? 'Personal Info' : 'Academic Info'}
                </span>
                {s < 2 && <div className={`flex-1 h-0.5 rounded ${step > s ? 'bg-indigo-500' : 'bg-white/10'}`} />}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {step === 1 ? (
              <>
                <div>
                  <label className="text-sm font-medium text-gray-300 block mb-1.5">Full Name</label>
                  <div className="relative">
                    <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input type="text" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                      placeholder="Your full name"
                      className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/15 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-300 block mb-1.5">Email Address</label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                      placeholder="you@university.edu"
                      className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/15 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-300 block mb-1.5">Password</label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input type={showPass ? 'text' : 'password'} required value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
                      placeholder="Min 8 characters"
                      className="w-full pl-10 pr-10 py-3 bg-white/10 border border-white/15 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm" />
                    <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500">
                      {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="text-sm font-medium text-gray-300 block mb-1.5">Department</label>
                  <div className="relative">
                    <BookOpen size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
                    <select required value={form.department} onChange={e => setForm({ ...form, department: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/15 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm appearance-none">
                      <option value="" className="bg-gray-900">Select department</option>
                      {departments.map(d => <option key={d} value={d} className="bg-gray-900">{d}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-300 block mb-2">Academic Level</label>
                  <div className="grid grid-cols-5 gap-2">
                    {levels.map(l => (
                      <button key={l} type="button" onClick={() => setForm({ ...form, level: l })}
                        className={`py-2 rounded-xl text-xs font-semibold border transition-all ${form.level === l ? 'bg-gradient-to-br from-indigo-500 to-purple-600 border-transparent text-white' : 'bg-white/5 border-white/15 text-gray-300 hover:border-indigo-500/50'}`}>
                        {l === 'Postgraduate' ? 'PG' : `L${l}`}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
                  <p className="text-xs text-indigo-300">
                    By creating an account, you agree to our Terms of Service and Privacy Policy.
                  </p>
                </div>
              </>
            )}

            <Button type="submit" variant="primary" size="lg" loading={loading} className="w-full" iconRight={<ArrowRight size={16} />}>
              {step === 1 ? 'Continue' : loading ? 'Creating account...' : 'Create Account'}
            </Button>

            {step === 2 && (
              <button type="button" onClick={() => setStep(1)} className="w-full text-sm text-gray-400 hover:text-gray-200 transition">
                ← Back
              </button>
            )}
          </form>

          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <p className="text-sm text-gray-400">
              Already have an account?{' '}
              <Link href="/login" className="text-indigo-400 hover:text-indigo-300 font-semibold">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
