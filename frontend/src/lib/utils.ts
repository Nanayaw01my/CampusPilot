import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  }).format(new Date(date))
}

export function formatTime(date: string | Date): string {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric', minute: '2-digit', hour12: true,
  }).format(new Date(date))
}

export function timeAgo(date: string | Date): string {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000)
  if (seconds < 60) return 'just now'
  const mins = Math.floor(seconds / 60)
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  if (days < 7) return `${days}d ago`
  return formatDate(date)
}

export function truncate(str: string, len: number): string {
  return str.length > len ? str.slice(0, len) + '...' : str
}

export function getInitials(name: string): string {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}

export function getDaysUntil(date: string | Date): number {
  const diff = new Date(date).getTime() - Date.now()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

export function randomGradient(seed: string): string {
  const gradients = [
    'from-indigo-500 to-purple-600',
    'from-blue-500 to-cyan-500',
    'from-violet-500 to-pink-500',
    'from-emerald-500 to-teal-600',
    'from-orange-500 to-red-500',
    'from-purple-500 to-indigo-600',
    'from-teal-500 to-emerald-600',
    'from-pink-500 to-rose-500',
  ]
  const idx = seed.charCodeAt(0) % gradients.length
  return gradients[idx]
}
