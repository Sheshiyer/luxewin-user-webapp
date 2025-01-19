'use client';

import Link from 'next/link';
import { useState } from 'react';

interface Ticket {
  id: string;
  raffleId: string;
  raffleName: string;
  ticketNumber: string;
  purchaseDate: string;
  status: 'active' | 'won' | 'lost';
  drawDate: string;
  prizeValue?: string;
}

// Mock data - will be replaced with API calls
const MOCK_TICKETS: Ticket[] = [
  {
    id: '1',
    raffleId: '1',
    raffleName: 'Luxury Watch Collection',
    ticketNumber: '#12345',
    purchaseDate: '2024-01-15',
    status: 'active',
    drawDate: '2024-02-15',
    prizeValue: '$5,000',
  },
  {
    id: '2',
    raffleId: '2',
    raffleName: 'Gaming Setup Bundle',
    ticketNumber: '#12346',
    purchaseDate: '2024-01-10',
    status: 'won',
    drawDate: '2024-01-14',
    prizeValue: '$3,500',
  },
  {
    id: '3',
    raffleId: '3',
    raffleName: 'Dream Vacation Package',
    ticketNumber: '#12347',
    purchaseDate: '2024-01-05',
    status: 'lost',
    drawDate: '2024-01-12',
    prizeValue: '$10,000',
  },
];

export default function TicketsPage() {
  const [filter, setFilter] = useState<'all' | 'active' | 'won' | 'lost'>('all');

  const getStatusColor = (status: Ticket['status']) => {
    switch (status) {
      case 'active':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'won':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'lost':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const filteredTickets = MOCK_TICKETS.filter(ticket =>
    filter === 'all' ? true : ticket.status === filter
  );

  return (
    <div className="space-y-4 xs:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 xs:gap-4">
        <div>
          <h1 className="text-xl xs:text-2xl font-bold text-gray-900 dark:text-white">
            My Tickets
          </h1>
          <p className="mt-0.5 xs:mt-1 text-xs xs:text-sm text-gray-600 dark:text-gray-300">
            Manage and track your raffle tickets
          </p>
        </div>
        <Link href="/dashboard/active-raffles" className="button-primary">
          Browse Raffles
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="border-b border-gray-200/80 dark:border-gray-700/80">
        <nav className="-mb-px flex space-x-4 xs:space-x-6 sm:space-x-8 overflow-x-auto">
          {(['all', 'active', 'won', 'lost'] as const).map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`
                whitespace-nowrap py-3 xs:py-4 px-1 border-b-2 font-medium text-xs xs:text-sm
                ${
                  filter === status
                    ? 'border-[var(--primary-color)] text-[var(--primary-color)]'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                }
              `}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
              {status !== 'all' && (
                <span className="ml-1.5 xs:ml-2 text-[10px] xs:text-xs text-gray-400 dark:text-gray-500">
                  ({MOCK_TICKETS.filter(t => t.status === status).length})
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Tickets List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg xs:rounded-xl shadow-sm overflow-hidden">
        <div className="min-w-full divide-y divide-gray-200/80 dark:divide-gray-700/80">
          {/* Table Header - Hide on mobile */}
          <div className="hidden sm:block bg-gray-50 dark:bg-gray-900/50">
            <div className="grid grid-cols-7 gap-3 xs:gap-4 px-4 xs:px-6 py-2 xs:py-3 text-left text-[10px] xs:text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              <div className="col-span-2">Raffle</div>
              <div>Ticket Number</div>
              <div>Purchase Date</div>
              <div>Draw Date</div>
              <div>Prize Value</div>
              <div>Status</div>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-200/80 dark:divide-gray-700/80">
            {filteredTickets.map(ticket => (
              <div
                key={ticket.id}
                className="block sm:grid sm:grid-cols-7 gap-2 xs:gap-3 sm:gap-4 px-3 xs:px-4 sm:px-6 py-3 xs:py-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer group"
                onClick={() => {
                  // TODO: Implement ticket details view
                }}
              >
                <div className="sm:col-span-2 mb-2 sm:mb-0">
                  <div className="text-xs xs:text-sm font-medium text-gray-900 dark:text-white group-hover:text-[var(--primary-color)] transition-colors">
                    {ticket.raffleName}
                  </div>
                  <div className="text-[10px] xs:text-xs text-gray-500 dark:text-gray-400">
                    ID: {ticket.raffleId}
                  </div>
                </div>
                <div className="text-xs xs:text-sm text-gray-900 dark:text-white hidden sm:block">
                  {ticket.ticketNumber}
                </div>
                <div className="text-xs xs:text-sm text-gray-900 dark:text-white hidden sm:block">
                  {new Date(ticket.purchaseDate).toLocaleDateString()}
                </div>
                <div className="text-xs xs:text-sm text-gray-900 dark:text-white hidden sm:block">
                  {new Date(ticket.drawDate).toLocaleDateString()}
                </div>
                <div className="text-xs xs:text-sm text-gray-900 dark:text-white hidden sm:block">
                  {ticket.prizeValue}
                </div>
                <div>
                  <span
                    className={`inline-flex items-center px-2 xs:px-2.5 py-0.5 rounded-full text-[10px] xs:text-xs font-medium ${getStatusColor(ticket.status)}`}
                  >
                    {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Empty State */}
        {filteredTickets.length === 0 && (
          <div className="text-center py-8 xs:py-10 sm:py-12">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="mx-auto h-8 xs:h-10 sm:h-12 w-8 xs:w-10 sm:w-12 text-gray-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
              />
            </svg>
            <h3 className="mt-1.5 xs:mt-2 text-xs xs:text-sm font-medium text-gray-900 dark:text-white">
              No tickets found
            </h3>
            <p className="mt-0.5 xs:mt-1 text-xs xs:text-sm text-gray-500 dark:text-gray-400">
              {filter === 'all'
                ? 'Get started by browsing our available raffles.'
                : `No ${filter} tickets found. Switch filters to see other tickets.`}
            </p>
            <div className="mt-4 xs:mt-5 sm:mt-6">
              <Link href="/dashboard/active-raffles" className="button-primary">
                Browse Raffles
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
