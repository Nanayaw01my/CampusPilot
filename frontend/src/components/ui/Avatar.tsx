'use client'
import { cn, getInitials } from '@/lib/utils'

interface AvatarProps {
  src?: string | null
  name: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const sizes = {
  xs: 'w-6 h-6 text-xs',
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
  xl: 'w-16 h-16 text-xl',
}

export default function Avatar({ src, name, size = 'md', className }: AvatarProps) {
  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={cn('rounded-full object-cover ring-2 ring-white dark:ring-gray-800', sizes[size], className)}
      />
    )
  }

  const gradient = [
    'from-indigo-500 to-purple-600',
    'from-blue-500 to-cyan-500',
    'from-emerald-500 to-teal-600',
    'from-orange-500 to-red-500',
    'from-violet-500 to-pink-500',
  ][name.charCodeAt(0) % 5]

  return (
    <div className={cn(
      'rounded-full flex items-center justify-center font-bold text-white bg-gradient-to-br ring-2 ring-white dark:ring-gray-800 flex-shrink-0',
      gradient, sizes[size], className
    )}>
      {getInitials(name)}
    </div>
  )
}
