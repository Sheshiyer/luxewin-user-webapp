'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/auth-context';
interface StatsCard {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: React.ReactNode;
}

export default function AdminPage() {
  const { user } = useAuth();
  const [stats] = useState<StatsCard[]>([
    {
      title: 'Total Users',
      value: '2,345',
      change: '+12.5%',
      trend: 'up',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 xs:w-5 sm:w-6 h-4 xs:h-5 sm:h-6"
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
      title: 'Active Raffles',
      value: '12',
      change: '+3',
      trend: 'up',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 xs:w-5 sm:w-6 h-4 xs:h-5 sm:h-6"
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
      title: 'Revenue',
      value: '$124,592',
      change: '+8.2%',
      trend: 'up',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 xs:w-5 sm:w-6 h-4 xs:h-5 sm:h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      title: 'Tickets Sold',
      value: '45,678',
      change: '-2.3%',
      trend: 'down',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 xs:w-5 sm:w-6 h-4 xs:h-5 sm:h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
          />
        </svg>
      ),
    },
  ]);

  return (
    <div className="space-y-4 xs:space-y-6" key={user?.id}>
      <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center gap-3 xs:gap-0">
        <h1 className="text-xl xs:text-2xl font-semibold text-white">Dashboard Overview</h1>
        <button className="w-full xs:w-auto px-3 xs:px-4 py-1.5 xs:py-2 text-xs xs:text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
          Generate Report
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 xs:gap-4 sm:gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="p-3 xs:p-4 sm:p-6 bg-[#1A1A1A] rounded-lg xs:rounded-xl shadow-sm border border-gray-800/80"
          >
            <div className="flex items-center justify-between">
              <div className="p-1.5 xs:p-2 bg-gray-800 rounded-lg">
                <div className="text-gray-300">{stat.icon}</div>
              </div>
              <div
                className={`text-xs xs:text-sm font-medium ${
                  stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {stat.change}
              </div>
            </div>
            <div className="mt-3 xs:mt-4">
              <h3 className="text-xs xs:text-sm font-medium text-gray-400">{stat.title}</h3>
              <p className="text-lg xs:text-xl sm:text-2xl font-semibold text-white">
                {stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-[#1A1A1A] rounded-lg xs:rounded-xl shadow-sm border border-gray-800/80 overflow-hidden">
        <div className="p-3 xs:p-4 sm:p-6 border-b border-gray-800/80">
          <h2 className="text-base xs:text-lg font-medium text-white">Recent Activity</h2>
        </div>
        <div className="p-3 xs:p-4 sm:p-6">
          <div className="space-y-3 xs:space-y-4 sm:space-y-6">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="flex items-center space-x-3 xs:space-x-4">
                <div className="w-1.5 xs:w-2 h-1.5 xs:h-2 rounded-full bg-red-500"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs xs:text-sm text-white truncate">
                    New raffle created: Luxury Watch Collection
                  </p>
                  <p className="text-[10px] xs:text-xs text-gray-400">2 hours ago</p>
                </div>
                <button className="text-xs xs:text-sm text-red-500 hover:text-red-600 whitespace-nowrap">
                  View
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
