'use client';

import { useAuth } from '@/contexts/auth-context';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const DASHBOARD_MENU = [
  {
    title: 'Profile',
    href: '/dashboard/profile',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
        />
      </svg>
    ),
  },
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
        />
      </svg>
    ),
  },
  {
    title: 'My Tickets',
    href: '/dashboard/tickets',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
        />
      </svg>
    ),
  },
  {
    title: 'Active Raffles',
    href: '/dashboard/active-raffles',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    title: 'Transaction History',
    href: '/dashboard/transactions',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
        />
      </svg>
    ),
  },
  {
    title: 'Settings',
    href: '/dashboard/settings',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
        />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/sign-in');
    }
  }, [user, loading, router]);

  // Close menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  if (loading || !user) {
    return null;
  }

  return (
    <>
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Mobile Menu Button */}
        <button
          className="lg:hidden fixed top-3 xs:top-4 left-2 xs:left-4 z-50 p-1.5 xs:p-2 rounded-lg bg-[#0A0A0A] text-white hover:bg-gray-800 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-4 xs:w-5 h-4 xs:h-5 flex flex-col justify-center space-y-1 xs:space-y-1.5">
            <span
              className={`block h-0.5 w-5 bg-current transform transition-transform ${
                isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`block h-0.5 w-5 bg-current transform transition-opacity ${
                isMobileMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block h-0.5 w-5 bg-current transform transition-transform ${
                isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </div>
        </button>

        {/* Mobile Menu Overlay */}
        <div
          className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden z-40 ${
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 w-[220px] xs:w-[260px] lg:w-64 bg-[#0A0A0A] border-r border-gray-800/80 transform transition-transform duration-300 lg:translate-x-0 z-50 ${
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex flex-col h-full">
            {/* User Info */}
            <Link
              href="/dashboard/profile"
              className="block p-3 xs:p-4 border-b border-gray-800/80 hover:bg-gray-800/50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 xs:space-x-3">
                  <div className="w-8 xs:w-10 h-8 xs:h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center">
                    <span className="text-[#3399FF] text-sm xs:text-base font-semibold">
                      {user.email?.[0].toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs xs:text-sm font-medium text-white truncate">
                      {user.email}
                    </p>
                    <p className="text-[10px] xs:text-xs text-gray-400">
                      Member since {new Date(user.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </Link>

            {/* Navigation */}
            <nav className="flex-1 p-3 xs:p-4 space-y-0.5 xs:space-y-1">
              {DASHBOARD_MENU.map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center px-3 xs:px-4 py-1.5 xs:py-2 text-xs xs:text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 ${
                    pathname === item.href
                      ? 'bg-[var(--primary-color)]/10 text-[var(--primary-color)] dark:text-[var(--primary-color)]'
                      : 'text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.title}
                </Link>
              ))}
            </nav>

            {/* Sign Out Button */}
            <div className="p-3 xs:p-4 border-t border-gray-800/80">
              <button
                onClick={() => signOut()}
                className="flex items-center justify-center w-full space-x-1.5 xs:space-x-2 px-3 xs:px-4 py-1.5 xs:py-2 text-xs xs:text-sm text-red-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                  />
                </svg>
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-64">
          <div className="container mx-auto px-3 xs:px-4 sm:px-6 py-4 xs:py-6 sm:py-8 mt-10 xs:mt-12 lg:mt-0">
            {children}
          </div>
        </main>
      </div>
    </>
  );
}
