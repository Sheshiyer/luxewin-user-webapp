import Link from 'next/link'
import { Logo } from '@/components/ui/logo'

interface AuthLayoutProps {
  children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="inline-block">
            <Logo />
          </Link>
        </div>
      </header>

      {/* Background Pattern */}
      <div className="fixed inset-0 bg-grid-electric opacity-5 pointer-events-none" />

      {/* Content */}
      <div className="relative min-h-screen flex flex-col">
        <main className="flex-1 flex items-center justify-center">
          {children}
        </main>

        {/* Footer */}
        <footer className="py-6 text-center text-sm text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} LuxeWin. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  )
}
