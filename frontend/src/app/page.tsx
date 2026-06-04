'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import {
  Compass, BookOpen, Headphones, FileText, Calendar, Briefcase,
  Bell, Star, ArrowRight, CheckCircle, Users, Download, Award,
  ChevronRight, Sparkles, Zap, Shield, Globe, Play, Menu, X
} from 'lucide-react'
import Button from '@/components/ui/Button'

const features = [
  { icon: BookOpen, title: 'Digital Library', desc: 'Access thousands of e-books, textbooks and academic resources with PDF reader & bookmark support.', color: 'from-blue-500 to-indigo-600', bg: 'bg-blue-50 dark:bg-blue-950/30' },
  { icon: FileText, title: 'Past Questions', desc: 'Repository of past exam questions organized by department, course, level and year.', color: 'from-purple-500 to-violet-600', bg: 'bg-purple-50 dark:bg-purple-950/30' },
  { icon: Headphones, title: 'Audio Learning', desc: 'Stream or download audio books. Perfect for learning on the go with playlist support.', color: 'from-emerald-500 to-teal-600', bg: 'bg-emerald-50 dark:bg-emerald-950/30' },
  { icon: Calendar, title: 'Campus Events', desc: 'Stay updated with university events, workshops, seminars and student activities.', color: 'from-orange-500 to-red-500', bg: 'bg-orange-50 dark:bg-orange-950/30' },
  { icon: Briefcase, title: 'Opportunities', desc: 'Discover scholarships, internships, competitions and exchange programs worldwide.', color: 'from-pink-500 to-rose-600', bg: 'bg-pink-50 dark:bg-pink-950/30' },
  { icon: Bell, title: 'Smart Reminders', desc: 'Never miss deadlines. Set smart reminders with push, email and in-app notifications.', color: 'from-amber-500 to-yellow-500', bg: 'bg-amber-50 dark:bg-amber-950/30' },
]

const stats = [
  { value: '12,847+', label: 'Students Enrolled', icon: Users },
  { value: '456+', label: 'E-Books Available', icon: BookOpen },
  { value: '89K+', label: 'Total Downloads', icon: Download },
  { value: '98%', label: 'Satisfaction Rate', icon: Star },
]

const testimonials = [
  { name: 'Ama Owusu', dept: 'Computer Science, L300', text: 'Campus Pilot completely changed how I study. Having all past questions in one place saved me so much time during exams!', avatar: 'AO' },
  { name: 'Kofi Mensah', dept: 'Engineering, L200', text: 'I found a scholarship through Campus Pilot that fully funded my exchange program in Germany. Absolutely life-changing!', avatar: 'KM' },
  { name: 'Fatima Diallo', dept: 'Medicine, L400', text: 'The audio books feature is incredible. I listen to lectures while commuting and have significantly improved my grades.', avatar: 'FD' },
]

