import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Campus Pilot – Smart Campus Companion',
  description: 'Your one-stop digital platform for university students. Access e-books, past questions, events, opportunities, and more.',
  keywords: 'university, students, campus, e-books, library, education',
  icons: { icon: '/favicon.svg' },
  themeColor: '#6366f1',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
