'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Mail, Compass, ArrowLeft, CheckCircle } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => { setLoading(false); setSent(true) }, 1500)
  }

  return (
    <div className="min-h-screen bg-mesh flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-2xl border border-white/15 rounded-3xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
                <Compass className="text-white" size={20} />
              </div>
              <span className="font-bold text-xl text-white">Campus<span className="gradient-text">Pilot</span></span>
            </Link>

            {sent ? (
              <>
                <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={32} className="text-emerald-400" />
                </div>
                <h1 className="text-2xl font-black text-white mb-2">Check your inbox!</h1>
                <p className="text-gray-400 text-sm">We sent a password reset link to <strong className="text-white">{email}</strong></p>
              </>
            ) : (
              <>
                <h1 className="text-2xl font-black text-white mb-2">Forgot Password?</h1>
                <p className="text-gray-400 text-sm">Enter your email and we&apos;ll send you a reset link</p>
              </>
            )}
          </div>

          {!sent ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
                <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="your@university.edu"
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/15 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm" />
              </div>
              <Button type="submit" variant="primary" size="lg" loading={loading} className="w-full">
                {loading ? 'Sending...' : 'Send Reset Link'}
              </Button>
            </form>
          ) : (
            <Link href="/login">
              <Button variant="primary" size="lg" className="w-full">Back to Login</Button>
            </Link>
          )}

          <div className="mt-6 text-center">
            <Link href="/login" className="text-sm text-indigo-400 hover:text-indigo-300 flex items-center justify-center gap-1.5">
              <ArrowLeft size={14} /> Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
