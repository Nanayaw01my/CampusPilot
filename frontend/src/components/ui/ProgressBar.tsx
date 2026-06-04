'use client'
import { cn } from '@/lib/utils'

interface ProgressBarProps {
  value: number
  max?: number
  label?: string
  showPercent?: boolean
  size?: 'sm' | 'md' | 'lg'
  color?: 'primary' | 'success' | 'warning' | 'danger'
  className?: string
  animated?: boolean
}

const colors = {
  primary: 'from-indigo-500 to-purple-600',
  success: 'from-emerald-500 to-teal-500',
  warning: 'from-amber-500 to-orange-500',
  danger: 'from-red-500 to-rose-500',
}

const heights = { sm: 'h-1.5', md: 'h-2.5', lg: 'h-4' }

export default function ProgressBar({
  value, max = 100, label, showPercent, size = 'md', color = 'primary', className, animated = true
}: ProgressBarProps) {
  const pct = Math.min(100, Math.round((value / max) * 100))
  return (
    <div className={cn('w-full', className)}>
      {(label || showPercent) && (
        <div className="flex justify-between items-center mb-1.5">
          {label && <span className="text-xs font-medium text-gray-600 dark:text-gray-400">{label}</span>}
          {showPercent && <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">{pct}%</span>}
        </div>
      )}
      <div className={cn('w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden', heights[size])}>
        <div
          className={cn('h-full rounded-full bg-gradient-to-r transition-all duration-700', colors[color], animated && 'ease-out')}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
