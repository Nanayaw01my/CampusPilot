'use client'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  loading?: boolean
  icon?: React.ReactNode
  iconRight?: React.ReactNode
}

const variants = {
  primary: 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-500 hover:to-purple-500 shadow-lg hover:shadow-indigo-500/30 active:scale-95',
  secondary: 'bg-white text-gray-800 border border-gray-200 hover:bg-gray-50 shadow-sm dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700',
  outline: 'border-2 border-indigo-500 text-indigo-600 hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-indigo-900/20',
  ghost: 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800',
  danger: 'bg-gradient-to-r from-red-500 to-rose-600 text-white hover:from-red-400 hover:to-rose-500 shadow-lg hover:shadow-red-500/30',
  success: 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-400 hover:to-teal-500 shadow-lg hover:shadow-emerald-500/30',
}

const sizes = {
  sm: 'px-3 py-1.5 text-xs rounded-lg gap-1.5',
  md: 'px-4 py-2 text-sm rounded-xl gap-2',
  lg: 'px-6 py-3 text-base rounded-xl gap-2',
  xl: 'px-8 py-4 text-lg rounded-2xl gap-3',
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  children, variant = 'primary', size = 'md', loading, icon, iconRight, className, disabled, ...props
}, ref) => {
  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={cn(
        'inline-flex items-center justify-center font-semibold transition-all duration-200 cursor-pointer select-none',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {loading ? <Loader2 className="animate-spin" size={size === 'sm' ? 14 : 16} /> : icon}
      {children}
      {iconRight && !loading && iconRight}
    </button>
  )
})
Button.displayName = 'Button'

export default Button
