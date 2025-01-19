'use client';

import { useAuth } from '@/contexts/auth-context';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const ADMIN_MENU = [
  {
    title: 'Overview',
    href: '/admin',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-4 xs:w-5 h-4 xs:h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605"
        />
      </svg>
    ),
  },
  {
    title: 'Raffles',
    href: '/admin/raffles',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-4 xs:w-5 h-4 xs:h-5"
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
    title: 'Content',
    href: '/admin/content',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-4 xs:w-5 h-4 xs:h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z"
        />
      </svg>
    ),
  },
  {
    title: 'Users',
    href: '/admin/users',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-4 xs:w-5 h-4 xs:h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
        />
      </svg>
    ),
  },
  {
    title: 'Blockchain',
    href: '/admin/blockchain',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-4 xs:w-5 h-4 xs:h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
        />
      </svg>
    ),
  },
  {
    title: 'Finance',
    href: '/admin/finance',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-4 xs:w-5 h-4 xs:h-5"
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
    href: '/admin/settings',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-4 xs:w-5 h-4 xs:h-5"
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

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, signOut, isAdmin } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Admin check
  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      const redirectPath = !user ? '/admin/login' : '/dashboard';
      router.push(redirectPath);
    }
  }, [user, loading, router, isAdmin]);

  // Show loading state
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-8 xs:h-12 w-8 xs:w-12 border-t-2 border-b-2 border-[var(--primary-color)]"></div>
      </div>
    );
  }

  // Don't render anything if not authenticated or not admin
  if (!user || !isAdmin) {
    return null;
  }

  return (
    <>
      <div className="flex min-h-screen bg-[var(--background)]">
        {/* Mobile Menu Button */}
        <button
          className="lg:hidden fixed top-3 xs:top-4 left-2 xs:left-4 z-50 p-1.5 xs:p-2 rounded-lg bg-[var(--background)] text-[var(--foreground)] hover:bg-[var(--background-light)] transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-4 xs:w-5 h-4 xs:h-5 flex flex-col justify-center space-y-1 xs:space-y-1.5">
            <span
              className={`block h-0.5 w-4 xs:w-5 bg-current transform transition-transform ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5 xs:translate-y-2' : ''}`}
            />
            <span
              className={`block h-0.5 w-4 xs:w-5 bg-current transform transition-opacity ${isMobileMenuOpen ? 'opacity-0' : ''}`}
            />
            <span
              className={`block h-0.5 w-4 xs:w-5 bg-current transform transition-transform ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5 xs:-translate-y-2' : ''}`}
            />
          </div>
        </button>

        {/* Mobile Menu Overlay */}
        <div
          className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 w-[240px] xs:w-[280px] lg:w-64 bg-[var(--background)] border-r border-gray-800/80 transform transition-transform duration-300 lg:translate-x-0 ${
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex flex-col h-full">
            {/* Admin Info */}
            <div className="p-3 xs:p-4 border-b border-gray-800/80">
              <div className="flex items-center space-x-2 xs:space-x-3">
                <div className="w-8 xs:w-10 h-8 xs:h-10 rounded-full bg-[var(--primary-color)]/10 flex items-center justify-center">
                  <span className="text-[var(--primary-color)] text-sm xs:text-base font-semibold">
                    A
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs xs:text-sm font-medium text-[var(--foreground)] truncate">
                    Admin Panel
                  </p>
                  <p className="text-[10px] xs:text-xs text-[var(--primary-color)]">
                    Administrator
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-3 xs:p-4 space-y-0.5 xs:space-y-1">
              {ADMIN_MENU.map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center px-3 xs:px-4 py-1.5 xs:py-2 text-xs xs:text-sm rounded-lg hover:bg-[var(--background-light)]/50 ${
                    pathname === item.href
                      ? 'bg-[var(--primary-color)]/10 text-[var(--primary-color)]'
                      : 'text-[var(--foreground)] hover:opacity-80'
                  }`}
                >
                  <span className="mr-2 xs:mr-3">{item.icon}</span>
                  {item.title}
                </Link>
              ))}
            </nav>

            {/* Sign Out Button */}
            <div className="p-3 xs:p-4 border-t border-gray-800/80">
              <button
                onClick={() => signOut()}
                className="flex items-center justify-center w-full space-x-1.5 xs:space-x-2 px-3 xs:px-4 py-1.5 xs:py-2 text-xs xs:text-sm text-[var(--primary-color)] hover:opacity-80 hover:bg-[var(--primary-color)]/10 rounded-lg transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 xs:w-5 h-4 xs:h-5"
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
        <main className="flex-1 lg:ml-64 bg-[var(--background)]">
          <div className="container mx-auto px-3 xs:px-4 sm:px-6 py-4 xs:py-6 sm:py-8 mt-10 xs:mt-12 lg:mt-0 min-h-[calc(100vh-3rem)]">
            {children}
          </div>
        </main>
      </div>
    </>
  );
}