export default function LandingPage() {
  const [navOpen, setNavOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 overflow-x-hidden">
      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 dark:bg-gray-950/90 backdrop-blur-xl shadow-sm border-b border-gray-100 dark:border-gray-800' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg">
              <Compass className="text-white" size={18} />
            </div>
            <span className="font-bold text-lg text-gray-900 dark:text-white">Campus<span className="gradient-text">Pilot</span></span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {['Features', 'About', 'Testimonials'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition">
                {item}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">Sign In</Button>
            </Link>
            <Link href="/register">
              <Button variant="primary" size="sm" icon={<Sparkles size={14} />}>Get Started</Button>
            </Link>
          </div>

          <button onClick={() => setNavOpen(!navOpen)} className="md:hidden p-2 rounded-xl text-gray-600 hover:bg-gray-100">
            {navOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile menu */}
        {navOpen && (
          <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 px-4 py-4 space-y-3">
            {['Features', 'About', 'Testimonials'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setNavOpen(false)}
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 py-2">
                {item}
              </a>
            ))}
            <div className="flex gap-3 pt-2">
              <Link href="/login" className="flex-1"><Button variant="secondary" className="w-full">Sign In</Button></Link>
              <Link href="/register" className="flex-1"><Button variant="primary" className="w-full">Get Started</Button></Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 bg-mesh overflow-hidden">
        {/* Animated orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-blue-600/15 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-600/10 border border-indigo-500/30 text-indigo-300 text-sm font-medium mb-8">
            <Sparkles size={14} className="text-indigo-400" />
            Smart Campus Companion — Built for Students
            <ChevronRight size={14} />
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.08] mb-6 font-display">
            Your Campus,{' '}
            <span className="gradient-text">Supercharged</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Access e-books, past questions, audio learning, events and scholarships all in one beautifully designed platform built for university students.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button variant="primary" size="xl" icon={<Zap size={20} />} className="w-full sm:w-auto">
                Start For Free
                <ArrowRight size={18} />
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="secondary" size="xl" icon={<Play size={18} />} className="w-full sm:w-auto bg-white/10 border-white/20 text-white hover:bg-white/20">
                View Demo
              </Button>
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 mt-12 text-sm text-gray-400">
            {['Free to use', 'No credit card', 'Mobile-first design', 'Secure & private'].map(item => (
              <div key={item} className="flex items-center gap-1.5">
                <CheckCircle size={14} className="text-emerald-400" />
                {item}
              </div>
            ))}
          </div>

          {/* Hero mockup */}
          <div className="mt-16 relative">
            <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-gray-900/80 backdrop-blur-xl">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-black/30">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
                <span className="ml-2 text-xs text-gray-500">campuspilot.app/dashboard</span>
              </div>
              <div className="p-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: 'Books Read', value: '12', icon: BookOpen, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
                  { label: 'Questions', value: '34', icon: FileText, color: 'text-purple-400', bg: 'bg-purple-500/10' },
                  { label: 'Events', value: '8', icon: Calendar, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
                  { label: 'Reminders', value: '15', icon: Bell, color: 'text-amber-400', bg: 'bg-amber-500/10' },
                ].map(({ label, value, icon: Icon, color, bg }) => (
                  <div key={label} className="rounded-xl bg-white/5 border border-white/10 p-4">
                    <div className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center mb-3`}>
                      <Icon size={16} className={color} />
                    </div>
                    <p className="text-2xl font-bold text-white">{value}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{label}</p>
                  </div>
                ))}
              </div>
              <div className="px-6 pb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {['Introduction to Algorithms — 65% complete', 'CS 301 Midterm Exam — Due Aug 15'].map(item => (
                  <div key={item} className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center flex-shrink-0">
                      <BookOpen size={14} className="text-indigo-400" />
                    </div>
                    <p className="text-xs text-gray-300 font-medium">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900 border-y border-gray-100 dark:border-gray-800">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map(({ value, label, icon: Icon }) => (
            <div key={label} className="text-center">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mx-auto mb-3 shadow-lg">
                <Icon className="text-white" size={22} />
              </div>
              <p className="text-3xl font-black gradient-text">{value}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 font-medium">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 text-sm font-semibold mb-4">
              <Sparkles size={14} />
              Everything you need
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-gray-900 dark:text-white mb-4 font-display">
              Designed for <span className="gradient-text">Student Success</span>
            </h2>
            <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              Campus Pilot brings together all the tools you need to excel academically and make the most of your university experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, desc, color, bg }) => (
              <div key={title} className={`p-6 rounded-2xl ${bg} border border-gray-100 dark:border-gray-800 card-hover group`}>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                  <Icon className="text-white" size={22} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{desc}</p>
                <div className="mt-4 flex items-center gap-1 text-indigo-600 dark:text-indigo-400 text-sm font-semibold group-hover:gap-2 transition-all">
                  Learn more <ChevronRight size={14} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About / Why Campus Pilot */}
      <section id="about" className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 text-sm font-semibold mb-6">
              <Award size={14} />
              Why Campus Pilot?
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white mb-6 font-display">
              Everything a student needs, <span className="gradient-text">in one place</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
              No more juggling between multiple platforms. Campus Pilot is the all-in-one digital companion that simplifies your academic life and keeps you connected with every opportunity your campus offers.
            </p>
            <div className="space-y-4">
              {[
                { icon: Shield, title: 'Secure & Private', desc: 'Your data is encrypted and protected at all times.' },
                { icon: Globe, title: 'Works Everywhere', desc: 'Perfect on mobile, tablet, and desktop. No app download needed.' },
                { icon: Zap, title: 'Lightning Fast', desc: 'Optimized for performance even on slow networks.' },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                    <Icon size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">{title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Departments Supported', value: '24', color: 'from-indigo-500 to-purple-600' },
              { label: 'Past Questions', value: '3,200+', color: 'from-emerald-500 to-teal-600' },
              { label: 'Active Users', value: '12.8K', color: 'from-orange-500 to-red-500' },
              { label: 'Opportunities Listed', value: '67+', color: 'from-pink-500 to-rose-600' },
            ].map(({ label, value, color }) => (
              <div key={label} className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-card">
                <p className={`text-3xl font-black bg-gradient-to-r ${color} bg-clip-text text-transparent`}>{value}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 font-medium">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 text-sm font-semibold mb-4">
              <Star size={14} />
              Student Stories
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-gray-900 dark:text-white font-display">
              Loved by <span className="gradient-text">Students</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map(({ name, dept, text, avatar }) => (
              <div key={name} className="p-6 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 card-hover">
                <div className="flex gap-1 mb-4">
                  {Array(5).fill(0).map((_, i) => (
                    <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6">&ldquo;{text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                    {avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">{name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{dept}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-mesh">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-indigo-500/40">
            <Compass className="text-white" size={28} />
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white mb-6 font-display">
            Ready to <span className="gradient-text">Transform</span> Your Campus Experience?
          </h2>
          <p className="text-lg text-gray-300 mb-10">
            Join thousands of students already using Campus Pilot to excel academically.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button variant="primary" size="xl" icon={<Sparkles size={20} />} className="w-full sm:w-auto">
                Create Free Account
                <ArrowRight size={18} />
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="xl" className="w-full sm:w-auto bg-white/10 border border-white/20 text-white hover:bg-white/20">
                Explore Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
                <Compass className="text-white" size={16} />
              </div>
              <span className="font-bold text-white">Campus<span className="gradient-text">Pilot</span></span>
            </div>
            <p className="text-sm text-gray-500">© 2024 CampusPilot. Built for university students everywhere.</p>
            <div className="flex gap-6 text-sm text-gray-500">
              {['Privacy', 'Terms', 'Contact'].map(item => (
                <a key={item} href="#" className="hover:text-gray-300 transition">{item}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
