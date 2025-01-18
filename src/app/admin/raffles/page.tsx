'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import RaffleFormModal from '@/components/admin/raffle-form-modal';
import PublishConfirmationModal from '@/components/admin/publish-confirmation-modal';

interface Raffle {
  id: string;
  title: string;
  status: 'draft' | 'active' | 'ended' | 'cancelled';
  startDate: string;
  endDate: string;
  ticketsSold: number;
  totalTickets: number;
  price: number;
}

const ITEMS_PER_PAGE = 10;

export default function AdminRaffles() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRaffle, setEditingRaffle] = useState<Raffle | null>(null);
  const [publishingRaffle, setPublishingRaffle] = useState<Raffle | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | Raffle['status']>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'price-high' | 'price-low'>('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [raffles, setRaffles] = useState<Raffle[]>([
    {
      id: '1',
      title: 'Luxury Watch Collection',
      status: 'active',
      startDate: '2024-01-01',
      endDate: '2024-02-01',
      ticketsSold: 1250,
      totalTickets: 5000,
      price: 99.99,
    },
    {
      id: '2',
      title: 'Dream Villa Experience',
      status: 'draft',
      startDate: '2024-02-15',
      endDate: '2024-03-15',
      ticketsSold: 0,
      totalTickets: 10000,
      price: 149.99,
    },
    {
      id: '3',
      title: 'Exotic Car Package',
      status: 'ended',
      startDate: '2023-12-01',
      endDate: '2023-12-31',
      ticketsSold: 4850,
      totalTickets: 5000,
      price: 199.99,
    },
  ]);

  const getStatusColor = (status: Raffle['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'draft':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
      case 'ended':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Filter and sort raffles
  const filteredRaffles = raffles
    .filter(raffle => {
      const matchesSearch = raffle.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || raffle.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
        case 'oldest':
          return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
        case 'price-high':
          return b.price - a.price;
        case 'price-low':
          return a.price - b.price;
        default:
          return 0;
      }
    });

  // Calculate pagination
  const totalItems = filteredRaffles.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalItems);
  const currentRaffles = filteredRaffles.slice(startIndex, endIndex);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-[var(--foreground)]">Raffle Management</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 text-sm bg-[var(--primary-color)] text-[var(--foreground)] rounded-lg hover:opacity-90 transition-colors"
        >
          Create New Raffle
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 bg-[var(--background-light)] p-4 rounded-xl shadow-sm border border-gray-800">
        <input
          type="text"
          placeholder="Search raffles..."
          value={searchQuery}
          onChange={e => {
            setSearchQuery(e.target.value);
            setCurrentPage(1); // Reset to first page on search
          }}
          className="flex-1 min-w-[200px] px-4 py-2 bg-[var(--background)] border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] text-[var(--foreground)]"
        />
        <select
          value={statusFilter}
          onChange={e => {
            setStatusFilter(e.target.value as typeof statusFilter);
            setCurrentPage(1); // Reset to first page on filter change
          }}
          className="px-4 py-2 bg-[var(--background)] border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] text-[var(--foreground)]"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="draft">Draft</option>
          <option value="ended">Ended</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value as typeof sortBy)}
          className="px-4 py-2 bg-[var(--background)] border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] text-[var(--foreground)]"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="price-high">Price: High to Low</option>
          <option value="price-low">Price: Low to High</option>
        </select>
      </div>

      {/* Raffles Table */}
      <div className="bg-[var(--background-light)] rounded-xl shadow-sm border border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[var(--background)]">
                <th className="px-6 py-3 text-left text-xs font-medium text-[var(--foreground)]/60 uppercase tracking-wider">
                  Raffle
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Date Range
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Tickets
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {currentRaffles.map(raffle => (
                <tr key={raffle.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-[var(--foreground)]">
                      {raffle.title}
                    </div>
                    <div className="text-sm text-[var(--foreground)]/60">ID: {raffle.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                        raffle.status
                      )}`}
                    >
                      {raffle.status.charAt(0).toUpperCase() + raffle.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-[var(--foreground)]">
                      {new Date(raffle.startDate).toLocaleDateString()} -{' '}
                      {new Date(raffle.endDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-[var(--foreground)]">
                      {raffle.ticketsSold} / {raffle.totalTickets}
                    </div>
                    <div className="w-24 h-2 bg-[var(--background)] rounded-full mt-1">
                      <div
                        className="h-full bg-[var(--primary-color)] rounded-full"
                        style={{ width: `${(raffle.ticketsSold / raffle.totalTickets) * 100}%` }}
                      ></div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-[var(--foreground)]">
                      ${raffle.price.toFixed(2)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                    <button
                      onClick={() => {
                        setEditingRaffle(raffle);
                        setIsModalOpen(true);
                      }}
                      className="text-[var(--primary-color)] hover:opacity-80"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => router.push(`/admin/raffles/${raffle.id}`)}
                      className="text-gray-500 hover:text-gray-600"
                    >
                      View
                    </button>
                    {raffle.status === 'draft' && (
                      <button
                        onClick={() => setPublishingRaffle(raffle)}
                        className="text-green-500 hover:text-green-600"
                      >
                        Publish
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
          <span className="font-medium">{endIndex}</span> of{' '}
          <span className="font-medium">{totalItems}</span> results
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 text-sm bg-[var(--background)] text-[var(--foreground)] rounded-lg border border-gray-800 transition-colors ${
              currentPage === 1
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-[var(--background-light)]/50'
            }`}
          >
            Previous
          </button>

          {/* Page Numbers */}
          <div className="flex space-x-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(page => {
                // Show first page, last page, current page, and one page before and after current
                return page === 1 || page === totalPages || Math.abs(currentPage - page) <= 1;
              })
              .map((page, index, array) => (
                <div key={page} className="flex items-center">
                  {index > 0 && array[index - 1] !== page - 1 && (
                    <span className="px-2 text-gray-500">...</span>
                  )}
                  <button
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                      currentPage === page
                        ? 'bg-[var(--primary-color)] text-[var(--foreground)]'
                        : 'bg-[var(--background)] text-[var(--foreground)] border border-gray-800 hover:bg-[var(--background-light)]/50'
                    }`}
                  >
                    {page}
                  </button>
                </div>
              ))}
          </div>

          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 text-sm bg-[var(--background)] text-[var(--foreground)] rounded-lg border border-gray-800 transition-colors ${
              currentPage === totalPages
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-[var(--background-light)]/50'
            }`}
          >
            Next
          </button>
        </div>
      </div>

      {/* Publish Confirmation Modal */}
      <PublishConfirmationModal
        isOpen={!!publishingRaffle}
        onClose={() => setPublishingRaffle(null)}
        onConfirm={() => {
          if (publishingRaffle) {
            setRaffles(prev =>
              prev.map(raffle =>
                raffle.id === publishingRaffle.id ? { ...raffle, status: 'active' } : raffle
              )
            );
          }
        }}
        raffleName={publishingRaffle?.title || ''}
      />

      {/* Raffle Form Modal */}
      <RaffleFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingRaffle(null);
        }}
        onSubmit={data => {
          if (editingRaffle) {
            // Update existing raffle
            setRaffles(prev =>
              prev.map(raffle =>
                raffle.id === editingRaffle.id
                  ? {
                      ...raffle,
                      title: data.title,
                      description: data.description,
                      startDate: data.startDate,
                      endDate: data.endDate,
                      totalTickets: data.totalTickets,
                      price: data.price,
                    }
                  : raffle
              )
            );
          } else {
            // Create new raffle
            const newRaffle: Raffle = {
              id: (raffles.length + 1).toString(),
              title: data.title,
              status: 'draft',
              startDate: data.startDate,
              endDate: data.endDate,
              ticketsSold: 0,
              totalTickets: data.totalTickets,
              price: data.price,
            };
            setRaffles(prev => [...prev, newRaffle]);
          }
          setIsModalOpen(false);
          setEditingRaffle(null);
        }}
        initialData={editingRaffle || undefined}
      />
    </div>
  );
}
