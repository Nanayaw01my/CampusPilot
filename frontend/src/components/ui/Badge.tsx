'use client'
import { cn } from '@/lib/utils'

type BadgeVariant = 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'purple' | 'outline'

interface BadgeProps {
  children: React.ReactNode
  variant?: BadgeVariant
  size?: 'sm' | 'md'
  className?: string
}

const variants: Record<BadgeVariant, string> = {
  primary: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300',
  success: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  warning: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  danger: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
  info: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  purple: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
  outline: 'border border-indigo-300 text-indigo-600 dark:border-indigo-500 dark:text-indigo-400',
}

export default function Badge({ children, variant = 'primary', size = 'sm', className }: BadgeProps) {
  return (
    <span className={cn(
      'inline-flex items-center font-medium rounded-full',
      size === 'sm' ? 'px-2.5 py-0.5 text-xs' : 'px-3 py-1 text-sm',
      variants[variant],
      className
    )}>
      {children}
    </span>
  )
}
