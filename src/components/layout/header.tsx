'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/auth-context';
import { Logo } from '@/components/ui/logo';

export function Header() {
  const { user, signOut } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Logo />
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#featured-raffles"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
              onClick={e => {
                e.preventDefault();
                document.getElementById('featured-raffles')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Raffles
            </a>
            <a
              href="#how-it-works"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
              onClick={e => {
                e.preventDefault();
                document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              How It Works
            </a>
            <a
              href="#winners"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
              onClick={e => {
                e.preventDefault();
                document.getElementById('winners')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Winners
            </a>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
                >
                  Dashboard
                </Link>
                <button onClick={() => signOut()} className="button-outline">
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/sign-in"
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
                >
                  Sign In
                </Link>
                <Link href="/auth/sign-up" className="button-primary">
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
