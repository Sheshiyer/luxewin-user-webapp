'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Raffle {
  id: string;
  name: string;
  description: string;
  price: number;
  endDate: string;
  totalTickets: number;
  soldTickets: number;
  image: string;
  category: 'tech' | 'luxury' | 'travel' | 'lifestyle';
  value: string;
}

const MOCK_RAFFLES: Raffle[] = [
  {
    id: '1',
    name: 'Rolex Daytona',
    description: 'Limited Edition Platinum Daytona with custom diamond setting',
    price: 250,
    endDate: '2024-02-15',
    totalTickets: 1000,
    soldTickets: 456,
    image: '/images/rolex-daytona.png',
    category: 'luxury',
    value: '$45,000',
  },
  {
    id: '2',
    name: 'Luxury Villa in Bali',
    description: '5-bedroom beachfront villa with private pool and staff',
    price: 500,
    endDate: '2024-02-20',
    totalTickets: 2000,
    soldTickets: 892,
    image: '/images/luxury-villa.png',
    category: 'travel',
    value: '$2.5M',
  },
  {
    id: '3',
    name: 'Ferrari F8 Tributo',
    description: '2023 Model with custom interior and track package',
    price: 1000,
    endDate: '2024-03-01',
    totalTickets: 5000,
    soldTickets: 2341,
    image: '/images/ferrari-f8.png',
    category: 'luxury',
    value: '$350,000',
  },
];

const CATEGORIES = [
  { id: 'all', label: 'All Raffles' },
  { id: 'tech', label: 'Technology' },
  { id: 'luxury', label: 'Luxury' },
  { id: 'travel', label: 'Travel' },
  { id: 'lifestyle', label: 'Lifestyle' },
] as const;

export default function ActiveRaffles() {
  const [selectedCategory, setSelectedCategory] = useState<
    'all' | 'tech' | 'luxury' | 'travel' | 'lifestyle'
  >('all');
  const [sortBy, setSortBy] = useState<'endDate' | 'price' | 'popularity'>('endDate');

  const filteredRaffles = MOCK_RAFFLES.filter(raffle =>
    selectedCategory === 'all' ? true : raffle.category === selectedCategory
  ).sort((a, b) => {
    switch (sortBy) {
      case 'endDate':
        return new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
      case 'price':
        return a.price - b.price;
      case 'popularity':
        return b.soldTickets / b.totalTickets - a.soldTickets / a.totalTickets;
      default:
        return 0;
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Active Raffles</h1>
          <p className="mt-1 text-sm text-gray-400">
            Enter now for a chance to win these exclusive prizes
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as 'endDate' | 'price' | 'popularity')}
            className="input-field max-w-[200px]"
          >
            <option value="endDate">Ending Soon</option>
            <option value="price">Lowest Price</option>
            <option value="popularity">Most Popular</option>
          </select>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          {CATEGORIES.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                ${
                  selectedCategory === category.id
                    ? 'border-[var(--primary-color)] text-[var(--primary-color)]'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                }
              `}
            >
              {category.label}
              {category.id !== 'all' && (
                <span className="ml-2 text-xs text-gray-400 dark:text-gray-500">
                  ({MOCK_RAFFLES.filter(r => r.category === category.id).length})
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRaffles.map(raffle => (
          <div key={raffle.id} className="card-interactive group">
            <div className="aspect-w-16 aspect-h-9 relative">
              <Image src={raffle.image} alt={raffle.name} fill className="object-cover" />
              <div className="absolute top-4 right-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-black/50 text-[#3399FF] backdrop-blur-sm">
                  Value: {raffle.value}
                </span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#3399FF] transition-colors">
                {raffle.name}
              </h3>
              <p className="text-sm text-gray-400 mb-4">{raffle.description}</p>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Tickets Available</span>
                    <span className="text-white font-medium">
                      {raffle.soldTickets}/{raffle.totalTickets}
                    </span>
                  </div>
                  <div className="w-full bg-[#1A1A1A] rounded-full h-2">
                    <div
                      className="bg-[#3399FF] h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(raffle.soldTickets / raffle.totalTickets) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Price per ticket</p>
                    <p className="text-lg font-semibold text-[#3399FF]">${raffle.price}</p>
                  </div>
                  <button className="px-4 py-2 bg-gradient-to-r from-[#3399FF] to-[#00FFCC] text-white rounded-lg hover:opacity-90 transition-opacity">
                    Enter Raffle
                  </button>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">
                    Ends {new Date(raffle.endDate).toLocaleDateString()}
                  </span>
                  <span
                    className={`
                    px-2 py-1 rounded-full text-xs font-medium
                    ${
                      raffle.soldTickets / raffle.totalTickets > 0.8
                        ? 'bg-red-900/30 text-red-400'
                        : 'bg-green-900/30 text-green-400'
                    }
                  `}
                  >
                    {raffle.soldTickets / raffle.totalTickets > 0.8
                      ? 'Almost Sold Out'
                      : 'Tickets Available'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredRaffles.length === 0 && (
        <div className="card p-12 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="mx-auto h-12 w-12 text-gray-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
            No active raffles
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {selectedCategory === 'all'
              ? 'Check back soon for new raffles!'
              : `No ${selectedCategory} raffles available. Try a different category.`}
          </p>
        </div>
      )}
    </div>
  );
}
