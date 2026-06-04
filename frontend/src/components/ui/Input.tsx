'use client'
import { cn } from '@/lib/utils'
import { InputHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  label, error, hint, leftIcon, rightIcon, className, ...props
}, ref) => {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            {leftIcon}
          </span>
        )}
        <input
          ref={ref}
          className={cn(
            'w-full rounded-xl border bg-white dark:bg-gray-900 text-gray-900 dark:text-white',
            'placeholder:text-gray-400 transition-all duration-200',
            'focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500',
            error
              ? 'border-red-400 focus:ring-red-400/40 focus:border-red-400'
              : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600',
            leftIcon ? 'pl-10' : 'pl-4',
            rightIcon ? 'pr-10' : 'pr-4',
            'py-2.5 text-sm',
            className
          )}
          {...props}
        />
        {rightIcon && (
          <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400">
            {rightIcon}
          </span>
        )}
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
      {hint && !error && <p className="text-xs text-gray-500">{hint}</p>}
    </div>
  )
})
Input.displayName = 'Input'

export default Input
