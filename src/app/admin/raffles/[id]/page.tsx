'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Raffle {
  id: string;
  title: string;
  description?: string;
  status: 'draft' | 'active' | 'ended' | 'cancelled';
  startDate: string;
  endDate: string;
  ticketsSold: number;
  totalTickets: number;
  price: number;
  specifications?: {
    key: string;
    value: string;
  }[];
  images?: string[];
}

interface RaffleStats {
  totalRevenue: number;
  averageTicketsPerUser: number;
  conversionRate: number;
  peakSalesHour: string;
}

export default function RaffleView({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [raffle, setRaffle] = useState<Raffle | null>(null);
  const [stats, setStats] = useState<RaffleStats>({
    totalRevenue: 0,
    averageTicketsPerUser: 0,
    conversionRate: 0,
    peakSalesHour: '',
  });

  // Mock data loading
  useEffect(() => {
    // In a real app, this would be an API call
    setRaffle({
      id: params.id,
      title: 'Luxury Watch Collection',
      description:
        'A curated collection of luxury timepieces including models from top Swiss manufacturers.',
      status: 'active',
      startDate: '2024-01-01',
      endDate: '2024-02-01',
      ticketsSold: 1250,
      totalTickets: 5000,
      price: 99.99,
      specifications: [
        { key: 'Collection Value', value: '$250,000' },
        { key: 'Number of Pieces', value: '5' },
        { key: 'Warranty', value: '2 Years' },
        { key: 'Authenticity', value: 'Certified' },
      ],
      images: ['/images/watch1.jpg', '/images/watch2.jpg', '/images/watch3.jpg'],
    });

    setStats({
      totalRevenue: 124875.0,
      averageTicketsPerUser: 2.5,
      conversionRate: 65.5,
      peakSalesHour: '18:00-19:00',
    });
  }, [params.id]);

  if (!raffle) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
      </div>
    );
  }

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <button
            onClick={() => router.back()}
            className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            ← Back to Raffles
          </button>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">{raffle.title}</h1>
        </div>
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
            raffle.status
          )}`}
        >
          {raffle.status.charAt(0).toUpperCase() + raffle.status.slice(1)}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Description</h2>
            <p className="text-gray-600 dark:text-gray-300">{raffle.description}</p>
          </div>

          {/* Specifications */}
          {raffle.specifications && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Specifications
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {raffle.specifications.map((spec, index) => (
                  <div key={index} className="space-y-1">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {spec.key}
                    </dt>
                    <dd className="text-sm text-gray-900 dark:text-white">{spec.value}</dd>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Images */}
          {raffle.images && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Images</h2>
              <div className="grid grid-cols-2 gap-4">
                {raffle.images.map((image, index) => (
                  <div
                    key={index}
                    className="aspect-video bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden"
                  >
                    <Image
                      src={image}
                      alt="Raffle item"
                      width={500}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Quick Stats</h2>
            <div className="space-y-4">
              <div>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Tickets Sold
                </div>
                <div className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">
                  {raffle.ticketsSold} / {raffle.totalTickets}
                </div>
                <div className="mt-2 w-full h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-full bg-red-500 rounded-full"
                    style={{ width: `${(raffle.ticketsSold / raffle.totalTickets) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Total Revenue
                </div>
                <div className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">
                  ${stats.totalRevenue.toLocaleString()}
                </div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Avg. Tickets per User
                </div>
                <div className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">
                  {stats.averageTicketsPerUser}
                </div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Conversion Rate
                </div>
                <div className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">
                  {stats.conversionRate}%
                </div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Peak Sales Hour
                </div>
                <div className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">
                  {stats.peakSalesHour}
                </div>
              </div>
            </div>
          </div>

          {/* Date Information */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Date Information
            </h2>
            <div className="space-y-4">
              <div>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Start Date
                </div>
                <div className="mt-1 text-sm text-gray-900 dark:text-white">
                  {new Date(raffle.startDate).toLocaleDateString()}
                </div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">End Date</div>
                <div className="mt-1 text-sm text-gray-900 dark:text-white">
                  {new Date(raffle.endDate).toLocaleDateString()}
                </div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Duration</div>
                <div className="mt-1 text-sm text-gray-900 dark:text-white">
                  {Math.ceil(
                    (new Date(raffle.endDate).getTime() - new Date(raffle.startDate).getTime()) /
                      (1000 * 60 * 60 * 24)
                  )}{' '}
                  days
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
