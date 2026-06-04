'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AppLayout from '@/components/layout/AppLayout'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { audioApi, isAuthenticated } from '@/lib/api'
import { Headphones, Play, Pause, SkipBack, SkipForward, Volume2, Search, Download, Heart, Plus, Shuffle, Repeat } from 'lucide-react'
import toast from 'react-hot-toast'

const categories = ['All', 'Computer Science', 'Economics', 'History', 'Mathematics', 'Philosophy', 'Chemistry']
const gradients = [
  'from-emerald-500 to-teal-600', 'from-indigo-500 to-blue-600', 'from-purple-500 to-violet-600',
  'from-orange-500 to-amber-500', 'from-pink-500 to-rose-600', 'from-cyan-500 to-blue-500',
]

export default function AudioPage() {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [playing, setPlaying] = useState<string | null>(null)
  const [liked, setLiked] = useState<Set<string>>(new Set())
  const [progress, setProgress] = useState(35)
  const [audioList, setAudioList] = useState<Record<string, unknown>[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isAuthenticated()) { router.push('/login'); return }
    audioApi.list({ per_page: 50 })
      .then(res => {
        const data = (res.data as { data: { data: Record<string, unknown>[] } }).data.data
        setAudioList(data)
      })
      .catch(() => toast.error('Failed to load audio library'))
      .finally(() => setLoading(false))
  }, [router])

  const toggleLike = async (id: string) => {
    try {
      await audioApi.like(id)
      setLiked(prev => {
        const s = new Set(prev)
        if (s.has(id)) { s.delete(id); toast.success('Removed like') }
        else { s.add(id); toast.success('Liked!') }
        return s
      })
    } catch {
      toast.error('Failed to update like')
    }
  }

  const filtered = audioList.filter(a =>
    (category === 'All' || (a.category as string) === category) &&
    ((a.title as string).toLowerCase().includes(search.toLowerCase()) ||
      (a.author as string).toLowerCase().includes(search.toLowerCase()))
  )

  const currentAudio = audioList.find(a => (a.id as string) === playing)

  if (loading) return (
    <AppLayout>
      <div className="flex items-center justify-center h-64">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    </AppLayout>
  )

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-2">
              <Headphones className="text-indigo-500" size={24} /> Audio Library
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{audioList.length} audio books available</p>
          </div>
          <Button variant="primary" icon={<Plus size={16} />}>Upload Audio</Button>
        </div>

        {/* Now Playing */}
        {playing && currentAudio && (
          <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-violet-900 rounded-2xl p-5 text-white shadow-2xl border border-white/10">
            <div className="flex flex-col sm:flex-row gap-5 items-center">
              <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${gradients[+(currentAudio.id as string) % gradients.length]} flex items-center justify-center shadow-xl flex-shrink-0`}>
                <Headphones size={32} className="text-white/80" />
              </div>
              <div className="flex-1 min-w-0 text-center sm:text-left">
                <h3 className="font-bold text-lg">{currentAudio.title as string}</h3>
                <p className="text-indigo-200 text-sm">{currentAudio.author as string}</p>
                {/* Waveform animation */}
                <div className="audio-wave mt-3 justify-center sm:justify-start">
                  {[20, 35, 28, 45, 32, 38, 25, 42, 30, 35].map((h, i) => (
                    <span key={i} style={{ height: `${h}px`, animationDelay: `${i * 0.1}s` }} />
                  ))}
                </div>
              </div>
              <div className="flex-1 w-full sm:w-auto">
                {/* Progress */}
                <div className="flex items-center gap-2 mb-3 text-xs text-indigo-200">
                  <span>0:48</span>
                  <div className="flex-1 h-1.5 bg-white/20 rounded-full cursor-pointer" onClick={e => {
                    const rect = e.currentTarget.getBoundingClientRect()
                    setProgress(Math.round(((e.clientX - rect.left) / rect.width) * 100))
                  }}>
                    <div className="h-full bg-white rounded-full" style={{ width: `${progress}%` }} />
                  </div>
                  <span>{currentAudio.duration as string}</span>
                </div>
                {/* Controls */}
                <div className="flex items-center justify-center sm:justify-end gap-3">
                  <button className="text-indigo-300 hover:text-white transition"><Shuffle size={16} /></button>
                  <button className="text-white/80 hover:text-white transition"><SkipBack size={20} /></button>
                  <button onClick={() => setPlaying(null)}
                    className="w-12 h-12 bg-white text-indigo-700 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition">
                    <Pause size={20} />
                  </button>
                  <button className="text-white/80 hover:text-white transition"><SkipForward size={20} /></button>
                  <button className="text-indigo-300 hover:text-white transition"><Repeat size={16} /></button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Search */}
        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search audio books..."
            className="w-full max-w-md pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40" />
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {categories.map(c => (
            <button key={c} onClick={() => setCategory(c)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${category === c ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'}`}>
              {c}
            </button>
          ))}
        </div>

        {/* Audio Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((audio, i) => {
            const id = audio.id as string
            const isPlaying = playing === id
            const isLiked = liked.has(id)
            return (
              <div key={id} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden card-hover group">
                <div className={`h-36 bg-gradient-to-br ${gradients[i % gradients.length]} flex items-center justify-center relative`}>
                  {isPlaying ? (
                    <div className="audio-wave">
                      {[24, 36, 28, 44, 32].map((h, j) => (
                        <span key={j} style={{ height: `${h}px`, animationDelay: `${j * 0.1}s` }} />
                      ))}
                    </div>
                  ) : (
                    <Headphones size={40} className="text-white/60" />
                  )}
                  <button
                    onClick={() => setPlaying(isPlaying ? null : id)}
                    className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition"
                  >
                    <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center shadow-xl">
                      {isPlaying ? <Pause className="text-indigo-700" size={22} /> : <Play className="text-indigo-700 translate-x-0.5" size={22} />}
                    </div>
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 dark:text-white text-sm line-clamp-1 mb-1">{audio.title as string}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{audio.author as string}</p>
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="success">{(audio.category as string).split(' ')[0]}</Badge>
                    <span className="text-xs text-gray-400">{audio.duration as string}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-400 mb-3">
                    <Play size={10} className="fill-gray-400" /> {(audio.plays as number).toLocaleString()} plays
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setPlaying(isPlaying ? null : id)}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition ${isPlaying ? 'bg-indigo-100 text-indigo-700' : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'}`}>
                      {isPlaying ? <><Pause size={12} /> Pause</> : <><Play size={12} /> Play</>}
                    </button>
                    <button
                      onClick={() => toggleLike(id)}
                      className={`p-2 rounded-xl transition ${isLiked ? 'bg-red-100 text-red-500' : 'bg-gray-100 dark:bg-gray-800 text-gray-400'}`}>
                      <Heart size={14} className={isLiked ? 'fill-red-500' : ''} />
                    </button>
                    <button className="p-2 bg-gray-100 dark:bg-gray-800 text-gray-400 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition">
                      <Download size={14} />
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
