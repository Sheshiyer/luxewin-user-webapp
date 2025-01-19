'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/auth-context';
import { Logo } from '@/components/ui/logo';
import { useState } from 'react';

export function Header() {
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-gray-200/80 dark:border-gray-800/80">
      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMenuOpen(false)}
      />
      <div className="container mx-auto px-2 xs:px-3 sm:px-4">
        <div className="flex items-center justify-between h-14 xs:h-16">
          {/* Hamburger Menu */}
          <button
            className="md:hidden relative z-50 -ml-1.5 xs:-ml-2 p-1.5 xs:p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-4 xs:w-5 h-4 xs:h-5 flex flex-col justify-center space-y-1 xs:space-y-1.5">
              <span
                className={`block h-0.5 w-4 xs:w-5 bg-gray-600 dark:bg-gray-300 transform transition-transform ${
                  isMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              />
              <span
                className={`block h-0.5 w-4 xs:w-5 bg-gray-600 dark:bg-gray-300 transform transition-opacity ${
                  isMenuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`block h-0.5 w-4 xs:w-5 bg-gray-600 dark:bg-gray-300 transform transition-transform ${
                  isMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
              />
            </div>
          </button>
          {/* Logo */}
          <Link href="/" className="flex items-center mx-auto md:mx-0">
            <Logo />
          </Link>

          {/* Desktop Navigation */}
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

          {/* Mobile Navigation */}
          <nav
            className={`fixed top-14 xs:top-16 left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-200/80 dark:border-gray-800/80 p-3 xs:p-4 transform transition-transform duration-300 md:hidden ${
              isMenuOpen ? 'translate-y-0' : '-translate-y-full'
            }`}
          >
            <div className="flex flex-col space-y-2 xs:space-y-3">
              <a
                href="#featured-raffles"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors px-3 xs:px-4 py-1.5 xs:py-2 text-sm xs:text-base rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={e => {
                  e.preventDefault();
                  scrollToSection('featured-raffles');
                }}
              >
                Raffles
              </a>
              <a
                href="#how-it-works"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors px-3 xs:px-4 py-1.5 xs:py-2 text-sm xs:text-base rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={e => {
                  e.preventDefault();
                  scrollToSection('how-it-works');
                }}
              >
                How It Works
              </a>
              <a
                href="#winners"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors px-3 xs:px-4 py-1.5 xs:py-2 text-sm xs:text-base rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={e => {
                  e.preventDefault();
                  scrollToSection('winners');
                }}
              >
                Winners
              </a>
              {user ? (
                <Link
                  href="/dashboard"
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors px-3 xs:px-4 py-1.5 xs:py-2 text-sm xs:text-base rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    href="/auth/sign-in"
                    className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors px-3 xs:px-4 py-1.5 xs:py-2 text-sm xs:text-base rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/auth/sign-up"
                    className="button-primary w-full text-center text-sm xs:text-base py-1.5 xs:py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </nav>

          {/* Auth Buttons (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <Link
                href="/dashboard"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
              >
                Dashboard
              </Link>
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
