'use client'
import { cn } from '@/lib/utils'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  glass?: boolean
  onClick?: () => void
}

export default function Card({ children, className, hover, glass, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'rounded-2xl',
        glass
          ? 'glass-card'
          : 'bg-white dark:bg-gray-900/80 border border-gray-100 dark:border-gray-800 shadow-card',
        hover && 'card-hover cursor-pointer',
        className
      )}
    >
      {children}
    </div>
  )
}

export function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('p-5 pb-0', className)}>{children}</div>
}

export function CardBody({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('p-5', className)}>{children}</div>
}

export function CardFooter({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('px-5 py-4 border-t border-gray-100 dark:border-gray-800', className)}>
      {children}
    </div>
  )
}
